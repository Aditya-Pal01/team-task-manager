import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Project error" });
  }
});

// GET
router.get("/", async (req, res) => {
  const data = await Project.find();
  res.json(data);
});

export default router;