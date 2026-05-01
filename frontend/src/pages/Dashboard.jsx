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
    <div style={{ padding: 20, color: "white" }}>
      <h1>Dashboard</h1>

      <h3>Create Project</h3>
      <input
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <button onClick={createProject}>Add</button>

      <h3>Projects</h3>
      {projects.map((p) => (
        <div key={p._id}>{p.title}</div>
      ))}

      <h3>Create Task</h3>

      <input
        placeholder="task"
        onChange={(e) => setTaskTitle(e.target.value)}
      />

      <select onChange={(e) => setSelectedProject(e.target.value)}>
        <option>Select Project</option>
        {projects.map((p) => (
          <option key={p._id} value={p._id}>
            {p.title}
          </option>
        ))}
      </select>

      <select onChange={(e) => setAssignedUser(e.target.value)}>
        <option>Assign User</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name}
          </option>
        ))}
      </select>

      <input type="date" onChange={(e) => setDate(e.target.value)} />

      <button onClick={createTask}>Add Task</button>

      <h3>Tasks</h3>

      {tasks.map((t) => (
        <div key={t._id}>
          <p>{t.title}</p>
          <p>User: {t.assignedTo?.name}</p>
          <p>Project: {t.project?.title}</p>
          <p>Status: {t.status}</p>
        </div>
      ))}
    </div>
  );
}