import axios from "axios";

const API = axios.create({
  baseURL: "https://considerate-purpose-production-2082.up.railway.app/api"
});

export default API;