import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  const fetchUsers = async () => {
    const res = await api.get("/tasks/users");
    setUsers(res.data);
  };

  const fetchTasks = async (id) => {
    setSelectedProject(id);
    const res = await api.get(`/tasks/${id}`);
    setTasks(res.data);
  };

  const createTask = async () => {
    if (!taskTitle) return alert("Enter task");

    await api.post("/tasks", {
      title: taskTitle,
      projectId: selectedProject,
      assignedTo,
      dueDate,
    });

    setTaskTitle("");
    setAssignedTo("");
    setDueDate("");
    fetchTasks(selectedProject);
  };

  const updateTask = async (id, status) => {
    await api.put(`/tasks/${id}`, { status });
    fetchTasks(selectedProject);
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🚀 Dashboard</h1>

        <button style={styles.logout} onClick={logout}>
          Logout
        </button>

        <h2>📁 Projects</h2>

        <div style={styles.projectList}>
          {projects.map((p) => (
            <button
              key={p._id}
              style={styles.projectBtn}
              onClick={() => fetchTasks(p._id)}
            >
              {p.title}
            </button>
          ))}
        </div>

        {selectedProject && (
          <>
            <h2>✅ Tasks</h2>

            <div style={styles.inputRow}>
              <input
                style={styles.input}
                placeholder="Task title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />

              <select
                style={styles.input}
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              >
                <option value="">Assign</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
              </select>

              <input
                style={styles.input}
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />

              <button style={styles.addBtn} onClick={createTask}>
                Add
              </button>
            </div>

            {tasks.map((t) => {
              const isOverdue =
                t.dueDate && new Date(t.dueDate) < new Date();

              return (
                <div key={t._id} style={styles.taskCard}>
                  <div>
                    <strong>{t.title}</strong>
                    <p>👤 {t.assignedTo?.name || "Unassigned"}</p>
                    <p>📅 {t.dueDate?.slice(0, 10)}</p>
                    {isOverdue && (
                      <span style={styles.overdue}>Overdue</span>
                    )}
                  </div>

                  <div>
                    <button onClick={() => updateTask(t._id, "todo")}>
                      Todo
                    </button>
                    <button
                      onClick={() =>
                        updateTask(t._id, "in-progress")
                      }
                    >
                      Progress
                    </button>
                    <button onClick={() => updateTask(t._id, "done")}>
                      Done
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

// 🎨 STYLES
const styles = {
  container: {
    background: "#0f172a",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },

  card: {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "15px",
    width: "600px",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
  },

  title: {
    textAlign: "center",
  },

  logout: {
    float: "right",
    background: "#ef4444",
    border: "none",
    padding: "6px 12px",
    color: "white",
    borderRadius: "5px",
  },

  projectList: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  projectBtn: {
    background: "#3b82f6",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
  },

  inputRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },

  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "none",
  },

  addBtn: {
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
  },

  taskCard: {
    background: "#334155",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
  },

  overdue: {
    color: "red",
    fontWeight: "bold",
  },
};