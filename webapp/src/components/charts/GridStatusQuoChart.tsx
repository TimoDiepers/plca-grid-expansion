import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Cell, ResponsiveContainer } from "recharts";
import { gridStatusQuoComponents } from "@/data";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "Climate Impact",
  },
  "Overhead lines": {
    label: "Overhead lines",
    color: "#2563eb",
  },
  Cables: {
    label: "Cables",
    color: "#f97316",
  },
  Transformers: {
    label: "Transformers",
    color: "#22c55e",
  },
  Substations: {
    label: "Substations",
    color: "#ef4444",
  },
  Switchgears: {
    label: "Switchgears",
    color: "#a855f7",
  },
} satisfies ChartConfig;

const COLORS: Record<string, string> = {
  "Overhead lines": "#2563eb",
  Cables: "#f97316",
  Transformers: "#22c55e",
  Substations: "#ef4444",
  Switchgears: "#a855f7",
};

export function GridStatusQuoChart() {
  return (
    <ChartContainer config={chartConfig} className="h-64 sm:h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={gridStatusQuoComponents}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis
            type="number"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            type="category"
            dataKey="name"
            tickLine={false}
            axisLine={false}
            width={80}
            tick={{ fontSize: 11 }}
          />
          <ChartTooltip
            cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            content={
              <ChartTooltipContent
                formatter={(value, name) => (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-500 dark:text-gray-400">{name}</span>
                    <span className="font-mono font-medium text-gray-900 dark:text-gray-100">
                      {typeof value === "number" ? value.toFixed(2) : value} Mt CO₂-eq
                    </span>
                  </div>
                )}
              />
            }
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {gridStatusQuoComponents.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name] || "#8884d8"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
