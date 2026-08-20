import Button from "../common/Button.jsx";
import EmptyState from "../common/EmptyState.jsx";
import { formatCurrency } from "../../utils/helpers";
import { formatDate } from "../../utils/dateFormatter";

const InvoiceTable = ({ invoices = [], onView, onDelete, onMarkPaid, onMarkPending, onDownload, onReminder }) => {
  if (!invoices.length) {
    return (
      <EmptyState
        title="No invoices found"
        description="Create your first invoice or clear the current search and filters."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">Invoice</th>
              <th className="px-6 py-4 font-medium">Client</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Due Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {invoices.map((invoice) => (
              <tr key={invoice._id}>
                <td className="px-6 py-4 font-medium text-slate-900">{invoice.invoiceNumber}</td>
                <td className="px-6 py-4 text-slate-600">{invoice.client?.clientName || "-"}</td>
                <td className="px-6 py-4 text-slate-600">{formatCurrency(invoice.totalAmount)}</td>
                <td className="px-6 py-4 text-slate-600">{formatDate(invoice.dueDate)}</td>
                <td className="px-6 py-4 text-slate-600">{invoice.paymentStatus}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => onView?.(invoice)}>
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onDownload?.(invoice)}>
                      PDF
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onMarkPaid?.(invoice)}>
                      Paid
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onMarkPending?.(invoice)}>
                      Pending
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onReminder?.(invoice)}>
                      Reminder
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => onDelete?.(invoice)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;