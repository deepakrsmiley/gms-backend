import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// DB Connect
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server running on port", port));
