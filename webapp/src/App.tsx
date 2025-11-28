import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GridStatusQuoChart,
  MaterialContributionChart,
  ExpansionTimelineChart,
  ImpactCategoryComparisonChart,
  ElectricityDonutChart,
  SankeyVisualization,
} from "@/components/charts";
import { electricityImpactData } from "@/data";
import { Zap, TrendingUp, Layers, BarChart3 } from "lucide-react";

function App() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            PLCA Grid Expansion Explorer
          </h1>
          <p className="mt-2 text-gray-600">
            Prospective Life Cycle Assessment of Germany's Electricity Grid Expansion
          </p>
        </div>
      </header>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Tabs>
          <TabsList className="bg-gray-100">
            <TabsTrigger
              value="overview"
              isActive={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            >
              <Layers className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="status-quo"
              isActive={activeTab === "status-quo"}
              onClick={() => setActiveTab("status-quo")}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Grid Status Quo
            </TabsTrigger>
            <TabsTrigger
              value="expansion"
              isActive={activeTab === "expansion"}
              onClick={() => setActiveTab("expansion")}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Grid Expansion
            </TabsTrigger>
            <TabsTrigger
              value="electricity"
              isActive={activeTab === "electricity"}
              onClick={() => setActiveTab("electricity")}
            >
              <Zap className="w-4 h-4 mr-2" />
              Electricity Impact
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Grid Impact</CardTitle>
                  <CardDescription>Status Quo (2023)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">64.76</div>
                  <div className="text-sm text-gray-500">Mt CO₂-eq</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Grid per kWh</CardTitle>
                  <CardDescription>Climate impact share</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">4.6</div>
                  <div className="text-sm text-gray-500">g CO₂-eq/kWh</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Expansion Savings</CardTitle>
                  <CardDescription>1.5°C vs BAU scenario</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">-23%</div>
                  <div className="text-sm text-gray-500">Climate impact reduction</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Grid Component Contributions</CardTitle>
                <CardDescription>
                  Climate impact of each grid component category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GridStatusQuoChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grid Expansion Timeline</CardTitle>
                <CardDescription>
                  Cumulative climate impact of grid expansion across scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ExpansionTimelineChart />
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "status-quo" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Material Flows - Sankey Visualization</CardTitle>
                <CardDescription>
                  Flow of climate impact from processes through materials to components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SankeyVisualization />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Material Contributions by Component</CardTitle>
                <CardDescription>
                  Climate impact breakdown by material for each component type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MaterialContributionChart />
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "expansion" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Expansion Timeline Comparison</CardTitle>
                <CardDescription>
                  Comparing static (BAU) vs prospective grid expansion scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ExpansionTimelineChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impact Category Comparison</CardTitle>
                <CardDescription>
                  Relative change in environmental impacts compared to static expansion (BAU)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImpactCategoryComparisonChart />
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "electricity" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Status Quo (2023)</CardTitle>
                  <CardDescription>
                    Current electricity generation and grid contribution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ElectricityDonutChart data={electricityImpactData.statusQuo} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3°C Scenario (2045)</CardTitle>
                  <CardDescription>
                    National Policies Implemented scenario
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ElectricityDonutChart data={electricityImpactData.npi2045} />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>2°C Scenario (2045)</CardTitle>
                  <CardDescription>
                    Peak Budget 1000 Gt CO₂ scenario
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ElectricityDonutChart data={electricityImpactData.pkBudg1000_2045} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>1.5°C Scenario (2045)</CardTitle>
                  <CardDescription>
                    Peak Budget 650 Gt CO₂ scenario
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ElectricityDonutChart data={electricityImpactData.pkBudg650_2045} />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900">Grid Share Increases</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      As generation becomes cleaner, grid infrastructure's relative
                      contribution to total electricity impact increases from ~1% to
                      over 20% in ambitious scenarios.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900">Overall Reduction</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Total electricity impact drops dramatically from 373 g to 17-71
                      g CO₂-eq/kWh depending on scenario by 2045.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900">Prospective Benefits</h4>
                    <p className="text-sm text-purple-700 mt-1">
                      Using prospective LCA reduces estimated grid expansion impact by
                      up to 23% compared to static assessment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-sm text-gray-500 text-center">
            Data from: Prospective Life Cycle Assessment of Germany's Electricity Grid Expansion
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
