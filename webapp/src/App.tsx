import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
import { Badge } from "@/components/ui/badge";
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
  ChevronDown,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

// Animated Section component for scroll-triggered animations
function AnimatedSection({ 
  children, 
  className = "",
  delay = 0,
  id
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Section Header component for the guided tour
function SectionHeader({
  step,
  title,
  subtitle,
}: {
  step: number;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-4 mb-8">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
        {step}
      </div>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

// Scroll indicator component
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500"
    >
      <span className="text-sm">Scroll to explore</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </motion.div>
  );
}

function App() {
  const { theme, setTheme } = useTheme();

  // Calculate key metrics
  const totalGridImpact = gridStatusQuoComponents.reduce((sum, c) => sum + c.value, 0);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors overflow-x-hidden">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900 dark:text-gray-100 hidden sm:inline">
                PLCA Grid Explorer
              </span>
            </button>

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

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Prospective Life Cycle Assessment</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Germany's Electricity
            <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Grid Expansion
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Explore the environmental impact of Germany's grid infrastructure from 2023 to 2045
            across different climate scenarios.
          </p>

          {/* Key Metrics Preview */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                {totalGridImpact.toFixed(1)}
              </div>
              <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Mt CO₂-eq (2023)</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">-23%</div>
              <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Impact Reduction</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">3</div>
              <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Climate Scenarios</div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("status-quo")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Start Exploring
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("key-findings")}
            >
              Jump to Key Findings
            </Button>
          </motion.div>

          <ScrollIndicator />
        </motion.div>
      </section>

      {/* Main Content - Guided Tour */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Section 1: Grid Status Quo */}
        <AnimatedSection id="status-quo" className="mb-32">
          <SectionHeader
            step={1}
            title="Today's Grid Infrastructure"
            subtitle="Understanding the current state of Germany's electricity grid"
          />

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  Total Grid Impact (2023)
                </CardTitle>
                <CardDescription>
                  Combined climate impact of all grid components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {totalGridImpact.toFixed(2)}
                </div>
                <div className="text-lg text-gray-500 dark:text-gray-400">
                  Mt CO₂-eq (megatonnes of CO₂ equivalent)
                </div>
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    This represents approximately <strong>4.6 g CO₂-eq/kWh</strong> of Germany's 
                    total electricity carbon footprint.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Component Breakdown</CardTitle>
                <CardDescription>Climate impact by infrastructure type</CardDescription>
              </CardHeader>
              <CardContent>
                <GridStatusQuoChart />
              </CardContent>
            </Card>
          </div>

          {/* Component Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {gridStatusQuoComponents.map((component, index) => (
              <motion.div
                key={component.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: component.color }}
                    >
                      {component.value.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Mt CO₂-eq</div>
                    <Badge variant="secondary">{component.name}</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Section 2: Material Flows */}
        <AnimatedSection className="mb-32">
          <SectionHeader
            step={2}
            title="Material & Process Contributions"
            subtitle="Where does the environmental impact come from?"
          />

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-purple-500" />
                Material Flow Analysis
              </CardTitle>
              <CardDescription>
                Flow of climate impact from processes through materials to grid components
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
                Detailed breakdown of which materials contribute most to each component's impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MaterialContributionChart />
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Section 3: Future Scenarios */}
        <AnimatedSection className="mb-32">
          <SectionHeader
            step={3}
            title="Grid Expansion Scenarios"
            subtitle="Comparing climate pathways from 2025 to 2045"
          />

          {/* Scenario Comparison Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {[
              { name: "Static (BAU)", value: "34.5", color: "gray", change: "Baseline" },
              { name: "3°C Scenario", value: "30.4", color: "red", change: "-12%" },
              { name: "2°C Scenario", value: "28.3", color: "blue", change: "-18%" },
              { name: "1.5°C Scenario", value: "26.3", color: "purple", change: "-23%" },
            ].map((scenario, index) => (
              <motion.div
                key={scenario.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border-2 ${
                  scenario.color === "purple" ? "border-purple-500 bg-purple-50 dark:bg-purple-950" : ""
                }`}>
                  <CardContent className="pt-6 text-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{scenario.name}</div>
                    <div className={`text-3xl font-bold mb-2 ${
                      scenario.color === "gray" ? "text-gray-600 dark:text-gray-400" :
                      scenario.color === "red" ? "text-red-600 dark:text-red-400" :
                      scenario.color === "blue" ? "text-blue-600 dark:text-blue-400" :
                      "text-purple-600 dark:text-purple-400"
                    }`}>
                      {scenario.value}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Mt CO₂-eq</div>
                    <Badge variant={scenario.change === "Baseline" ? "outline" : "success"}>
                      {scenario.change}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Expansion Timeline
              </CardTitle>
              <CardDescription>
                Cumulative climate impact of grid expansion from 2025 to 2045
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExpansionTimelineChart />
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Section 4: Impact Categories */}
        <AnimatedSection className="mb-32">
          <SectionHeader
            step={4}
            title="Environmental Impact Categories"
            subtitle="Beyond climate change: a comprehensive assessment"
          />

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 h-full">
                <CardHeader>
                  <CardTitle className="text-green-900 dark:text-green-100">Most Improved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700 dark:text-green-300">Climate Change</span>
                      <Badge variant="success">-23%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700 dark:text-green-300">Energy Resources</span>
                      <Badge variant="success">-22%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700 dark:text-green-300">Eutrophication</span>
                      <Badge variant="success">-13%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 h-full">
                <CardHeader>
                  <CardTitle className="text-yellow-900 dark:text-yellow-100">Trade-offs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-yellow-700 dark:text-yellow-300">Land Use</span>
                      <Badge variant="warning">+18%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-yellow-700 dark:text-yellow-300">Material Resources</span>
                      <Badge variant="outline">+1%</Badge>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-yellow-700 dark:text-yellow-300">
                    Minor increases due to expanded renewable infrastructure
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 h-full">
                <CardHeader>
                  <CardTitle className="text-blue-900 dark:text-blue-100">Key Insight</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Prospective LCA shows <strong>significant reductions</strong> across most 
                    impact categories, with only minor trade-offs in land use.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Impact Category Comparison</CardTitle>
              <CardDescription>
                Relative change vs. business-as-usual (BAU) scenario
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImpactCategoryComparisonChart />
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Section 5: Electricity Mix */}
        <AnimatedSection className="mb-32">
          <SectionHeader
            step={5}
            title="Electricity Generation Evolution"
            subtitle="How the generation mix changes from 2023 to 2045"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { data: electricityImpactData.statusQuo, label: "Status Quo (2023)", impact: "373 g" },
              { data: electricityImpactData.npi2045, label: "3°C Scenario (2045)", impact: "71 g" },
              { data: electricityImpactData.pkBudg1000_2045, label: "2°C Scenario (2045)", impact: "30 g" },
              { data: electricityImpactData.pkBudg650_2045, label: "1.5°C Scenario (2045)", impact: "17 g" },
            ].map((scenario, index) => (
              <motion.div
                key={scenario.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{scenario.label}</CardTitle>
                    <CardDescription>{scenario.impact} CO₂-eq/kWh</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ElectricityDonutChart data={scenario.data} />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-0">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
                    1% → 22%
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Grid infrastructure's share of total electricity impact increases from 
                    ~1% today to over 22% in the 1.5°C scenario as generation becomes cleaner.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatedSection>

        {/* Section 6: Key Findings */}
        <AnimatedSection id="key-findings" className="mb-32">
          <SectionHeader
            step={6}
            title="Key Findings"
            subtitle="The main takeaways from this prospective LCA study"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "23% Reduction Possible",
                description: "Using prospective LCA, the estimated climate impact of grid expansion can be reduced by up to 23% compared to static assessment.",
                color: "green"
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Grid Share Increases",
                description: "As electricity generation becomes cleaner, the grid infrastructure's relative contribution to total impact grows significantly.",
                color: "blue"
              },
              {
                icon: <Layers className="h-8 w-8" />,
                title: "Aluminum & Steel Dominate",
                description: "Overhead lines (aluminum) and transformers (steel/iron) are the largest contributors to grid infrastructure impact.",
                color: "purple"
              },
            ].map((finding, index) => (
              <motion.div
                key={finding.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardContent className="pt-6">
                    <div className={`inline-flex p-3 rounded-xl mb-4 ${
                      finding.color === "green" ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400" :
                      finding.color === "blue" ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" :
                      "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400"
                    }`}>
                      {finding.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {finding.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {finding.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Back to Top */}
        <AnimatedSection className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top
            <ChevronDown className="ml-2 h-4 w-4 rotate-180" />
          </Button>
        </AnimatedSection>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Data from: <strong>Prospective Life Cycle Assessment of Germany's Electricity Grid Expansion</strong>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
