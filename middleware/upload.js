import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// ---- Use Memory Storage (IMPORTANT for Netlify) ----
const storage = multer({
  storage: multer.memoryStorage(),
});

export const upload = storage;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ---- Upload buffer to Cloudinary ----
export const uploadToCloudinary = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const stream = cloudinary.uploader.upload_stream(
    { folder: "gms_products" },
    (error, result) => {
      if (error) {
        return res.status(500).json({
          error: "Cloudinary upload failed",
          details: error.message,
        });
      }

      req.imageUrl = result.secure_url;
      next();
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(stream);
};
