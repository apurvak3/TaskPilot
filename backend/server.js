import express from "express";
import mongoose from "mongoose";
import cors from "cors"; 
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./data/database.js";


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
connectDB();
app.use("/auth", authRoutes);

app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${PORT}`));
