import { calculateGST } from "../../utils/gstCalculator";
import { formatCurrency } from "../../utils/helpers";

const GSTCalculator = ({ amount, gstPercentage }) => {
  const { gstAmount, totalAmount } = calculateGST(amount, gstPercentage);

  return (
    <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
      <h3 className="text-sm font-semibold text-slate-900">GST summary</h3>
      <div className="mt-4 grid gap-3 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Base Amount</span>
          <span className="font-medium text-slate-900">{formatCurrency(amount)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>GST ({gstPercentage || 0}%)</span>
          <span className="font-medium text-slate-900">{formatCurrency(gstAmount)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
          <span>Total</span>
          <span>{formatCurrency(totalAmount)}</span>
        </div>
      </div>
    </div>
  );
};

export default GSTCalculator;