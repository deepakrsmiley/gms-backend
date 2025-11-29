import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const storage = multer.diskStorage({
  destination: "/tmp",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uploaded = await cloudinary.uploader.upload(req.file.path, {
      folder: "gms_products",
    });

    req.imageUrl = uploaded.secure_url;

    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    next();
  } catch (err) {
    return res.status(500).json({
      error: "Cloudinary upload failed",
      details: err.message,
    });
  }
};

export default upload;
