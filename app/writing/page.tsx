"use client";

import { GreekWritingExercise } from "@/app/utils/vocabulary/greekWords";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Home, Lightbulb, RotateCcw, Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Sample exercises data
const WRITING_EXERCISES: GreekWritingExercise[] = [
  // Verb Conjugations
  {
    id: "verb-1",
    category: "verb-conjugations",
    difficulty: "easy",
    sentence: "Εγώ _____ φοιτητής",
    correctAnswer: "είμαι",
    translation: "I am a student",
    hint: "The verb 'to be' in first person singular",
    explanation:
      "Είμαι is the first person singular form of the verb 'to be' (είμαι, είσαι, είναι...)",
  },
  {
    id: "verb-2",
    category: "verb-conjugations",
    difficulty: "easy",
    sentence: "Εσύ _____ ένα σπίτι",
    correctAnswer: "έχεις",
    translation: "You have a house",
    hint: "The verb 'to have' in second person singular",
    explanation:
      "Έχεις is the second person singular form of 'to have' (έχω, έχεις, έχει...)",
  },
  {
    id: "verb-3",
    category: "verb-conjugations",
    difficulty: "medium",
    sentence: "Εμείς _____ την εργασία",
    correctAnswer: "κάνουμε",
    translation: "We do the work",
    hint: "The verb 'to do/make' in first person plural",
    explanation:
      "Κάνουμε is the first person plural form of 'to do/make' (κάνω, κάνεις, κάνει, κάνουμε...)",
  },
  {
    id: "verb-4",
    category: "verb-conjugations",
    difficulty: "medium",
    sentence: "Αυτοί _____ στο σχολείο",
    correctAnswer: "πάνε",
    translation: "They go to school",
    hint: "The verb 'to go' in third person plural",
    explanation:
      "Πάνε is the third person plural form of 'to go' (πάω, πας, πάει, πάμε, πάτε, πάνε)",
  },

  // Basic Vocabulary
  {
    id: "vocab-1",
    category: "basic-vocabulary",
    difficulty: "easy",
    sentence: "Το _____ μου είναι μεγάλο",
    correctAnswer: "σπίτι",
    translation: "My house is big",
    hint: "A place where you live",
    explanation:
      "Σπίτι means 'house' or 'home' - it's a neuter noun (το σπίτι)",
  },
  {
    id: "vocab-2",
    category: "basic-vocabulary",
    difficulty: "easy",
    sentence: "Θέλω ένα ποτήρι _____",
    correctAnswer: "νερό",
    translation: "I want a glass of water",
    hint: "Essential liquid for life",
    explanation: "Νερό means 'water' - it's a neuter noun (το νερό)",
  },
  {
    id: "vocab-3",
    category: "basic-vocabulary",
    difficulty: "medium",
    sentence: "Είναι _____ άνθρωπος",
    correctAnswer: "καλός",
    translation: "He is a good person",
    hint: "An adjective meaning positive/nice",
    explanation:
      "Καλός means 'good' - it changes form based on gender (καλός/καλή/καλό)",
  },
  {
    id: "vocab-4",
    category: "basic-vocabulary",
    difficulty: "medium",
    sentence: "Ο _____ μου έρχεται αύριο",
    correctAnswer: "φίλος",
    translation: "My friend is coming tomorrow",
    hint: "Someone you like and trust",
    explanation: "Φίλος means 'friend' (masculine) - feminine form is φίλη",
  },

  // Sentence Completion
  {
    id: "sentence-1",
    category: "sentence-completion",
    difficulty: "easy",
    sentence: "_____ σε λένε;",
    correctAnswer: "Πώς",
    translation: "What is your name?",
    hint: "Question word meaning 'how'",
    explanation:
      "Πώς σε λένε; is a common way to ask 'What's your name?' (literally: How do they call you?)",
  },
  {
    id: "sentence-2",
    category: "sentence-completion",
    difficulty: "medium",
    sentence: "Μένω _____ Αθήνα",
    correctAnswer: "στην",
    translation: "I live in Athens",
    hint: "Preposition for 'in' with feminine cities",
    explanation:
      "Στην is the contraction of 'στη + την' - used with feminine cities like η Αθήνα",
  },
  {
    id: "sentence-3",
    category: "sentence-completion",
    difficulty: "hard",
    sentence: "Μου αρέσει _____ η ελληνική μουσική",
    correctAnswer: "πολύ",
    translation: "I like Greek music very much",
    hint: "Adverb meaning 'very' or 'a lot'",
    explanation:
      "Πολύ means 'very' or 'much' - used to intensify adjectives or express degree",
  },
  {
    id: "sentence-4",
    category: "sentence-completion",
    difficulty: "hard",
    sentence: "_____ χρόνια είσαι;",
    correctAnswer: "Πόσα",
    translation: "How old are you?",
    hint: "Question word for 'how many'",
    explanation:
      "Πόσα χρόνια είσαι; literally means 'How many years are you?' - the standard way to ask age",
  },
];

