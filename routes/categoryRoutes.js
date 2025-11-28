import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

// get all categories
router.get("/", async (req, res) => {
  const cats = await Category.find();
  res.json(cats);
});

// add a new category
router.post("/", async (req, res) => {
  try {
    const cat = await Category.create({ name: req.body.name });
    res.json(cat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
