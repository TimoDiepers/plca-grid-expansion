import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { gridStatusQuoComponents } from "@/data";

const COLORS = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

export function GridStatusQuoChart() {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={gridStatusQuoComponents}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            label={{
              value: "GWI (Mt CO₂-eq)",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis type="category" dataKey="name" />
          <Tooltip
            formatter={(value: number) => [
              `${value.toFixed(2)} Mt CO₂-eq`,
              "Impact",
            ]}
          />
          <Bar
            dataKey="value"
            fill="#0088FE"
            name="Climate Impact"
          >
            {gridStatusQuoComponents.map((_, index) => (
              <rect key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
