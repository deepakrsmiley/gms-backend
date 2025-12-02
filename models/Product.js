import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: String,
  img: String,
  price: Number,
  features: { type: [String], default: [] },
  category: { type: String, required: true } // FIXED
});

export default mongoose.model("Product", ProductSchema);
