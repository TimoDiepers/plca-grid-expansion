import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { expansionYearlyData } from "@/data";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  static: {
    label: "Static (BAU)",
    color: "#6b7280",
  },
  npi: {
    label: "3°C scenario",
    color: "#ef4444",
  },
  pkBudg1000: {
    label: "2°C scenario",
    color: "#3b82f6",
  },
  pkBudg650: {
    label: "1.5°C scenario",
    color: "#8b5cf6",
  },
} satisfies ChartConfig;

export function ExpansionTimelineChart() {
  return (
    <ChartContainer config={chartConfig} className="h-80 w-full">
      <LineChart
        data={expansionYearlyData}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `${value}`}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => (
                <div className="flex items-center justify-between gap-8">
                  <span className="text-gray-500">
                    {chartConfig[name as keyof typeof chartConfig]?.label || name}
                  </span>
                  <span className="font-mono font-medium">
                    {typeof value === "number" ? value.toFixed(2) : value} Mt CO₂-eq
                  </span>
                </div>
              )}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          type="monotone"
          dataKey="static"
          stroke="var(--color-static)"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ fill: "var(--color-static)", r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="npi"
          stroke="var(--color-npi)"
          strokeWidth={2}
          dot={{ fill: "var(--color-npi)", r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="pkBudg1000"
          stroke="var(--color-pkBudg1000)"
          strokeWidth={2}
          dot={{ fill: "var(--color-pkBudg1000)", r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="pkBudg650"
          stroke="var(--color-pkBudg650)"
          strokeWidth={2}
          dot={{ fill: "var(--color-pkBudg650)", r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
