import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  desc: String,
  price: Number,
  mrp: Number,          // <<<< ADD THIS
  img: String,
  categoryId: mongoose.Schema.Types.ObjectId,
  features: Array
});


export default mongoose.model("Product", ProductSchema);
