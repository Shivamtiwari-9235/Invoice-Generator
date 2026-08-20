import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon: Icon, change, tone = "indigo" }) => {
  const toneStyles = {
    indigo: "from-indigo-500 to-indigo-600 text-indigo-600 bg-indigo-50",
    emerald: "from-emerald-500 to-emerald-600 text-emerald-600 bg-emerald-50",
    slate: "from-slate-500 to-slate-700 text-slate-600 bg-slate-100",
    amber: "from-amber-500 to-amber-600 text-amber-600 bg-amber-50",
  };

  const style = toneStyles[tone] || toneStyles.indigo;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="soft-card rounded-[28px] p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{value}</h3>
          {change ? (
            <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              <ArrowUpRight size={14} />
              {change}
            </p>
          ) : null}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${style}`}>
          {Icon ? <Icon size={20} className="text-white" /> : null}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;