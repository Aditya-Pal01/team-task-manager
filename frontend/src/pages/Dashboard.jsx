import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [newProject, setNewProject] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    projectId: "",
    dueDate: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const p = await API.get("/projects");
    const t = await API.get("/tasks");

    setProjects(p.data);   // ✅ important
    setTasks(t.data);
  };

  const createProject = async () => {
    if (!newProject) return;

    await API.post("/projects", { name: newProject }); // ✅ name match
    setNewProject("");
    fetchData();
  };

  const createTask = async () => {
    await API.post("/tasks", newTask);
    fetchData();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Dashboard</h1>

      {/* Create Project */}
      <div>
        <h3>Create Project</h3>
        <input
          placeholder="Project name"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
        />
        <button onClick={createProject}>Add Project</button>
      </div>

      {/* Projects List */}
      <div>
        <h3>Projects</h3>
        {projects.length === 0 ? (
          <p>No projects</p>
        ) : (
          projects.map((p) => (
            <div key={p._id}>{p.name}</div>
          ))
        )}
      </div>

      {/* Create Task */}
      <div>
        <h3>Create Task</h3>

        <input
          placeholder="Task title"
          onChange={(e) =>
            setNewTask({ ...newTask, title: e.target.value })
          }
        />

        <select
          onChange={(e) =>
            setNewTask({ ...newTask, projectId: e.target.value })
          }
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
        />

        <button onClick={createTask}>Add Task</button>
      </div>

      {/* Task List */}
      <div>
        <h3>Tasks</h3>
        {tasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          tasks.map((t) => (
            <div key={t._id}>
              <b>{t.title}</b>
              <p>{t.projectId?.name}</p>
              <p>{t.dueDate?.slice(0, 10)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}