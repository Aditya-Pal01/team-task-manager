import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  dueDate: Date,

  // 🔥 IMPORTANT (KANBAN)
  status: {
    type: String,
    enum: ["todo", "doing", "done"],
    default: "todo",
  },
});

export default mongoose.model("Task", taskSchema);