router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId })
      .populate("assignedTo", "name")
      .populate("project", "title");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Task fetch error" });
  }
});