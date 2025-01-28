import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";
import { ScrapingData } from "../scraping/scraper.js";
import { User } from "../models/user.model.js";
import { sendTrackingEmail } from "../mailtrap/emails.js"; // Updated email service import

// Create a new product or fetch existing
const createProduct = asyncHandler(async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "Please provide the product URL" });
  }

  // Scrape the data
  const productData = await ScrapingData(url);
  if (!productData) {
    return res.status(500).json({ message: "Unable to fetch product data" });
  }

  const { title, price, imageUrl, description, mrp } = productData;

  // Check if the product already exists in the database
  let product = await Product.findOne({ url });
  if (product) {
    return res.status(200).json(product); // Return the existing product
  }

  // Extract and validate the price
  const parsedPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
  if (isNaN(parsedPrice)) {
    return res.status(400).json({ message: "Invalid product price" });
  }

  // Create a new product
  product = new Product({
    name: title,
    url,
    platform: "Amazon", // Modify platform as necessary
    currentPrice: parsedPrice,
    mrp,
    description,
    imageUrl,
    historicalPrices: [{ price: parsedPrice }],
  });

  await product.save();
  console.log("Created product:", product);

  // Return the created product
  return res.status(201).json(product);
});

// Get product by ID
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
});

const trackProduct = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;

  console.log("Received request to track product with:", { userId, productId });

  try {
      const user = await User.findById(userId);
      if (!user) {
          console.error("User not found for userId:", userId);
          return res.status(404).json({ message: "User not found" });
      }

      const product = await Product.findById(productId);
      if (!product) {
          console.error("Product not found for productId:", productId);
          return res.status(404).json({ message: "Product not found" });
      }

      if (user.trackingList.includes(productId)) {
          console.log("Product already being tracked:", productId);
          return res
              .status(400)
              .json({ message: "This product is already being tracked" });
      }

      user.trackingList.push(productId);
      await user.save();

      console.log("Successfully added product to tracking list:", productId);

      await sendTrackingEmail(user.email, product);

      res.status(200).json({
          message: "Product is now being tracked, and a confirmation email has been sent.",
          product,
      });
  } catch (error) {
      console.error("Error in trackProduct:", error.message);
      res.status(500).json({ message: "Internal server error" });
  }
});

export { createProduct, getProductById, trackProduct };

// import Product from "../models/Product.js";
// import asyncHandler from "express-async-handler";
// import { ScrapingData } from "../scraping/scraper.js";

// const createProduct = asyncHandler(async (req, res) => {
//   const { url } = req.body;

//   if (!url) {
//     return res.status(400).json({ message: "Please provide the product URL" });
//   }

//   // Scrape the data
//   const productData = await ScrapingData(url);
//   if (!productData) {
//     return res.status(500).json({ message: "Unable to fetch product data" });
//   }

//   const { title, price, imageUrl, description, mrp } = productData;

//   // Check if product already exists
//   let product = await Product.findOne({ url });
//   if (product) {
//     return res.status(200).json(product); // Return existing product
//   }

//   // Create a new product
//   product = new Product({
//     name: title,
//     url,
//     platform: "Amazon", // Assuming it's from Amazon, change as needed
//     currentPrice: parseFloat(price.replace(/[^0-9.-]+/g, "")),
//     mrp: mrp ,// MRP extraction
//     description, // Product description
//     imageUrl, // Image URL
//     historicalPrices: [{ price: parseFloat(price.replace(/[^0-9.-]+/g, "")) }],
//   });

//   await product.save();
//   console.log("Created product:", product);  // Log newly created product

//   // Return the created product including the _id
//   return res.status(201).json(product);
// });

// const getProductById = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   // Find product by ID
//   const product = await Product.findById(id);

//   // Check if the product exists
//   if (!product) {
//     res.status(404);
//     throw new Error("Product not found");
//   }

//   // Respond with the product details
//   res.status(200).json(product);
// });

// export { createProduct, getProductById };
