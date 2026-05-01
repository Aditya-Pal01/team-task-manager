import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: String,
    enum: ["todo", "doing", "done"],
    default: "todo"
  },

  dueDate: Date
});

export default mongoose.model("Task", taskSchema);