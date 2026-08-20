import { formatDate } from "./dateFormatter";
import { calculateGST } from "./gstCalculator";

export const cn = (...classes) => classes.filter(Boolean).join(" ");

export const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

export const getInitials = (value = "") =>
  value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

export const getStatusTone = (status = "Pending") => {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "paid") {
    return "success";
  }

  if (normalizedStatus === "overdue") {
    return "danger";
  }

  return "warning";
};

export const normalizeString = (value = "") => value.toString().trim().toLowerCase();

export const matchClientByName = (clients = [], clientName = "") => {
  const target = normalizeString(clientName);

  return clients.find((client) => normalizeString(client.clientName) === target) || null;
};

export const buildMonthlySeries = (items = [], amountKey = "totalAmount") => {
  const series = Array.from({ length: 12 }, (_, monthIndex) => ({
    month: monthIndex,
    label: formatDate(new Date(2026, monthIndex, 1), { month: "short" }),
    value: 0,
  }));

  items.forEach((item) => {
    const date = new Date(item.createdAt || item.issueDate || item.dueDate || Date.now());
    const monthIndex = date.getMonth();
    series[monthIndex].value += Number(item[amountKey] || 0);
  });

  return series;
};

export const getInvoiceGSTSummary = (invoice = {}) =>
  calculateGST(invoice.amount, invoice.gstPercentage);