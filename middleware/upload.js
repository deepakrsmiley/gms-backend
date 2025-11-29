import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

// Use memory storage (NO FILESYSTEM NEEDED)
const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload using Cloudinary stream
export const uploadToCloudinary = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const stream = cloudinary.uploader.upload_stream(
    { folder: "gms_products" },
    (error, result) => {
      if (error) {
        console.error("UPLOAD ERROR:", error);
        return res.status(500).json({
          error: "Cloudinary upload failed",
          details: error.message
        });
      }

      req.imageUrl = result.secure_url;
      next();
    }
  );

  // pipe the file buffer to upload_stream
  stream.end(req.file.buffer);
};

export default upload;
