import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { materialContributions } from "@/data";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  overheadLines: {
    label: "Overhead Lines",
    color: "#2563eb",
  },
  cables: {
    label: "Cables",
    color: "#f97316",
  },
  transformers: {
    label: "Transformers",
    color: "#22c55e",
  },
  substations: {
    label: "Substations",
    color: "#ef4444",
  },
  switchgears: {
    label: "Switchgears",
    color: "#a855f7",
  },
} satisfies ChartConfig;

export function MaterialContributionChart() {
  return (
    <ChartContainer config={chartConfig} className="h-72 sm:h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={materialContributions}
          margin={{ top: 10, right: 10, left: 10, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            angle={-45}
            textAnchor="end"
            height={50}
            tickMargin={8}
            tick={{ fontSize: 11 }}
          />
          <YAxis 
            tickLine={false} 
            axisLine={false} 
            tickMargin={4}
            tick={{ fontSize: 11 }}
            width={40}
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
          <ChartLegend 
            content={<ChartLegendContent />} 
            wrapperStyle={{ fontSize: "11px" }}
          />
          <Bar
            dataKey="overheadLines"
            stackId="a"
            fill="var(--color-overheadLines)"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="cables"
            stackId="a"
            fill="var(--color-cables)"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="transformers"
            stackId="a"
            fill="var(--color-transformers)"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="substations"
            stackId="a"
            fill="var(--color-substations)"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="switchgears"
            stackId="a"
            fill="var(--color-switchgears)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
