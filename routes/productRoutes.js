import express from "express";
import Product from "../models/Product.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// GET all products
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, desc, price, mrp, categoryId } = req.body;

    const newProduct = new Product({
      name,
      desc,
      price,
      mrp,              // <<<<<< ADD THIS
      img: req.file ? req.file.path : "",
      categoryId
    });

    await newProduct.save();
    res.json(newProduct);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

