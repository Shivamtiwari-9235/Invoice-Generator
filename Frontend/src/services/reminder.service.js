import api from "./api";

export const sendReminder = async (payloadOrId) => {
  if (typeof payloadOrId === "string" || typeof payloadOrId === "number") {
    return api.post(`/api/reminder/send/${payloadOrId}`);
  }

  return api.post("/api/reminder/send", payloadOrId);
};