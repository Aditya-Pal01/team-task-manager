import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed ❌");
    }
  };

  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        <h2 style={styles.title}>🚀 Welcome Back</h2>

        <input
          placeholder="Email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} style={styles.btn}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  bg: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },

  card: {
    backdropFilter: "blur(15px)",
    background: "rgba(255,255,255,0.1)",
    padding: "40px",
    borderRadius: "15px",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    color: "white",
  },

  title: {
    textAlign: "center",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
  },

  btn: {
    padding: "10px",
    background: "#6366f1",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
  },
};