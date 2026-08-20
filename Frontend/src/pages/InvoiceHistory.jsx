import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Seo from "../components/seo/Seo.jsx";
import SearchBar from "../components/common/SearchBar.jsx";
import Button from "../components/common/Button.jsx";
import Loader from "../components/common/Loader.jsx";
import ConfirmDialog from "../components/common/ConfirmDialog.jsx";
import Modal from "../components/common/Modal.jsx";
import InvoicePreview from "../components/invoices/InvoicePreview.jsx";
import InvoiceTable from "../components/invoices/InvoiceTable.jsx";
import { deleteInvoice, downloadInvoicePdf, getInvoices, updateInvoice } from "../services/invoice.service";
import { markInvoiceAsPaid, markInvoiceAsPending } from "../services/payment.service";
import { sendReminder } from "../services/reminder.service";
import { PAYMENT_FILTER_OPTIONS } from "../utils/constants";
import { formatCurrency } from "../utils/helpers";

const InvoiceHistory = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadInvoices = async () => {
    setLoading(true);
    try {
      const response = await getInvoices();
      setInvoices(response.data?.invoices || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load invoices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const filteredInvoices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return invoices.filter((invoice) => {
      const matchesStatus = statusFilter === "All" || invoice.paymentStatus === statusFilter;
      const searchableText = [
        invoice.invoiceNumber,
        invoice.client?.clientName,
        invoice.client?.email,
        invoice.serviceDescription,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesStatus && (!query || searchableText.includes(query));
    });
  }, [invoices, search, statusFilter]);

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

  const handlePaymentState = async (invoice, action) => {
    try {
      if (action === "paid") {
        await markInvoiceAsPaid(invoice._id);
      } else {
        await markInvoiceAsPending(invoice._id);
      }

      toast.success(`Invoice marked as ${action}`);
      await loadInvoices();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update payment status");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteInvoice(deleteTarget._id);
      toast.success("Invoice deleted successfully");
      setDeleteTarget(null);
      await loadInvoices();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete invoice");
    }
  };

  const handleReminder = async (invoice) => {
    try {
      await sendReminder(invoice._id);
      toast.success("Reminder email sent successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reminder");
    }
  };

  return (
    <div className="grid gap-6">
      <Seo title="Invoice History" path="/app/invoices" />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Invoice history</h1>
          <p className="mt-1 text-sm text-slate-500">Search invoices, update status, download PDFs, and send reminders.</p>
        </div>
        <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-600 shadow-sm ring-1 ring-slate-200">
          Total shown: <span className="font-semibold text-slate-900">{filteredInvoices.length}</span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
        <SearchBar value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by invoice number or client" />
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900"
        >
          {PAYMENT_FILTER_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loader label="Loading invoice history..." />
      ) : (
        <InvoiceTable
          invoices={filteredInvoices}
          onView={(invoice) => setSelectedInvoice(invoice)}
          onDownload={handleDownload}
          onMarkPaid={(invoice) => handlePaymentState(invoice, "paid")}
          onMarkPending={(invoice) => handlePaymentState(invoice, "pending")}
          onDelete={(invoice) => setDeleteTarget(invoice)}
          onReminder={handleReminder}
        />
      )}

      <Modal
        open={Boolean(selectedInvoice)}
        title={selectedInvoice?.invoiceNumber || "Invoice"}
        description="Full invoice preview and details"
        onClose={() => setSelectedInvoice(null)}
        size="xl"
      >
        {selectedInvoice ? (
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <InvoicePreview invoice={selectedInvoice} client={selectedInvoice.client} />
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">Invoice actions</h3>
              <p className="mt-2 text-sm text-slate-500">You can update payment state, send reminders, or download the PDF.
              </p>
              <div className="mt-5 grid gap-3">
                <Button onClick={() => handlePaymentState(selectedInvoice, "paid")}>Mark Paid</Button>
                <Button variant="outline" onClick={() => handlePaymentState(selectedInvoice, "pending")}>Mark Pending</Button>
                <Button variant="outline" onClick={() => handleReminder(selectedInvoice)}>Send Reminder</Button>
                <Button variant="outline" onClick={() => handleDownload(selectedInvoice)}>Download PDF</Button>
              </div>
              <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Total amount</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{formatCurrency(selectedInvoice.totalAmount)}</p>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete invoice"
        description="This invoice will be removed from the dashboard and history."
        confirmLabel="Delete"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default InvoiceHistory;