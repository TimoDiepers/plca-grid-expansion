# Prospective Life Cycle Assessment of Germany's Electricity Grid Expansion

This repository contains the code and data for conducting a prospective Life Cycle Assessment (LCA) of Germany's electricity grid expansion. The analysis uses the Brightway2 framework and premise to evaluate the environmental impacts of grid infrastructure development.

## Overview

This project analyzes the environmental impacts of electricity grid expansion in Germany using life cycle assessment methodology. The analysis includes:

- LCA setup and database configuration
- Status quo assessment of the current grid infrastructure
- Grid expansion scenario analysis
- Electricity contribution analysis per kWh

## Repository Structure

```
├── 0_setup.ipynb                    # Database setup and configuration
├── 1_status_quo.ipynb               # LCA of Germany's current grid
├── 2_grid_expansion.ipynb           # LCA of grid expansion scenarios
├── 3_electricity_contribution.ipynb # Grid-related impacts per kWh
├── data/
│   ├── lci/                         # LCI input data (component CSVs)
│   └── results/                     # Generated results (JSON, Excel, plot data)
├── helpers/
│   └── iam_results_decryption.ipynb # Decrypt premise IAM results
├── environment.yaml                 # Conda environment specification
└── LICENSE                          # BSD 3-Clause License
```

## Prerequisites

- [Conda](https://docs.conda.io/en/latest/miniconda.html) package manager
- Access to ecoinvent database (commercial license required)
- Access to premise default scenarios (available from premise maintainers)

## Installation

1. Clone this repository:
```bash
git clone https://github.com/TimoDiepers/plca-grid-expansion.git
cd plca-grid-expansion
```

2. Create and activate the conda environment:
```bash
conda env create -f environment.yaml
conda activate paper-plca-grid-expansion
```

3. Launch Jupyter:
```bash
jupyter notebook
```

## Usage

The analysis is organized into numbered notebooks that should be run sequentially:

### 0. Setup (`0_setup.ipynb`)
- Creates the background databases
- Requires access to ecoinvent database
- Requires premise default scenarios
- Sets up the Brightway project & databases

### 1. Status Quo Analysis (`1_status_quo.ipynb`)
- Performs LCA of Germany's current grid infrastructure
- Analyzes contributions of different grid components and materials
- Generates baseline results

### 2. Grid Expansion Analysis (`2_grid_expansion.ipynb`)
- Analyzes environmental impacts of grid expansion scenarios
- Evaluates different impact categories
- Includes uncertainty and sensitivity analysis

### 3. Electricity Contribution (`3_electricity_contribution.ipynb`)
- Calculates grid-related climate change impacts per kWh electricity
- Compares electricity generation impacts across scenarios

## Data

The `data/` directory is organized into two subdirectories:

### `data/lci/` - Life Cycle Inventory Input Data
CSV files with LCI data for grid components (cables, overhead lines, transformers, switchgear, substations, etc.)

### `data/results/` - Generated Results
- **JSON files**: Expansion results for different impact categories
- **Excel files**: Monte Carlo and global sensitivity analysis results
- **CSV files**: Plot data for visualization

## License

This project is licensed under the BSD 3-Clause License - see the [LICENSE](LICENSE) file for details.

## Citation

If you use this code or data in your research, please cite the associated paper (citation to be added).
