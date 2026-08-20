import api from "./api";

export const getDashboardStats = async () => api.get("/api/dashboard/stats");