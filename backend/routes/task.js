import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

/* =========================
   CREATE TASK
========================= */
router.post("/", async (req, res) => {
  try {
    const { title, project, assignedTo, dueDate } = req.body;

    const task = new Task({
      title,
      project,
      assignedTo,
      dueDate,
      status: "todo"
    });

    await task.save();
    res.json(task);

  } catch (err) {
    console.error("TASK CREATE ERROR:", err);
    res.status(500).json({ msg: "Task error" });
  }
});

/* =========================
   GET TASKS
========================= */
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name")
      .populate("project", "title");

    res.json(tasks);

  } catch (err) {
    console.error("TASK FETCH ERROR:", err);
    res.status(500).json({ msg: "Fetch error" });
  }
});

export default router;   // 🔥 YE LINE MOST IMPORTANT