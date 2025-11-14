import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

const AngularQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const questions = [
    {
      question: "Qu'est-ce qu'Angular ?",
      options: [
        "Une bibliothèque JavaScript",
        "Un framework TypeScript pour applications web",
        "Un langage de programmation",
        "Un éditeur de code"
      ],
      correctAnswer: 1,
      explanation: "Angular est un framework TypeScript développé par Google pour créer des applications web dynamiques."
    },
    {
      question: "Quel décorateur est utilisé pour définir un composant Angular ?",
      options: [
        "@Component",
        "@Directive",
        "@NgModule",
        "@Injectable"
      ],
      correctAnswer: 0,
      explanation: "@Component est le décorateur qui définit un composant Angular avec ses métadonnées (selector, template, styles)."
    },
    {
      question: "Que signifie le data binding [(ngModel)] ?",
      options: [
        "One-way binding",
        "Two-way binding",
        "Event binding",
        "Property binding"
      ],
      correctAnswer: 1,
      explanation: "[(ngModel)] est la syntaxe du two-way binding qui permet la synchronisation bidirectionnelle entre le modèle et la vue."
    },
    {
      question: "Quel est le rôle d'un service en Angular ?",
      options: [
        "Afficher des composants",
        "Gérer le routing",
        "Partager des données et logique métier",
        "Créer des animations"
      ],
      correctAnswer: 2,
      explanation: "Les services permettent de partager des données, de la logique métier et des fonctionnalités entre différents composants."
    },
    {
      question: "Quelle directive permet de boucler sur un tableau ?",
      options: [
        "*ngIf",
        "*ngFor",
        "*ngSwitch",
        "*ngModel"
      ],
      correctAnswer: 1,
      explanation: "*ngFor est une directive structurelle qui permet d'itérer sur une collection et de répéter un template pour chaque élément."
    },
    {
      question: "Comment injecter un service dans un composant ?",
      options: [
        "Via le constructeur",
        "Avec @Input()",
        "Avec @ViewChild()",
        "Avec import"
      ],
      correctAnswer: 0,
      explanation: "L'injection de dépendances se fait via le constructeur du composant avec TypeScript."
    },
    {
      question: "Quel module est nécessaire pour utiliser ngModel ?",
      options: [
        "CommonModule",
        "FormsModule",
        "HttpClientModule",
        "RouterModule"
      ],
      correctAnswer: 1,
      explanation: "FormsModule doit être importé pour utiliser ngModel et les fonctionnalités de formulaires template-driven."
    },
    {
      question: "Que permet le décorateur @Input() ?",
      options: [
        "Émettre des événements",
        "Recevoir des données du composant parent",
        "Définir un composant",
        "Créer un service"
      ],
      correctAnswer: 1,
      explanation: "@Input() permet à un composant enfant de recevoir des données depuis son composant parent."
    },
    {
      question: "Quelle commande CLI crée un nouveau composant ?",
      options: [
        "ng create component",
        "ng new component",
        "ng generate component",
        "ng make component"
      ],
      correctAnswer: 2,
      explanation: "La commande 'ng generate component' ou 'ng g c' crée un nouveau composant avec tous ses fichiers."
    },
    {
      question: "Qu'est-ce qu'un Observable en Angular ?",
      options: [
        "Un type de variable",
        "Un flux de données asynchrone",
        "Une directive",
        "Un module"
      ],
      correctAnswer: 1,
      explanation: "Un Observable est un flux de données asynchrone provenant de RxJS, utilisé pour gérer les opérations asynchrones."
    }
  ];

  const handleAnswerClick = (selectedIndex) => {
    setSelectedAnswer(selectedIndex);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    
    setAnsweredQuestions([...answeredQuestions, {
      question: currentQuestion,
      selectedAnswer,
      isCorrect
    }]);

    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setAnsweredQuestions([]);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return '🎉 Excellent ! Vous maîtrisez Angular !';
    if (percentage >= 60) return '👍 Bon travail ! Continuez à apprendre.';
    if (percentage >= 40) return '📚 Pas mal, mais il y a place à amélioration.';
    return '💪 Continuez à étudier Angular !';
  };

  if (showScore) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="text-center mb-8">
            <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Terminé !</h2>
            <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
              {score} / {questions.length}
            </div>
            <p className="text-xl text-gray-600 mb-6">{getScoreMessage()}</p>
            <div className="text-lg text-gray-700">
              Score : {Math.round((score / questions.length) * 100)}%
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Récapitulatif :</h3>
            {answeredQuestions.map((ans, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                {ans.isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                )}
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{questions[ans.question].question}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {questions[ans.question].explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={resetQuiz}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-red-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Recommencer le Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-4 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-gray-600 bg-red-100 px-4 py-2 rounded-full">
              Question {currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-sm font-semibold text-gray-600">
              Score: {score}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <div
              className="bg-gradient-to-r from-red-500 to-pink-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {questions[currentQuestion].question}
          </h2>
        </div>

        <div className="space-y-3 mb-8">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                selectedAnswer === index
                  ? 'border-red-500 bg-red-50 shadow-md'
                  : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
              }`}
            >
              <span className="font-medium text-gray-800">{option}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
            selectedAnswer === null
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-lg'
          }`}
        >
          {currentQuestion === questions.length - 1 ? 'Terminer' : 'Question Suivante'}
        </button>
      </div>
    </div>
  );
};

export default AngularQuiz;