# Gujrat Group Sales Command Center

A high-density operational and multi-brand sales command center web application built for restaurant chain management across UAE delivery platforms and branches.

This project was scaffolded and styled via **Figma Make AI** with React 19, TypeScript, Vite, and Tailwind CSS v4.

---

## 📁 Repository & Directory Structure

```text
Gujrat Group Sales Command Center/
├── .figma/                     # Figma Make integration metadata and project cache
├── .gitattributes              # Git attribute rules and line-ending configurations
├── .gitignore                  # Ignored files (node_modules, dist, temp files)
├── .mise.toml                  # Toolchain configuration (Node.js & pnpm versions)
├── AGENTS.md                   # Agent system guidelines, tech stack & dev rules
├── CLAUDE.md                   # Assistant workspace summary and quick commands
├── Readme.md                   # Project documentation, structure, and architecture overview
├── index.html                  # HTML entry point loading Google fonts and main.tsx
├── package.json                # Project dependencies, build/dev scripts (React 19, Vite, Recharts, Tailwind v4)
├── pnpm-lock.yaml              # Pnpm dependency lockfile
├── tsconfig.json               # TypeScript configuration with path aliases (@/* -> ./src/*)
├── vite.config.ts              # Vite configuration with React & Tailwind plugins and path aliases
└── src/                        # Core application source code
    ├── main.tsx                # Application mounting point, root render with index.css
    ├── App.tsx                 # Root layout container, global state (branch, platform, date, page)
    ├── index.css               # Global theme tokens, typography, CSS variables & Tailwind v4 imports
    ├── vite-env.d.ts           # Vite client TypeScript definitions
    ├── components/             # Global reusable layout and presentation components
    │   ├── Sidebar.tsx         # Collapsible navigation sidebar with icons, badges, and user profile
    │   ├── TopBar.tsx          # Sticky top bar with branch/platform/date filters, search, and alerts
    │   └── ui.tsx              # Shared UI design system primitives (KpiCard, StatusBadge, SectionHeader, etc.)
    ├── data/                   # Mock business logic, entity definitions, and operational records
    │   └── mockData.ts         # Branches, delivery aggregators, KPI metrics, live store matrix & reviews
    └── pages/                  # Top-level view modules routed through App.tsx
        ├── Overview.tsx        # Executive command dashboard with live status ticker, charts, and summary cards
        ├── Operations.tsx      # Branch × Platform live grid, downtime logs, and outage incident management
        ├── SalesAnalytics.tsx  # Granular sales breakdowns, hourly trends, branch/platform share analysis
        ├── Products.tsx        # Menu catalog, hero/star items, stock status, and pricing parity checks
        ├── Campaigns.tsx       # Marketing ROAS, promotion budgets, ad spend, and campaign performance
        ├── Reviews.tsx         # Aggregated ratings, sentiment analysis, negative review triage
        ├── AIAssistant.tsx     # Context-aware AI operational copilot for queries and incident dispatch
        ├── Actions.tsx         # Action items, team task tracker, resolution workflows, and assignments
        ├── Reports.tsx         # Data export center (CSV/XLSX), financial reconciliations, scheduled reports
        └── Settings.tsx        # Integrations, user roles, branch locations, and system configuration
```

---

## 🛠 Tech Stack & Key Libraries

| Area | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime / Library** | [React 19](https://react.dev/) + [React DOM 19](https://react.dev/) | Component architecture, hooks, and reactive UI state |
| **Language** | [TypeScript 5.7](https://www.typescriptlang.org/) | Strict type checking, interfaces for business entities |
| **Build & Dev Tool** | [Vite 8](https://vite.dev/) | Lightning-fast HMR and bundle pipeline |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS tokens | Ultra-dense enterprise palette, custom font stack |
| **Charts & Visuals** | [Recharts 3](https://recharts.org/) | Responsive SVG charts (Bar, Area, Line, Pie) |
| **Typography** | `Inter` + `JetBrains Mono` | High legibility for dense numbers, metrics, and labels |
| **Linter / Formatter**| `oxfmt` | High-performance code formatting |

---

## 🔍 In-Depth File & Folder Breakdown

### 1. Root Configuration Files
- **`package.json`**: Defines dependencies (`react`, `react-dom`, `recharts`, `@tailwindcss/vite`, `vite`, `oxfmt`) and scripts (`dev`, `build`, `preview`, `format`).
- **`vite.config.ts`**: Configures Vite plugins (`@vitejs/plugin-react`, `@tailwindcss/vite`), sets up path alias `@` pointing to `/src`, and configures dev server port settings.
- **`tsconfig.json`**: Configures TypeScript compiler settings (`ESNext`, JSX preserve/react-jsx, strict checking) and baseUrl mapping for module resolution.
- **`index.html`**: Host page; imports `Inter` and `JetBrains Mono` fonts from Google Fonts and mounts `/src/main.tsx` into `#root`.
- **`AGENTS.md`**: Context document describing development conventions, environment rules, and Tailwind v4 usage rules.

### 2. Core Architecture (`src/`)
- **`src/main.tsx`**: Bootstraps the application, imports `index.css`, and mounts `<App />` to the DOM.
- **`src/App.tsx`**: Central application coordinator holding global active filters:
  - `page`: Active view (`overview`, `operations`, `analytics`, `products`, `campaigns`, `reviews`, `ai-assistant`, `actions`, `reports`, `settings`).
  - `branch`: Filter by branch (`all`, `royal`, `m26`, `delight`, `naan10`, `naan11`, `mafraq`, etc.).
  - `platform`: Filter by delivery partner (`all`, `talabat`, `noon`, `careem`, `deliveroo`, `keeta`, `smiles`).
  - `dateRange`: Active reporting window (`Today`, `Yesterday`, `MTD`, etc.).
  - `sidebarCollapsed`: Toggle state for side navigation.
- **`src/index.css`**: Defines CSS custom variables for the enterprise theme:
  - Deep dark greens (`--primary: #1B3D2F`), gold accent (`--accent: #B8952A`), warm parchment background (`--background: #F8F7F4`), and crisp white card containers (`#FFFFFF`).
  - Strict semantic status variables: `--status-live`, `--status-offline`, `--status-issue`, `--status-stale`, `--status-scheduled`, `--status-unconfigured`.

### 3. Components (`src/components/`)
- **`Sidebar.tsx`**:
  - Displays brand identity ("Gujrat Group Command Center - UAE Operations").
  - Navigation links for all 10 pages with SVGs and badge counters.
  - Active branch count indicator and user profile footer.
- **`TopBar.tsx`**:
  - Displays current section breadcrumbs and active page title.
  - Global branch selector and platform filter dropdowns.
  - Timeframe selector, quick search input, and notifications trigger.
- **`ui.tsx`**:
  - Standardized enterprise component library:
    - `KpiCard`: Compact KPI metric card with trend indicators, sparks, and tooltips.
    - `StatusBadge` & `OpsBadge`: Semantic pills with color-coded dot indicators (`Live`, `Offline`, `Issue`, `Stale`, `Scheduled Closed`).
    - `Change`: Percentage differential indicator (`+` / `-` with green/red coloring).
    - `SectionHeader`, `Card`, `FilterPills`, `TabGroup`, `EmptyState`, and `Modal`.

### 4. Mock Data Layer (`src/data/`)
- **`mockData.ts`**:
  - **Branches**: 6 active UAE branches + 2 pending (`Royal Gujrat`, `Gujrat Restaurant M26`, `Delight Gujrat`, `Naan House ME-10/11`, `Mafraq Gujrat`).
  - **Platforms**: 6 delivery aggregators (`Talabat`, `Noon`, `Careem`, `Deliveroo`, `Keeta`, `Smiles`).
  - **Operational Matrix**: Real-time cross-matrix tracking live/offline/incident statuses per branch-platform pair with Grubtech sync timestamps.
  - **KPI Sets & Hourly Sales**: Realistic financial metrics (Gross Sales, Net Sales, Order Volume, AOV, Commission, Ad Spend, Ratings).
  - **Product Performance**: Top performers, stock status, markups, and menu issues.
  - **Action Items & Alerts**: Critical alerts (store offline, menu sync failure, rating drop) requiring manager action.

### 5. Application Pages (`src/pages/`)
1. **`Overview.tsx`**: Executive overview displaying high-level revenue figures, critical alerts ticker, platform market share, branch ranking leaderboard, and live operational status table.
2. **`Operations.tsx`**: Matrix grid of branch vs aggregator store status, downtime duration tracking, incident management, and direct store toggle switches.
3. **`SalesAnalytics.tsx`**: Time-series sales curves, platform revenue distribution, commission breakdowns, average preparation times, and peak ordering hours.
4. **`Products.tsx`**: Menu engineering quadrant (Stars, Workhorses, Puzzles, Dogs), out-of-stock items, pricing parity differences across Talabat/Noon/Deliveroo.
5. **`Campaigns.tsx`**: Marketing campaigns monitor, discount depth, ad spend vs generated revenue, ROAS tracking, and promotional ROI calculations.
6. **`Reviews.tsx`**: Aggregated customer sentiment scores across branches, negative feedback breakdown (packaging, delay, missing item), and direct reply workflows.
7. **`AIAssistant.tsx`**: Interactive AI Copilot simulating operations analysis, asking natural language questions about store performance, and generating action summaries.
8. **`Actions.tsx`**: Kanban/list task board for branch managers and kitchen staff to resolve operational anomalies, ticket assignments, and audit trails.
9. **`Reports.tsx`**: Financial reconciliation sheets, payout audit summaries, VAT breakdowns, and one-click export (CSV / PDF / Excel).
10. **`Settings.tsx`**: POS/Aggregator API integrations (Grubtech, UrbanPiper, direct platform tokens), branch master settings, user access controls, and notification preferences.

---

## 🚀 Development & Running Instructions

### Prerequisites
- Node.js (v20+ recommended)
- pnpm (or npm / yarn)

### Starting the Dev Server
```bash
pnpm install
pnpm dev
```
The Vite development server runs by default on port `8443` (or `$PORT`), serving hot-reloaded modules directly to the browser.

### Creating a Production Build
```bash
pnpm build
```
Creates an optimized, tree-shaken static bundle in the `dist/` directory.
