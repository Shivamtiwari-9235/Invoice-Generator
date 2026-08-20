import api from "./api";

export const generateInvoiceData = async (payload) =>
  api.post("/api/ai/generate-invoice-data", payload);