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
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-8"
            >
              <Home size={20} />
              Back to Home
            </Link>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary mb-6">
              Greek Alphabet Master
            </h1>
            <p className="text-xl text-muted mb-8">
              Match uppercase and lowercase Greek letters
            </p>
            <div className="h-1 w-24 golden-gradient mx-auto mb-8"></div>
            <div className="bg-surface/50 border border-border rounded-lg p-6 max-w-2xl mx-auto mb-8">
              <h3 className="font-display text-lg font-semibold text-primary mb-3">
                🎯 How to Play
              </h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Click cards to flip them and find matching pairs of uppercase
                and lowercase Greek letters. Learn letter names and
                pronunciation as you play!
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-2xl font-semibold text-primary mb-6 text-center">
              Choose Your Challenge
            </h2>
            <div className="grid gap-4">
              {(["easy", "medium", "hard"] as const).map((level) => (
                <motion.button
                  key={level}
                  onClick={() => startGame(level)}
                  className="bg-surface border border-border rounded-lg p-6 hover:shadow-[--shadow-glow] transition-all duration-300 text-left group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-primary capitalize mb-2">
                        {level}
                      </h3>
                      <p className="text-foreground/70">
                        {DIFFICULTY_DESCRIPTIONS[level]}
                      </p>
                    </div>
                    <Play className="text-primary group-hover:text-primary-dark" />
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
            Greek Alphabet Master
          </h1>
          <div className="flex items-center gap-4">
            {gameStatus === "playing" && (
              <button
                onClick={pauseGame}
                className="flex items-center gap-2 bg-surface border border-border px-4 py-2 rounded-lg hover:bg-primary/10"
              >
                <Pause size={16} />
                Pause
              </button>
            )}
            <button
              onClick={resetGame}
              className="flex items-center gap-2 bg-surface border border-border px-4 py-2 rounded-lg hover:bg-primary/10"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.moves}</div>
            <div className="text-sm text-muted">Moves</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {stats.matches}
            </div>
            <div className="text-sm text-muted">Letters Learned</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.score}</div>
            <div className="text-sm text-muted">Score</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary capitalize">
              {difficulty}
            </div>
            <div className="text-sm text-muted">Level</div>
          </div>
        </div>

        {/* Game Board */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`grid gap-4 ${
              difficulty === "easy"
                ? "grid-cols-3 md:grid-cols-4"
                : difficulty === "medium"
                  ? "grid-cols-3 md:grid-cols-6"
                  : "grid-cols-4 md:grid-cols-6"
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
                    } flex items-center justify-center`}
                  >
                    {card.isFlipped || card.isMatched ? (
                      <div className="text-center">
                        <div className="text-5xl mb-2 font-display text-primary">
                          {displayLetter}
                        </div>
                        <div className="text-xs font-medium text-primary">
                          {letter?.name}
                        </div>
                        <div className="text-xs text-muted mt-1">
                          {card.letterType === "uppercase" ? "Upper" : "Lower"}
                        </div>
                      </div>
                    ) : (
                      <div className="text-4xl text-muted/30">📚</div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Game Status Messages */}
        {gameStatus === "paused" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 bg-background/80 flex items-center justify-center"
          >
            <div className="bg-surface border border-border rounded-lg p-8 text-center max-w-md">
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                Game Paused
              </h2>
              <p className="text-muted mb-6">
                Take your time learning the alphabet!
              </p>
              <button
                onClick={resumeGame}
                className="bg-primary hover:bg-primary-dark text-background font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Continue Learning
              </button>
            </div>
          </motion.div>
        )}

        {gameStatus === "won" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-background/80 flex items-center justify-center"
          >
            <div className="bg-surface border border-border rounded-lg p-8 text-center max-w-md">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="font-display text-3xl font-semibold text-primary mb-4">
                Συγχαρητήρια!
              </h2>
              <p className="text-lg text-primary mb-2">Congratulations!</p>
              <p className="text-muted mb-6">
                You&apos;ve mastered {stats.matches} Greek letters!
                <br />
                Score: {stats.score} points in {stats.moves} moves
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={resetGame}
                  className="bg-primary hover:bg-primary-dark text-background font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Play Again
                </button>
                <Link
                  href="/"
                  className="bg-surface border border-border hover:bg-primary/10 font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Back Home
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
