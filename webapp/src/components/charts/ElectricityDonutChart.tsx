import { Pie, PieChart, Cell, Label, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface ElectricityDonutChartProps {
  data: {
    year: number;
    scenario?: string;
    totalGCO2e: number;
    gridShare: number;
    generation: Record<string, { share: number; impact: number }>;
  };
}

const COLORS: Record<string, string> = {
  Coal: "#52525b",
  Gas: "#f97316",
  Wind: "#3b82f6",
  Solar: "#eab308",
  Biomass: "#22c55e",
  Nuclear: "#fbbf24",
  Hydro: "#06b6d4",
  Hydrogen: "#a855f7",
  Other: "#9ca3af",
  "Grid infrastructure": "#1e40af",
};

export function ElectricityDonutChart({ data }: ElectricityDonutChartProps) {
  const pieData = Object.entries(data.generation).map(([name, values]) => ({
    name,
    value: values.impact,
    share: values.share,
    fill: COLORS[name] || "#9ca3af",
  }));

  // Add grid infrastructure
  pieData.push({
    name: "Grid infrastructure",
    value: data.gridShare,
    share: 0,
    fill: COLORS["Grid infrastructure"],
  });

  // Sort by value descending, but keep Grid infrastructure at the end
  const sortedData = [
    ...pieData
      .filter((d) => d.name !== "Grid infrastructure")
      .sort((a, b) => b.value - a.value),
    pieData.find((d) => d.name === "Grid infrastructure")!,
  ];

  // Build chart config dynamically
  const chartConfig = sortedData.reduce((acc, item) => {
    acc[item.name] = {
      label: item.name,
      color: item.fill,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <div className="flex flex-col items-center">
      <ChartContainer config={chartConfig} className="mx-auto w-full max-w-[320px] h-[180px] sm:h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-gray-500 dark:text-gray-400">{name}</span>
                      <span className="font-mono font-medium text-gray-900 dark:text-gray-100">
                        {typeof value === "number" ? value.toFixed(1) : value}%
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Pie
              data={sortedData}
              cx="50%"
              cy="85%"
              startAngle={180}
              endAngle={0}
              innerRadius="55%"
              outerRadius="95%"
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {sortedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  stroke="transparent"
                  strokeWidth={1}
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) - 20}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 30}
                          className="fill-gray-900 dark:fill-gray-100 text-xl sm:text-2xl font-bold"
                        >
                          {data.totalGCO2e} g
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 12}
                          className="fill-gray-500 dark:fill-gray-400 text-[10px] sm:text-xs"
                        >
                          CO₂-eq/kWh
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
      <ChartContainer config={chartConfig} className="mx-auto w-full max-w-[320px] h-auto -mt-2">
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] sm:text-xs px-2">
          {sortedData.map((entry) => (
            <div key={entry.name} className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-sm"
                style={{ backgroundColor: entry.fill }}
              />
              <span className="text-gray-600 dark:text-gray-400">{entry.name}</span>
            </div>
          ))}
        </div>
      </ChartContainer>
      {data.scenario && (
        <div className="text-sm font-semibold text-center mt-1 text-gray-700 dark:text-gray-300">
          {data.scenario}
        </div>
      )}
    </div>
  );
}
