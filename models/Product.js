import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: String,
  img: String,
  price: Number,
  features: { type: [String], default: [] },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
});

export default mongoose.model("Product", ProductSchema);
