"use client";

import {
  getMathProblemsByDifficulty,
  getNumbersByDifficulty,
  getTimeExercisesByDifficulty,
  MathProblem,
  NUMBERS_CONFIG,
  shuffleArray,
  type GameType,
  type GreekNumber,
  type TimeExercise,
} from "@/app/utils/games/data/numbers/numberData";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calculator,
  Clock,
  Hash,
  Home,
  Play,
  RotateCcw,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type DifficultyLevel = keyof typeof NUMBERS_CONFIG;

interface GameState {
  currentQuestion: number;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeLeft: number;
  gameComplete: boolean;
  showHint: boolean;
  wrongAnswer: boolean;
}

export default function NumbersGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("easy");
  const [gameType, setGameType] = useState<GameType>("number-recognition");
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    score: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    timeLeft: 0,
    gameComplete: false,
    showHint: false,
    wrongAnswer: false,
  });

  // Game data
  const [numbers, setNumbers] = useState<GreekNumber[]>([]);
  const [mathProblems, setMathProblems] = useState<MathProblem[]>([]);
  const [timeExercises, setTimeExercises] = useState<TimeExercise[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [options, setOptions] = useState<any[]>([]);

  const config = NUMBERS_CONFIG[difficulty];

  const startGame = (
    selectedDifficulty: DifficultyLevel,
    selectedGameType: GameType
  ) => {
    const numbersData = getNumbersByDifficulty(selectedDifficulty);
    const mathData = getMathProblemsByDifficulty(selectedDifficulty);
    const timeData = getTimeExercisesByDifficulty(selectedDifficulty);

    setDifficulty(selectedDifficulty);
    setGameType(selectedGameType);
    setNumbers(shuffleArray(numbersData));
    setMathProblems(shuffleArray(mathData));
    setTimeExercises(shuffleArray(timeData));

    // Set up first question
    setupQuestion(selectedGameType, 0, numbersData, mathData, timeData);

    setGameState({
      currentQuestion: 0,
      score: 0,
      correctAnswers: 0,
      totalQuestions: getTotalQuestions(
        selectedGameType,
        numbersData,
        mathData,
        timeData
      ),
      timeLeft: config.timeLimit,
      gameComplete: false,
      showHint: false,
      wrongAnswer: false,
    });

    setGameStarted(true);
  };

  const getTotalQuestions = (
    type: GameType,
    numbers: GreekNumber[],
    math: MathProblem[],
    time: TimeExercise[]
  ) => {
    switch (type) {
      case "number-recognition":
        return Math.min(10, numbers.length);
      case "addition":
      case "subtraction":
      case "multiplication":
      case "division":
        return Math.min(
          8,
          math.filter((p) => p.operation === getOperationSymbol(type)).length
        );
      case "time":
        return Math.min(6, time.length);
      default:
        return 10;
    }
  };

  const getOperationSymbol = (type: GameType): string => {
    switch (type) {
      case "addition":
        return "+";
      case "subtraction":
        return "-";
      case "multiplication":
        return "×";
      case "division":
        return "÷";
      default:
        return "+";
    }
  };

  const setupQuestion = useCallback(
    (
      type: GameType,
      questionIndex: number,
      numbers: GreekNumber[],
      math: MathProblem[],
      time: TimeExercise[]
    ) => {
      let question: any;
      let answerOptions: any[];

      switch (type) {
        case "number-recognition":
          question = numbers[questionIndex];
          const allNumbers = shuffleArray([...numbers]);
          answerOptions = [
            { value: question.digit, correct: true },
            {
              value:
                allNumbers.find((n) => n.digit !== question.digit)?.digit ||
                question.digit + 1,
              correct: false,
            },
            {
              value:
                allNumbers.find(
                  (n) =>
                    n.digit !== question.digit && n.digit !== question.digit + 1
                )?.digit || question.digit + 2,
              correct: false,
            },
            {
              value:
                allNumbers.find(
                  (n) =>
                    n.digit !== question.digit &&
                    n.digit !== question.digit + 1 &&
                    n.digit !== question.digit + 2
                )?.digit || question.digit + 3,
              correct: false,
            },
          ];
          break;

        case "addition":
        case "subtraction":
        case "multiplication":
        case "division":
          const operationSymbol = getOperationSymbol(type);
          const filteredMath = math.filter(
            (p) => p.operation === operationSymbol
          );
          question = filteredMath[questionIndex];

          // Generate better wrong answers
          const correctAnswer = question.answer;
          const wrongAnswers = [];

          // Add answers that are close but wrong
          if (correctAnswer > 0) {
            wrongAnswers.push(correctAnswer - 1);
          }
          wrongAnswers.push(correctAnswer + 1);
          wrongAnswers.push(correctAnswer + 2);

          // If we need more wrong answers, add some based on the operation
          if (wrongAnswers.length < 3) {
            if (type === "addition") {
              wrongAnswers.push(correctAnswer + 3);
            } else if (type === "subtraction") {
              wrongAnswers.push(Math.max(0, correctAnswer - 2));
            } else if (type === "multiplication") {
              wrongAnswers.push(correctAnswer + 5);
            } else if (type === "division") {
              wrongAnswers.push(correctAnswer + 1);
            }
          }

          // Ensure we have exactly 3 wrong answers
          while (wrongAnswers.length < 3) {
            wrongAnswers.push(correctAnswer + wrongAnswers.length + 1);
          }

          answerOptions = [
            { value: correctAnswer, correct: true },
            ...wrongAnswers
              .slice(0, 3)
              .map((value) => ({ value, correct: false })),
          ];
          break;

        case "time":
          question = time[questionIndex];
          answerOptions = [
            { value: question.time, correct: true },
            { value: "12:00", correct: false },
            { value: "3:00", correct: false },
            { value: "6:00", correct: false },
          ];
          break;

        default:
          question = numbers[questionIndex];
          answerOptions = [];
      }

      setCurrentQuestion(question);
      setOptions(shuffleArray(answerOptions));
    },
    []
  );

  const handleAnswer = (selectedOption: any) => {
    if (selectedOption.correct) {
      setGameState((prev) => ({
        ...prev,
        score: prev.score + 100,
        correctAnswers: prev.correctAnswers + 1,
        currentQuestion: prev.currentQuestion + 1,
        wrongAnswer: false,
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        score: Math.max(0, prev.score - 10),
        currentQuestion: prev.currentQuestion + 1, // Still move to next question even if wrong
        wrongAnswer: true,
      }));
    }

    // Clear wrong answer indicator after delay
    setTimeout(() => {
      setGameState((prev) => ({ ...prev, wrongAnswer: false }));
    }, 1000);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameState({
      currentQuestion: 0,
      score: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      timeLeft: 0,
      gameComplete: false,
      showHint: false,
      wrongAnswer: false,
    });
    setCurrentQuestion(null);
    setOptions([]);
  };

  // Timer logic
  useEffect(() => {
    if (gameStarted && gameState.timeLeft > 0 && !gameState.gameComplete) {
      const timer = setTimeout(() => {
        setGameState((prev) => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameState.timeLeft === 0 && gameStarted) {
      setGameState((prev) => ({ ...prev, gameComplete: true }));
    }
  }, [gameState.timeLeft, gameStarted, gameState.gameComplete]);

  // Check for game completion
  useEffect(() => {
    if (
      gameState.currentQuestion >= gameState.totalQuestions &&
      gameState.totalQuestions > 0
    ) {
      setGameState((prev) => ({ ...prev, gameComplete: true }));
    }
  }, [gameState.currentQuestion, gameState.totalQuestions]);

  // Setup next question
  useEffect(() => {
    if (
      gameStarted &&
      !gameState.gameComplete &&
      gameState.currentQuestion < gameState.totalQuestions
    ) {
      setupQuestion(
        gameType,
        gameState.currentQuestion,
        numbers,
        mathProblems,
        timeExercises
      );
    }
  }, [
    gameState.currentQuestion,
    gameStarted,
    gameState.gameComplete,
    gameState.totalQuestions,
    gameType,
    numbers,
    mathProblems,
    timeExercises,
    setupQuestion,
  ]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getGameTypeIcon = (type: GameType) => {
    switch (type) {
      case "number-recognition":
        return <Hash className="w-5 h-5" />;
      case "addition":
      case "subtraction":
      case "multiplication":
      case "division":
        return <Calculator className="w-5 h-5" />;
      case "time":
        return <Clock className="w-5 h-5" />;
      default:
        return <Hash className="w-5 h-5" />;
    }
  };

  const getGameTypeTitle = (type: GameType) => {
    switch (type) {
      case "number-recognition":
        return "Number Recognition";
      case "addition":
        return "Addition";
      case "subtraction":
        return "Subtraction";
      case "multiplication":
        return "Multiplication";
      case "division":
        return "Division";
      case "time":
        return "Time Reading";
      default:
        return "Number Recognition";
    }
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-6 sm:mb-8"
            >
              <Home size={16} className="sm:w-5 sm:h-5" />
              Back to Home
            </Link>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary mb-4 sm:mb-6">
              Greek Numbers Game
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted mb-6 sm:mb-8">
              Learn Greek numbers, counting, and basic mathematics
            </p>
            <div className="h-1 w-16 sm:w-24 golden-gradient mx-auto mb-6 sm:mb-8"></div>
            <div className="bg-surface/50 border border-border rounded-lg p-4 sm:p-6 max-w-2xl mx-auto mb-6 sm:mb-8">
              <h3 className="font-display text-base sm:text-lg font-semibold text-primary mb-2 sm:mb-3">
                🎯 How to Play
              </h3>
              <p className="text-foreground/80 text-sm sm:text-base leading-relaxed">
                Choose your difficulty level and game type. Practice Greek
                numbers, solve math problems in Greek, or learn to tell time in
                Greek!
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-primary mb-4 sm:mb-6 text-center">
              Choose Your Challenge
            </h2>
            <div className="grid gap-3 sm:gap-4">
              {(Object.keys(NUMBERS_CONFIG) as DifficultyLevel[]).map(
                (level) => (
                  <motion.div
                    key={level}
                    className="bg-surface border border-border rounded-lg p-4 sm:p-6"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-semibold text-primary capitalize mb-1 sm:mb-2">
                          {level}
                        </h3>
                        <p className="text-foreground/70 text-sm sm:text-base mb-1">
                          {NUMBERS_CONFIG[level].description}
                        </p>
                        <p className="text-xs sm:text-sm text-muted">
                          {NUMBERS_CONFIG[level].numberCount} questions •{" "}
                          {Math.floor(NUMBERS_CONFIG[level].timeLimit / 60)}{" "}
                          minutes
                        </p>
                      </div>
                      <Play className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                      {NUMBERS_CONFIG[level].gameTypes.map((type) => (
                        <motion.button
                          key={type}
                          onClick={() => startGame(level, type)}
                          className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary font-medium px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {getGameTypeIcon(type)}
                          <span className="hidden sm:inline">
                            {getGameTypeTitle(type)}
                          </span>
                          <span className="sm:hidden">
                            {type.split("-")[0]}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState.gameComplete) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-4xl sm:text-6xl mb-6 sm:mb-8">
              {gameState.timeLeft > 0 ? "🎉" : "⏰"}
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 sm:mb-6">
              {gameState.timeLeft > 0 ? "Excellent Work!" : "Time's Up!"}
            </h1>
            <p className="text-base sm:text-lg text-foreground/80 mb-6 sm:mb-8">
              You completed {getGameTypeTitle(gameType)} on{" "}
              <span className="font-semibold text-primary capitalize">
                {difficulty}
              </span>{" "}
              level with {gameState.correctAnswers} out of{" "}
              {gameState.totalQuestions} correct answers.
            </p>

            <div className="bg-surface border border-border rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
                    <Trophy className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
                    <h3 className="font-display text-base sm:text-lg font-semibold text-primary">
                      Score
                    </h3>
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                    {gameState.score}
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
                    <span className="text-primary text-lg sm:text-xl">🎯</span>
                    <h3 className="font-display text-base sm:text-lg font-semibold text-primary">
                      Accuracy
                    </h3>
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                    {gameState.totalQuestions > 0
                      ? Math.round(
                          (gameState.correctAnswers /
                            gameState.totalQuestions) *
                            100
                        )
                      : 0}
                    %
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => startGame(difficulty, gameType)}
                className="bg-primary hover:bg-primary-dark text-background font-semibold py-3 px-6 rounded-lg transition-colors text-sm sm:text-base"
              >
                Play Again
              </button>
              <button
                onClick={resetGame}
                className="bg-surface border border-border hover:bg-primary/10 font-semibold py-3 px-6 rounded-lg transition-colors text-sm sm:text-base"
              >
                Try Different Level
              </button>
              <Link href="/">
                <button className="w-full sm:w-auto bg-surface border border-border hover:bg-primary/10 font-semibold py-3 px-6 rounded-lg transition-colors text-sm sm:text-base">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary hover:text-primary-dark"
          >
            <Home size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <h1 className="font-display text-lg sm:text-2xl md:text-3xl font-bold text-primary text-center flex-1 mx-4">
            Greek Numbers Game
          </h1>
          <button
            onClick={resetGame}
            className="flex items-center gap-1 sm:gap-2 bg-surface border border-border px-2 sm:px-4 py-2 rounded-lg hover:bg-primary/10"
          >
            <RotateCcw size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline text-sm">Reset</span>
          </button>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-surface border border-border rounded-lg p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-primary">
              {formatTime(gameState.timeLeft)}
            </div>
            <div className="text-xs sm:text-sm text-muted">Time Left</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-primary">
              {gameState.currentQuestion + 1}/{gameState.totalQuestions}
            </div>
            <div className="text-xs sm:text-sm text-muted">Question</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-primary">
              {gameState.score}
            </div>
            <div className="text-xs sm:text-sm text-muted">Score</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-primary capitalize">
              {difficulty}
            </div>
            <div className="text-xs sm:text-sm text-muted">Level</div>
          </div>
        </div>

        {/* Game Controls */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() =>
                setGameState((prev) => ({ ...prev, showHint: !prev.showHint }))
              }
              className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary font-medium px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
            >
              <span className="text-sm sm:text-base">💡</span>
              <span className="hidden sm:inline">
                {gameState.showHint ? "Hide" : "Show"} Hints
              </span>
              <span className="sm:hidden">Hints</span>
            </button>
          </div>
          <div className="text-center">
            <p className="text-xs sm:text-sm text-muted">
              {getGameTypeTitle(gameType)} • {difficulty} level
            </p>
          </div>
        </div>

        {/* Question */}
        {currentQuestion && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-surface border border-border rounded-lg p-6 sm:p-8 mb-6 sm:mb-8">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-3 sm:mb-4">
                  {gameType === "number-recognition" && (
                    <>
                      What number is this?
                      <div className="text-4xl sm:text-5xl md:text-6xl font-display text-primary mt-4 sm:mt-6">
                        {currentQuestion.greek}
                      </div>
                    </>
                  )}
                  {gameType === "addition" && (
                    <>
                      Solve this addition:
                      <div className="text-2xl sm:text-3xl md:text-4xl font-display text-primary mt-4 sm:mt-6">
                        {currentQuestion.greekQuestion}
                      </div>
                    </>
                  )}
                  {gameType === "subtraction" && (
                    <>
                      Solve this subtraction:
                      <div className="text-2xl sm:text-3xl md:text-4xl font-display text-primary mt-4 sm:mt-6">
                        {currentQuestion.greekQuestion}
                      </div>
                    </>
                  )}
                  {gameType === "multiplication" && (
                    <>
                      Solve this multiplication:
                      <div className="text-2xl sm:text-3xl md:text-4xl font-display text-primary mt-4 sm:mt-6">
                        {currentQuestion.greekQuestion}
                      </div>
                    </>
                  )}
                  {gameType === "division" && (
                    <>
                      Solve this division:
                      <div className="text-2xl sm:text-3xl md:text-4xl font-display text-primary mt-4 sm:mt-6">
                        {currentQuestion.greekQuestion}
                      </div>
                    </>
                  )}
                  {gameType === "time" && (
                    <>
                      What time is this?
                      <div className="text-2xl sm:text-3xl md:text-4xl font-display text-primary mt-4 sm:mt-6">
                        {currentQuestion.greekTime}
                      </div>
                    </>
                  )}
                </h2>

                {gameState.showHint && (
                  <div className="text-sm sm:text-base text-muted mt-3 sm:mt-4">
                    {gameType === "number-recognition" && (
                      <p>Pronunciation: {currentQuestion.pronunciation}</p>
                    )}
                    {(gameType === "addition" ||
                      gameType === "subtraction" ||
                      gameType === "multiplication" ||
                      gameType === "division") && (
                      <p>English: {currentQuestion.englishQuestion}</p>
                    )}
                    {gameType === "time" && (
                      <p>English: {currentQuestion.englishTime}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Answer Options */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <AnimatePresence>
                  {options.map((option, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      onClick={() => handleAnswer(option)}
                      className={`p-4 sm:p-6 rounded-lg font-display text-lg sm:text-xl md:text-2xl font-bold transition-all duration-200 ${
                        gameState.wrongAnswer && !option.correct
                          ? "bg-red-500/20 border-2 border-red-400 text-red-600"
                          : "bg-primary text-background hover:bg-primary-dark hover:scale-105"
                      }`}
                      whileHover={{ scale: gameState.wrongAnswer ? 1 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={gameState.wrongAnswer}
                    >
                      {gameType === "number-recognition" && option.value}
                      {(gameType === "addition" ||
                        gameType === "subtraction" ||
                        gameType === "multiplication" ||
                        gameType === "division") &&
                        option.value}
                      {gameType === "time" && option.value}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
