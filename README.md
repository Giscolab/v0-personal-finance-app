# 💰 Application de Gestion Financière Personnelle

![build](https://img.shields.io/badge/build-passing-brightgreen)
![license](https://img.shields.io/github/license/Giscolab/v0-personal-finance-app)
![plateforme](https://img.shields.io/badge/plateforme-next.js%20%7C%20tauri-blue)

Une application desktop moderne et sécurisée pour la gestion de vos finances personnelles, développée en React, Next.js, TypeScript et Tauri. Vos données restent privées, stockées et chiffrées localement.

---

## 📚 Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Structure du projet](#structure-du-projet)
- [Installation](#installation)
- [Guide d’utilisation](#guide-dutilisation)
- [Sécurité](#sécurité)
- [Contribution](#contribution)
- [Support](#support)

---

## 🌟 Fonctionnalités

- Tableau de bord avancé avec indicateurs financiers
- Gestion intuitive des transactions : ajout, édition, suppression, filtrage, recherche
- Budgets mensuels et suivi dynamique
- Import de données multi-formats (CSV, OFX, QIF, MT940)
- Prévisions et analyses visuelles (graphiques, heatmaps)
- Sécurité renforcée : chiffrement local, verrouillage, fonctionnement offline

---

## 🛠️ Technologies / dépendances principales

- **React** (`^19`)
- **Next.js** (`14.2.25`)
- **TypeScript** (`^5` - devDependency)
- **Tailwind CSS** (`^4.1.9`)
- **Radix UI** (collection de composants avancés UI : `@radix-ui/*`)
- **Lucide React** (icônes)
- **date-fns** (gestion de dates)
- **Recharts** et **ECharts** (visualisation de données)
- **PostCSS**, **autoprefixer**, **clsx** (outils CSS)
- **Zod**, **react-hook-form**, **@hookform/resolvers** (formulaires et validation)
- **ESLint** (linting, devDependency)
- **Prettier** (à ajouter si besoin)
- **pnpm** (gestionnaire recommandé mais compatible npm/yarn)

> **Note ⚡** Le backend Tauri (Rust/SQLCipher) doit être installé à part, il ne figure pas dans ce package.json frontend.

---

## 📁 Structure du projet (extrait)

```text
├── app/                # Pages Next.js
├── components/         # Composants React (UI, charts…)
├── hooks/              # Hooks personnalisés
├── lib/                # Helpers/utilitaires
├── types/              # Types TypeScript
├── src-tauri/          # Backend Rust (Tauri)
├── package.json
├── tailwind.config.js
└── ...
```

---

## 🚀 Installation

### 1. Prérequis

- [Node.js 18+](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (ou `npm`/`yarn`)
- [Rust 1.70+](https://www.rust-lang.org/tools/install) **et** [Tauri CLI](https://tauri.app/) pour la partie desktop

### 2. Clonage et dépendances

Sous PowerShell :

```powershell
git clone https://github.com/Giscolab/v0-personal-finance-app.git
cd v0-personal-finance-app
pnpm install
```
*Si vous utilisez npm :*  
```powershell
npm install
```

### 3. Lancer l’application en développement

Si vous travaillez uniquement sur le frontend Next.js :
```powershell
pnpm dev
# ou
npm run dev
```

Pour lancer l’application desktop (nécessite Tauri CLI et Rust) :
```powershell
pnpm tauri dev
# ou
npm run tauri dev
```

### 4. Construire pour la production

```powershell
pnpm build
# ou
npm run build
```
Pour le build desktop (Windows .exe, .msi, etc.) :
```powershell
pnpm tauri build
```

---

## 📖 Guide d’utilisation

- Accédez à l’interface via le navigateur ou l’application desktop.
- Ajoutez vos transactions et configurez vos budgets.
- Importez vos dépenses (CSV, etc.) dans l’interface prévue.
- Explorez les analyses et visualisations offertes.
- Activez le verrouillage automatique et configurez un mot de passe fort.

---

## 🔒 Sécurité

- Toutes les données sont stockées localement, chiffrées (côté Rust avec SQLCipher et Tauri).
- Pas d’envoi de données en ligne, pas de tracking.
- Soutien au verrouillage automatique et mot de passe maître.

---

## 🤝 Contribution

1. Forkez ce dépôt.
2. Créez une nouvelle branche avec :
   ```powershell
   git checkout -b feature/ma-fonctionnalite
   ```
3. Développez localement et testez vos changements.
4. Validez :
   ```powershell
   git commit -am "Ajout : ma nouvelle fonctionnalité"
   git push origin feature/ma-fonctionnalite
   ```
5. Créez une Pull Request.

**Normes :**  
- Respectez la configuration ESLint/TypeScript stricte.
- Ajoutez des tests si pertinent.

---

## 📞 Support

- Pour toute question, utilisez les [issues GitHub](https://github.com/Giscolab/v0-personal-finance-app/issues).
- Consultez le code et les commentaires pour plus d’informations.

---

**Développé avec ❤️ par Giscolab – pour une gestion financière moderne, locale et sécurisée.**
