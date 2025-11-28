import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  GridStatusQuoChart,
  MaterialContributionChart,
  ExpansionTimelineChart,
  ImpactCategoryComparisonChart,
  ElectricityDonutChart,
  SankeyVisualization,
} from "@/components/charts";
import { electricityImpactData, gridStatusQuoComponents } from "@/data";
import {
  Zap,
  TrendingUp,
  Layers,
  BarChart3,
  Moon,
  Sun,
  Settings,
  Info,
  Download,
  Home,
  ChevronRight,
  ArrowUpDown,
  Grid3X3,
  LineChart,
  PieChart,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

type ViewType = "dashboard" | "component" | "scenario" | "comparison";

function App() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [selectedComponent, setSelectedComponent] = useState<string>("all");
  const [selectedScenario, setSelectedScenario] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("2045");
  const { theme, setTheme } = useTheme();

  // Calculate key metrics
  const totalGridImpact = gridStatusQuoComponents.reduce((sum, c) => sum + c.value, 0);

  const renderBreadcrumb = () => {
    const crumbs = [{ label: "Dashboard", view: "dashboard" as ViewType }];
    if (currentView !== "dashboard") {
      const labels: Record<ViewType, string> = {
        dashboard: "Dashboard",
        component: "Component Analysis",
        scenario: "Scenario Comparison",
        comparison: "Impact Categories",
      };
      crumbs.push({ label: labels[currentView], view: currentView });
    }
    return (
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
        {crumbs.map((crumb, i) => (
          <div key={crumb.view} className="flex items-center gap-2">
            {i > 0 && <ChevronRight className="h-4 w-4" />}
            <button
              onClick={() => setCurrentView(crumb.view)}
              className={`hover:text-gray-900 dark:hover:text-gray-100 ${
                i === crumbs.length - 1 ? "text-gray-900 dark:text-gray-100 font-medium" : ""
              }`}
            >
              {crumb.label}
            </button>
          </div>
        ))}
      </nav>
    );
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors overflow-x-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentView("dashboard")}
                  className="flex items-center gap-2"
                >
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                      PLCA Grid Explorer
                    </h1>
                  </div>
                </button>
              </div>

              {/* Quick Navigation */}
              <div className="hidden md:flex items-center gap-1">
                <ToggleGroup type="single" value={currentView} onValueChange={(v) => v && setCurrentView(v as ViewType)}>
                  <ToggleGroupItem value="dashboard" aria-label="Dashboard">
                    <Home className="h-4 w-4 mr-2" />
                    Overview
                  </ToggleGroupItem>
                  <ToggleGroupItem value="component" aria-label="Component Analysis">
                    <Grid3X3 className="h-4 w-4 mr-2" />
                    Components
                  </ToggleGroupItem>
                  <ToggleGroupItem value="scenario" aria-label="Scenario Comparison">
                    <LineChart className="h-4 w-4 mr-2" />
                    Scenarios
                  </ToggleGroupItem>
                  <ToggleGroupItem value="comparison" aria-label="Impact Categories">
                    <PieChart className="h-4 w-4 mr-2" />
                    Impacts
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile Navigation */}
                <div className="md:hidden">
                  <Select value={currentView} onValueChange={(v) => setCurrentView(v as ViewType)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dashboard">Overview</SelectItem>
                      <SelectItem value="component">Components</SelectItem>
                      <SelectItem value="scenario">Scenarios</SelectItem>
                      <SelectItem value="comparison">Impacts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {renderBreadcrumb()}

          {/* Dashboard View */}
          {currentView === "dashboard" && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentView("component")}>
                  <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Status Quo (2023)
                    </CardDescription>
                    <CardTitle className="text-2xl lg:text-3xl text-blue-600 dark:text-blue-400">
                      {totalGridImpact.toFixed(2)}
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">Mt CO₂-eq</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Badge variant="secondary">Total Grid Impact</Badge>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentView("comparison")}>
                  <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      Climate Impact Share
                    </CardDescription>
                    <CardTitle className="text-2xl lg:text-3xl text-green-600 dark:text-green-400">
                      4.6
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">g CO₂-eq/kWh</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Badge variant="secondary">Grid per kWh</Badge>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentView("scenario")}>
                  <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      1.5°C vs BAU
                    </CardDescription>
                    <CardTitle className="text-2xl lg:text-3xl text-purple-600 dark:text-purple-400">
                      -23%
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">reduction</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Badge variant="success">Expansion Savings</Badge>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentView("comparison")}>
                  <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Grid Share 2045
                    </CardDescription>
                    <CardTitle className="text-2xl lg:text-3xl text-orange-600 dark:text-orange-400">
                      22%
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">of total</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Badge variant="warning">1.5°C Scenario</Badge>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Access Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Grid Component Breakdown</CardTitle>
                        <CardDescription>Climate impact by component category</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setCurrentView("component")}>
                        Explore
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <GridStatusQuoChart />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Expansion Timeline</CardTitle>
                        <CardDescription>Scenario comparison 2025-2045</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setCurrentView("scenario")}>
                        Explore
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ExpansionTimelineChart />
                  </CardContent>
                </Card>
              </div>

              {/* Scenario Quick Compare */}
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Electricity Impact by Scenario</CardTitle>
                      <CardDescription>Compare generation mix and grid contribution</CardDescription>
                    </div>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2045">2045</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {selectedYear === "2023" ? (
                      <div className="col-span-2 lg:col-span-4 flex justify-center">
                        <div className="w-full max-w-md">
                          <ElectricityDonutChart data={electricityImpactData.statusQuo} />
                          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">Status Quo (2023)</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div>
                          <ElectricityDonutChart data={electricityImpactData.npi2045} />
                          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">3°C Scenario</p>
                        </div>
                        <div>
                          <ElectricityDonutChart data={electricityImpactData.pkBudg1000_2045} />
                          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">2°C Scenario</p>
                        </div>
                        <div>
                          <ElectricityDonutChart data={electricityImpactData.pkBudg650_2045} />
                          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">1.5°C Scenario</p>
                        </div>
                        <div className="flex flex-col justify-center items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Key Insight</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                            Grid share increases from 1% to 22% as generation becomes cleaner
                          </p>
                          <Button variant="outline" size="sm" className="mt-3" onClick={() => setCurrentView("comparison")}>
                            View Details
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Component Analysis View */}
          {currentView === "component" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Component Analysis</h2>
                  <p className="text-gray-500 dark:text-gray-400">Detailed breakdown of grid components and materials</p>
                </div>
                <Select value={selectedComponent} onValueChange={setSelectedComponent}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select component" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Components</SelectItem>
                    <SelectItem value="overhead-lines">Overhead Lines</SelectItem>
                    <SelectItem value="cables">Cables</SelectItem>
                    <SelectItem value="transformers">Transformers</SelectItem>
                    <SelectItem value="substations">Substations</SelectItem>
                    <SelectItem value="switchgears">Switchgears</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Component Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {gridStatusQuoComponents.map((component) => (
                  <Tooltip key={component.name}>
                    <TooltipTrigger asChild>
                      <Card 
                        className={`cursor-pointer transition-all ${
                          selectedComponent === component.name.toLowerCase().replace(' ', '-') || selectedComponent === 'all'
                            ? 'ring-2 ring-blue-500'
                            : 'opacity-60 hover:opacity-100'
                        }`}
                        onClick={() => setSelectedComponent(
                          selectedComponent === component.name.toLowerCase().replace(' ', '-') 
                            ? 'all' 
                            : component.name.toLowerCase().replace(' ', '-')
                        )}
                      >
                        <CardHeader className="pb-2">
                          <CardDescription className="text-xs">{component.name}</CardDescription>
                          <CardTitle className="text-xl" style={{ color: component.color }}>
                            {component.value.toFixed(2)}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {((component.value / totalGridImpact) * 100).toFixed(1)}% of total
                          </div>
                        </CardContent>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to filter by {component.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Material Flows</CardTitle>
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
                  <CardTitle>Material Contributions</CardTitle>
                  <CardDescription>
                    Climate impact by material for each component
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MaterialContributionChart />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Scenario Comparison View */}
          {currentView === "scenario" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Scenario Comparison</h2>
                  <p className="text-gray-500 dark:text-gray-400">Compare grid expansion across climate scenarios</p>
                </div>
                <div className="flex gap-2">
                  <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Select scenario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Scenarios</SelectItem>
                      <SelectItem value="static">Static (BAU)</SelectItem>
                      <SelectItem value="npi">3°C Scenario</SelectItem>
                      <SelectItem value="pkBudg1000">2°C Scenario</SelectItem>
                      <SelectItem value="pkBudg650">1.5°C Scenario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Scenario Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className={selectedScenario === 'all' || selectedScenario === 'static' ? '' : 'opacity-50'}>
                  <CardHeader className="pb-2">
                    <CardDescription>Static (BAU)</CardDescription>
                    <CardTitle className="text-xl text-gray-600 dark:text-gray-400">
                      34.5 <span className="text-sm font-normal">Mt CO₂-eq</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Badge variant="outline">Baseline</Badge>
                  </CardContent>
                </Card>

                <Card className={selectedScenario === 'all' || selectedScenario === 'npi' ? '' : 'opacity-50'}>
                  <CardHeader className="pb-2">
                    <CardDescription>3°C Scenario</CardDescription>
                    <CardTitle className="text-xl text-red-600 dark:text-red-400">
                      30.4 <span className="text-sm font-normal">Mt CO₂-eq</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Badge variant="secondary">-12% vs BAU</Badge>
                  </CardContent>
                </Card>

                <Card className={selectedScenario === 'all' || selectedScenario === 'pkBudg1000' ? '' : 'opacity-50'}>
                  <CardHeader className="pb-2">
                    <CardDescription>2°C Scenario</CardDescription>
                    <CardTitle className="text-xl text-blue-600 dark:text-blue-400">
                      28.3 <span className="text-sm font-normal">Mt CO₂-eq</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Badge variant="secondary">-18% vs BAU</Badge>
                  </CardContent>
                </Card>

                <Card className={selectedScenario === 'all' || selectedScenario === 'pkBudg650' ? '' : 'opacity-50'}>
                  <CardHeader className="pb-2">
                    <CardDescription>1.5°C Scenario</CardDescription>
                    <CardTitle className="text-xl text-purple-600 dark:text-purple-400">
                      26.3 <span className="text-sm font-normal">Mt CO₂-eq</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Badge variant="success">-23% vs BAU</Badge>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Expansion Timeline</CardTitle>
                  <CardDescription>
                    Cumulative climate impact of grid expansion 2025-2045
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ExpansionTimelineChart />
                </CardContent>
              </Card>

              {/* Electricity Mix Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Status Quo (2023)</CardTitle>
                    <CardDescription>Current electricity generation mix</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ElectricityDonutChart data={electricityImpactData.statusQuo} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>2045 Projections</CardTitle>
                        <CardDescription>Select scenario to compare</CardDescription>
                      </div>
                      <Select 
                        value={selectedScenario === 'all' ? 'pkBudg650' : selectedScenario} 
                        onValueChange={setSelectedScenario}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="npi">3°C Scenario</SelectItem>
                          <SelectItem value="pkBudg1000">2°C Scenario</SelectItem>
                          <SelectItem value="pkBudg650">1.5°C Scenario</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ElectricityDonutChart 
                      data={
                        selectedScenario === 'npi' ? electricityImpactData.npi2045 :
                        selectedScenario === 'pkBudg1000' ? electricityImpactData.pkBudg1000_2045 :
                        electricityImpactData.pkBudg650_2045
                      } 
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Impact Categories View */}
          {currentView === "comparison" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Impact Categories</h2>
                  <p className="text-gray-500 dark:text-gray-400">Environmental impact comparison across categories</p>
                </div>
                <ToggleGroup type="single" value="relative" variant="outline">
                  <ToggleGroupItem value="relative" aria-label="Relative">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Relative to BAU
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Impact Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-900 dark:text-green-100">Most Improved</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-green-700 dark:text-green-300">Climate Change</span>
                        <Badge variant="success">-23%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-green-700 dark:text-green-300">Energy Resources</span>
                        <Badge variant="success">-22%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-green-700 dark:text-green-300">Eutrophication: Freshwater</span>
                        <Badge variant="success">-13%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-yellow-900 dark:text-yellow-100">Trade-offs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-yellow-700 dark:text-yellow-300">Land Use</span>
                        <Badge variant="warning">+18%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-yellow-700 dark:text-yellow-300">Material Resources</span>
                        <Badge variant="outline">+1%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-blue-900 dark:text-blue-100">Key Insight</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Prospective LCA shows significant reductions across most impact categories, 
                      with minor trade-offs in land use due to increased renewable infrastructure.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Impact Category Comparison</CardTitle>
                  <CardDescription>
                    Relative change in environmental impacts (1.5°C, 2°C, 3°C scenarios vs BAU)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ImpactCategoryComparisonChart />
                </CardContent>
              </Card>

              {/* Key Insights */}
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
                        contribution increases from ~1% to over 20% in ambitious scenarios.
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
    </TooltipProvider>
  );
}

export default App;
