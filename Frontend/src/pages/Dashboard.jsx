import { useEffect, useMemo, useState } from "react";
import { BadgeIndianRupee, Users, ReceiptText, Wallet, CircleDollarSign } from "lucide-react";
import Seo from "../components/seo/Seo.jsx";
import Loader from "../components/common/Loader.jsx";
import StatCard from "../components/dashboard/StatCard.jsx";
import RecentInvoices from "../components/dashboard/RecentInvoices.jsx";
import RevenueChart from "../components/dashboard/RevenueChart.jsx";
import { useDashboardContext } from "../context/DashboardContext.jsx";
import { buildMonthlySeries, formatCurrency } from "../utils/helpers";
import { getInvoices } from "../services/invoice.service";
import { getClients } from "../services/client.service";
import { getDashboardStats } from "../services/dashboard.service";
import { downloadInvoicePdf } from "../services/invoice.service";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const { stats, invoices, clients, setDashboardData } = useDashboardContext();
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
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
        setLoadError("");
      } catch (error) {
        const message = error.response?.data?.message || error.message || "Failed to load dashboard";
        setLoadError(message);
        toast.error(message.includes("Network Error") ? "Backend is unavailable. Start the API server and reload." : message);
        setDashboardData((previous) => ({
          ...previous,
          stats: null,
          invoices: [],
          clients: [],
          loading: false,
        }));
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [setDashboardData]);

  const recentInvoices = useMemo(
    () => [...(invoices || [])].sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt)).slice(0, 5),
    [invoices]
  );

  const revenueSeries = useMemo(() => buildMonthlySeries(invoices || []), [invoices]);

  const handleDownload = async (invoice) => {
    try {
      const response = await downloadInvoicePdf(invoice._id);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${invoice.invoiceNumber}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
      toast.success("PDF downloaded successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to download PDF");
    }
  };

  if (loading) {
    return <Loader label="Loading dashboard data..." />;
  }

  const dashboardStats = stats || {};

  return (
    <div className="grid gap-6">
      <Seo title="Dashboard" path="/app" />

      {loadError ? (
        <div className="rounded-[24px] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          Dashboard data could not be loaded. {loadError}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Total Revenue" value={formatCurrency(dashboardStats.totalRevenue || 0)} icon={BadgeIndianRupee} tone="emerald" />
        <StatCard title="Total Clients" value={clients?.length || 0} icon={Users} tone="indigo" />
        <StatCard title="Total Invoices" value={dashboardStats.totalInvoices || invoices?.length || 0} icon={ReceiptText} tone="slate" />
        <StatCard title="Paid Invoices" value={dashboardStats.paidInvoices || 0} icon={CircleDollarSign} tone="emerald" />
        <StatCard title="Pending Invoices" value={dashboardStats.pendingInvoices || 0} icon={Wallet} tone="amber" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <RevenueChart
          data={revenueSeries.map((item) => ({
            label: item.label,
            value: item.value,
          }))}
        />
        <div className="soft-card rounded-[28px] p-6">
          <h3 className="text-lg font-semibold text-slate-900">Quick actions</h3>
          <div className="mt-5 grid gap-3 text-sm text-slate-600">
            <div className="rounded-2xl bg-slate-50 p-4">Create a new client to keep invoice data organized.</div>
            <div className="rounded-2xl bg-slate-50 p-4">Use AI prompts to draft invoices faster.</div>
            <div className="rounded-2xl bg-slate-50 p-4">Mark invoices paid to keep analytics accurate.</div>
          </div>
        </div>
      </div>

      <RecentInvoices
        invoices={recentInvoices}
        onDownload={handleDownload}
        onView={(invoice) => toast.success(`Open invoice ${invoice.invoiceNumber} from Invoice History`)}
      />
    </div>
  );
};

export default Dashboard;