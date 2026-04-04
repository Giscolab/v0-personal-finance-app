# 💰 Application de Gestion Financière Personnelle

![build](https://img.shields.io/badge/build-passing-brightgreen)
![license](https://img.shields.io/github/license/Giscolab/v0-personal-finance-app)
![plateforme](https://img.shields.io/badge/plateforme-next.js%20%7C%20react%20%7C%20tailwind-blue)

Application desktop et web moderne pour la gestion et l’analyse de vos finances personnelles. 100% locale : vos données restent chez vous !  
Stack : Next.js 14, React 19, TypeScript 5, TailwindCSS 4, Radix UI, visualisation avancée grâce aux librairies Echarts & Recharts.

---

## 📚 Sommaire
- [Fonctionnalités](#fonctionnalités)
- [Dépendances principales](#dépendances-principales)
- [Installation (PowerShell)](#installation-powershell)
- [Utilisation](#utilisation)
- [Contribution](#contribution)
- [Structure du projet](#structure-du-projet)
- [Support](#support)

---

## 🌟 Fonctionnalités

- Tableau de bord d’indicateurs financiers
- Gestion complète et filtrage des transactions
- Graphiques et vues avancées (Recharts/Echarts)
- Budgets mensuels par catégorie
- Prévisions/dossiers, visualisation calendrier et heatmaps
- Import/export multi-format : CSV, OFX, QIF, MT940
- Filtrage/Recherche avancés, système d’alertes
- Sécurité locale, mode hors-ligne
- UI moderne et accessible, thèmes light/dark

---

## 🛠️ Dépendances principales (issues du package.json)

- **Framework UI** : `react@^19`, `react-dom@^19`, `next@14.2.25`
- **UI avancée (Radix)** :
  - `@radix-ui/react-*` : Dialog, Accordion, Alert, Avatar, Checkbox, Menu, Popover, etc.
- **Formulaires & valid.** : `react-hook-form`, `@hookform/resolvers`, `zod`
- **Icônes & Design** : `lucide-react`, `geist`, `class-variance-authority`, `clsx`
- **Visualisations** : `echarts`, `recharts`
- **Date utils** : `date-fns`, `react-day-picker`
- **Animations & Carrousels** : `embla-carousel-react`, `tw-animate-css`
- **Thèmes** : `next-themes`
- **CSS & tooling** : `tailwindcss`, `autoprefixer`, `postcss`, `tailwindcss-animate`, `tailwind-merge`
- **Dev only** : `typescript`, `@types/node`, `@types/react*`, `@tailwindcss/postcss`

---

## 🚀 Installation (PowerShell)

1. **Prérequis** :
   - [Node.js 18+](https://nodejs.org/)
   - [pnpm](https://pnpm.io/) ([installation PowerShell](https://pnpm.io/installation))
   - *ou utilisez `npm` à la place de `pnpm` si nécessaire*

2. **Cloner le repo et installer les dépendances** :

   ```powershell
   git clone https://github.com/Giscolab/v0-personal-finance-app.git
   cd v0-personal-finance-app
   pnpm install
   # ou npm install
   ```

3. **Démarrer en mode développement** :
   ```powershell
   pnpm dev
   # ou npm run dev
   ```

4. **Créer un build de production** :
   ```powershell
   pnpm build
   # ou npm run build
   ```

5. **Linter le projet** :
   ```powershell
   pnpm lint
   # ou npm run lint
   ```

---

## 👩‍💻 Utilisation

- Par défaut, l’application tourne sur http://localhost:3000
- Connectez-vous ou créez un compte local.
- Accédez à toutes les fonctionnalités depuis le dashboard (ajouter transactions, visualiser, importer…).
- Utilisez le filtre, le tri, et changez de thème dans les paramètres.

---

## 🤝 Contribution

1. Forkez le dépôt puis créez une branche :
    ```powershell
    git checkout -b feature/ma-feature
    ```
2. Développez, committez et pushez vos changements :
    ```powershell
    git commit -am "feat: nouvelle fonctionnalité"
    git push origin feature/ma-feature
    ```
3. Ouvrez une Pull Request sur GitHub

**Respectez les règles :**
- Passer tous les tests ESLint (`pnpm lint`)
- Utiliser les types TypeScript stricts
- Ajouter des tests si nécessaire
- Nommez vos commits clairement

---

## 📁 Structure du projet

```text
├── app/        # Pages Next.js
├── components/ # Composants React
├── hooks/      # Hooks personnalisés
├── lib/        # Fonctions utilitaires
├── types/      # Types TypeScript
├── public/     # Assets statiques
├── package.json
└── ...
```

---

## 📞 Support

- Ouvrir une issue : [Github Issues](https://github.com/Giscolab/v0-personal-finance-app/issues)
- Consultez le code et les commentaires pour toute question

---

**Développé avec ❤️ par Giscolab – gestion financière moderne, locale & sécurisée**