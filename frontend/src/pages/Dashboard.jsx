import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const p = await API.get("/projects");
    const t = await API.get("/tasks");
    const u = await API.get("/auth/users");

    setProjects(p.data);
    setTasks(t.data);
    setUsers(u.data);
  };

  const createProject = async () => {
    await API.post("/projects", { title: projectName });
    setProjectName("");
    fetchAll();
  };

  const createTask = async () => {
    await API.post("/tasks", {
      title: taskTitle,
      project: selectedProject,
      assignedTo: assignedUser,
      dueDate: date
    });

    setTaskTitle("");
    fetchAll();
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🚀 Dashboard</h1>

      {/* CREATE PROJECT */}
      <div style={styles.card}>
        <h2>➕ Create Project</h2>
        <div style={styles.row}>
          <input
            style={styles.input}
            value={projectName}
            placeholder="Project name..."
            onChange={(e) => setProjectName(e.target.value)}
          />
          <button style={styles.btn} onClick={createProject}>
            Add
          </button>
        </div>
      </div>

      {/* PROJECT LIST */}
      <div style={styles.card}>
        <h2>📁 Projects</h2>
        <div style={styles.grid}>
          {projects.map((p) => (
            <div key={p._id} style={styles.projectBox}>
              {p.title}
            </div>
          ))}
        </div>
      </div>

      {/* CREATE TASK */}
      <div style={styles.card}>
        <h2>📝 Create Task</h2>

        <div style={styles.rowWrap}>
          <input
            style={styles.input}
            placeholder="Task title"
            onChange={(e) => setTaskTitle(e.target.value)}
          />

          <select
            style={styles.input}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option>Select Project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>

          <select
            style={styles.input}
            onChange={(e) => setAssignedUser(e.target.value)}
          >
            <option>Assign User</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>

          <input
            style={styles.input}
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />

          <button style={styles.btn} onClick={createTask}>
            Add Task
          </button>
        </div>
      </div>

      {/* TASK LIST */}
      <div style={styles.card}>
        <h2>📌 Tasks</h2>

        <div style={styles.grid}>
          {tasks.map((t) => (
            <div key={t._id} style={styles.taskBox}>
              <h3>{t.title}</h3>

              <p>👤 {t.assignedTo?.name || "Unassigned"}</p>
              <p>📁 {t.project?.title}</p>

              <span
                style={{
                  ...styles.status,
                  background:
                    t.status === "done"
                      ? "#22c55e"
                      : t.status === "doing"
                      ? "#f59e0b"
                      : "#ef4444"
                }}
              >
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  page: {
    padding: "30px",
    background: "#0f172a",
    minHeight: "100vh",
    color: "white",
    fontFamily: "sans-serif"
  },

  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "40px"
  },

  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
  },

  row: {
    display: "flex",
    gap: "10px"
  },

  rowWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px"
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    background: "#0f172a",
    color: "white"
  },

  btn: {
    padding: "10px 20px",
    background: "#6366f1",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer"
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "10px"
  },

  projectBox: {
    background: "#334155",
    padding: "10px 15px",
    borderRadius: "8px"
  },

  taskBox: {
    background: "#334155",
    padding: "15px",
    borderRadius: "10px",
    width: "250px"
  },

  status: {
    padding: "5px 10px",
    borderRadius: "6px",
    color: "white",
    fontSize: "12px"
  }
};