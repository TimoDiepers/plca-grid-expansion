import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { expansionYearlyData } from "@/data";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
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
    <div className="w-full">
      {/* Custom legend at top to prevent overflow */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] sm:text-xs mb-3 px-2">
        {Object.entries(chartConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div
              className={`w-2.5 h-2.5 rounded-sm flex-shrink-0 ${key === 'static' ? 'border border-dashed border-gray-500' : ''}`}
              style={{ backgroundColor: key === 'static' ? 'transparent' : config.color }}
            />
            <span className="text-gray-600 dark:text-gray-400">{config.label}</span>
          </div>
        ))}
      </div>
      <ChartContainer config={chartConfig} className="h-56 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={expansionYearlyData}
            margin={{ top: 10, right: 10, left: 5, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(value) => `${value}`}
              tick={{ fontSize: 10 }}
              width={25}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-gray-500 dark:text-gray-400">
                        {chartConfig[name as keyof typeof chartConfig]?.label || name}
                      </span>
                      <span className="font-mono font-medium text-gray-900 dark:text-gray-100">
                        {typeof value === "number" ? value.toFixed(2) : value} Mt CO₂-eq
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Line
              type="monotone"
              dataKey="static"
              stroke="var(--color-static)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: "var(--color-static)", r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="npi"
              stroke="var(--color-npi)"
              strokeWidth={2}
              dot={{ fill: "var(--color-npi)", r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="pkBudg1000"
              stroke="var(--color-pkBudg1000)"
              strokeWidth={2}
              dot={{ fill: "var(--color-pkBudg1000)", r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="pkBudg650"
              stroke="var(--color-pkBudg650)"
              strokeWidth={2}
              dot={{ fill: "var(--color-pkBudg650)", r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
