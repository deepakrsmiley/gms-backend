import express from "express";
import Product from "../models/Product.js";
import upload, { uploadToCloudinary } from "../middleware/upload.js";

const router = express.Router();

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
  category,
  image: req.imageUrl
});


      await product.save();
      res.json({ success: true, product });

    } catch (err) {
      res.status(500).json({ error: "Product upload failed", details: err.message });
    }
  }
);

export default router;
