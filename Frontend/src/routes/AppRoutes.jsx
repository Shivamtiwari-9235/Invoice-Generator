import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "../components/common/Loader.jsx";
import PublicRoute from "./PublicRoute.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";

const Landing = lazy(() => import("../pages/Landing.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const Register = lazy(() => import("../pages/Register.jsx"));
const Dashboard = lazy(() => import("../pages/Dashboard.jsx"));
const Clients = lazy(() => import("../pages/Clients.jsx"));
const CreateInvoice = lazy(() => import("../pages/CreateInvoice.jsx"));
const InvoiceHistory = lazy(() => import("../pages/InvoiceHistory.jsx"));
const PaymentTracking = lazy(() => import("../pages/PaymentTracking.jsx"));
const AIInvoiceGenerator = lazy(() => import("../pages/AIInvoiceGenerator.jsx"));
const Analytics = lazy(() => import("../pages/Analytics.jsx"));
const NotFound = lazy(() => import("../pages/NotFound.jsx"));

const AppRoutes = () => (
  <Suspense fallback={<Loader label="Loading page..." />}>
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Landing />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="create-invoice" element={<CreateInvoice />} />
          <Route path="invoices" element={<InvoiceHistory />} />
          <Route path="payments" element={<PaymentTracking />} />
          <Route path="ai" element={<AIInvoiceGenerator />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Route>

      <Route path="/dashboard" element={<Navigate to="/app" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;