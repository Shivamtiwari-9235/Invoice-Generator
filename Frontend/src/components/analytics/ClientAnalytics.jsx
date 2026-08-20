import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#4f46e5", "#10b981", "#0f172a", "#f59e0b", "#ef4444"];

const ClientAnalytics = ({ data = [] }) => (
  <div className="soft-card rounded-[28px] p-5">
    <h3 className="text-lg font-semibold text-slate-900">Client distribution</h3>
    <div className="mt-5 h-80">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} label>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default ClientAnalytics;