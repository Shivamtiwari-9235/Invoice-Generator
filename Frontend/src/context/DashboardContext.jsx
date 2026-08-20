import { createContext, useContext, useMemo, useState } from "react";
import { getDashboardStats } from "../services/dashboard.service";
import { getInvoices } from "../services/invoice.service";
import { getClients } from "../services/client.service";

const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState({
    stats: null,
    invoices: [],
    clients: [],
    loading: false,
  });

  const refreshDashboard = async () => {
    setDashboardData((previous) => ({ ...previous, loading: true }));

    const [statsResponse, invoicesResponse, clientsResponse] = await Promise.all([
      getDashboardStats(),
      getInvoices(),
      getClients(),
    ]);

    setDashboardData({
      stats: statsResponse.data,
      invoices: invoicesResponse.data?.invoices || [],
      clients: clientsResponse.data?.clients || [],
      loading: false,
    });
  };

  const value = useMemo(
    () => ({
      ...dashboardData,
      refreshDashboard,
      setDashboardData,
    }),
    [dashboardData]
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboardContext must be used inside DashboardProvider");
  }

  return context;
};

export default DashboardContext;