# 💰 Application de Gestion Financière Personnelle

Une application desktop moderne et sécurisée de gestion financière personnelle développée avec React et Tauri, offrant une analyse avancée de vos finances avec des visualisations sophistiquées et un système de coffre-fort chiffré.

## 🌟 Fonctionnalités Principales

### 📊 Tableau de Bord Avancé
- **Indicateurs financiers sophistiqués** : ITT (Indice de Tension de Trésorerie), burn rate, runway, volatilité, drawdown
- **Graphiques OHLC** : Analyse en bougies japonaises de votre solde quotidien avec volumes
- **Heatmap calendaire** : Visualisation thermique de vos dépenses quotidiennes sur l'année
- **Métriques en temps réel** : Solde, revenus, dépenses, épargne avec évolutions

### 💳 Gestion des Transactions
- **Interface intuitive** : Ajout, modification et suppression de transactions
- **Filtrage avancé** : Par date, montant, catégorie, compte
- **Recherche intelligente** : Recherche textuelle dans les descriptions
- **Catégorisation automatique** : Classification intelligente des transactions
- **Indicateurs visuels** : Codes couleur pour revenus/dépenses

### 📈 Budgets et Suivi
- **Budgets par catégorie** : Définition de limites mensuelles personnalisées
- **Indicateurs de progression** : Barres de progression avec alertes de dépassement
- **Analyse comparative** : Budget vs dépenses réelles
- **Alertes intelligentes** : Notifications de dépassement avec seuils configurables

### 🔮 Prévisions Financières
- **Modèles de prévision** : Algorithmes de prédiction basés sur l'historique
- **Scénarios multiples** : Projections optimistes, pessimistes, réalistes
- **Analyse de tendances** : Identification des patterns de dépenses
- **Planification à long terme** : Projections sur 6-12 mois

### 📥 Import de Données
- **Formats multiples** : Support CSV, OFX, QIF, MT940
- **Drag & Drop** : Interface intuitive de glisser-déposer
- **Anti-doublons** : Détection automatique des transactions dupliquées
- **Validation robuste** : Vérification et nettoyage des données importées

### 🔒 Sécurité et Confidentialité
- **Écran de verrouillage** : Protection par mot de passe au démarrage
- **Auto-verrouillage** : Verrouillage automatique après inactivité
- **Stockage local** : Toutes les données restent sur votre appareil
- **Chiffrement** : Protection des données sensibles
- **Mode hors-ligne** : Fonctionnement 100% local, aucune connexion requise

## 🛠️ Technologies Utilisées

### Application Desktop
- **Tauri** - Framework Rust pour applications desktop sécurisées
- **React 18** - Interface utilisateur moderne et réactive
- **TypeScript** - Typage statique pour une meilleure robustesse
- **Tailwind CSS v4** - Framework CSS utilitaire moderne
- **Shadcn/ui** - Composants UI élégants et accessibles
- **Lucide React** - Icônes modernes et cohérentes

### Base de Données et Sécurité
- **SQLite** - Base de données locale embarquée
- **SQLCipher** - Chiffrement AES-256-GCM de la base de données
- **PBKDF2** - Dérivation de clé avec 200 000 itérations
- **Rust** - Backend sécurisé pour les opérations critiques

### Visualisation de Données
- **Apache ECharts** - Graphiques interactifs haute performance
- **Recharts** - Graphiques React natifs pour certains composants
- **Charts personnalisés** - Composants de visualisation sur mesure

### Développement
- **ESLint** - Linting et qualité du code
- **Prettier** - Formatage automatique du code
- **Cargo** - Gestionnaire de paquets Rust
- **TypeScript strict** - Configuration stricte pour la robustesse

## 📁 Structure du Projet

