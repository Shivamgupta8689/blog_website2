import ImageModel from '../model/image-model.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Backend base URL from environment variable
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "File not found" });
        }

        const { path: filePath, filename } = req.file;

        const image = new ImageModel({ path: filePath, filename });
        await image.save();

        console.log("📤 Image uploaded successfully");
        const imageUrl = `${BACKEND_URL}/uploads/${filename}`;
        return res.status(200).json({ msg: "Image uploaded successfully", imageUrl, image });
    } catch (error) {
        console.error("❌ File upload failed:", error);
        return res.status(500).json({ msg: 'File upload failed', error: error.message });
    }
};

export const getImage = async (req, res) => {
    const { filename } = req.params;

    try {
        const image = await ImageModel.findOne({ filename });
        if (!image) {
            return res.status(404).json({ msg: "Image not found" });
        }

        const imageUrl = `${BACKEND_URL}/uploads/${filename}`;
        return res.status(200).json({ imageUrl });
    } catch (error) {
        console.error("❌ Failed to retrieve image:", error);
        return res.status(500).json({ msg: 'Failed to retrieve image', error: error.message });
    }
};
