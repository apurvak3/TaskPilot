import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js"; 

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists!" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: "1h" });
        res.status(201).json({ 
            message: "Registration successful!", 
            user: { id: newUser._id, name: newUser.name, email: newUser.email },
            token 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error registering user!" });
    }
};

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found!" });

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(400).json({ message: "Invalid password!" });

        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ 
            message: "Login successful!",
            user: { id: user._id, name: user.name, email: user.email },
            token 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error logging in!" });
    }
};



