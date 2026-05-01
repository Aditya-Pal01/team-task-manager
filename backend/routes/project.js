import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

/* CREATE PROJECT */
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;

    const project = new Project({ title });

    await project.save();
    res.json(project);
  } catch (err) {
    console.error("PROJECT CREATE ERROR:", err);
    res.status(500).json({ msg: "Project error" });
  }
});

/* GET PROJECTS */
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error("PROJECT FETCH ERROR:", err);
    res.status(500).json({ msg: "Fetch error" });
  }
});

export default router;