"use client";

import { motion } from "framer-motion";
import { Check, ChevronRight, Home, RotateCcw, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Writing exercise data
const WRITING_EXERCISES = [
  // Verb Conjugations
  {
    id: "conjugation-1",
    type: "conjugation",
    category: "Verb Conjugations",
    question: "I am a student",
    greek: "_____ μαθητής/μαθήτρια",
    answer: "Είμαι",
    hint: "First person singular of 'to be' (εἰμί)",
    explanation: "Είμαι = I am (from the verb 'to be')",
  },
  {
    id: "conjugation-2",
    type: "conjugation",
    category: "Verb Conjugations",
    question: "You have a book",
    greek: "_____ ένα βιβλίο",
    answer: "Έχεις",
    hint: "Second person singular of 'to have' (ἔχω)",
    explanation: "Έχεις = You have (from the verb 'to have')",
  },
  {
    id: "conjugation-3",
    type: "conjugation",
    category: "Verb Conjugations",
    question: "We do/make work",
    greek: "_____ δουλειά",
    answer: "Κάνουμε",
    hint: "First person plural of 'to do/make' (κάνω)",
    explanation: "Κάνουμε = We do/make (from the verb 'to do/make')",
  },
  {
    id: "conjugation-4",
    type: "conjugation",
    category: "Verb Conjugations",
    question: "They go to school",
    greek: "_____ στο σχολείο",
    answer: "Πάνε",
    hint: "Third person plural of 'to go' (πάω)",
    explanation: "Πάνε = They go (from the verb 'to go')",
  },

  // Vocabulary
  {
    id: "vocabulary-1",
    type: "vocabulary",
    category: "Basic Vocabulary",
    question: "The house is big",
    greek: "Το _____ είναι μεγάλο",
    answer: "σπίτι",
    hint: "A place where people live",
    explanation: "σπίτι = house (neuter noun)",
  },
  {
    id: "vocabulary-2",
    type: "vocabulary",
    category: "Basic Vocabulary",
    question: "I drink water",
    greek: "Πίνω _____",
    answer: "νερό",
    hint: "Clear liquid that we drink",
    explanation: "νερό = water (neuter noun)",
  },
  {
    id: "vocabulary-3",
    type: "vocabulary",
    category: "Basic Vocabulary",
    question: "The weather is good",
    greek: "Ο καιρός είναι _____",
    answer: "καλός",
    hint: "Opposite of bad",
    explanation: "καλός = good (masculine adjective)",
  },
  {
    id: "vocabulary-4",
    type: "vocabulary",
    category: "Basic Vocabulary",
    question: "My friend is nice",
    greek: "Ο _____ μου είναι συμπαθητικός",
    answer: "φίλος",
    hint: "Someone you like and spend time with",
    explanation: "φίλος = friend (masculine noun)",
  },

  // Sentence Completion
  {
    id: "sentence-1",
    type: "sentence",
    category: "Sentence Completion",
    question: "Good morning! How are you?",
    greek: "Καλημέρα! _____ είσαι;",
    answer: "Πώς",
    hint: "Question word meaning 'how'",
    explanation: "Πώς = How (question word)",
  },
  {
    id: "sentence-2",
    type: "sentence",
    category: "Sentence Completion",
    question: "I live in Greece",
    greek: "Μένω _____ Ελλάδα",
    answer: "στην",
    hint: "Preposition 'in' + feminine article",
    explanation: "στην = in the (στο + την for feminine nouns)",
  },
  {
    id: "sentence-3",
    type: "sentence",
    category: "Sentence Completion",
    question: "What is your name?",
    greek: "_____ σε λένε;",
    answer: "Πώς",
    hint: "Question word for asking someone's name",
    explanation:
      "Πώς σε λένε; = What's your name? (literally: How do they call you?)",
  },
  {
    id: "sentence-4",
    type: "sentence",
    category: "Sentence Completion",
    question: "Thank you very much!",
    greek: "Ευχαριστώ _____!",
    answer: "πολύ",
    hint: "Word meaning 'very much' or 'a lot'",
    explanation: "πολύ = very much/a lot (adverb)",
  },
];

export default function WritingPractice() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const exercise = WRITING_EXERCISES[currentExercise];
  const progress = Math.round(
    ((currentExercise + 1) / WRITING_EXERCISES.length) * 100
  );

  const checkAnswer = () => {
    const correct =
      userAnswer.trim().toLowerCase() === exercise.answer.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);

    if (correct && !completedExercises.includes(exercise.id)) {
      setScore(score + 10);
      setCompletedExercises([...completedExercises, exercise.id]);
    }
  };

  const nextExercise = () => {
    if (currentExercise < WRITING_EXERCISES.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setUserAnswer("");
      setShowResult(false);
      setShowHint(false);
    }
  };

  const resetExercise = () => {
    setUserAnswer("");
    setShowResult(false);
    setShowHint(false);
  };

  const resetAll = () => {
    setCurrentExercise(0);
    setUserAnswer("");
    setShowResult(false);
    setShowHint(false);
    setCompletedExercises([]);
    setScore(0);
  };

  // Auto-focus input when exercise changes
  useEffect(() => {
    const input = document.getElementById("greek-input");
    if (input) {
      (input as HTMLInputElement).focus();
    }
  }, [currentExercise]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary hover:text-primary-dark"
          >
            <Home size={20} />
            Home
          </Link>
          <h1 className="font-display text-3xl font-bold text-primary">
            Greek Writing Practice
          </h1>
          <button
            onClick={resetAll}
            className="flex items-center gap-2 bg-surface border border-border px-4 py-2 rounded-lg hover:bg-primary/10"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>

        {/* Progress & Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{progress}%</div>
            <div className="text-sm text-muted">Progress</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {currentExercise + 1}
            </div>
            <div className="text-sm text-muted">
              of {WRITING_EXERCISES.length}
            </div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {completedExercises.length}
            </div>
            <div className="text-sm text-muted">Completed</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{score}</div>
            <div className="text-sm text-muted">Score</div>
          </div>
        </div>

        {/* Exercise Card */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-surface border border-border rounded-lg p-8"
          >
            <div className="text-center mb-6">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                {exercise.category}
              </span>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {exercise.question}
              </h2>
              <p className="text-muted text-sm">
                Fill in the blank with Greek text
              </p>
            </div>

            {/* Greek Sentence */}
            <div className="bg-background/50 border border-border rounded-lg p-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-display text-primary mb-4 leading-relaxed">
                  {exercise.greek.split("_____").map((part, index) => (
                    <span key={index}>
                      {part}
                      {index < exercise.greek.split("_____").length - 1 && (
                        <span className="inline-block min-w-[120px] mx-2 px-3 py-1 bg-primary/20 border-2 border-dashed border-primary rounded text-lg">
                          {showResult ? exercise.answer : "____"}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Input Field */}
            <div className="mb-6">
              <label
                htmlFor="greek-input"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Your Answer (in Greek):
              </label>
              <div className="flex gap-3">
                <input
                  id="greek-input"
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && !showResult && checkAnswer()
                  }
                  className="flex-1 px-4 py-3 bg-background border border-border rounded-lg font-display text-lg focus:border-primary focus:outline-none"
                  placeholder="Type your answer in Greek..."
                  disabled={showResult}
                  lang="el"
                />
                {!showResult && (
                  <button
                    onClick={checkAnswer}
                    disabled={!userAnswer.trim()}
                    className="bg-primary hover:bg-primary-dark text-background font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Check
                  </button>
                )}
              </div>
            </div>

            {/* Hint */}
            <div className="mb-6">
              {!showHint && !showResult && (
                <button
                  onClick={() => setShowHint(true)}
                  className="text-primary hover:text-primary-dark text-sm underline"
                >
                  💡 Need a hint?
                </button>
              )}
              {showHint && !showResult && (
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <p className="text-primary text-sm">
                    <strong>Hint:</strong> {exercise.hint}
                  </p>
                </div>
              )}
            </div>

            {/* Result */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`border rounded-lg p-4 mb-6 ${
                  isCorrect
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? <Check size={20} /> : <X size={20} />}
                  <span className="font-semibold">
                    {isCorrect ? "Correct!" : "Incorrect"}
                  </span>
                </div>
                {!isCorrect && (
                  <p className="text-sm mb-2">
                    <strong>Correct answer:</strong> {exercise.answer}
                  </p>
                )}
                <p className="text-sm">
                  <strong>Explanation:</strong> {exercise.explanation}
                </p>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={resetExercise}
                className="flex items-center gap-2 text-muted hover:text-foreground"
              >
                <RotateCcw size={16} />
                Try Again
              </button>

              {currentExercise < WRITING_EXERCISES.length - 1 ? (
                <button
                  onClick={nextExercise}
                  disabled={!showResult}
                  className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-background font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Exercise
                  <ChevronRight size={16} />
                </button>
              ) : (
                showResult && (
                  <div className="text-center">
                    <div className="text-2xl mb-2">🎉</div>
                    <p className="font-semibold text-primary">
                      All exercises completed!
                    </p>
                    <p className="text-sm text-muted">
                      Final Score: {score} points
                    </p>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>

        {/* Greek Keyboard Help */}
        <div className="max-w-2xl mx-auto mt-8">
          <details className="bg-surface/50 border border-border rounded-lg p-4">
            <summary className="cursor-pointer font-medium text-primary mb-2">
              🇬🇷 Greek Keyboard Help
            </summary>
            <div className="text-sm text-muted space-y-2">
              <p>
                <strong>Tips for typing Greek:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Switch to Greek keyboard layout on your device</li>
                <li>
                  On Mac: System Preferences → Keyboard → Input Sources → Add
                  Greek
                </li>
                <li>
                  On Windows: Settings → Time & Language → Language → Add Greek
                </li>
                <li>
                  Common letters: α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ τ υ φ χ ψ
                  ω
                </li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
