"use client";

import {
  getVocabularyByDifficulty,
  GreekVocabularyItem,
  shuffleArray,
  VOCABULARY_CONFIG,
} from "@/app/utils/vocabulary/greekWords";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Play, RotateCcw, Trophy, Volume2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type DifficultyLevel = keyof typeof VOCABULARY_CONFIG;

interface DraggedItem {
  id: string;
  greek: string;
}

interface DropZone {
  id: string;
  item: GreekVocabularyItem;
  isMatched: boolean;
  draggedItem: DraggedItem | null;
}

export default function VocabularyGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("easy");
  const [vocabulary, setVocabulary] = useState<GreekVocabularyItem[]>([]);
  const [shuffledWords, setShuffledWords] = useState<GreekVocabularyItem[]>([]);
  const [dropZones, setDropZones] = useState<DropZone[]>([]);
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
  const [score, setScore] = useState(0);
  const [matches, setMatches] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const config = VOCABULARY_CONFIG[difficulty];

  const startGame = (selectedDifficulty: DifficultyLevel) => {
    const words = getVocabularyByDifficulty(selectedDifficulty);
    const shuffledItems = shuffleArray([...words]);
    const shuffledWordList = shuffleArray([...words]);

    setDifficulty(selectedDifficulty);
    setVocabulary(words);
    setShuffledWords(shuffledWordList);
    setDropZones(
      shuffledItems.map((item) => ({
        id: item.id,
        item,
        isMatched: false,
        draggedItem: null,
      }))
    );
    setScore(0);
    setMatches(0);
    setTimeLeft(VOCABULARY_CONFIG[selectedDifficulty].timeLimit);
    setGameComplete(false);
    setGameStarted(true);
    setShowHints(false);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameComplete(false);
    setScore(0);
    setMatches(0);
    setDraggedItem(null);
  };

  // Timer logic
  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted) {
      setGameComplete(true);
    }
  }, [timeLeft, gameStarted, gameComplete]);

  // Check for game completion
  useEffect(() => {
    if (matches === vocabulary.length && vocabulary.length > 0) {
      setGameComplete(true);
    }
  }, [matches, vocabulary.length]);

  const handleDragStart = (item: GreekVocabularyItem) => {
    setDraggedItem({ id: item.id, greek: item.greek });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (dropZone: DropZone) => {
    if (!draggedItem) return;

    const isCorrect = draggedItem.id === dropZone.item.id;

    if (isCorrect && !dropZone.isMatched) {
      // Correct match!
      setDropZones((prev) =>
        prev.map((zone) =>
          zone.id === dropZone.id
            ? { ...zone, isMatched: true, draggedItem }
            : zone
        )
      );
      setMatches(matches + 1);
      setScore(score + 100);

      // Remove the word from available words
      setShuffledWords((prev) =>
        prev.filter((word) => word.id !== draggedItem.id)
      );
    }

    setDraggedItem(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const playPronunciation = (word: GreekVocabularyItem) => {
    // Placeholder for future audio implementation
    // TODO: Implement audio pronunciation
  };

  if (!gameStarted) {
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
              Everyday Greek Words
            </h1>
            <p className="text-xl text-muted mb-8">
              Drag Greek words to their matching images
            </p>
            <div className="h-1 w-24 golden-gradient mx-auto mb-8"></div>
            <div className="bg-surface/50 border border-border rounded-lg p-6 max-w-2xl mx-auto mb-8">
              <h3 className="font-display text-lg font-semibold text-primary mb-3">
                🎯 How to Play
              </h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Drag the Greek words from the word bank and drop them onto the
                matching images. Learn pronunciation and meaning as you play!
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-2xl font-semibold text-primary mb-6 text-center">
              Choose Your Level
            </h2>
            <div className="grid gap-4">
              {(Object.keys(VOCABULARY_CONFIG) as DifficultyLevel[]).map(
                (level) => (
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
                        <p className="text-foreground/70 mb-1">
                          {VOCABULARY_CONFIG[level].description}
                        </p>
                        <p className="text-sm text-muted">
                          {VOCABULARY_CONFIG[level].wordCount} words •{" "}
                          {Math.floor(VOCABULARY_CONFIG[level].timeLimit / 60)}{" "}
                          minutes
                        </p>
                      </div>
                      <Play className="text-primary group-hover:text-primary-dark" />
                    </div>
                  </motion.button>
                )
              )}
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
            Everyday Greek Words
          </h1>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 bg-surface border border-border px-4 py-2 rounded-lg hover:bg-primary/10"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{score}</div>
            <div className="text-sm text-muted">Score</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {matches}/{vocabulary.length}
            </div>
            <div className="text-sm text-muted">Matched</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-muted">Time Left</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary capitalize">
              {difficulty}
            </div>
            <div className="text-sm text-muted">Level</div>
          </div>
        </div>

        {/* Word Bank */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold text-primary">
              Word Bank
            </h2>
            <button
              onClick={() => setShowHints(!showHints)}
              className="text-sm text-primary hover:text-primary-dark underline"
            >
              {showHints ? "Hide" : "Show"} English hints
            </button>
          </div>
          <div className="bg-surface/50 border border-border rounded-lg p-4">
            <div className="flex flex-wrap gap-3">
              <AnimatePresence>
                {shuffledWords.map((word) => (
                  <motion.div
                    key={word.id}
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    draggable
                    onDragStart={() => handleDragStart(word)}
                    className="bg-primary text-background px-4 py-2 rounded-lg cursor-grab active:cursor-grabbing font-display text-lg hover:bg-primary-dark transition-colors select-none"
                  >
                    <div className="text-center">
                      <div>{word.greek}</div>
                      {showHints && (
                        <div className="text-xs opacity-75">{word.english}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Drop Zones Grid */}
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-xl font-semibold text-primary mb-4 text-center">
            Match the Greek words to their images
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dropZones.map((zone) => (
              <motion.div
                key={zone.id}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(zone)}
                className={`aspect-square border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center transition-all duration-300 ${
                  zone.isMatched
                    ? "border-green-500 bg-green-50"
                    : "border-border hover:border-primary/50 bg-surface/50"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                {/* Image/Icon */}
                <div className="text-6xl mb-3">{zone.item.icon}</div>

                {/* Matched Word or Drop Zone */}
                {zone.isMatched ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <div className="font-display text-lg text-primary mb-1">
                      {zone.draggedItem?.greek}
                    </div>
                    <div className="text-sm text-foreground/70">
                      {zone.item.english}
                    </div>
                    <button
                      onClick={() => playPronunciation(zone.item)}
                      className="mt-2 flex items-center gap-1 text-xs text-primary hover:text-primary-dark"
                    >
                      <Volume2 size={12} />
                      {zone.item.pronunciation}
                    </button>
                  </motion.div>
                ) : (
                  <div className="text-center">
                    <div className="text-sm text-muted mb-2">Drop here</div>
                    <div className="text-xs text-foreground/50">
                      {zone.item.english}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Game Complete Modal */}
        {gameComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-background/80 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface border border-border rounded-lg p-8 text-center max-w-md mx-4"
            >
              <Trophy className="text-primary mx-auto mb-4" size={48} />
              <h2 className="font-display text-3xl font-semibold text-primary mb-4">
                {matches === vocabulary.length ? "Excellent!" : "Time's Up!"}
              </h2>
              <p className="text-lg text-primary mb-2">
                {matches === vocabulary.length
                  ? "Συγχαρητήρια! Perfect score!"
                  : `You matched ${matches} out of ${vocabulary.length} words`}
              </p>
              <p className="text-muted mb-6">Final Score: {score} points</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => startGame(difficulty)}
                  className="bg-primary hover:bg-primary-dark text-background font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Play Again
                </button>
                <button
                  onClick={resetGame}
                  className="bg-surface border border-border hover:bg-primary/10 font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Choose Level
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
