import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// -------------------------------
// 1. Configure Cloudinary
// -------------------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// -------------------------------
// 2. Multer Storage (temp only)
// -------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "temp/"); // temporary folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// -------------------------------
// 3. Function to Upload to Cloudinary
// -------------------------------
export const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    const tempPath = req.file.path;

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(tempPath, {
      folder: "products",
    });

    // Save Cloudinary URL to request
    req.imageUrl = result.secure_url;

    // Delete temp file
    fs.unlinkSync(tempPath);

    next();
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    res.status(500).json({ error: "Image upload failed" });
  }
};

export default upload;
