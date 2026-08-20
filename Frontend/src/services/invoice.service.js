import api from "./api";

export const getInvoices = async () => api.get("/api/invoice");

export const getInvoiceById = async (id) => api.get(`/api/invoice/${id}`);

export const createInvoice = async (payload) => api.post("/api/invoice/create", payload);

export const updateInvoice = async (id, payload) => api.put(`/api/invoice/${id}`, payload);

export const deleteInvoice = async (id) => api.delete(`/api/invoice/${id}`);

export const downloadInvoicePdf = async (id) =>
  api.get(`/api/invoice/download-pdf/${id}`, { responseType: "blob" });