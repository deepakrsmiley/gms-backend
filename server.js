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

// CORS
app.use(cors({
    origin: [
        "https://transcendent-mandazi-edb195.netlify.app",
        "https://yourdomain.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json({ limit: "10mb" }));

// ROUTES
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => res.send('API running'));

// MONGO + SERVER START
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected ✔");

        app.listen(PORT, () =>
            console.log(`Server running on port ${PORT}`)
        );

    } catch (error) {
        console.error("❌ DB Connection Error:", error.message);
    }
};

startServer();
