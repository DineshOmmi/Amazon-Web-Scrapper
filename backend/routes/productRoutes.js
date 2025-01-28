// import express from "express";
// import { createProduct , getProductById } from "../controllers/productController.js"

// const router = express.Router();

// router.post("/createProduct",createProduct);
// router.post("/SearchProduct/:id",getProductById);

// export default router;

import express from 'express';
import { createProduct } from '../controllers/productController.js';
import { getProductById } from '../controllers/productController.js';
import { trackProduct } from '../controllers/productController.js';

const router = express.Router();

// Route to search (scrape and store) a product
router.post("/SearchProduct", createProduct);

router.post("/TrackedProducts", trackProduct);

// Route to get product by ID
router.get("/SearchProduct/:id", getProductById);

export default router;
