import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Product from "./models/Product.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// 👉 Load .env safely (important)
dotenv.config({ path: path.resolve("./.env") });

// ---- Cloudinary Config ----
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ---- MongoDB Connection ----
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("DB Error:", err));

const uploadsPath = path.join(process.cwd(), "public", "uploads");

async function migrateImages() {
  try {
    const products = await Product.find();

    for (const product of products) {
      if (product.img?.includes("cloudinary.com")) {
        console.log(`Skipping (already cloudinary): ${product.name}`);
        continue;
      }

      const fileName = product.img.split("/").pop();
      const localFilePath = path.join(uploadsPath, fileName);

      if (!fs.existsSync(localFilePath)) {
        console.log(`❌ File missing locally: ${fileName}`);
        continue;
      }

      console.log(`Uploading: ${fileName}`);

      const uploadResult = await cloudinary.uploader.upload(localFilePath, {
        folder: "gms-products",
      });

      product.img = uploadResult.secure_url;
      await product.save();

      console.log(`✅ Updated: ${product.name}`);
    }

    console.log("🔥 Migration Complete!");
    process.exit();

  } catch (err) {
    console.error("Error:", err);
    process.exit();
  }
}

migrateImages();
