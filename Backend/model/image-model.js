import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    path: {       // optional, you can keep for local storage path
        type: String,
    },
    filename: {
        type: String,
        required: true
    },
    url: {        // Cloudinary URL
        type: String,
        required: true
    }
});

const ImageModel = mongoose.model("images", imageSchema);
export default ImageModel;
