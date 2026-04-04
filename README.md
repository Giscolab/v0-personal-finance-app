# 💰 Personal Finance Desktop App

![build](https://img.shields.io/badge/build-passing-brightgreen) ![license](https://img.shields.io/github/license/Giscolab/v0-personal-finance-app) ![platform](https://img.shields.io/badge/platform-tauri%20%7C%20next.js-blue) 

Modern, secure, and local-first desktop application to analyze and manage your personal finances. Built with React, TypeScript, Next.js, and Tauri, this application helps you visualize, forecast and control your budgets – 100% private, your data never leaves your machine!  

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [Security](#security)
- [Customization](#customization)
- [Contributing](#contributing)
- [Support](#support)

---

## 🌟 Features

### 📊 Advanced Dashboard
- Sophisticated financial indicators: ITT (Cash Flow Index), burn rate, runway, volatility, drawdown
- OHLC candlestick charts: Japanese-style with volumes
- Calendar heatmaps: yearly spend patterns
- Real-time metrics: balance, income, expenses, savings with trend monitoring

### 💳 Transaction Management
- Intuitive CRUD: add, edit, delete transactions
- Advanced filters: date, amount, category, account
- Smart search: free-text search in descriptions
- Automatic categorization: intelligent classification
- Visual cues: color-coded incomes/expenses

### 📈 Budgets & Tracking
- Custom monthly budgets by category
- Progress bars with overrun alerts
- Comparative analysis: budget vs. actual
- Intelligent notifications: configurable thresholds

### 🔮 Forecasting
- Predictive analytics: historical algorithms
- Scenario modeling: optimistic, pessimistic, realistic
- Trend detection: identify spending patterns
- Long-term planning: 6-12 month projections

### 📥 Data Import
- Multiple formats: CSV, OFX, QIF, MT940
- Intuitive drag & drop UI
- Duplicate detection, robust data validation

### 🔒 Security & Privacy
- Lock screen: password at startup
- Auto-lock after inactivity
- Local storage only: no server or cloud
- Encryption: all sensitive data protected

---

## 🛠️ Tech Stack

- **Frontend**: React 18+, Next.js 14+, TypeScript, Tailwind CSS v4, [Shadcn/ui](https://ui.shadcn.com/), [Lucide React](https://lucide.dev/)
- **Backend**: [Tauri](https://tauri.app/) (Rust), SQLite local DB (encrypted with SQLCipher)
- **Visualization**: [Apache ECharts](https://echarts.apache.org/), [Recharts](https://recharts.org/en-US/)
- **Tooling**: ESLint, Prettier, Cargo, strict TypeScript, pnpm
- **Other**: [Radix UI primitives](https://www.radix-ui.com/), [date-fns](https://date-fns.org/)

---

## 📁 Project Structure

```text
├── app/                # Pages & routes (App Router)
│   ├── layout.tsx
│   ├── client-layout.tsx
│   ├── page.tsx
│   ├── transactions/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── budgets/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── forecasting/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── import/
│   │   └── page.tsx
│   └── globals.css
├── components/         # Reusable React components
│   ├── ui/
│   ├── lock-screen.tsx
│   ├── sidebar-navigation.tsx
│   ├── chart-line.tsx
│   ├── candlestick-chart.tsx
│   ├── calendar-heatmap.tsx
│   ├── financial-indicators.tsx
│   └── theme-provider.tsx
├── hooks/              # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/                # Utilities & helpers
│   └── utils.ts
├── types/              # TypeScript types
│   └── financial.ts
├── src-tauri/          # Tauri (Rust backend)
│   ├── Cargo.toml
│   ├── src/
│   └── tauri.conf.json
└── assets/
    └── icons/
```

---

## 🚀 Installation

### 1. Pre-requisites

- **Rust** 1.70+ (with Cargo)
- **Node.js** 18+
- **pnpm** (or npm/yarn)
- **Tauri CLI**:  
  ```sh
  cargo install tauri-cli
  ```

### 2. Setup

```sh
# Clone the repository
git clone https://github.com/Giscolab/v0-personal-finance-app.git
cd v0-personal-finance-app

# Install frontend dependencies
pnpm install

# (Optional) Install Tauri CLI if not done above
cargo install tauri-cli
```

### 3. Development

```sh
# Launch the app in dev mode (Next.js + Tauri)
pnpm tauri dev
```

### 4. Production Build

```sh
pnpm tauri build
# Artifacts found in src-tauri/target/release/
```

#### For Windows: `.exe` and `.msi`  
#### For macOS: `.app` and `.dmg`  
#### For Linux: `.AppImage` and `.deb`

---

## 📖 Usage Guide

### Lock Screen
- App auto-locks after 15 min inactivity
- Use master password to unlock
- "Remember me" option available

### Dashboard
- Key metrics at a glance
- Interactive charts & indicators
- Recent transactions overview

### Transaction Management
- Manual add (+), edit, and filter actions
- Export to CSV

### Budgets
- Create/check monthly budgets
- Real-time progress and alerts
- Budget history

### Forecasting
- Switch between predictive algorithms & scenarios
- Plan future needs

---

## 🔧 Customization

- **Themes**: Light/dark based on system preference
- **Categories**: Create/customize your own categories and colors
- **Indicators**: Set threshold levels for alerts (e.g. ITT, burn rate, volatility)

---

## 🔒 Security

### Architecture

- **Encrypted vault**: SQLCipher (AES-256-GCM)
- **Key derivation**: PBKDF2, 200k iterations
- **Master key**: Derived (never stored in clear)
- **Full offline**: No network, local-only
- **Sandboxing**:  Tauri isolation between frontend & backend
- **No telemetry**: No tracking or analytics

### Recommendations

- Use a strong master password (≥12 chars)
- Back up your encrypted vault regularly
- Keep the app updated for security fixes

---

## 🤝 Contributing

1. Fork the repository
2. Install Rust & Node.js
3. Create a feature branch  
   ```sh
   git checkout -b feature/awesome-feature
   ```
4. Dev: `pnpm tauri dev`
5. Test: `cargo test`, `pnpm test`
6. Commit & push  
   ```sh
   git commit -am "Add awesome feature"
   git push origin feature/awesome-feature
   ```
7. Open a Pull Request

**Code style:**  
- Rust: `cargo fmt`, `cargo clippy`  
- TypeScript: strict types everywhere  
- ESLint must pass  
- Add unit tests (both Rust + React)  
- Security review on critical changes

---

## 📞 Support

- 💬 Issues: [GitHub Issues](https://github.com/Giscolab/v0-personal-finance-app/issues)
- 📖 Docs: browse code & comments
- 🔒 Security: report vulnerabilities to security@finance-app.com

---

**Made with ❤️ for modern, secure & private finance management.**
