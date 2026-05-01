import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// CREATE TASK
router.post("/", async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      status: "todo", // 🔥 default
    });

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET TASKS
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "email")
      .populate("projectId", "name");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;