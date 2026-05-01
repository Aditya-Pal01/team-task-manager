import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-manager-production-f529.up.railway.app/api"
  // ⚠️ apna backend URL yaha daalo
});

export default API;