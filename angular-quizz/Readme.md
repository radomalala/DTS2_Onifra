# 🎯 Angular Quiz - Test de Connaissances

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Une application de quiz interactive développée avec **React** pour tester vos connaissances en **Angular**. Interface moderne, intuitive et responsive.

## ✨ Fonctionnalités

- ✅ **10 questions** couvrant les concepts essentiels d'Angular
- 📊 **Système de score** en temps réel
- 🎨 **Interface moderne** avec animations fluides
- 📱 **Design responsive** - fonctionne sur tous les appareils
- 🔄 **Barre de progression** interactive
- 📝 **Explications détaillées** pour chaque question
- 🏆 **Écran de résultats** avec récapitulatif complet
- ♻️ **Possibilité de recommencer** le quiz

## 🎥 Aperçu

Le quiz couvre les sujets suivants :
- Composants et décorateurs Angular
- Data binding (one-way, two-way)
- Services et injection de dépendances
- Directives structurelles (*ngFor, *ngIf)
- Modules (FormsModule, RouterModule)
- Observables et RxJS
- Angular CLI

## 🚀 Installation

### Prérequis

- [Node.js](https://nodejs.org/) (version 18.x ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Cloner le repository**

```bash
git clone https://github.com/votre-username/angular-quiz.git
cd angular-quiz
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configuration Tailwind CSS**

Le projet utilise Tailwind CSS via CDN pour simplifier l'installation. Si vous préférez l'installation locale :

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. **Lancer le projet en développement**

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📦 Build pour la production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`

## 🛠️ Technologies utilisées

- **React 18** - Bibliothèque UI
- **Vite** - Build tool et dev server ultra-rapide
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Icônes modernes et légères

## 📂 Structure du projet

```
angular-quiz/
├── public/              # Fichiers statiques
├── src/
│   ├── App.jsx         # Composant principal du quiz
│   ├── index.css       # Styles globaux
│   └── main.jsx        # Point d'entrée de l'application
├── index.html          # Template HTML
├── package.json        # Dépendances et scripts
├── vite.config.js      # Configuration Vite
└── README.md           # Documentation
```

## 🎮 Utilisation

1. Lisez attentivement chaque question
2. Sélectionnez votre réponse parmi les 4 options
3. Cliquez sur "Question Suivante" pour continuer
4. À la fin, consultez votre score et les explications
5. Recommencez pour améliorer votre score !

## 🎨 Personnalisation

### Ajouter des questions

Modifiez le tableau `questions` dans `src/App.jsx` :

```javascript
const questions = [
  {
    question: "Votre question ici ?",
    options: [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],
    correctAnswer: 0, // Index de la bonne réponse (0-3)
    explanation: "Explication de la réponse correcte"
  },
  // ... autres questions
];
```

### Modifier les couleurs

Les couleurs peuvent être personnalisées dans les classes Tailwind :
- Thème principal : `from-red-500 to-pink-500`
- Couleurs de fond : `from-red-50 to-pink-50`

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit vos changements (`git commit -m 'Ajout de nouvelles questions'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## 📝 Idées d'améliorations

- [ ] Ajouter un système de catégories (Débutant, Intermédiaire, Avancé)
- [ ] Chronomètre pour chaque question
- [ ] Mode multijoueur
- [ ] Sauvegarde des scores dans le localStorage
- [ ] Partage des résultats sur les réseaux sociaux
- [ ] Plus de questions (30+)
- [ ] Mode sombre
- [ ] Support multilingue

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**Votre Nom**
- GitHub: [@votre-username](https://github.com/votre-username)
- Email: votre.email@example.com

## 🙏 Remerciements

- Merci à l'équipe Angular pour la documentation
- Icônes par [Lucide](https://lucide.dev/)
- Interface inspirée par les designs modernes de quiz

---

⭐ Si ce projet vous a aidé, n'oubliez pas de lui donner une étoile sur GitHub !

**Fait avec ❤️ et React**
