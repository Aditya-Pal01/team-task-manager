import express from "express";
import Task from "../models/Task.js";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// CREATE TASK (assign + dueDate)
router.post("/", auth, async (req, res) => {
  try {
    const { title, projectId, assignedTo, dueDate } = req.body;

    const task = await Task.create({
      title,
      projectId,
      assignedTo: assignedTo || req.user.userId,
      dueDate,
      status: "todo",
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Task create error" });
  }
});

// GET USERS (for assignment dropdown)
router.get("/users", auth, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET TASKS
router.get("/:projectId", auth, async (req, res) => {
  const tasks = await Task.find({
    projectId: req.params.projectId,
  }).populate("assignedTo", "name email");

  res.json(tasks);
});

// UPDATE TASK
router.put("/:id", auth, async (req, res) => {
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

export default router;