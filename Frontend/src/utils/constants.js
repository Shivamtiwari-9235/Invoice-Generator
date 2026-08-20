export const APP_NAME = "Invoice Generator";
export const APP_TAGLINE = "Simple invoicing for freelancers";

export const AUTH_STORAGE_KEY = "invoice-generator-auth";
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const SIDEBAR_ITEMS = [
  { label: "Dashboard", path: "/app", icon: "layout-dashboard" },
  { label: "Clients", path: "/app/clients", icon: "users" },
  { label: "Create Invoice", path: "/app/create-invoice", icon: "file-plus" },
  { label: "Invoice History", path: "/app/invoices", icon: "receipt-text" },
  { label: "Payment Tracking", path: "/app/payments", icon: "wallet" },
  { label: "AI Generator", path: "/app/ai", icon: "sparkles" },
  { label: "Analytics", path: "/app/analytics", icon: "chart-column" },
];

export const PAYMENT_FILTER_OPTIONS = ["All", "Paid", "Pending", "Overdue"];

export const INVOICE_STATUS_OPTIONS = ["All", "Paid", "Pending", "Overdue"];

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];