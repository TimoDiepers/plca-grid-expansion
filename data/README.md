# Data Directory

This directory contains input data and analysis results for the PLCA grid expansion study.

## Directory Structure

```
data/
├── lci/          # Life Cycle Inventory input data (component CSVs)
├── results/      # Generated analysis results
└── README.md
```

## lci/ - Life Cycle Inventory Data

Component-level LCI data in CSV format (semicolon-separated):

- **Cables**: Land cables with different specifications
  - `land_cable_epr_cu_11kv.csv`, `land_cable_oil_cu_150kv.csv`, `land_cable_oil_cu_HVDC.csv`
  - `land_cable_vpe_al_04kv.csv`, `land_cable_vpe_al_10kv.csv`, `land_cable_vpe_al_50kv.csv`
  - `land_cable_vpe_cu_1kv.csv`
- **Overhead lines**: Transmission lines at different voltage levels
  - `overhead_line_04kv.csv`, `overhead_line_10kv.csv`, `overhead_line_150kv.csv`
  - `overhead_line_400kv.csv`, `overhead_line_HVDC.csv`
- **Transformers**: Various transformer types and capacities
  - `transformer_250mva.csv`, `transformer_315kva.csv`, `transformer_40mva.csv`
- **Switchgear**: Gas-insulated switchgear, circuit breakers, disconnectors
  - `gas_insulated_switchgear_300kv.csv`, `gas_insulated_switchgear_420kv.csv`
  - `live_tank_circuit_breaker.csv`, `disconnector.csv`, `uniswitch.csv`
- **Substations**: Low and medium voltage substations
  - `substation_lv.csv`, `substation_mv.csv`
- **Other components**:
  - `surge_arrester.csv`, `plug_and_switch_system.csv`, `office_building.csv`

## results/ - Analysis Results

Generated outputs from the analysis notebooks:

### JSON Files
- `expansion_component_results_rev1.json`: Component-level results from grid expansion analysis
- `expansion_materials_results_remind-eu_premise_gwp.json`: Material-level GWP results
- `expansion_process_results_remind-eu_premise_gwp.json`: Process-level GWP results
- `expansion_all_impact_categories.json`: Results across all impact categories
- `distributed_components.json`: Data for distributed grid components

### Excel Files (XLSX)
- `uncertainty_Monte-Carlo-results_*.xlsx`: Monte Carlo uncertainty analysis results
- `gsa_output_uncertainty_5000_expansion_*.xlsx`: Global sensitivity analysis outputs for different scenarios
- `gsa_top25_comparison_table.xlsx`: Comparison of top 25 sensitivity analysis parameters

### Plot Data (CSV)
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

These files are referenced by the analysis notebooks (0-3 in the root directory):
- `0_setup.ipynb` reads LCI data from `data/lci/` and writes intermediate results to `data/results/`
- `1_status_quo.ipynb`, `2_grid_expansion.ipynb`, and `3_electricity_contribution.ipynb` read/write results in `data/results/`
