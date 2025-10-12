// import ImageModel from '../model/image-model.js';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Backend base URL from environment variable
// const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

// export const uploadImage = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ msg: "File not found" });
//         }

//         const { path: filePath, filename } = req.file;

//         const image = new ImageModel({ path: filePath, filename });
//         await image.save();

//         console.log("📤 Image uploaded successfully");
//         const imageUrl = `${BACKEND_URL}/uploads/${filename}`;
//         return res.status(200).json({ msg: "Image uploaded successfully", imageUrl, image });
//     } catch (error) {
//         console.error("❌ File upload failed:", error);
//         return res.status(500).json({ msg: 'File upload failed', error: error.message });
//     }
// };

// export const getImage = async (req, res) => {
//     const { filename } = req.params;

//     try {
//         const image = await ImageModel.findOne({ filename });
//         if (!image) {
//             return res.status(404).json({ msg: "Image not found" });
//         }

//         const imageUrl = `${BACKEND_URL}/uploads/${filename}`;
//         return res.status(200).json({ imageUrl });
//     } catch (error) {
//         console.error("❌ Failed to retrieve image:", error);
//         return res.status(500).json({ msg: 'Failed to retrieve image', error: error.message });
//     }
// };

import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';
import ImageModel from '../model/image-model.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔧 Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📁 Ensure tmp folder exists (Render safe)
const tmpDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

// 📁 Multer temp storage
const upload = multer({
  dest: tmpDir,
});

// 📤 Upload image to Cloudinary
export const uploadImage = [
  upload.single('file'), // <-- Accept field name 'file'
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'blog_images',
      });

      // Delete temp file
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Temp file deletion error:', err);
      });

      // Save URL in MongoDB
      const image = new ImageModel({
        filename: result.public_id,
        url: result.secure_url,
      });
      await image.save();

      res.status(200).json({
        msg: 'Image uploaded successfully',
        imageUrl: result.secure_url,
        image,
      });
    } catch (error) {
      console.error('❌ Upload error:', error);
      res.status(500).json({ msg: 'Upload failed', error: error.message, stack: error.stack });
    }
  },
];

// 📥 Retrieve image info
export const getImage = async (req, res) => {
  try {
    const { filename } = req.params;
    const image = await ImageModel.findOne({ filename });
    if (!image) return res.status(404).json({ msg: 'Image not found' });

    res.status(200).json({ imageUrl: image.url, image });
  } catch (error) {
    console.error('❌ Fetch image error:', error);
    res.status(500).json({ msg: 'Failed to fetch image', error: error.message });
  }
};

