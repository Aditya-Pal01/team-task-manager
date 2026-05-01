import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// GET tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find()
    .populate("assignedTo", "name")
    .populate("project", "title");

  res.json(tasks);
});

// CREATE task
router.post("/", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

export default router;