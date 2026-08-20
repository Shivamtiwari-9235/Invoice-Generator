import { Sparkles, CheckCircle2 } from "lucide-react";
import Button from "../common/Button.jsx";
import { formatCurrency } from "../../utils/helpers";

const AIResultCard = ({ result, client, onCreateInvoice, loading }) => {
  if (!result) {
    return null;
  }

  return (
    <div className="soft-card rounded-[28px] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            <Sparkles size={14} />
            AI Result
          </div>
          <h3 className="mt-4 text-xl font-semibold text-slate-900">{result.clientName || "Suggested Client"}</h3>
          <p className="mt-1 text-sm text-slate-500">{result.serviceDescription || "Service details generated from prompt."}</p>
        </div>

        <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
          {client ? (
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={16} />
              Matched client
            </span>
          ) : (
            "No matched client"
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs text-slate-500">Amount</p>
          <p className="mt-1 text-base font-semibold text-slate-900">{formatCurrency(result.amount)}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs text-slate-500">GST</p>
          <p className="mt-1 text-base font-semibold text-slate-900">{result.gstPercentage || 0}%</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
          <p className="text-xs text-slate-500">Due Date</p>
          <p className="mt-1 text-base font-semibold text-slate-900">{result.dueDate || "-"}</p>
        </div>
      </div>

      <Button className="mt-6 w-full" disabled={loading || !client} onClick={onCreateInvoice}>
        {loading ? "Creating..." : client ? "Create Invoice Now" : "Select a matching client first"}
      </Button>
    </div>
  );
};

export default AIResultCard;