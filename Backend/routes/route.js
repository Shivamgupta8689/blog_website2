import express from "express";
import { signupUser, loginUser } from "../controller/user-controller.js";
import { uploadImage, getImage } from '../controller/image-controller.js';
import { createPost, getAllPosts, getPost, updatePost, deletPost } from "../controller/post-controller.js";
import { newComment, getComments, deleteComment } from '../controller/comment-controller.js';
import { authenticateToken } from "../controller/jwt-controller.js";

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);

// ✅ Upload image route
router.post('/file/upload', uploadImage); // Removed extra multer middleware

// ✅ Get image info
router.get('/file/:filename', getImage);

router.post('/create', authenticateToken, createPost);
router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletPost);

router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

export default router;
