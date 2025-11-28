import { sankeyData } from "@/data";

// Node colors
const NODE_COLORS: Record<string, string> = {
  // Components
  "cables": "#ff7f0e",
  "overhead lines": "#1f77b4",
  "transformers": "#2ca02c",
  "substations": "#d62728",
  "switchgears": "#9467bd",
  "grid status quo": "#17becf",
  // Materials
  "aluminum": "#aec7e8",
  "copper": "#ff9896",
  "iron & steel": "#98df8a",
  "plastics": "#c5b0d5",
  "concrete": "#c7c7c7",
  "SF6": "#ffbb78",
  "other materials": "#bcbd22",
  // Processes
  "electricity": "#7f7f7f",
  "heat": "#dbdb8d",
  "transport": "#9edae5",
  "coal": "#393b79",
  "clinker": "#637939",
  "aluminum (process emissions)": "#8c6d31",
  "iron & steel (process emissions)": "#843c39",
  "other processes": "#7b4173",
};

// Component to Target flows
const componentFlows = sankeyData.filter((d) => d.target === "grid status quo");

interface FlowRowProps {
  flows: typeof sankeyData;
  title: string;
}

function FlowRow({ flows, title }: FlowRowProps) {
  const total = flows.reduce((acc, f) => acc + f.value, 0);

  return (
    <div className="mb-4">
      <h4 className="text-sm font-medium mb-2 text-gray-600">{title}</h4>
      <div className="flex h-8 rounded overflow-hidden shadow-sm">
        {flows
          .sort((a, b) => b.value - a.value)
          .map((flow, i) => {
            const width = (flow.value / total) * 100;
            const color = NODE_COLORS[flow.source] || "#ccc";
            return (
              <div
                key={`${flow.source}-${flow.target}-${i}`}
                className="relative group"
                style={{
                  width: `${width}%`,
                  backgroundColor: color,
                  minWidth: width > 1 ? "2px" : "0",
                }}
              >
                <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
                  {flow.source}: {flow.value.toFixed(2)} Mt CO₂-eq
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {flows
          .sort((a, b) => b.value - a.value)
          .slice(0, 6)
          .map((flow, i) => (
            <div key={i} className="flex items-center gap-1 text-xs">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: NODE_COLORS[flow.source] || "#ccc" }}
              />
              <span>{flow.source}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export function SankeyVisualization() {
  return (
    <div className="p-4">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Grid Status Quo - Flow Breakdown</h3>
          <p className="text-sm text-gray-600 mb-4">
            Total climate impact: <strong>64.76 Mt CO₂-eq</strong>
          </p>
        </div>
        
        <FlowRow
          flows={componentFlows}
          title="Components → Grid Status Quo"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Material Contributions per Component</h4>
            {["overhead lines", "cables", "transformers", "substations", "switchgears"].map(
              (component) => {
                const flows = sankeyData.filter(
                  (d) => d.target === component && d.value > 0.01
                );
                if (flows.length === 0) return null;
                return (
                  <FlowRow
                    key={component}
                    flows={flows}
                    title={component.charAt(0).toUpperCase() + component.slice(1)}
                  />
                );
              }
            )}
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Process Contributions per Material</h4>
            {["aluminum", "iron & steel", "copper", "plastics", "concrete", "other materials"].map(
              (material) => {
                const flows = sankeyData.filter(
                  (d) => d.target === material && d.value > 0.01
                );
                if (flows.length === 0) return null;
                return (
                  <FlowRow
                    key={material}
                    flows={flows}
                    title={material.charAt(0).toUpperCase() + material.slice(1)}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
