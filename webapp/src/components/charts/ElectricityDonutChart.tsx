import { Pie, PieChart, Cell, Label } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
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
      <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[280px]">
        <PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-500">{name}</span>
                    <span className="font-mono font-medium">
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
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
          >
            {sortedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.fill}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-gray-900 text-2xl font-bold"
                      >
                        {data.totalGCO2e} g
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 20}
                        className="fill-gray-500 text-xs"
                      >
                        CO₂-eq/kWh
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
          <ChartLegend
            content={<ChartLegendContent nameKey="name" />}
            className="flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center text-xs"
          />
        </PieChart>
      </ChartContainer>
      {data.scenario && (
        <div className="text-sm font-semibold text-center mt-2 text-gray-700">
          {data.scenario}
        </div>
      )}
    </div>
  );
}
