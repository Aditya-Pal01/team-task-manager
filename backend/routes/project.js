import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// CREATE PROJECT
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const project = await Project.create({
      name,
      createdBy: req.userId || null   // agar auth middleware hai
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL PROJECTS
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;