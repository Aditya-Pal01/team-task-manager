import { useEffect, useState } from "react";
import API from "../api";

const Dashboard = () => {
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);

  // ✅ Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ Create project
  const createProject = async () => {
    if (!projectName.trim()) {
      alert("Enter project name");
      return;
    }

    try {
      await API.post("/projects", {
        title: projectName,
      });

      setProjectName("");
      fetchProjects();

    } catch (err) {
      console.log("Create error:", err);
      alert("Project create failed");
    }
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>🚀 Dashboard</h1>

      {/* CREATE PROJECT */}
      <div style={{ marginBottom: "20px" }}>
        <h3>➕ Create Project</h3>

        <input
          type="text"
          placeholder="Project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <button onClick={createProject}>Add</button>
      </div>

      {/* PROJECT LIST */}
      <div>
        <h3>📁 Projects</h3>

        {projects.length === 0 ? (
          <p>No projects yet</p>
        ) : (
          projects.map((p) => (
            <div
              key={p._id}
              style={{
                background: "#1e293b",
                margin: "10px",
                padding: "10px",
                borderRadius: "8px"
              }}
            >
              {p.title}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;