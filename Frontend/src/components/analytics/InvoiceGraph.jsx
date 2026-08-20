import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const InvoiceGraph = ({ data = [] }) => (
  <div className="soft-card rounded-[28px] p-5">
    <h3 className="text-lg font-semibold text-slate-900">Monthly invoices</h3>
    <div className="mt-5 h-80">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip />
          <Bar dataKey="value" fill="#10b981" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default InvoiceGraph;