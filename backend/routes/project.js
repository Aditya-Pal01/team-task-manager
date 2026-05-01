import express from "express";
import Project from "../models/Project.js";
import { auth, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// create project (ADMIN ONLY)
router.post("/", auth, isAdmin, async (req, res) => {
  const { title } = req.body;

  const project = await Project.create({
    title,
    createdBy: req.user.userId,
  });

  res.json(project);
});

// get projects
router.get("/", auth, async (req, res) => {
  const projects = await Project.find({
    createdBy: req.user.userId,
  });

  res.json(projects);
});

export default router;