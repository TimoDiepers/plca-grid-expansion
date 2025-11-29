import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ReferenceLine, ResponsiveContainer } from "recharts";
import { expansionComparisonData } from "@/data";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  base: {
    label: "3°C scenario",
    color: "#6b7280",
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

export function ImpactCategoryComparisonChart() {
  const data = expansionComparisonData.impactCategories.map((item) => ({
    ...item,
    base: item.base * 100,
    pkBudg1000: item.pkBudg1000 * 100,
    pkBudg650: item.pkBudg650 * 100,
  }));

  return (
    <div className="w-full overflow-x-auto">
      <ChartContainer config={chartConfig} className="h-[450px] sm:h-[600px] min-w-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 10, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis
              type="number"
              domain={[-35, 25]}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value > 0 ? "+" : ""}${value}%`}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              type="category"
              dataKey="category"
              width={100}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10 }}
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
                        {typeof value === "number"
                          ? `${value > 0 ? "+" : ""}${value.toFixed(1)}%`
                          : value}
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
            <ReferenceLine x={0} stroke="#374151" strokeDasharray="3 3" />
            <Bar
              dataKey="base"
              fill="var(--color-base)"
              radius={[0, 4, 4, 0]}
            />
            <Bar
              dataKey="pkBudg1000"
              fill="var(--color-pkBudg1000)"
              radius={[0, 4, 4, 0]}
            />
            <Bar
              dataKey="pkBudg650"
              fill="var(--color-pkBudg650)"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
