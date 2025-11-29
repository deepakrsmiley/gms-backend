import express from "express";
import Product from "../models/Product.js";
import upload, { uploadToCloudinary } from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/",
  upload.single("image"),   // Step 1: Multer uploads to /tmp
  uploadToCloudinary,       // Step 2: Cloudinary uploads online
  async (req, res) => {     // Step 3: Save product
    try {
      const { name, desc, price, category } = req.body;

      const newProduct = new Product({
        name,
        desc,
        price,
        category,
        image: req.imageUrl // Cloudinary uploaded URL
      });

      await newProduct.save();

      res.json({ message: "Product added", product: newProduct });
    } catch (err) {
      res.status(500).json({ error: "Failed to add product", details: err });
    }
  }
);

export default router;
