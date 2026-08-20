import { useEffect, useMemo, useState } from "react";
import Seo from "../components/seo/Seo.jsx";
import Loader from "../components/common/Loader.jsx";
import RevenueChart from "../components/analytics/RevenueGraph.jsx";
import InvoiceGraph from "../components/analytics/InvoiceGraph.jsx";
import PaymentGraph from "../components/analytics/PaymentGraph.jsx";
import ClientAnalytics from "../components/analytics/ClientAnalytics.jsx";
import { getInvoices } from "../services/invoice.service";
import { getClients } from "../services/client.service";
import { buildMonthlySeries } from "../utils/helpers";
import { MONTHS } from "../utils/constants";
import toast from "react-hot-toast";

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const [invoicesResponse, clientsResponse] = await Promise.all([getInvoices(), getClients()]);
        setInvoices(invoicesResponse.data?.invoices || []);
        setClients(clientsResponse.data?.clients || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  const monthlyRevenue = useMemo(() => buildMonthlySeries(invoices, "totalAmount"), [invoices]);

  const monthlyInvoices = useMemo(() => {
    const series = Array.from({ length: 12 }, (_, monthIndex) => ({ label: MONTHS[monthIndex], value: 0 }));

    invoices.forEach((invoice) => {
      const monthIndex = new Date(invoice.createdAt || Date.now()).getMonth();
      series[monthIndex].value += 1;
    });

    return series;
  }, [invoices]);

  const paymentStatusData = useMemo(() => {
    const counts = invoices.reduce(
      (accumulator, invoice) => {
        accumulator[invoice.paymentStatus] = (accumulator[invoice.paymentStatus] || 0) + 1;
        return accumulator;
      },
      { Paid: 0, Pending: 0, Overdue: 0 }
    );

    return [
      { name: "Paid", value: counts.Paid },
      { name: "Pending", value: counts.Pending },
      { name: "Overdue", value: counts.Overdue },
    ];
  }, [invoices]);

  const clientAnalytics = useMemo(() => {
    return clients.map((client) => ({
      name: client.clientName,
      value: invoices.filter((invoice) => String(invoice.client?._id) === String(client._id)).length || 1,
    }));
  }, [clients, invoices]);

  if (loading) {
    return <Loader label="Loading analytics..." />;
  }

  return (
    <div className="grid gap-6">
      <Seo title="Analytics" path="/app/analytics" />

      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">Visual insights derived from invoices and clients using Recharts.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <RevenueChart data={monthlyRevenue.map((item) => ({ label: item.label, value: item.value }))} />
        <InvoiceGraph data={monthlyInvoices} />
        <PaymentGraph data={paymentStatusData} />
        <ClientAnalytics data={clientAnalytics.length ? clientAnalytics : [{ name: "No clients", value: 1 }]} />
      </div>
    </div>
  );
};

export default Analytics;