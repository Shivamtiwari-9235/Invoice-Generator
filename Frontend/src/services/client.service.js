import api from "./api";

export const getClients = async () => api.get("/api/client/all-clients");

export const getClientById = async (id) => api.get(`/api/client/${id}`);

export const createClient = async (payload) => api.post("/api/client/add-client", payload);

export const updateClient = async (id, payload) => api.put(`/api/client/${id}`, payload);

export const deleteClient = async (id) => api.delete(`/api/client/${id}`);