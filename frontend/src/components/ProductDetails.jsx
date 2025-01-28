import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

import {
  Heart,
  Bookmark,
  Share2,
  Star,
  WalletMinimal,
  ArrowBigUp,
  ArrowBigDown,
  ChartLine,
  MessageSquareMore,
} from "lucide-react";
import { useProductStore } from "../store/productStore";
import { useAuthStore } from "../store/authStore"; // Adjust path based on your project structure

const ProductDetails = () => {
  const { id } = useParams();
  const { product, loading, error, fetchProductById } = useProductStore();
  const [tracking, setTracking] = useState(false);

  const handleTrackProduct = async () => {
    const { user } = useAuthStore.getState();

    if (!user || !user._id) {
      alert("Please log in to track products.");
      return;
    }

    try {
      setTracking(true);

      // Debugging: Log data being sent
      console.log("Tracking Payload:", {
        userId: user._id,
        productId: id,
      });

      const response = await axios.post("/TrackedProducts", {
        userId: user._id,
        productId: id,
      });

      if (response.status === 200) {
        alert("Product is being tracked and an email has been sent.");
      }
    } catch (error) {
      console.error(
        "Error tracking the product:",
        error.response?.data || error.message
      );
      alert("Failed to track the product. Please try again.");
    } finally {
      setTracking(false);
    }
    console.log("Request URL:", axios.defaults.baseURL || "http://localhost:5000", "/TrackedProducts");
  };

  useEffect(() => {
    fetchProductById(id);
  }, [id, fetchProductById]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center py-10">No product found.</div>;
  }

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-lg mt-5">
      <div className="flex flex-col lg:flex-row gap-6">
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md border border-gray-200"
          />
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:underline mb-4 inline-block"
          >
            Visit Product
          </a>

          <div className="flex items-center gap-4 mb-4">
            <button className="flex items-center gap-1 text-gray-600 bg-pink-100 p-2 rounded-full">
              <Heart size={20} /> 123
            </button>
            <button className="flex items-center gap-1 text-gray-600 bg-gray-100 p-2 rounded-full">
              <Bookmark size={20} />
            </button>
            <button className="flex items-center gap-1 text-gray-600 bg-gray-100 p-2 rounded-full">
              <Share2 size={20} />
            </button>
          </div>

          <hr className="my-4 border-gray-200" />

          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl font-bold">₹{product.currentPrice}</span>
            <div className="flex items-center justify-evenly space-x-5">
              <div className="flex items-center justify-evenly space-x-2 bg-yellow-100 p-2 rounded-full">
                <Star className="text-yellow-400" size={20} />
                <span className="">0</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-gray-100 p-2 rounded-full">
                <MessageSquareMore className="text-gray-600" size={20} />
                <span className="text-gray-600">0 Reviews</span>
              </div>
            </div>
          </div>

          <div className="text-gray-600 mb-4 relative">
            <span className="mr-4">
              MRP: <span className="line-through">₹{product.mrp}</span>
            </span>
            <span>
              {calculateDiscount(product.mrp, product.currentPrice)}% off
            </span>
            <span className="right-0 absolute">
              83% of buyers have recommended this.
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-100 p-3 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600">Current Price</div>
              <div className="font-bold flex items-center">
                <WalletMinimal
                  size={24}
                  style={{ fill: "#b08968" }}
                  strokeWidth={1.5}
                  className="text-amber-800 mr-2"
                />
                ₹{product.currentPrice}
              </div>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600">Average Price</div>
              <div className="font-bold flex items-center">
                <ChartLine size={24} className="text-purple-500 mr-2" />₹
                {calculateAveragePrice(product.historicalPrices)}
              </div>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600">Highest Price</div>
              <div className="font-bold flex items-center">
                <ArrowBigUp
                  size={24}
                  style={{ fill: "#f4b9b2" }}
                  strokeWidth={1.5}
                  className="mr-2 text-red-500 "
                />
                ₹{product.mrp}
              </div>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600">Lowest Price</div>
              <div className="font-bold flex items-center">
                <ArrowBigDown
                  size={24}
                  style={{ fill: "#b7efc5" }}
                  strokeWidth={1.5}
                  className="mr-2 text-green-500"
                />
                ₹{calculateLowestPrice(product.historicalPrices)}
              </div>
            </div>
          </div>

          <button
            disabled={tracking}
            onClick={handleTrackProduct}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300 mb-4"
          >
            {tracking ? "Tracking..." : "Track"}
          </button>
        </motion.div>
      </div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-bold mb-2">Price History</h2>
        {product.historicalPrices.length > 0 ? (
          <ul className="space-y-2">
            {product.historicalPrices.map((price) => (
              <li
                key={price._id}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <span>₹{price.price}</span>
                <span className="text-gray-600">
                  {new Date(price.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No price history available.</p>
        )}
      </motion.div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-xl font-bold mb-2">Product Description</h2>
        <p className="text-gray-600">
          {product.description.split(" ").slice(0, -4).join(" ") + "  --- " ||
            "No description available."}
        </p>
      </motion.div>
    </div>
  );
};

const calculateAveragePrice = (prices) => {
  if (prices.length === 0) return "N/A";
  const sum = prices.reduce((acc, price) => acc + price.price, 0);
  return (sum / prices.length).toFixed(2);
};

const calculateLowestPrice = (prices) => {
  if (prices.length === 0) return "N/A";
  return Math.min(...prices.map((price) => price.price));
};

const calculateDiscount = (mrp, currentPrice) => {
  return Math.round(((mrp - currentPrice) / mrp) * 100);
};

export default ProductDetails;
