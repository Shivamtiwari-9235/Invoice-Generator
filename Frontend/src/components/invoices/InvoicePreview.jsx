import { formatCurrency } from "../../utils/helpers";
import { formatDate } from "../../utils/dateFormatter";

const InvoicePreview = ({ invoice, client }) => {
  if (!invoice) {
    return null;
  }

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Invoice Preview</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">{invoice.invoiceNumber || "Draft"}</h3>
          <p className="mt-1 text-sm text-slate-500">{client?.clientName || invoice.clientName || "Select a client"}</p>
        </div>
        <div className="rounded-2xl bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
          {invoice.paymentStatus || "Pending"}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs text-slate-500">Service</p>
          <p className="mt-1 text-sm font-medium text-slate-900">{invoice.serviceDescription || "-"}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs text-slate-500">Due Date</p>
          <p className="mt-1 text-sm font-medium text-slate-900">{formatDate(invoice.dueDate)}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs text-slate-500">Amount</p>
          <p className="mt-1 text-sm font-medium text-slate-900">{formatCurrency(invoice.amount)}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs text-slate-500">GST</p>
          <p className="mt-1 text-sm font-medium text-slate-900">{invoice.gstPercentage || 0}%</p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;