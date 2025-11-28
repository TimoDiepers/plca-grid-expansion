import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { materialContributions } from "@/data";

const COLORS = {
  cables: "#ff7f0e",
  overheadLines: "#1f77b4",
  transformers: "#2ca02c",
  substations: "#d62728",
  switchgears: "#9467bd",
};

export function MaterialContributionChart() {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={materialContributions}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
          <YAxis
            label={{
              value: "GWI (Mt CO₂-eq)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip
            formatter={(value: number) => [
              `${value.toFixed(2)} Mt CO₂-eq`,
            ]}
          />
          <Legend />
          <Bar dataKey="overheadLines" stackId="a" fill={COLORS.overheadLines} name="Overhead Lines" />
          <Bar dataKey="cables" stackId="a" fill={COLORS.cables} name="Cables" />
          <Bar dataKey="transformers" stackId="a" fill={COLORS.transformers} name="Transformers" />
          <Bar dataKey="substations" stackId="a" fill={COLORS.substations} name="Substations" />
          <Bar dataKey="switchgears" stackId="a" fill={COLORS.switchgears} name="Switchgears" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
