import express from "express";

const router = express.Router();

// ✅ GET all tasks
router.get("/", async (req, res) => {
  try {
    res.json([]);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching tasks" });
  }
});

// ✅ CREATE task
router.post("/", async (req, res) => {
  try {
    const { title, status } = req.body;

    const newTask = {
      title,
      status: status || "todo"
    };

    res.json(newTask);
  } catch (err) {
    res.status(500).json({ msg: "Error creating task" });
  }
});

export default router;