const CATEGORIES = {
  "verb-conjugations": "Verb Conjugations",
  "basic-vocabulary": "Basic Vocabulary",
  "sentence-completion": "Sentence Completion",
};

export default function WritingGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentExercise, setCurrentExercise] =
    useState<GreekWritingExercise | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [availableExercises, setAvailableExercises] = useState<
    GreekWritingExercise[]
  >([]);

  useEffect(() => {
    if (gameStarted && selectedCategory) {
      const exercises = WRITING_EXERCISES.filter(
        (ex) => ex.category === selectedCategory
      );
      setAvailableExercises(exercises);
      if (exercises.length > 0) {
        setCurrentExercise(exercises[0]);
      }
    }
  }, [gameStarted, selectedCategory]);

  const startGame = (category: string) => {
    setSelectedCategory(category);
    setGameStarted(true);
    setCompletedExercises([]);
    setGameComplete(false);
    setUserAnswer("");
    setShowHint(false);
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    if (!currentExercise || !userAnswer.trim()) return;

    const correct =
      userAnswer.trim().toLowerCase() ===
      currentExercise.correctAnswer.toLowerCase();
    setIsCorrect(correct);

    if (correct) {
      const newCompleted = [...completedExercises, currentExercise.id];
      setCompletedExercises(newCompleted);

      setTimeout(() => {
        const remaining = availableExercises.filter(
          (ex) => !newCompleted.includes(ex.id)
        );
        if (remaining.length > 0) {
          setCurrentExercise(remaining[0]);
          setUserAnswer("");
          setShowHint(false);
          setIsCorrect(null);
        } else {
          setGameComplete(true);
        }
      }, 2000);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setSelectedCategory(null);
    setCurrentExercise(null);
    setUserAnswer("");
    setShowHint(false);
    setIsCorrect(null);
    setCompletedExercises([]);
    setGameComplete(false);
  };

  const skipExercise = () => {
    if (!currentExercise) return;

    const remaining = availableExercises.filter(
      (ex) =>
        ex.id !== currentExercise.id && !completedExercises.includes(ex.id)
    );

    if (remaining.length > 0) {
      setCurrentExercise(remaining[0]);
      setUserAnswer("");
      setShowHint(false);
      setIsCorrect(null);
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
              Greek Writing Practice
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted mb-6 sm:mb-8">
              Complete sentences and practice Greek grammar
            </p>
            <div className="h-1 w-16 sm:w-24 golden-gradient mx-auto mb-6 sm:mb-8"></div>
            <div className="bg-surface/50 border border-border rounded-lg p-4 sm:p-6 max-w-2xl mx-auto mb-6 sm:mb-8">
              <h3 className="font-display text-base sm:text-lg font-semibold text-primary mb-2 sm:mb-3">
                🎯 How to Play
              </h3>
              <p className="text-foreground/80 text-sm sm:text-base leading-relaxed">
                Fill in the missing Greek words to complete each sentence. Use
                hints when needed and learn proper grammar and vocabulary usage!
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-primary mb-4 sm:mb-6 text-center">
              Choose a Category
            </h2>
            <div className="grid gap-3 sm:gap-4">
              {Object.entries(CATEGORIES).map(([key, title]) => {
                const exerciseCount = WRITING_EXERCISES.filter(
                  (ex) => ex.category === key
                ).length;
                return (
                  <motion.button
                    key={key}
                    onClick={() => startGame(key)}
                    className="bg-surface border border-border rounded-lg p-4 sm:p-6 hover:shadow-[--shadow-glow] transition-all duration-300 text-left group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-semibold text-primary mb-1 sm:mb-2">
                          {title}
                        </h3>
                        <p className="text-foreground/70 text-sm sm:text-base">
                          {exerciseCount} exercises to practice
                        </p>
                      </div>
                      <div className="text-xl sm:text-2xl">
                        {key === "verb-conjugations"
                          ? "🔄"
                          : key === "basic-vocabulary"
                            ? "📚"
                            : "✏️"}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-4xl sm:text-6xl mb-6 sm:mb-8">🎉</div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 sm:mb-6">
              Excellent Work!
            </h1>
            <p className="text-base sm:text-lg text-foreground/80 mb-6 sm:mb-8">
              You&apos;ve completed all exercises in{" "}
              <span className="font-semibold text-primary">
                {selectedCategory
                  ? CATEGORIES[selectedCategory as keyof typeof CATEGORIES]
                  : ""}
              </span>
              ! Your Greek writing skills are improving.
            </p>

            <div className="bg-surface border border-border rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <Trophy className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
                <h3 className="font-display text-lg sm:text-xl font-semibold text-primary">
                  Your Progress
                </h3>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                {completedExercises.length}/{availableExercises.length}
              </div>
              <p className="text-sm sm:text-base text-muted">
                Exercises Completed
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={resetGame}
                className="bg-primary hover:bg-primary-dark text-background font-semibold py-3 px-6 rounded-lg transition-colors text-sm sm:text-base"
              >
                Try Another Category
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
            Greek Writing Practice
          </h1>
          <button
            onClick={resetGame}
            className="flex items-center gap-1 sm:gap-2 bg-surface border border-border px-2 sm:px-4 py-2 rounded-lg hover:bg-primary/10"
          >
            <RotateCcw size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline text-sm">Reset</span>
          </button>
        </div>

        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-sm sm:text-base text-muted">
              {selectedCategory
                ? CATEGORIES[selectedCategory as keyof typeof CATEGORIES]
                : ""}
            </span>
            <span className="text-sm sm:text-base text-primary font-semibold">
              {completedExercises.length + 1}/{availableExercises.length}
            </span>
          </div>
          <div className="w-full bg-surface border border-border rounded-full h-2 sm:h-3">
            <div
              className="golden-gradient h-full rounded-full transition-all duration-300"
              style={{
                width: `${((completedExercises.length + 1) / availableExercises.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Current Exercise */}
        {currentExercise && (
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentExercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-surface border border-border rounded-lg p-4 sm:p-6 md:p-8"
              >
                <div className="text-center mb-4 sm:mb-6">
                  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                    {
                      CATEGORIES[
                        currentExercise.category as keyof typeof CATEGORIES
                      ]
                    }
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-primary mb-2 sm:mb-3">
                    Complete the Sentence
                  </h2>
                </div>

                {/* Greek Sentence */}
                <div className="text-center mb-4 sm:mb-6">
                  <p className="text-lg sm:text-xl md:text-2xl font-display text-foreground mb-2 sm:mb-3 leading-relaxed">
                    {currentExercise.sentence
                      .split("_____")
                      .map((part: string, index: number, array: string[]) => (
                        <span key={index}>
                          {part}
                          {index < array.length - 1 && (
                            <span className="inline-block min-w-[80px] sm:min-w-[120px] mx-1 sm:mx-2 px-2 sm:px-3 py-1 bg-primary/20 border-2 border-dashed border-primary rounded text-base sm:text-lg">
                              {userAnswer || "?"}
                            </span>
                          )}
                        </span>
                      ))}
                  </p>
                  <p className="text-sm sm:text-base text-muted italic">
                    &ldquo;{currentExercise.translation}&rdquo;
                  </p>
                </div>

                {/* Input */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                      placeholder="Type your answer in Greek..."
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-background border border-border rounded-lg font-display text-base sm:text-lg focus:border-primary focus:outline-none"
                      disabled={isCorrect === true}
                    />
                    <button
                      onClick={checkAnswer}
                      disabled={!userAnswer.trim() || isCorrect === true}
                      className="bg-primary hover:bg-primary-dark text-background font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                      Check
                    </button>
                  </div>
                </div>

                {/* Hint */}
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 sm:mb-6 p-3 sm:p-4 bg-primary/10 border border-primary/20 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-1 sm:mb-2">
                      <Lightbulb
                        size={16}
                        className="text-primary sm:w-4 sm:h-4"
                      />
                      <span className="text-sm sm:text-base font-medium text-primary">
                        Hint
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-foreground/80">
                      {currentExercise.hint}
                    </p>
                  </motion.div>
                )}

                {/* Result */}
                <AnimatePresence>
                  {isCorrect !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 ${
                        isCorrect
                          ? "bg-green-500/20 border border-green-500/30"
                          : "bg-red-500/20 border border-red-500/30"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1 sm:mb-2">
                        {isCorrect ? (
                          <CheckCircle
                            size={16}
                            className="text-green-400 sm:w-5 sm:h-5"
                          />
                        ) : (
                          <span className="text-red-400 text-lg sm:text-xl">
                            ✗
                          </span>
                        )}
                        <span
                          className={`font-medium text-sm sm:text-base ${
                            isCorrect ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {isCorrect ? "Correct!" : "Try again"}
                        </span>
                      </div>
                      {!isCorrect && (
                        <p className="text-sm sm:text-base text-foreground/80 mb-2">
                          The correct answer is:{" "}
                          <span className="font-semibold text-primary">
                            {currentExercise.correctAnswer}
                          </span>
                        </p>
                      )}
                      <p className="text-sm sm:text-base text-foreground/80">
                        {currentExercise.explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {!showHint && isCorrect !== true && (
                    <button
                      onClick={() => setShowHint(true)}
                      className="flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary font-semibold px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                    >
                      <Lightbulb size={14} className="sm:w-4 sm:h-4" />
                      Show Hint
                    </button>
                  )}
                  <button
                    onClick={skipExercise}
                    className="flex items-center justify-center gap-2 bg-surface border border-border hover:bg-primary/10 font-semibold px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                  >
                    Skip Exercise
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
