import express from "express";
import Product from "../models/Product.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// ADD PRODUCT
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, desc, price, mrp, categoryId } = req.body;

    const newProduct = new Product({
      name,
      desc,
      price,
      mrp,
      img: req.file?.path || req.file?.secure_url || "",
      categoryId
    });

    await newProduct.save();
    res.json(newProduct);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// GET PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// IMPORTANT EXPORT
export default router;
