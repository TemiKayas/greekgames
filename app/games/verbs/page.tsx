"use client";

import { AdInGame } from "@/app/components/ads";
import { getAdSlot } from "@/app/utils/ads/config";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Category, Difficulty, GameState, Tense } from "./types";
import {
  calculateAccuracy,
  generateQuestions,
  getCategoryDisplayName,
  getDifficultyDisplayName,
  getGreekPhrase,
  getTenseDisplayName,
} from "./utils";

export default function VerbTrainerPage() {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    totalQuestions: 0,
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    selectedTense: "present",
    questions: [],
    isGameComplete: false,
    showResults: false,
    accuracy: 0,
  });

  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    "all"
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    Difficulty | "all"
  >("all");
  const [selectedTense, setSelectedTense] = useState<Tense>("present");
  const [questionCount, setQuestionCount] = useState(10);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    const settings = {
      category: selectedCategory === "all" ? undefined : selectedCategory,
      difficulty: selectedDifficulty === "all" ? undefined : selectedDifficulty,
      tense: selectedTense,
      questionCount,
      includeAllPersons: true,
    };

    const questions = generateQuestions(settings);

    setGameState({
      currentQuestion: 0,
      totalQuestions: questions.length,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      selectedTense,
      selectedCategory:
        selectedCategory === "all" ? undefined : selectedCategory,
      selectedDifficulty:
        selectedDifficulty === "all" ? undefined : selectedDifficulty,
      questions,
      isGameComplete: false,
      showResults: false,
      accuracy: 0,
    });

    setGameStarted(true);
  };

  const handleAnswer = (selectedAnswer: string) => {
    const currentQuestion = gameState.questions[gameState.currentQuestion];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    const newCorrectAnswers = gameState.correctAnswers + (isCorrect ? 1 : 0);
    const newWrongAnswers = gameState.wrongAnswers + (isCorrect ? 0 : 1);
    const newCurrentQuestion = gameState.currentQuestion + 1;
    const isComplete = newCurrentQuestion >= gameState.totalQuestions;

    setGameState((prev) => ({
      ...prev,
      currentQuestion: newCurrentQuestion,
      correctAnswers: newCorrectAnswers,
      wrongAnswers: newWrongAnswers,
      isGameComplete: isComplete,
      showResults: isComplete,
      accuracy: calculateAccuracy(newCorrectAnswers, newCurrentQuestion),
    }));
  };

  const resetGame = () => {
    setGameState({
      currentQuestion: 0,
      totalQuestions: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      selectedTense: "present",
      questions: [],
      isGameComplete: false,
      showResults: false,
      accuracy: 0,
    });
    setGameStarted(false);
  };

  const currentQuestion = gameState.questions[gameState.currentQuestion];

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Header Section */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 greek-pattern opacity-10"></div>
          <div className="relative container mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4">
                📝 Greek Verb Trainer
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4">
              Verb Conjugation Practice
            </h1>

            <p className="text-base sm:text-lg text-muted mb-6 max-w-2xl mx-auto">
              Practice Greek verb conjugations with interactive questions.
              Select your preferences and start training!
            </p>

            <div className="flex justify-center gap-4 px-4">
              <Link href="/games">
                <button className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary/10 font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                  <ArrowLeft size={16} />
                  Back to Games
                </button>
              </Link>
              <Link href="/">
                <button className="inline-flex items-center gap-2 border border-muted text-muted hover:bg-muted/10 font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                  <Home size={16} />
                  Home
                </button>
              </Link>
            </div>
          </div>
        </header>

        {/* Game Setup */}
        <main className="container mx-auto px-4 sm:px-6 pb-12">
          <div className="max-w-3xl mx-auto">
            <div className="bg-surface/50 rounded-[--border-radius-card] shadow-lg p-6 sm:p-8 border border-border">
              <div className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-lg font-semibold text-foreground mb-3">
                    Choose Category:
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["all", "basic", "movement", "communication", "daily"].map(
                      (category) => (
                        <button
                          key={category}
                          onClick={() =>
                            setSelectedCategory(category as Category | "all")
                          }
                          className={`p-3 rounded-lg border-2 transition-all font-semibold text-base ${
                            selectedCategory === category
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          {category === "all"
                            ? "All Categories"
                            : getCategoryDisplayName(category as Category)}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Difficulty Selection */}
                <div>
                  <label className="block text-lg font-semibold text-foreground mb-3">
                    Choose Difficulty:
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["all", "easy", "medium", "hard"].map((difficulty) => (
                      <button
                        key={difficulty}
                        onClick={() =>
                          setSelectedDifficulty(
                            difficulty as Difficulty | "all"
                          )
                        }
                        className={`p-3 rounded-lg border-2 transition-all font-semibold text-base ${
                          selectedDifficulty === difficulty
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-border hover:border-green-300"
                        }`}
                      >
                        {difficulty === "all"
                          ? "All Levels"
                          : getDifficultyDisplayName(difficulty as Difficulty)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tense Selection */}
                <div>
                  <label className="block text-lg font-semibold text-foreground mb-3">
                    Choose Tense:
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["present", "future", "past"] as Tense[]).map((tense) => (
                      <button
                        key={tense}
                        onClick={() => setSelectedTense(tense)}
                        className={`p-3 rounded-lg border-2 transition-all font-semibold text-base ${
                          selectedTense === tense
                            ? "border-purple-500 bg-purple-50 text-purple-700"
                            : "border-border hover:border-purple-300"
                        }`}
                      >
                        {getTenseDisplayName(tense)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question Count */}
                <div>
                  <label className="block text-lg font-semibold text-foreground mb-3">
                    Number of Questions: {questionCount}
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-muted mt-1">
                    <span>5</span>
                    <span>10</span>
                    <span>15</span>
                    <span>20</span>
                  </div>
                </div>

                {/* Start Button */}
                <button
                  onClick={startGame}
                  className="w-full bg-primary hover:bg-primary-dark text-background py-4 px-8 rounded-xl text-xl font-bold transition-colors shadow-lg"
                >
                  Start Verb Training! 🚀
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (gameState.showResults) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Header Section */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 greek-pattern opacity-10"></div>
          <div className="relative container mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4">
                🎉 Training Complete!
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4">
              {getGreekPhrase(gameState.accuracy)}
            </h1>

            <div className="flex justify-center gap-4 px-4">
              <Link href="/games">
                <button className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary/10 font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                  <ArrowLeft size={16} />
                  Back to Games
                </button>
              </Link>
              <Link href="/">
                <button className="inline-flex items-center gap-2 border border-muted text-muted hover:bg-muted/10 font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                  <Home size={16} />
                  Home
                </button>
              </Link>
            </div>
          </div>
        </header>

        {/* Results */}
        <main className="container mx-auto px-4 sm:px-6 pb-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-surface/50 rounded-[--border-radius-card] shadow-lg p-6 sm:p-8 border border-border text-center">
              <div className="text-6xl mb-4">
                {gameState.accuracy >= 80
                  ? "🏆"
                  : gameState.accuracy >= 60
                    ? "🎯"
                    : "📚"}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">
                    {gameState.correctAnswers}
                  </div>
                  <div className="text-muted">Correct</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-red-600">
                    {gameState.wrongAnswers}
                  </div>
                  <div className="text-muted">Incorrect</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">
                    {gameState.accuracy}%
                  </div>
                  <div className="text-muted">Accuracy</div>
                </div>
              </div>
              <div className="space-y-4">
                <button
                  onClick={resetGame}
                  className="bg-primary hover:bg-primary-dark text-background py-3 px-8 rounded-xl text-lg font-bold transition-colors shadow-lg"
                >
                  Practice Again
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 greek-pattern opacity-10"></div>
        <div className="relative container mx-auto px-4 sm:px-6 py-6 sm:py-8 text-center">
          <div className="flex justify-center gap-4 px-4">
            <Link href="/games">
              <button className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary/10 font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                <ArrowLeft size={16} />
                Back to Games
              </button>
            </Link>
            <Link href="/">
              <button className="inline-flex items-center gap-2 border border-muted text-muted hover:bg-muted/10 font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                <Home size={16} />
                Home
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Game Interface */}
      <main className="container mx-auto px-4 sm:px-6 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-surface/50 rounded-[--border-radius-card] shadow-lg p-6 sm:p-8 border border-border">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-muted mb-2">
                <span>
                  Question {gameState.currentQuestion + 1} of{" "}
                  {gameState.totalQuestions}
                </span>
                <span>
                  {gameState.correctAnswers} correct, {gameState.wrongAnswers}{" "}
                  incorrect
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{
                    width: `${((gameState.currentQuestion + 1) / gameState.totalQuestions) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Question */}
            {currentQuestion && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-primary mb-4 font-display">
                    {currentQuestion.question}
                  </h2>
                  <div className="text-lg text-muted mb-6">
                    <span className="font-semibold">
                      {currentQuestion.verb.infinitive}
                    </span>{" "}
                    - {currentQuestion.verb.english}
                  </div>
                </div>

                {/* Answer Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="p-4 text-left border-2 border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-lg font-medium shadow-sm"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* In-Game Ad */}
            <AdInGame
              adSlot={getAdSlot("IN_GAME")}
              showAfterRounds={3}
              currentRound={gameState.currentQuestion + 1}
              className="mt-8"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
