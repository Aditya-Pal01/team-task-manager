import { useEffect, useState } from "react";
import API from "../api";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [dueDate, setDueDate] = useState("");

  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  // ================= FETCH =================
  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const fetchUsers = async () => {
    const res = await API.get("/auth/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchProjects();
    fetchTasks();
    fetchUsers();
  }, []);

  // ================= CREATE =================
  const createProject = async () => {
    if (!projectName) return alert("Enter project name");

    await API.post("/projects", { name: projectName });
    setProjectName("");
    fetchProjects();
  };

  const createTask = async () => {
    if (!taskTitle) return alert("Enter task");

    await API.post("/tasks", {
      title: taskTitle,
      assignedTo: selectedUser,
      dueDate,
    });

    setTaskTitle("");
    fetchTasks();
  };

  // ================= LOGIC =================
  const isOverdue = (date, status) => {
    return new Date(date) < new Date() && status !== "done";
  };

  // ================= UI =================
  return (
    <div style={styles.container}>
      <h1>📊 Dashboard</h1>

      {/* CREATE PROJECT (ADMIN ONLY) */}
      {user.role === "admin" && (
        <div style={styles.card}>
          <h3>Create Project</h3>

          <input
            placeholder="Project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            style={styles.input}
          />

          <button style={styles.button} onClick={createProject}>
            Create Project
          </button>
        </div>
      )}

      {/* TASK CREATE */}
      <div style={styles.card}>
        <h3>Create Task</h3>

        <input
          placeholder="Task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          style={styles.input}
        />

        {user.role === "admin" && (
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            style={styles.input}
          >
            <option value="">Assign User</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.email} ({u.role})
              </option>
            ))}
          </select>
        )}

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button} onClick={createTask}>
          Add Task
        </button>
      </div>

      {/* PROJECTS */}
      <div style={styles.card}>
        <h2>Projects</h2>
        {projects.map((p) => (
          <div key={p._id} style={styles.project}>
            {p.name}
          </div>
        ))}
      </div>

      {/* TASKS */}
      <div style={styles.card}>
        <h2>Tasks</h2>

        {tasks.map((t) => (
          <div
            key={t._id}
            style={{
              background: isOverdue(t.dueDate, t.status)
                ? "#ef4444"
                : "#334155",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "6px",
            }}
          >
            {t.title} - {t.status}
          </div>
        ))}
      </div>
    </div>
  );
}

// ================= STYLES =================
const styles = {
  container: {
    padding: "20px",
    background: "#0f172a",
    minHeight: "100vh",
    color: "#fff",
  },
  card: {
    background: "#1e293b",
    padding: "20px",
    margin: "20px 0",
    borderRadius: "10px",
  },
  input: {
    padding: "10px",
    margin: "10px",
    borderRadius: "6px",
    border: "none",
  },
  button: {
    padding: "10px",
    background: "#22c55e",
    border: "none",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },
  project: {
    background: "#334155",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
  },
};