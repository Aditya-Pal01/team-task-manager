import axios from "axios";

const API = axios.create({
  baseURL: "https://considerate-purpose-production-2082.up.railway.app/api"
});

// 🔥 TOKEN AUTO ADD
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;