\`\`\`
├── app/                          # Pages et routes (App Router)
│   ├── layout.tsx               # Layout racine avec navigation
│   ├── client-layout.tsx        # Layout client avec état global
│   ├── page.tsx                 # Tableau de bord principal
│   ├── transactions/            # Gestion des transactions
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── budgets/                 # Suivi des budgets
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── forecasting/             # Prévisions financières
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── import/                  # Import de données
│   │   └── page.tsx
│   └── globals.css              # Styles globaux et tokens design
├── components/                   # Composants réutilisables
│   ├── ui/                      # Composants UI de base (shadcn)
│   ├── lock-screen.tsx          # Écran de verrouillage sécurisé
│   ├── sidebar-navigation.tsx   # Navigation latérale
│   ├── chart-line.tsx           # Graphiques en ligne
│   ├── candlestick-chart.tsx    # Graphiques OHLC
│   ├── calendar-heatmap.tsx     # Heatmap calendaire
│   ├── financial-indicators.tsx # Indicateurs financiers
│   └── theme-provider.tsx       # Gestion des thèmes
├── hooks/                       # Hooks React personnalisés
│   ├── use-mobile.tsx           # Détection mobile
│   └── use-toast.ts             # Système de notifications
├── lib/                         # Utilitaires et helpers
│   └── utils.ts                 # Fonctions utilitaires
├── types/                       # Définitions TypeScript
│   └── financial.ts             # Types pour les données financières
├── src-tauri/                    # Backend Rust avec Tauri
│   ├── Cargo.toml               # Configuration du projet Rust
│   ├── src/                     # Code source backend
│   └── tauri.conf.json          # Configuration Tauri
└── assets/                       # Fichiers statiques
    └── icons/                   # Icônes utilisées
\`\`\`

## 🚀 Installation et Configuration

### Prérequis
- **Rust** 1.70+ avec Cargo
- **Node.js** 18+ 
- **pnpm** (recommandé) ou npm/yarn
- **Tauri CLI** : `cargo install tauri-cli`

### Installation

1. **Cloner le repository**
\`\`\`bash
git clone https://github.com/votre-username/finance-app.git
cd finance-app
\`\`\`

2. **Installer les dépendances**
\`\`\`bash
# Frontend React
pnpm install

# Backend Rust (automatique avec Tauri)
cargo install tauri-cli
\`\`\`

3. **Développement**
\`\`\`bash
# Lancer en mode développement
pnpm tauri dev
\`\`\`

4. **Build de production**
\`\`\`bash
# Compiler l'application desktop
pnpm tauri build
\`\`\`

### Build Tauri
L'application sera compilée dans `src-tauri/target/release/` :
- **Windows** : `.exe` et installateur `.msi`
- **macOS** : `.app` et `.dmg`
- **Linux** : `.AppImage` et `.deb`

### Configuration Initiale

1. **Premier lancement** : Définissez votre mot de passe maître pour le coffre-fort
2. **Initialisation du coffre** : La base SQLite chiffrée est créée automatiquement
3. **Import de données** : Importez vos relevés bancaires via la page Import
4. **Configuration des budgets** : Définissez vos limites mensuelles par catégorie

## 📖 Guide d'Utilisation

### Écran de Verrouillage
- L'application se verrouille automatiquement après 15 minutes d'inactivité
- Utilisez votre mot de passe maître pour déverrouiller
- Option "Se souvenir de moi" pour éviter les verrouillages fréquents

### Tableau de Bord
- **Vue d'ensemble** : Métriques clés en un coup d'œil
- **Graphiques interactifs** : Cliquez et explorez vos données
- **Indicateurs avancés** : Surveillez votre santé financière
- **Transactions récentes** : Accès rapide aux dernières opérations

### Gestion des Transactions
- **Ajout manuel** : Bouton "+" pour ajouter une transaction
- **Modification** : Clic sur une transaction pour l'éditer
- **Filtres** : Utilisez les filtres pour analyser des périodes spécifiques
- **Export** : Exportez vos données au format CSV

### Budgets
- **Création** : Définissez des budgets mensuels par catégorie
- **Suivi** : Barres de progression en temps réel
- **Alertes** : Notifications automatiques en cas de dépassement
- **Historique** : Consultez l'évolution de vos budgets

### Prévisions
- **Modèles** : Choisissez entre différents algorithmes de prévision
- **Scénarios** : Explorez différentes hypothèses d'évolution
- **Planification** : Anticipez vos besoins financiers futurs

## 🔧 Personnalisation

### Thèmes
L'application supporte les modes clair et sombre avec basculement automatique selon les préférences système.

### Catégories
Personnalisez les catégories de transactions selon vos habitudes :
- Alimentation, Transport, Logement, Loisirs, etc.
- Couleurs personnalisables pour chaque catégorie
- Icônes associées pour une meilleure lisibilité

### Indicateurs
Configurez les seuils d'alerte pour :
- ITT (Indice de Tension de Trésorerie)
- Burn rate quotidien
- Runway (autonomie financière)
- Volatilité acceptable

## 🔒 Sécurité et Confidentialité

### Architecture de Sécurité Bancaire
- **Coffre-fort chiffré** : Base de données SQLite protégée par SQLCipher
- **Chiffrement AES-256-GCM** : Standard bancaire pour la protection des données
- **Dérivation de clé PBKDF2** : 200 000 itérations pour résister aux attaques par force brute
- **Clé maître** : Dérivée de votre mot de passe, jamais stockée en clair
- **Verrouillage automatique** : Coffre verrouillé après 15 minutes d'inactivité

### Protection des Données
- **100% offline** : Aucune connexion réseau, toutes les données restent locales
- **Isolation Tauri** : Sandbox sécurisé entre frontend et backend
- **Pas de télémétrie** : Aucun suivi, tracking ou envoi de données
- **Code auditable** : Architecture transparente et vérifiable
- **Sauvegarde chiffrée** : Export/import du coffre avec protection par mot de passe

### Bonnes Pratiques
- Utilisez un mot de passe maître fort (12+ caractères, mixte)
- Sauvegardez régulièrement votre coffre chiffré
- Maintenez l'application à jour pour les correctifs de sécurité
- Évitez l'utilisation sur des systèmes compromis

## 🤝 Contribution

### Développement Local
1. Fork le repository
2. Installez Rust et Node.js
3. Créez une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
4. Développez avec `pnpm tauri dev`
5. Testez avec `cargo test` et `pnpm test`
6. Committez vos changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
7. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
8. Créez une Pull Request

### Standards de Code
- **Rust** : Suivre les conventions Rust avec `cargo fmt` et `cargo clippy`
- **TypeScript strict** : Tous les types doivent être définis
- **ESLint** : Le code doit passer tous les tests de linting
- **Tests** : Ajoutez des tests unitaires pour Rust et React
- **Sécurité** : Audit de sécurité obligatoire pour les changements critiques

## 📞 Support

Pour toute question ou assistance :
- 🐛 Issues : [GitHub Issues](https://github.com/votre-username/finance-app/issues)
- 📖 Documentation : Consultez le code source et les commentaires
- 🔒 Sécurité : Rapportez les vulnérabilités via security@finance-app.com

---

**Application desktop développée avec ❤️ pour une gestion financière personnelle moderne, sécurisée et 100% privée**
