import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [newProject, setNewProject] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    projectId: "",
    dueDate: "",
  });

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
    if (!newProject) return;
    await API.post("/projects", { name: newProject });
    setNewProject("");
    fetchData();
  };

  const createTask = async () => {
    await API.post("/tasks", newTask);
    fetchData();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚀 Dashboard</h1>

      {/* PROJECT */}
      <div style={styles.card}>
        <h2>Create Project</h2>

        <div style={styles.row}>
          <input
            placeholder="Project name"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            style={styles.input}
          />
          <button onClick={createProject} style={styles.button}>
            Add
          </button>
        </div>
      </div>

      {/* PROJECT LIST */}
      <div style={styles.card}>
        <h2>Projects</h2>

        <div style={styles.grid}>
          {projects.map((p) => (
            <div key={p._id} style={styles.projectCard}>
              {p.name}
            </div>
          ))}
        </div>
      </div>

      {/* TASK */}
      <div style={styles.card}>
        <h2>Create Task</h2>

        <div style={styles.row}>
          <input
            placeholder="Task title"
            onChange={(e) =>
              setNewTask({ ...newTask, title: e.target.value })
            }
            style={styles.input}
          />

          <select
            onChange={(e) =>
              setNewTask({ ...newTask, projectId: e.target.value })
            }
            style={styles.input}
          >
            <option>Select Project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })
            }
            style={styles.input}
          />

          <button onClick={createTask} style={styles.button}>
            Add
          </button>
        </div>
      </div>

      {/* TASK LIST */}
      <div style={styles.card}>
        <h2>Tasks</h2>

        <div style={styles.grid}>
          {tasks.map((t) => {
            const overdue = new Date(t.dueDate) < new Date();

            return (
              <div
                key={t._id}
                style={{
                  ...styles.taskCard,
                  border: overdue ? "2px solid red" : "none",
                }}
              >
                <h3>{t.title}</h3>
                <p>{t.projectId?.name}</p>
                <small>{t.dueDate?.slice(0, 10)}</small>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#0f172a",
    minHeight: "100vh",
    padding: "40px",
    color: "white",
    fontFamily: "sans-serif",
  },

  title: {
    textAlign: "center",
    marginBottom: "30px",
  },

  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  row: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    flex: 1,
  },

  button: {
    background: "#6366f1",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "10px",
  },

  projectCard: {
    background: "#334155",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
  },

  taskCard: {
    background: "#334155",
    padding: "10px",
    borderRadius: "8px",
  },
};