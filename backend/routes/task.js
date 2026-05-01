import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name")
      .populate("project", "title");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching tasks" });
  }
});

// CREATE task
router.post("/", async (req, res) => {
  try {
    const { title, project, assignedTo, dueDate } = req.body;

    const task = new Task({
      title,
      project,
      assignedTo,
      dueDate
    });

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error creating task" });
  }
});

export default router;