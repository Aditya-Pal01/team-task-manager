import { useEffect, useState } from "react";
import API from "../api";
import { getUser } from "../utils/getUser";

export default function Dashboard() {
  const user = getUser();

  const [dark, setDark] = useState(false);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [newProject, setNewProject] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    projectId: "",
    assignedTo: "",
    dueDate: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const p = await API.get("/projects");
    const t = await API.get("/tasks");
    const u = await API.get("/auth/users");

    setProjects(p.data);
    setTasks(t.data);
    setUsers(u.data);
  };

  const createProject = async () => {
    await API.post("/projects", { name: newProject });
    setNewProject("");
    fetchData();
  };

  const createTask = async () => {
    await API.post("/tasks", newTask);
    fetchData();
  };

  const toggleStatus = async (task) => {
    await API.put(`/tasks/${task._id}`, {
      status: task.status === "done" ? "pending" : "done",
    });
    fetchData();
  };

  return (
    <div style={dark ? styles.darkContainer : styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2>🚀 Task Manager</h2>
        <p>{user?.role === "admin" ? "Admin Panel" : "Member Panel"}</p>

        <button onClick={() => setDark(!dark)} style={styles.toggle}>
          🌙 Toggle Mode
        </button>
      </div>

      {/* Main */}
      <div style={styles.main}>
        <h1>Dashboard</h1>

        {/* Stats */}
        <div style={styles.stats}>
          <Card title="Projects" value={projects.length} />
          <Card title="Tasks" value={tasks.length} />
          <Card
            title="Overdue"
            value={tasks.filter((t) => new Date(t.dueDate) < new Date()).length}
          />
        </div>

        {/* ADMIN ONLY */}
        {user?.role === "admin" && (
          <>
            {/* Create Project */}
            <div style={styles.card}>
              <h3>Create Project</h3>
              <input
                placeholder="Project name"
                value={newProject}
                onChange={(e) => setNewProject(e.target.value)}
                style={styles.input}
              />
              <button onClick={createProject} style={styles.btn}>
                Add Project
              </button>
            </div>

            {/* Create Task */}
            <div style={styles.card}>
              <h3>Create Task</h3>

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

              <select
                onChange={(e) =>
                  setNewTask({ ...newTask, assignedTo: e.target.value })
                }
                style={styles.input}
              >
                <option>Assign User</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.email}
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
                Add Task
              </button>
            </div>
          </>
        )}

        {/* Tasks */}
        <div style={styles.card}>
          <h3>Tasks</h3>

          {tasks.map((t) => {
            const overdue = new Date(t.dueDate) < new Date();

            return (
              <div
                key={t._id}
                style={{
                  ...styles.task,
                  background: overdue ? "#ffdddd" : "#e2e8f0",
                }}
              >
                <b>{t.title}</b>
                <p>{t.assignedTo?.email}</p>
                <p>{t.dueDate?.slice(0, 10)}</p>

                <button
                  onClick={() => toggleStatus(t)}
                  style={{
                    background:
                      t.status === "done" ? "green" : "orange",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "6px",
                  }}
                >
                  {t.status === "done" ? "Done ✔" : "Pending"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={styles.statCard}>
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}

/* Styles */
const styles = {
  container: { display: "flex", minHeight: "100vh", background: "#f8fafc" },
  darkContainer: {
    display: "flex",
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
  },
  sidebar: {
    width: "220px",
    background: "#1e293b",
    color: "white",
    padding: "20px",
  },
  main: { flex: 1, padding: "20px" },
  stats: { display: "flex", gap: "20px", marginBottom: "20px" },
  statCard: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    flex: 1,
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
  },
  btn: {
    background: "#6366f1",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
  },
  task: {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
  },
  toggle: {
    marginTop: "20px",
    padding: "8px",
    borderRadius: "8px",
    background: "#6366f1",
    color: "white",
  },
};