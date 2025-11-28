import express from "express";
import Product from "../models/Product.js";
import upload, { uploadToCloudinary } from "../middleware/upload.js";

const router = express.Router();

// get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// add new product (with Cloudinary upload)
router.post("/", upload.single("image"), uploadToCloudinary, async (req, res) => {
  try {
    const { name, desc, price, categoryId, features } = req.body;

    // Cloudinary URL comes from middleware
    const imageUrl = req.imageUrl;

    if (!imageUrl) {
      return res.status(400).json({ error: "Image upload failed" });
    }

    const item = await Product.create({
      name,
      desc,
      img: imageUrl,      // IMPORTANT: stored from Cloudinary
      price,
      features: features || [],
      categoryId
    });

    res.json({
      message: "Product added successfully",
      product: item
    });

  } catch (e) {
    res.status(500).json({ error: e.message });
    
  }
});

export default router;
