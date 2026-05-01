import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// ✅ CREATE PROJECT (SAFE)
router.post("/", async (req, res) => {
  try {
    console.log("BODY:", req.body); // 🔥 debug

    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ msg: "Title required" });
    }

    const project = new Project({
      title,
    });

    await project.save();

    res.json(project);
  } catch (err) {
    console.error("PROJECT ERROR:", err); // 🔥 VERY IMPORTANT
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ GET PROJECTS
router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

export default router;