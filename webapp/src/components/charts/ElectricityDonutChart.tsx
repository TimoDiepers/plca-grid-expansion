import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

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
  Coal: "#646567",
  Gas: "#f97316",
  Wind: "#60a5fa",
  Solar: "#facc15",
  Biomass: "#22c55e",
  Nuclear: "#eab308",
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
  }));

  // Add grid infrastructure
  pieData.push({
    name: "Grid infrastructure",
    value: data.gridShare,
    share: 0,
  });

  // Sort by value descending, but keep Grid infrastructure at the end
  const sortedData = [
    ...pieData
      .filter((d) => d.name !== "Grid infrastructure")
      .sort((a, b) => b.value - a.value),
    pieData.find((d) => d.name === "Grid infrastructure")!,
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 300, height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sortedData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {sortedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name] || "#9ca3af"}
                  stroke="#fff"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value.toFixed(1)}%`,
                name,
              ]}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: "10px" }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ top: -30 }}>
          <span className="text-2xl font-bold">{data.totalGCO2e} g</span>
          <span className="text-xs text-gray-500">CO₂-eq/kWh</span>
          <span className="text-xs text-gray-400">({data.year})</span>
        </div>
      </div>
      {data.scenario && (
        <div className="text-sm font-semibold text-center mt-2">
          {data.scenario}
        </div>
      )}
    </div>
  );
}
