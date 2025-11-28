import mongoose from "mongoose";
import Product from "./models/Product.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" }); // ensure env is loaded

const OLD_BASE = "http://localhost:5000";
const NEW_BASE = "https://gms-backend-4625.onrender.com";

async function fixImageUrls() {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("❌ MONGO_URL is missing in .env file!");
    }

    // Connect to database
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ DB Connected successfully");

    // Find all products that have old localhost URLs
    const products = await Product.find({ img: { $regex: OLD_BASE } });

    console.log(`🔍 Found ${products.length} products to update`);

    // Update each product's image URL
    for (let p of products) {
      const newImg = p.img.replace(OLD_BASE, NEW_BASE);
      p.img = newImg;
      await p.save();
      console.log(`✔ Updated: ${p.name}`);
    }

    console.log("🎉 All image URLs updated successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

fixImageUrls();
