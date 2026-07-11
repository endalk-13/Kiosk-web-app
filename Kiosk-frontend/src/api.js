import axios from "axios";

// In dev this will falls back to the local Spring Boot server.
// note: In production (Vercel), set VITE_API_BASE_URL to wherever the backend is hosted.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});

export default api;