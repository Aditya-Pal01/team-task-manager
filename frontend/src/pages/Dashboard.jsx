import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    const p = await API.get("/projects");
    const t = await API.get("/tasks");

    setProjects(p.data);
    setTasks(t.data);
    setLoading(false);
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

  if (loading) {
    return <div style={styles.loader}>⏳ Loading...</div>;
  }

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2>🚀 TM</h2>
        <p>Dashboard</p>
        <p>Projects</p>
        <p>Tasks</p>
      </div>

      {/* Main */}
      <div style={styles.main}>
        <h1>Dashboard</h1>

        {/* CREATE PROJECT */}
        <div style={styles.card}>
          <h3>➕ Create Project</h3>

          <div style={styles.row}>
            <input
              placeholder="Project name"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              style={styles.input}
            />
            <button onClick={createProject} style={styles.btn}>
              Add
            </button>
          </div>
        </div>

        {/* PROJECT LIST */}
        <div style={styles.card}>
          <h3>📁 Projects</h3>

          <div style={styles.grid}>
            {projects.map((p) => (
              <div key={p._id} style={styles.project}>
                {p.name}
              </div>
            ))}
          </div>
        </div>

        {/* CREATE TASK */}
        <div style={styles.card}>
          <h3>📝 Create Task</h3>

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

            <button onClick={createTask} style={styles.btn}>
              Add
            </button>
          </div>
        </div>

        {/* TASK LIST */}
        <div style={styles.card}>
          <h3>📌 Tasks</h3>

          <div style={styles.grid}>
            {tasks.map((t) => {
              const overdue = new Date(t.dueDate) < new Date();

              return (
                <div
                  key={t._id}
                  style={{
                    ...styles.task,
                    border: overdue ? "2px solid red" : "none",
                  }}
                >
                  <b>{t.title}</b>
                  <p>{t.projectId?.name}</p>
                  <small>{t.dueDate?.slice(0, 10)}</small>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    fontFamily: "sans-serif",
  },

  sidebar: {
    width: "200px",
    background: "#1e293b",
    padding: "20px",
  },

  main: {
    flex: 1,
    padding: "20px",
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

  btn: {
    background: "#6366f1",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "10px",
  },

  project: {
    background: "#334155",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
  },

  task: {
    background: "#334155",
    padding: "10px",
    borderRadius: "8px",
  },

  loader: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
  },
};