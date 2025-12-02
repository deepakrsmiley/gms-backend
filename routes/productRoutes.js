import express from "express";
import Product from "../models/Product.js";
import upload, { uploadToCloudinary } from "../middleware/upload.js";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ADD new product
router.post(
  "/",
  upload.single("image"),
  uploadToCloudinary,
  async (req, res) => {
    try {
      const { name, desc, price, category } = req.body;

      const product = new Product({
        name,
        desc,
        price,
        category, // FIXED field
        img: req.imageUrl
      });

      await product.save();

      res.json({ success: true, product });

    } catch (err) {
      res.status(500).json({
        error: "Product upload failed",
        details: err.message
      });
    }
  }
);

export default router;
