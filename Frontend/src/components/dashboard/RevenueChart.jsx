import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const RevenueChart = ({ data = [] }) => (
  <div className="soft-card rounded-[28px] p-5">
    <div className="mb-5 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Revenue analytics</h3>
        <p className="text-sm text-slate-500">Monthly income trend</p>
      </div>
    </div>
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default RevenueChart;