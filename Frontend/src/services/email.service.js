import api from "./api";

export const sendEmail = async (payload) => api.post("/api/email/send", payload);