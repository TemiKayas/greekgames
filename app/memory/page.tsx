"use client";

import { useGameStore } from "@/app/stores/gameStore";
import {
    DIFFICULTY_DESCRIPTIONS,
    GREEK_ALPHABET,
} from "@/app/utils/game/greekGods";
import { motion } from "framer-motion";
import { Home, Pause, Play, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function AlphabetGame() {
  const {
    cards,
    gameStatus,
    difficulty,
    stats,
    startGame,
    flipCard,
    resetGame,
    pauseGame,
    resumeGame,
  } = useGameStore();

  const handleCardClick = (cardId: string) => {
    flipCard(cardId);
  };

  const getLetterByCardId = (letterId: string) => {
    return GREEK_ALPHABET.find((letter) => letter.id === letterId);
  };

  if (gameStatus === "menu") {
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
              Greek Alphabet Master
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted mb-6 sm:mb-8">
              Match uppercase and lowercase Greek letters
            </p>
            <div className="h-1 w-16 sm:w-24 golden-gradient mx-auto mb-6 sm:mb-8"></div>
            <div className="bg-surface/50 border border-border rounded-lg p-4 sm:p-6 max-w-2xl mx-auto mb-6 sm:mb-8">
              <h3 className="font-display text-base sm:text-lg font-semibold text-primary mb-2 sm:mb-3">
                🎯 How to Play
              </h3>
              <p className="text-foreground/80 text-sm sm:text-base leading-relaxed">
                Click cards to flip them and find matching pairs of uppercase
                and lowercase Greek letters. Learn letter names and
                pronunciation as you play!
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-primary mb-4 sm:mb-6 text-center">
              Choose Your Challenge
            </h2>
            <div className="grid gap-3 sm:gap-4">
              {(["easy", "medium", "hard"] as const).map((level) => (
                <motion.button
                  key={level}
                  onClick={() => startGame(level)}
                  className="bg-surface border border-border rounded-lg p-4 sm:p-6 hover:shadow-[--shadow-glow] transition-all duration-300 text-left group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-semibold text-primary capitalize mb-1 sm:mb-2">
                        {level}
                      </h3>
                      <p className="text-foreground/70 text-sm sm:text-base">
                        {DIFFICULTY_DESCRIPTIONS[level]}
                      </p>
                    </div>
                    <Play className="text-primary group-hover:text-primary-dark w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </motion.button>
              ))}
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
            Greek Alphabet Master
          </h1>
          <div className="flex items-center gap-2 sm:gap-4">
            {gameStatus === "playing" && (
              <button
                onClick={pauseGame}
                className="flex items-center gap-1 sm:gap-2 bg-surface border border-border px-2 sm:px-4 py-2 rounded-lg hover:bg-primary/10"
              >
                <Pause size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline text-sm">Pause</span>
              </button>
            )}
            <button
              onClick={resetGame}
              className="flex items-center gap-1 sm:gap-2 bg-surface border border-border px-2 sm:px-4 py-2 rounded-lg hover:bg-primary/10"
            >
              <RotateCcw size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline text-sm">Reset</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-surface border border-border rounded-lg p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-primary">{stats.moves}</div>
            <div className="text-xs sm:text-sm text-muted">Moves</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-primary">
              {stats.matches}
            </div>
            <div className="text-xs sm:text-sm text-muted">Letters Learned</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-primary">{stats.score}</div>
            <div className="text-xs sm:text-sm text-muted">Score</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-primary capitalize">
              {difficulty}
            </div>
            <div className="text-xs sm:text-sm text-muted">Level</div>
          </div>
        </div>

        {/* Game Board */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`grid gap-2 sm:gap-3 md:gap-4 ${
              difficulty === "easy"
                ? "grid-cols-3 sm:grid-cols-4"
                : difficulty === "medium"
                  ? "grid-cols-4 sm:grid-cols-6"
                  : "grid-cols-4 sm:grid-cols-6 md:grid-cols-8"
            }`}
          >
            {cards.map((card) => {
              const letter = getLetterByCardId(card.letterId);
              const displayLetter =
                card.letterType === "uppercase"
                  ? letter?.uppercase
                  : letter?.lowercase;

              return (
                <motion.div
                  key={card.id}
                  className="aspect-square relative cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCardClick(card.id)}
                >
                  <div
                    className={`w-full h-full rounded-lg border-2 transition-all duration-300 ${
                      card.isFlipped || card.isMatched
                        ? "border-primary bg-surface"
                        : "border-border bg-surface/50 hover:border-primary/50"
                    } ${
                      card.isMatched ? "opacity-75" : ""
                    } flex items-center justify-center p-1 sm:p-2`}
                  >
                    {card.isFlipped || card.isMatched ? (
                      <div className="text-center w-full">
                        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-1 font-display text-primary">
                          {displayLetter}
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-primary truncate">
                          {letter?.name}
                        </div>
                        <div className="text-xs text-muted mt-1 truncate">
                          {card.letterType === "uppercase" ? "Upper" : "Lower"}
                        </div>
                      </div>
                    ) : (
                      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted/50">
                        ?
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Victory State */}
        {gameStatus === "won" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <div className="bg-surface border border-border rounded-lg p-6 sm:p-8 text-center max-w-md w-full">
              <div className="text-4xl sm:text-6xl mb-4">🎉</div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4">
                Congratulations!
              </h2>
              <p className="text-foreground/80 mb-4 sm:mb-6 text-sm sm:text-base">
                You've mastered the Greek alphabet! You completed the{" "}
                <span className="font-semibold text-primary capitalize">
                  {difficulty}
                </span>{" "}
                level in{" "}
                <span className="font-semibold text-primary">{stats.moves}</span>{" "}
                moves.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={resetGame}
                  className="bg-primary hover:bg-primary-dark text-background font-semibold py-2 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
                >
                  Play Again
                </button>
                <Link href="/">
                  <button className="w-full sm:w-auto bg-surface border border-border hover:bg-primary/10 font-semibold py-2 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base">
                    Home
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Paused State */}
        {gameStatus === "paused" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <div className="bg-surface border border-border rounded-lg p-6 sm:p-8 text-center max-w-md w-full">
              <div className="text-3xl sm:text-4xl mb-4">⏸️</div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4">
                Game Paused
              </h2>
              <p className="text-foreground/80 mb-4 sm:mb-6 text-sm sm:text-base">
                Take your time! Click continue when you're ready to resume.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={resumeGame}
                  className="bg-primary hover:bg-primary-dark text-background font-semibold py-2 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
                >
                  Continue
                </button>
                <button
                  onClick={resetGame}
                  className="bg-surface border border-border hover:bg-primary/10 font-semibold py-2 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
                >
                  New Game
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
