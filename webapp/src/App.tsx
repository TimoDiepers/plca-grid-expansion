import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  GridStatusQuoChart,
  MaterialContributionChart,
  ExpansionTimelineChart,
  ImpactCategoryComparisonChart,
  ElectricityDonutChart,
  SankeyVisualization,
} from "@/components/charts";
import { electricityImpactData } from "@/data";
import { Zap, TrendingUp, Layers, BarChart3, Moon, Sun, Settings, Info, Download } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                PLCA Grid Expansion Explorer
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Prospective Life Cycle Assessment of Germany's Electricity Grid Expansion
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Theme</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}>
                    <DropdownMenuRadioItem value="light">
                      <Sun className="mr-2 h-4 w-4" />
                      Light
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                      <Moon className="mr-2 h-4 w-4" />
                      Dark
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">
                      <Settings className="mr-2 h-4 w-4" />
                      System
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Settings Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Settings</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Info className="mr-2 h-4 w-4" />
                    About
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Tabs>
          <TabsList className="bg-gray-100 dark:bg-gray-800">
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
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">64.76</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Mt CO₂-eq</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Grid per kWh</CardTitle>
                  <CardDescription>Climate impact share</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">4.6</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">g CO₂-eq/kWh</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Expansion Savings</CardTitle>
                  <CardDescription>1.5°C vs BAU scenario</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">-23%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Climate impact reduction</div>
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
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100">Grid Share Increases</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      As generation becomes cleaner, grid infrastructure's relative
                      contribution to total electricity impact increases from ~1% to
                      over 20% in ambitious scenarios.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <h4 className="font-semibold text-green-900 dark:text-green-100">Overall Reduction</h4>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      Total electricity impact drops dramatically from 373 g to 17-71
                      g CO₂-eq/kWh depending on scenario by 2045.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <h4 className="font-semibold text-purple-900 dark:text-purple-100">Prospective Benefits</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
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

      <Separator className="max-w-7xl mx-auto" />

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Data from: Prospective Life Cycle Assessment of Germany's Electricity Grid Expansion
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
