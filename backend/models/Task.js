import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dueDate: Date,
  status: { type: String, default: "pending" }
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);