import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Seo from "../components/seo/Seo.jsx";
import Loader from "../components/common/Loader.jsx";
import SearchBar from "../components/common/SearchBar.jsx";
import PaymentStatusCards from "../components/payments/PaymentStatusCards.jsx";
import PaymentTable from "../components/payments/PaymentTable.jsx";
import { getPaidInvoices, getPendingInvoices, getOverdueInvoices } from "../services/payment.service";
import { sendReminder } from "../services/reminder.service";

const PaymentTracking = () => {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const loadPayments = async () => {
      setLoading(true);
      try {
        const [paidResponse, pendingResponse, overdueResponse] = await Promise.all([
          getPaidInvoices(),
          getPendingInvoices(),
          getOverdueInvoices(),
        ]);

        const merged = [
          ...(paidResponse.data?.invoices || []),
          ...(pendingResponse.data?.invoices || []),
          ...(overdueResponse.data?.invoices || []),
        ];

        const uniqueInvoices = Array.from(new Map(merged.map((invoice) => [invoice._id, invoice])).values());
        setInvoices(uniqueInvoices);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load payment tracking data");
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, []);

  const summary = useMemo(() => {
    return invoices.reduce(
      (accumulator, invoice) => {
        accumulator[invoice.paymentStatus] = (accumulator[invoice.paymentStatus] || 0) + 1;
        return accumulator;
      },
      { Paid: 0, Pending: 0, Overdue: 0 }
    );
  }, [invoices]);

  const filteredInvoices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return invoices.filter((invoice) => {
      const matchesStatus = statusFilter === "All" || invoice.paymentStatus === statusFilter;
      const searchableText = [invoice.invoiceNumber, invoice.client?.clientName, invoice.client?.email].filter(Boolean).join(" ").toLowerCase();
      return matchesStatus && (!query || searchableText.includes(query));
    });
  }, [invoices, search, statusFilter]);

  const handleReminder = async (invoice) => {
    try {
      await sendReminder(invoice._id);
      toast.success("Reminder sent successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reminder");
    }
  };

  return (
    <div className="grid gap-6">
      <Seo title="Payment Tracking" path="/app/payments" />

      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Payment tracking</h1>
        <p className="mt-1 text-sm text-slate-500">Track paid, pending, and overdue invoices with reminder support.</p>
      </div>

      <PaymentStatusCards stats={{ paid: summary.Paid, pending: summary.Pending, overdue: summary.Overdue }} />

      <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
        <SearchBar value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search payment records" />
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900"
        >
          {['All', 'Paid', 'Pending', 'Overdue'].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loader label="Loading payment data..." />
      ) : (
        <PaymentTable invoices={filteredInvoices} onReminder={handleReminder} />
      )}
    </div>
  );
};

export default PaymentTracking;