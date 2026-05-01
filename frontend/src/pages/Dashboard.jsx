import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [projectTitle, setProjectTitle] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [date, setDate] = useState("");

  // ✅ LOAD DATA
  useEffect(() => {
    fetchProjects();
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log("Project fetch error");
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log("Task fetch error");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/auth/users");
      setUsers(res.data);
    } catch (err) {
      console.log("User fetch error");
    }
  };

  // ✅ CREATE PROJECT
  const createProject = async () => {
    if (!projectTitle) return;

    try {
      await API.post("/projects", { title: projectTitle });
      setProjectTitle("");
      fetchProjects();
    } catch (err) {
      console.log("Project create error");
    }
  };

  // ✅ CREATE TASK
  const createTask = async () => {
    if (!taskTitle || !selectedProject) return;

    try {
      await API.post("/tasks", {
        title: taskTitle,
        project: selectedProject,
        assignedTo: assignedUser,
        dueDate: date,
      });

      setTaskTitle("");
      setAssignedUser("");
      setDate("");

      fetchTasks();
    } catch (err) {
      console.log("Task create error");
    }
  };

  return (
    <div style={styles.container}>
      <h1>🚀 Dashboard</h1>

      {/* 🔵 CREATE PROJECT */}
      <div style={styles.card}>
        <h2>➕ Create Project</h2>
        <div style={styles.row}>
          <input
            placeholder="Project name"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />
          <button onClick={createProject}>Add</button>
        </div>
      </div>

      {/* 🟡 PROJECT LIST */}
      <div style={styles.card}>
        <h2>📁 Projects</h2>
        {projects.map((p) => (
          <div key={p._id} style={styles.item}>
            {p.title}
          </div>
        ))}
      </div>

      {/* 🟢 CREATE TASK */}
      <div style={styles.card}>
        <h2>📝 Create Task</h2>

        <div style={styles.row}>
          <input
            placeholder="Task title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />

          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>

          {/* 👇 USER DROPDOWN */}
          <select
            value={assignedUser}
            onChange={(e) => setAssignedUser(e.target.value)}
          >
            <option value="">Assign User</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button onClick={createTask}>Add</button>
        </div>
      </div>

      {/* 🔴 TASK LIST */}
      <div style={styles.card}>
        <h2>📌 Tasks</h2>

        {tasks.length === 0 && <p>No tasks yet</p>}

        {tasks.map((task) => (
          <div key={task._id} style={styles.task}>
            <h4>{task.title}</h4>

            <p>👤 {task.assignedTo?.name || "Unassigned"}</p>
            <p>📁 {task.project?.title || "No Project"}</p>

            <p>
              Status:{" "}
              <span
                style={{
                  color:
                    task.status === "done"
                      ? "green"
                      : task.status === "doing"
                      ? "orange"
                      : "red",
                }}
              >
                {task.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 🎨 SIMPLE STYLES
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

  row: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  item: {
    background: "#334155",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "6px",
  },

  task: {
    background: "#334155",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
  },
};