import express from "express";
import Product from "../models/Product.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// add new product (with image upload)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, desc, price, categoryId, features } = req.body;

    // FIX: Use full URL so frontend (port 5500) can access images
    const imageUrl = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : req.body.img;

    const item = await Product.create({
      name,
      desc,
      img: imageUrl,
      price,
      features: features || [],
      categoryId
    });

    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
