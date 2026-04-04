import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Label } from "recharts";
import { useMode } from "@/contexts/ModeContext";

/**
 * Donut pie chart for category distribution with a centered label.
 * Adapts label color to current theme (light/dark).
 *
 * @param {{ data: Array<{ name: string, value: number, color: string }> }} props
 */
export default function CategoryPieChart({ data }) {
  const { theme } = useMode();
  const textColor = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={65}
          outerRadius={85}
          paddingAngle={5}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
          <Label
            value={data[0]?.name || ""}
            position="center"
            fill={textColor}
            style={{ fontSize: '12px', fontWeight: 'bold' }}
          />
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--card)',
            borderColor: 'var(--border)',
            color: 'var(--foreground)',
            borderRadius: '8px',
            fontSize: '12px',
          }}
          itemStyle={{ color: 'var(--foreground)' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}