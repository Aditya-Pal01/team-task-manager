router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();

    // 🔥 FIX: missing status handle karo
    const safeTasks = tasks.map((t) => ({
      ...t._doc,
      status: t.status || "todo",
    }));

    res.json(safeTasks);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error fetching tasks");
  }
});