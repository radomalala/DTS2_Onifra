
import React, { useState } from 'react';

const questions = [
  {
    question: "Quel est l’objectif principal de ReactJS ?",
    options: [
      "Gérer une base de données",
      "Créer des interfaces utilisateur dynamiques",
      "Écrire du code serveur",
      "Styliser les composants CSS"
    ],
    answer: 1
  },
  {
    question: "Que retourne un composant React fonctionnel ?",
    options: ["Une chaîne de caractères", "Un tableau", "Du JSX", "Une classe CSS"],
    answer: 2
  },
  {
    question: "Quelle est la syntaxe correcte pour un Hook d’état ?",
    options: [
      "const [data, setData] = useProps(0)",
      "const (data, setData) = useState(0)",
      "let data = useState(0)",
      "const [data, setData] = useState(0)"
    ],
    answer: 3
  },
  {
    question: "Que signifie JSX ?",
    options: ["JavaScript XML", "Java Simple Exchange", "JSON Extended", "JavaScript Extra Syntax"],
    answer: 0
  },
  {
    question: "Dans quel fichier commence l’exécution d’une app React ?",
    options: ["index.html", "index.jsx", "app.js", "main.jsx"],
    answer: 1
  }
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const question = questions[current];

  const handleNext = () => {
    const isCorrect = selected === question.answer;
    if (isCorrect) setScore(score + 1);
    setAnswers([...answers, { question, selected, isCorrect }]);
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Quiz ReactJS</h1>
      {showResult ? (
        <div>
          <h2>Score final : {score} / {questions.length}</h2>
          <h3>Corrigé :</h3>
          <ul>
            {answers.map((entry, index) => (
              <li key={index} style={{ marginBottom: 10 }}>
                <strong>{entry.question.question}</strong><br />
                <span style={{ color: entry.isCorrect ? 'green' : 'red' }}>
                  Votre réponse : {entry.question.options[entry.selected] || "Aucune sélection"}
                </span><br />
                {!entry.isCorrect && (
                  <span style={{ color: 'green' }}>
                    Bonne réponse : {entry.question.options[entry.question.answer]}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h3>{question.question}</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {question.options.map((option, index) => (
              <li key={index}>
                <label style={{
                  backgroundColor: selected === index ? '#cce5ff' : '',
                  padding: '4px 8px',
                  display: 'block',
                  margin: '4px 0',
                  borderRadius: 4,
                  cursor: 'pointer'
                }}>
                  <input
                    type="radio"
                    name="option"
                    value={index}
                    checked={selected === index}
                    onChange={() => setSelected(index)}
                    style={{ marginRight: 8 }}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
          <button disabled={selected === null} onClick={handleNext}>
            {current + 1 === questions.length ? "Terminer" : "Suivant"}
          </button>
        </div>
      )}
    </div>
  );
}
