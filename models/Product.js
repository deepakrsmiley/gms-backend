import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  img: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
