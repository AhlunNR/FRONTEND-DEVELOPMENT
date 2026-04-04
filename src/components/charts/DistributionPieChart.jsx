import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { formatIDR } from "@/utils/currency";

/**
 * Donut pie chart showing expense distribution by category.
 * @param {{ data: Array<{ name: string, value: number, color: string }> }} props
 */
export default function DistributionPieChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          paddingAngle={5}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
             <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => formatIDR(value)}
          contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)', borderRadius: '8px', fontSize: '13px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
