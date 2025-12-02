import express from "express";
import Product from "../models/Product.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ADD PRODUCT
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, desc, price, category } = req.body;

    const product = new Product({
      name,
      desc,
      price,
      category,
      image: req.file.path // Cloudinary URL
    });

    await product.save();
    res.json({ success: true, product });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
