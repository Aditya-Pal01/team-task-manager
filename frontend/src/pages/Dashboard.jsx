import { useEffect, useState } from "react";
import API from "../api";
/* import KanbanBoard from "../components/KanbanBoard"; */

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const p = await API.get("/projects");
    const t = await API.get("/tasks");

    setProjects(p.data);
    setTasks(t.data);
  };

  const createProject = async () => {
    await API.post("/projects", { title: projectName });
    setProjectName("");
    fetchData();
  };

  const createTask = async () => {
    await API.post("/tasks", { title: taskTitle });
    setTaskTitle("");
    fetchData();
  };

  return (
    <div style={styles.container}>
      <h1>🚀 Dashboard</h1>

      <div style={styles.card}>
        <h3>Create Project</h3>
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project name"
        />
        <button onClick={createProject}>Add</button>
      </div>

      <div style={styles.card}>
        <h3>Create Task</h3>
        <input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Task name"
        />
        <button onClick={createTask}>Add</button>
      </div>

      <div style={styles.card}>
        <h3>📌 Projects</h3>
        {projects.map((p) => (
          <p key={p._id}>{p.title}</p>
        ))}
      </div>

      {/* 🔥 KANBAN */}
      <div style={styles.card}>
        <h3>📌 Tasks Board</h3>
         <ul>
  {tasks.map((t) => (
    <li key={t._id}>{t.title}</li>
  ))}
</ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    color: "white",
    background: "#0f172a",
    minHeight: "100vh",
  },

  card: {
    background: "#1e293b",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
  },
};