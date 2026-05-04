import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
});

// Normalize errors so every page gets a plain string
api.interceptors.response.use(
  (response) => response,
  (err) => {
    const message =
      err.response?.data?.message || err.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export default api;
