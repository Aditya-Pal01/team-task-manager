import express from "express";
import Project from "../models/Project.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// CREATE PROJECT
router.post("/", auth, async (req, res) => {
  try {
    const project = new Project({
      title: req.body.title,
      user: req.user.userId
    });

    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Project error" });
  }
});

// GET PROJECTS
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.userId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: "Fetch error" });
  }
});

export default router;