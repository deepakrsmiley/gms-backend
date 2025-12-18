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

// 👉 IMPORTANT: Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// DB Connect
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server running on port", port));

app.get("/", (req, res) => {
  res.send("Backend running correctly");
});
// ---------- HEALTH CHECK (Render keep-alive) ----------
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});
app.get("/sitemap.xml", async (req, res) => {
  const Product = (await import("./models/Product.js")).default;
  const products = await Product.find({}, "_id name");

  const urls = products.map(p => {
    const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return `
      <url>
        <loc>https://globalenterpris.com/product/${slug}?id=${p._id}</loc>
      </url>`;
  }).join("");

  res.header("Content-Type", "application/xml");
  res.send(`
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>https://globalenterpris.com/</loc></url>
      <url><loc>https://globalenterpris.com/category/cpap</loc></url>
      <url><loc>https://globalenterpris.com/category/bipap</loc></url>
      ${urls}
    </urlset>
  `);
});


