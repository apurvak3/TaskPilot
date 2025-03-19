import express from "express";
import { Register, Login } from "../controllers/authController.js";  

export const router = express.Router();

// Fix incorrect route paths
router.post("/register", Register);
router.post("/login", Login);

export default router; // ✅ Export router properly

