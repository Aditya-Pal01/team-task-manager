import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "User exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed
    });

    await user.save();

    res.json({ msg: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error" });
  }
});

// GET USERS
router.get("/users", async (req, res) => {
  const users = await User.find().select("name");
  res.json(users);
});

export default router;