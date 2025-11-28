import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import { expansionComparisonData } from "@/data";

const getBarColor = (value: number) => {
  if (value > 0.05) return "#d62728"; // red for increase
  if (value > 0) return "#ff7f0e"; // orange for slight increase
  if (value > -0.1) return "#98df8a"; // light green for small decrease
  return "#2ca02c"; // green for large decrease
};

export function ImpactCategoryComparisonChart() {
  const data = expansionComparisonData.impactCategories.map((item) => ({
    ...item,
    base: item.base * 100,
    pkBudg1000: item.pkBudg1000 * 100,
    pkBudg650: item.pkBudg650 * 100,
  }));

  return (
    <div className="w-full h-[600px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 150, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            domain={[-35, 25]}
            tickFormatter={(value) => `${value > 0 ? "+" : ""}${value}%`}
            label={{
              value: "Relative change compared to BAU",
              position: "insideBottom",
              offset: -10,
            }}
          />
          <YAxis type="category" dataKey="category" width={140} />
          <Tooltip
            formatter={(value: number) => [
              `${value > 0 ? "+" : ""}${value.toFixed(1)}%`,
            ]}
          />
          <Legend />
          <ReferenceLine x={0} stroke="#000" strokeDasharray="3 3" />
          <Bar dataKey="base" name="3°C scenario" stackId="a">
            {data.map((entry, index) => (
              <Cell key={`cell-base-${index}`} fill={getBarColor(entry.base / 100)} />
            ))}
          </Bar>
          <Bar dataKey="pkBudg1000" name="2°C scenario" stackId="b" fill="#3b82f6" />
          <Bar dataKey="pkBudg650" name="1.5°C scenario" stackId="c" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
