import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// ---------- MULTER TEMP STORAGE ----------
const storage = multer.diskStorage({
  destination: "/tmp",        // IMPORTANT for Render
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ---------- CLOUDINARY CONFIG ----------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// ---------- CLOUDINARY UPLOAD MIDDLEWARE ----------
export const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;

    const uploaded = await cloudinary.uploader.upload(filePath, {
      folder: "gms_products"
    });

    req.imageUrl = uploaded.secure_url;

    // remove temp file (only if exists)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    next();

  } catch (err) {
    return res.status(500).json({
      error: "Cloudinary upload failed",
      details: err.message
    });
  }
};

export default upload;
