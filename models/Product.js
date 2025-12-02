import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  desc: String,
  price: Number,
  image: String,
  category: String
});

export default mongoose.model("Product", productSchema);
