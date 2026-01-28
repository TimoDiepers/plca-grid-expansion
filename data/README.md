# Data Directory

This directory contains input data and analysis results for the PLCA grid expansion study.

## File Types

### Component Data (CSV files)
Life Cycle Inventory (LCI) data for various grid components:
- **Cables**: Land cables with different specifications (EPR, VPE, oil-insulated, various voltage levels)
- **Overhead lines**: Transmission lines at different voltage levels (4kV to 400kV, HVDC)
- **Transformers**: Various transformer types and capacities
- **Switchgear**: Gas-insulated switchgear, circuit breakers, disconnectors
- **Substations**: Low and medium voltage substations
- **Other components**: Surge arresters, plug-and-switch systems, office buildings

### Results Files

#### JSON Files
- `expansion_component_results_rev1.json`: Component-level results from grid expansion analysis
- `expansion_materials_results_remind-eu_premise_gwp.json`: Material-level GWP results
- `expansion_process_results_remind-eu_premise_gwp.json`: Process-level GWP results
- `expansion_all_impact_categories.json`: Results across all impact categories
- `distributed_components.json`: Data for distributed grid components

#### Excel Files (XLSX)
- `uncertainty_Monte-Carlo-results_*.xlsx`: Monte Carlo uncertainty analysis results
- `gsa_output_uncertainty_5000_expansion_*.xlsx`: Global sensitivity analysis outputs for different scenarios
- `gsa_top25_comparison_table.xlsx`: Comparison of top 25 sensitivity analysis parameters

#### Plot Data (CSV)
- `plot_data_components.csv`: Data for component contribution plots
- `plot_data_expansion.csv`: Data for expansion scenario plots
- `plot_data_materials.csv`: Data for material contribution plots
- `plot_data_processes.csv`: Data for process contribution plots
- `sankey_data.csv`: Data for Sankey diagram visualization

## Scenarios

The analysis includes results for different climate scenarios:
- **NPi**: National Policies Implemented
- **PkBudg650**: Paris Agreement budget targeting 650 Gt CO2
- **PkBudg1000**: Paris Agreement budget targeting 1000 Gt CO2

## Usage

These files are referenced by the analysis notebooks (0-3 in the root directory). Some files are generated during the analysis, while others contain input data for the LCI.
