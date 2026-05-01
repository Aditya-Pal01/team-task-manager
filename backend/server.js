import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/project.js";
import taskRoutes from "./routes/task.js";

dotenv.config();

const app = express();

// 🔥 CORS FIRST
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://considerate-purpose-production-2082.up.railway.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// (Optional but safe for preflight)
app.options("*", cors());

// JSON after CORS
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// health check (quick test)
app.get("/", (req, res) => res.send("API running"));

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB Connected");
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log("Server running on " + PORT));
});