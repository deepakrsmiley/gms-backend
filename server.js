import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----------- MIDDLEWARE -----------
app.use(cors({
    origin: [
        "https://transcendent-mandazi-edb195.netlify.app",  // your Netlify domain
        "https://yourdomain.com"                           // your personal domain
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

app.use(express.json({ limit: "10mb" }));

// ----------- SERVE UPLOADED IMAGES -----------
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ----------- MULTER CONFIG (UPLOADS) -----------
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

export const upload = multer({ storage });

// ----------- MONGO CONNECTION -----------
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch(err => console.error(err));


// ----------- ROUTES -----------
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => res.send('API running'));


// ----------- START SERVER -----------
app.listen(PORT, () => console.log('Server listening on', PORT));
