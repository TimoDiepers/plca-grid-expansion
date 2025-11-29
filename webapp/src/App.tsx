import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  ChevronDown,
  ArrowRight,
  Sparkles,
} from "lucide-react";

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
    <div className="flex items-start gap-4 mb-6">
      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
        {step}
      </div>
      <div className="min-w-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-100">
          {title}
        </h2>
        <p className="text-gray-400 mt-1 text-sm sm:text-base">{subtitle}</p>
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
      className="flex flex-col items-center gap-2 text-gray-500"
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
  // Calculate key metrics
  const totalGridImpact = gridStatusQuoComponents.reduce((sum, c) => sum + c.value, 0);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 py-8">
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
            className="inline-flex items-center gap-2 bg-blue-900/30 text-blue-300 px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Prospective Life Cycle Assessment</span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-100 mb-6">
            Germany's Electricity
            <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Grid Expansion
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
            Explore the environmental impact of Germany's grid infrastructure from 2023 to 2045
            across different climate scenarios.
          </p>

          {/* Key Metrics Preview */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-8 mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400">
                {totalGridImpact.toFixed(1)}
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 mt-1">Mt CO₂-eq (2023)</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400">-23%</div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 mt-1">Impact Reduction</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-400">3</div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 mt-1">Climate Scenarios</div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12"
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
      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-16">
        {/* Section 1: Grid Status Quo */}
        <AnimatedSection id="status-quo" className="mb-16 sm:mb-32">
          <SectionHeader
            step={1}
            title="Today's Grid Infrastructure"
            subtitle="Understanding the current state of Germany's electricity grid"
          />

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card>
              <CardHeader className="pb-2 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                  Total Grid Impact (2023)
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Combined climate impact of all grid components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  {totalGridImpact.toFixed(2)}
                </div>
                <div className="text-sm sm:text-base text-gray-400">
                  Mt CO₂-eq (megatonnes of CO₂ equivalent)
                </div>
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-blue-950 rounded-lg">
                  <p className="text-xs sm:text-sm text-blue-300">
                    This represents approximately <strong>4.6 g CO₂-eq/kWh</strong> of Germany's 
                    total electricity carbon footprint.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Component Breakdown</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Climate impact by infrastructure type</CardDescription>
              </CardHeader>
              <CardContent>
                <GridStatusQuoChart />
              </CardContent>
            </Card>
          </div>

          {/* Component Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4">
            {gridStatusQuoComponents.map((component, index) => (
              <motion.div
                key={component.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-4 sm:pt-6 pb-3 sm:pb-4 px-2 sm:px-4">
                    <div
                      className="text-lg sm:text-2xl font-bold mb-1"
                      style={{ color: component.color }}
                    >
                      {component.value.toFixed(1)}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400 mb-1 sm:mb-2">Mt CO₂-eq</div>
                    <Badge variant="secondary" className="text-[10px] sm:text-xs px-1.5 sm:px-2">{component.name}</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Section 2: Material Flows */}
        <AnimatedSection className="mb-16 sm:mb-32">
          <SectionHeader
            step={2}
            title="Material & Process Contributions"
            subtitle="Where does the environmental impact come from?"
          />

          <Card className="mb-4 sm:mb-8">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                Material Flow Analysis
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Flow of climate impact from processes through materials to grid components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SankeyVisualization />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Material Contributions by Component</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Detailed breakdown of which materials contribute most to each component's impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MaterialContributionChart />
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Section 3: Future Scenarios */}
        <AnimatedSection className="mb-16 sm:mb-32">
          <SectionHeader
            step={3}
            title="Grid Expansion Scenarios"
            subtitle="Comparing climate pathways from 2025 to 2045"
          />

          {/* Scenario Comparison Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-8">
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
                  scenario.color === "purple" ? "border-purple-500 bg-purple-950" : ""
                }`}>
                  <CardContent className="pt-4 sm:pt-6 text-center">
                    <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">{scenario.name}</div>
                    <div className={`text-xl sm:text-3xl font-bold mb-1 sm:mb-2 ${
                      scenario.color === "gray" ? "text-gray-400" :
                      scenario.color === "red" ? "text-red-400" :
                      scenario.color === "blue" ? "text-blue-400" :
                      "text-purple-400"
                    }`}>
                      {scenario.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400 mb-1 sm:mb-2">Mt CO₂-eq</div>
                    <Badge variant={scenario.change === "Baseline" ? "outline" : "success"} className="text-[10px] sm:text-xs">
                      {scenario.change}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card>
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                Expansion Timeline
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Cumulative climate impact of grid expansion from 2025 to 2045
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExpansionTimelineChart />
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Section 4: Impact Categories */}
        <AnimatedSection className="mb-16 sm:mb-32">
          <SectionHeader
            step={4}
            title="Environmental Impact Categories"
            subtitle="Beyond climate change: a comprehensive assessment"
          />

          <div className="grid md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-green-950 border-green-800 h-full">
                <CardHeader className="pb-2 sm:pb-4">
                  <CardTitle className="text-green-100 text-base sm:text-lg">Most Improved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-green-300">Climate Change</span>
                      <Badge variant="success" className="text-[10px] sm:text-xs">-23%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-green-300">Energy Resources</span>
                      <Badge variant="success" className="text-[10px] sm:text-xs">-22%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-green-300">Eutrophication</span>
                      <Badge variant="success" className="text-[10px] sm:text-xs">-13%</Badge>
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
              <Card className="bg-yellow-950 border-yellow-800 h-full">
                <CardHeader className="pb-2 sm:pb-4">
                  <CardTitle className="text-yellow-100 text-base sm:text-lg">Trade-offs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-yellow-300">Land Use</span>
                      <Badge variant="warning" className="text-[10px] sm:text-xs">+18%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-yellow-300">Material Resources</span>
                      <Badge variant="outline" className="text-[10px] sm:text-xs">+1%</Badge>
                    </div>
                  </div>
                  <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-yellow-300">
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
              <Card className="bg-blue-950 border-blue-800 h-full">
                <CardHeader className="pb-2 sm:pb-4">
                  <CardTitle className="text-blue-100 text-base sm:text-lg">Key Insight</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs sm:text-sm text-blue-300">
                    Prospective LCA shows <strong>significant reductions</strong> across most 
                    impact categories, with only minor trade-offs in land use.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Card>
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Impact Category Comparison</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Relative change vs. business-as-usual (BAU) scenario
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImpactCategoryComparisonChart />
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Section 5: Electricity Mix */}
        <AnimatedSection className="mb-16 sm:mb-32">
          <SectionHeader
            step={5}
            title="Electricity Generation Evolution"
            subtitle="How the generation mix changes from 2023 to 2045"
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
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
                  <CardHeader className="pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
                    <CardTitle className="text-xs sm:text-sm md:text-base leading-tight">{scenario.label}</CardTitle>
                    <CardDescription className="text-[10px] sm:text-xs">{scenario.impact} CO₂-eq/kWh</CardDescription>
                  </CardHeader>
                  <CardContent className="px-2 sm:px-6 pb-3 sm:pb-6">
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
            <Card className="bg-gradient-to-r from-blue-950 to-purple-950 border-0">
              <CardContent className="pt-4 sm:pt-6 pb-4 sm:pb-6">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-4">
                    1% → 22%
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
                    Grid infrastructure's share of total electricity impact increases from 
                    ~1% today to over 22% in the 1.5°C scenario as generation becomes cleaner.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatedSection>

        {/* Section 6: Key Findings */}
        <AnimatedSection id="key-findings" className="mb-16 sm:mb-32">
          <SectionHeader
            step={6}
            title="Key Findings"
            subtitle="The main takeaways from this prospective LCA study"
          />

          <div className="grid md:grid-cols-3 gap-3 sm:gap-6">
            {[
              {
                icon: <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8" />,
                title: "23% Reduction Possible",
                description: "Using prospective LCA, the estimated climate impact of grid expansion can be reduced by up to 23% compared to static assessment.",
                color: "green"
              },
              {
                icon: <Zap className="h-6 w-6 sm:h-8 sm:w-8" />,
                title: "Grid Share Increases",
                description: "As electricity generation becomes cleaner, the grid infrastructure's relative contribution to total impact grows significantly.",
                color: "blue"
              },
              {
                icon: <Layers className="h-6 w-6 sm:h-8 sm:w-8" />,
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
                  <CardContent className="pt-4 sm:pt-6">
                    <div className={`inline-flex p-2 sm:p-3 rounded-xl mb-3 sm:mb-4 ${
                      finding.color === "green" ? "bg-green-900 text-green-400" :
                      finding.color === "blue" ? "bg-blue-900 text-blue-400" :
                      "bg-purple-900 text-purple-400"
                    }`}>
                      {finding.icon}
                    </div>
                    <h3 className="text-base sm:text-xl font-semibold text-gray-100 mb-1 sm:mb-2">
                      {finding.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400">
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
      <footer className="bg-gray-900 border-t border-gray-800 mt-8 sm:mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
          <p className="text-xs sm:text-sm text-gray-400 text-center">
            Data from: <strong>Prospective Life Cycle Assessment of Germany's Electricity Grid Expansion</strong>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
