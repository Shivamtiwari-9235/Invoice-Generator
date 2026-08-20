import api from "./api";

export const markInvoiceAsPaid = async (id) => api.put(`/api/payment/paid/${id}`);

export const markInvoiceAsPending = async (id) => api.put(`/api/payment/pending/${id}`);

export const getPaidInvoices = async () => api.get("/api/payment/paid");

export const getPendingInvoices = async () => api.get("/api/payment/pending");

export const getOverdueInvoices = async () => api.get("/api/payment/overdue");