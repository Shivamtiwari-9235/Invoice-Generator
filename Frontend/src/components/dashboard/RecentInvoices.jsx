import { Eye, Download } from "lucide-react";
import { formatCurrency } from "../../utils/helpers";
import { formatDate } from "../../utils/dateFormatter";
import Button from "../common/Button.jsx";
import EmptyState from "../common/EmptyState.jsx";

const RecentInvoices = ({ invoices = [], onView, onDownload }) => {
  if (!invoices.length) {
    return (
      <EmptyState
        title="No recent invoices yet"
        description="Once invoices are created, they will appear here with their payment status and due dates."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-6 py-5">
        <h3 className="text-lg font-semibold text-slate-900">Recent invoices</h3>
      </div>
      <div className="divide-y divide-slate-200">
        {invoices.map((invoice) => (
          <div key={invoice._id} className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">{invoice.invoiceNumber}</p>
              <p className="mt-1 text-sm text-slate-500">{invoice.client?.clientName || "No client"}</p>
              <p className="mt-1 text-xs text-slate-400">Due {formatDate(invoice.dueDate)}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">{formatCurrency(invoice.totalAmount)}</p>
                <p className="text-xs text-slate-500">{invoice.paymentStatus}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => onView?.(invoice)}>
                <Eye size={16} />
              </Button>
              <Button variant="outline" size="sm" onClick={() => onDownload?.(invoice)}>
                <Download size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentInvoices;