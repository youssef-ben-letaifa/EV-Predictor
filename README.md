<div align="center">

# ⚡ EV Predictor

### Intelligent Electric Vehicle Health Monitoring System

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" alt="Rust" width="40" height="40"/>
  <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="Tailwind" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" alt="Vite" width="40" height="40"/>
</p>

A modern desktop and web application for visualizing and predicting electric vehicle component health. Monitor battery, motor, thermal systems, charging, and more with real-time telemetry and predictive analytics.

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Architecture](#-architecture) • [Contributing](#-contributing)

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%">

</div>

---

## ✨ Features

### 📊 Interactive Dashboard
- **Real-Time Component Health**: Monitor battery, motor, thermal systems, and charging infrastructure
- **Component Status Cards**: Quick visual overview of each EV component
- **Health Metrics Visualization**: Beautiful time-series charts with historical data
- **Vehicle Health Overview**: Comprehensive summary of overall vehicle status

### 🔮 Predictive Analytics
- **AI-Powered Alerts**: Intelligent warnings based on component degradation patterns
- **Severity Classification**: Critical, warning, and info-level alerts
- **Actionable Recommendations**: Specific maintenance suggestions for each alert
- **Alert Management**: Acknowledge and dismiss alerts with tracking

### 🔧 Component Deep-Dive
- **Detailed Component Views**: In-depth analysis of individual components
- **Maintenance History**: Complete log of past service and repairs
- **Performance Metrics**: Track efficiency, temperature, voltage, and more
- **Predictive Maintenance**: Estimated time until next service required

### 📈 Data Management
- **Telemetry Simulation**: Built-in data input panel for testing and demos
- **Real-Time Updates**: Live component state updates as data flows in
- **Historical Tracking**: Archive of vehicle health over time
- **Export & Reports**: Generate comprehensive health reports

### 🖥️ Native Desktop Experience
- **Cross-Platform**: Built with Tauri for native Linux desktop app
- **Lightweight**: Rust-powered backend with minimal resource usage
- **Fast Performance**: Vite-optimized frontend with instant loading
- **Offline Capable**: Local-first architecture for reliable operation

---

## 🛠️ Tech Stack

<div align="center">

### Frontend Technologies

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="60" height="60"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="60" height="60"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" alt="Vite" width="60" height="60"/>
  <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="Tailwind CSS" width="60" height="60"/>
</p>

### Backend & Build Tools

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" alt="Rust" width="60" height="60"/>
  <img src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg" alt="React Query" width="60" height="60"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="60" height="60"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" alt="npm" width="60" height="60"/>
</p>

</div>

| Category | Technologies |
|----------|-------------|
| **Frontend Framework** | React 18 with TypeScript |
| **Build Tool** | Vite (Fast HMR & Optimized Builds) |
| **Styling** | Tailwind CSS + shadcn/ui (Radix Primitives) |
| **State Management** | React Context + @tanstack/react-query |
| **Desktop Runtime** | Tauri (Rust) |
| **UI Components** | shadcn/ui, Radix UI |
| **Charts** | Recharts |
| **Routing** | React Router DOM |
| **Linting** | ESLint with TypeScript support |

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or yarn/pnpm
- **Rust Toolchain** (for Tauri desktop builds)
  ```bash
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
  rustup update
  ```
- **Linux Dependencies** (for `.deb` packaging):
  ```bash
  # Ubuntu/Debian
  sudo apt install libwebkit2gtk-4.0-dev build-essential curl wget libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev
  ```

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/youssef-ben-letaifa/ev-predictor.git
   cd ev-predictor
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run Development Server**

   ```bash
   # Web development
   npm run dev
   # Open http://localhost:5173
   ```

4. **Run Tauri Desktop App** (Development)

   ```bash
   npm run tauri:dev
   ```

---

## 📦 Building for Production

### Web Build

Build the web application:

```bash
npm run build

# Preview the production build
npm run preview
```

The output will be in the `dist/` directory.

### Desktop Build (Linux .deb)

Build the native desktop application:

```bash
npm run tauri:build
```

The `.deb` package will be created in `src-tauri/target/release/bundle/deb/`.

### Quick Desktop Launch Script

Run the web app in a standalone browser window:

```bash
bash ./run-app.sh
```

This script:
- Builds the app if needed
- Opens it in a Chromium-based browser in app mode
- Creates an isolated profile

### Install Desktop Entry

Install the app as a native Linux application:

```bash
bash ./install-desktop.sh
```

This will:
- Copy the app icon to `~/.local/share/icons/`
- Create a desktop entry in `~/.local/share/applications/`
- Make the app searchable from your application menu

---

## 📂 Project Structure

```
ev-predictor/
│
├── index.html                    # Vite HTML entry point
├── package.json                  # npm dependencies & scripts
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── eslint.config.js             # ESLint rules
├── logo.png                     # App icon
├── run-app.sh                   # Quick launch script
├── install-desktop.sh           # Desktop entry installer
├── ev-predictor.desktop.template # Desktop entry template
│
├── public/                      # Static assets
│   └── robots.txt
│
├── src/                         # Frontend source code
│   ├── main.tsx                 # React entry point
│   ├── App.tsx                  # Root component with providers
│   ├── index.css                # Global styles
│   ├── vite-env.d.ts           # Vite type definitions
│   │
│   ├── pages/                   # Route pages
│   │   ├── Index.tsx            # Main dashboard layout
│   │   └── NotFound.tsx         # 404 page
│   │
│   ├── context/                 # State management
│   │   └── DashboardContext.tsx # Central app state & telemetry
│   │
│   ├── components/              # React components
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Top navigation bar
│   │   │   └── Sidebar.tsx      # Side navigation menu
│   │   │
│   │   ├── dashboard/           # Dashboard-specific components
│   │   │   ├── ComponentStatusCard.tsx      # Component health cards
│   │   │   ├── ComponentDetailView.tsx      # Detailed component view
│   │   │   ├── DataInputPanel.tsx           # Telemetry input simulator
│   │   │   ├── MaintenanceLog.tsx           # Maintenance history
│   │   │   ├── MetricsChart.tsx             # Time-series charts
│   │   │   ├── PredictiveAlerts.tsx         # Alert notifications
│   │   │   ├── ReportsView.tsx              # Reports & analytics
│   │   │   ├── SettingsView.tsx             # App settings
│   │   │   └── VehicleHealthOverview.tsx    # Health summary
│   │   │
│   │   ├── ui/                  # Reusable UI primitives (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   └── ... (more components)
│   │   │
│   │   └── NavLink.tsx          # Navigation helper
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-mobile.tsx       # Mobile detection
│   │   └── use-toast.ts         # Toast notifications
│   │
│   └── lib/                     # Utilities
│       └── utils.ts             # Helper functions
│
└── src-tauri/                   # Tauri (Rust) backend
    ├── tauri.conf.json          # Tauri configuration
    ├── Cargo.toml               # Rust dependencies
    ├── build.rs                 # Build script
    │
    ├── src/                     # Rust source code
    │   ├── main.rs              # Tauri entry point
    │   └── lib.rs               # Library code
    │
    ├── icons/                   # App icons for bundling
    │
    ├── gen/schemas/             # Generated schemas
    │   ├── acl-manifests.json
    │   ├── capabilities.json
    │   ├── desktop-schema.json
    │   └── linux-schema.json
    │
    └── capabilities/            # Tauri capabilities
        └── default.json
```

---

## 🏗️ Architecture & Design

### System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface (React)                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Dashboard   │  │  Components  │  │    Alerts    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│              State Management Layer                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │         DashboardContext (Central State)          │  │
│  │  • Component Health Data                          │  │
│  │  • Predictive Alerts                              │  │
│  │  • Telemetry Processing                           │  │
│  │  • Vehicle History                                │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │        React Query (Data Fetching & Cache)        │  │
│  └──────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│                   Tauri Bridge (IPC)                     │
│         Rust Backend ←→ Frontend Communication           │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│                 Native System Integration                │
│  • File System Access                                    │
│  • System Notifications                                  │
│  • Hardware Integration (Future)                         │
└──────────────────────────────────────────────────────────┘
```

### Key Design Principles

1. **Local-First Architecture**: All data processing happens locally for privacy and reliability
2. **Component-Based UI**: Modular design with reusable components from shadcn/ui
3. **Type Safety**: Full TypeScript coverage for catch errors at compile time
4. **Performance Optimized**: Vite's fast HMR and React Query's smart caching
5. **Native Integration**: Tauri provides true native experience with minimal overhead

### Data Flow

1. **Telemetry Input** → `DataInputPanel` component
2. **State Update** → `DashboardContext` processes and stores data
3. **React Query** → Manages caching and refetching strategies
4. **UI Updates** → Components re-render with new data
5. **Predictive Engine** → Analyzes patterns and generates alerts

---

## 🎨 UI Component Library

The app uses **shadcn/ui** - a collection of beautifully designed, accessible components built on:

- **Radix UI**: Unstyled, accessible primitives
- **Tailwind CSS**: Utility-first styling
- **Class Variance Authority**: Component variants

All UI components are in `src/components/ui/` and can be customized via `tailwind.config.ts`.

---

## 🔌 Extending the Application

### Adding a New Component Type

1. **Update Types** in `DashboardContext.tsx`:
   ```typescript
   type ComponentType = 
     | 'battery' 
     | 'motor' 
     | 'thermal'
     | 'charging'
     | 'your-new-component'; // Add here
   ```

2. **Add Component Card** in dashboard:
   ```tsx
   <ComponentStatusCard
     name="Your Component"
     type="your-new-component"
     status="healthy"
   />
   ```

3. **Create Detail View** in `ComponentDetailView.tsx`

### Adding Real Telemetry

Replace simulated data in `DashboardContext.tsx`:

```typescript
// Instead of simulated updates
const ingestTelemetry = async () => {
  const response = await fetch('/api/telemetry');
  const data = await response.json();
  updateComponentState(data);
};
```

Use React Query for polling:

```typescript
const { data } = useQuery({
  queryKey: ['telemetry'],
  queryFn: fetchTelemetry,
  refetchInterval: 5000, // Poll every 5 seconds
});
```

### Adding New Routes

In `src/App.tsx`:

```tsx
<Route path="/analytics" element={<AnalyticsPage />} />
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server (http://localhost:5173) |
| `npm run build` | Build production web assets to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint on source code |
| `npm run tauri:dev` | Start Tauri development mode (native window) |
| `npm run tauri:build` | Build native desktop bundle (.deb) |

---

## 🐛 Troubleshooting

### Common Issues

**Tauri build fails:**
```bash
# Ensure Rust is up to date
rustup update

# Check Rust version matches Cargo.toml
rustc --version  # Should be >= 1.77.2
```

**Port 5173 already in use:**
```bash
# Kill existing process
lsof -ti:5173 | xargs kill -9

# Or change port in vite.config.ts
```

**Desktop entry not appearing:**
```bash
# Ensure logo.png exists in root
ls -l logo.png

# Check installation directories
ls ~/.local/share/applications/
ls ~/.local/share/icons/
```

**Dependencies installation fails:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### How to Contribute

1. **Fork the Repository**
   ```bash
   git fork https://github.com/youssef-ben-letaifa/ev-predictor.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Follow existing code style
   - Add TypeScript types
   - Update documentation
   - Test thoroughly

4. **Commit Changes**
   ```bash
   git commit -m "Add: Amazing new feature"
   ```

5. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open Pull Request**

### Development Guidelines

- **Code Style**: Follow ESLint configuration
- **TypeScript**: Maintain full type coverage
- **Components**: Keep them small and focused
- **Testing**: Add tests for new features (vitest recommended)
- **Documentation**: Update README for new features

### Areas for Contribution

- 🐛 Bug fixes and improvements
- ✨ New component types (brake system, suspension, etc.)
- 📊 Enhanced data visualizations
- 🔌 Real telemetry integration
- 🌍 Internationalization (i18n)
- 📱 Mobile responsive design
- 🧪 Test coverage
- 📚 Documentation improvements

---

## 🎯 Roadmap

- [x] Interactive dashboard with component cards
- [x] Predictive alerts system
- [x] Component detail views
- [x] Telemetry simulation
- [x] Native desktop app (Linux)
- [ ] Real-time telemetry integration
- [ ] Advanced ML-based predictions
- [ ] Historical data analytics
- [ ] Export to PDF reports
- [ ] Multi-vehicle fleet management
- [ ] Windows & macOS desktop builds
- [ ] Mobile app (React Native)
- [ ] Cloud synchronization
- [ ] OBD-II integration
- [ ] Automated testing suite

---

## 📄 License

MIT License

Copyright (c) 2024 Youssef BEN LETAIFA

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 👨‍💻 Author

**Youssef BEN LETAIFA**

- GitHub: [@youssef-ben-letaifa](https://github.com/youssef-ben-letaifa)
- LinkedIn: [Youssef Ben Letaifa](https://www.linkedin.com/in/youssefbenletaifa/)
- Portfolio: [youssef-ben-letaifa.github.io](https://youssef-ben-letaifa.github.io/ben.letaifa.youssef/)

---


<div align="center">

### ⚡ Power Your EV Monitoring with Intelligence

**Built with 💙 for the Electric Vehicle Community**

![GitHub stars](https://img.shields.io/github/stars/youssef-ben-letaifa/ev-predictor?style=social)
![GitHub forks](https://img.shields.io/github/forks/youssef-ben-letaifa/ev-predictor?style=social)

**Version 1.0** | Last Updated: January 2025

</div>
