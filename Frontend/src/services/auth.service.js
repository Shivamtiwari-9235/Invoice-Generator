import api from "./api";

export const loginUser = async (payload) => api.post("/api/auth/login", payload);

export const registerUser = async (payload) => api.post("/api/auth/register", payload);