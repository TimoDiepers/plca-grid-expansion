import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { expansionYearlyData } from "@/data";

export function ExpansionTimelineChart() {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={expansionYearlyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis
            label={{
              value: "GWI (Mt CO₂-eq)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip
            formatter={(value: number) => [`${value.toFixed(2)} Mt CO₂-eq`]}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="static"
            stroke="#6b7280"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Static (BAU)"
            dot
          />
          <Line
            type="monotone"
            dataKey="npi"
            stroke="#ef4444"
            strokeWidth={2}
            name="3°C scenario"
            dot
          />
          <Line
            type="monotone"
            dataKey="pkBudg1000"
            stroke="#3b82f6"
            strokeWidth={2}
            name="2°C scenario"
            dot
          />
          <Line
            type="monotone"
            dataKey="pkBudg650"
            stroke="#8b5cf6"
            strokeWidth={2}
            name="1.5°C scenario"
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
