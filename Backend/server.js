import express, { urlencoded } from "express";
import connectToDB from "./config/db.js";
import Router from "./routes/route.js";
import dotenv from 'dotenv';
import cors from 'cors';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(cors({
  origin: 'https://ltce-blog.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(join(__dirname, 'uploads')));
app.use('/', Router)

const port = 8000;

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})

connectToDB();
