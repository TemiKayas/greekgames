"use client";

import {
    getVocabularyByDifficulty,
    GreekVocabularyItem,
    shuffleArray,
    VOCABULARY_CONFIG,
} from "@/app/utils/vocabulary/greekWords";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Play, RotateCcw, Trophy } from "lucide-react";
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

  const handleDrop = (e: React.DragEvent, dropZone: DropZone) => {
    e.preventDefault();
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
              Everyday Greek Words
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted mb-6 sm:mb-8">
              Drag Greek words to their matching images
            </p>
            <div className="h-1 w-16 sm:w-24 golden-gradient mx-auto mb-6 sm:mb-8"></div>
            <div className="bg-surface/50 border border-border rounded-lg p-4 sm:p-6 max-w-2xl mx-auto mb-6 sm:mb-8">
              <h3 className="font-display text-base sm:text-lg font-semibold text-primary mb-2 sm:mb-3">
                🎯 How to Play
              </h3>
              <p className="text-foreground/80 text-sm sm:text-base leading-relaxed">
                Drag the Greek words from the word bank and drop them onto the
                matching images. Learn pronunciation and meaning as you play!
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-primary mb-4 sm:mb-6 text-center">
              Choose Your Level
            </h2>
            <div className="grid gap-3 sm:gap-4">
              {(Object.keys(VOCABULARY_CONFIG) as DifficultyLevel[]).map(
                (level) => (
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
                        <p className="text-foreground/70 text-sm sm:text-base mb-1">
                          {VOCABULARY_CONFIG[level].description}
                        </p>
                        <p className="text-xs sm:text-sm text-muted">
                          {VOCABULARY_CONFIG[level].wordCount} words •{" "}
                          {Math.floor(VOCABULARY_CONFIG[level].timeLimit / 60)}{" "}
                          minutes
                        </p>
                      </div>
                      <Play className="text-primary group-hover:text-primary-dark w-5 h-5 sm:w-6 sm:h-6" />
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

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-4xl sm:text-6xl mb-6 sm:mb-8">
              {timeLeft > 0 ? "🎉" : "⏰"}
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 sm:mb-6">
              {timeLeft > 0 ? "Excellent Work!" : "Time's Up!"}
            </h1>
            <p className="text-base sm:text-lg text-foreground/80 mb-6 sm:mb-8">
              You matched {matches} out of {vocabulary.length} Greek words on{" "}
              <span className="font-semibold text-primary capitalize">
                {difficulty}
              </span>{" "}
              level.
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
                    {score}
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
                    {vocabulary.length > 0
                      ? Math.round((matches / vocabulary.length) * 100)
                      : 0}%
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => startGame(difficulty)}
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
            Everyday Greek Words
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
              {formatTime(timeLeft)}
            </div>
            <div className="text-xs sm:text-sm text-muted">Time Left</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-primary">
              {matches}/{vocabulary.length}
            </div>
            <div className="text-xs sm:text-sm text-muted">Matched</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-primary">{score}</div>
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary font-medium px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
            >
              <span className="text-sm sm:text-base">💡</span>
              <span className="hidden sm:inline">
                {showHints ? "Hide" : "Show"} Hints
              </span>
              <span className="sm:hidden">Hints</span>
            </button>
          </div>
          <div className="text-center">
            <p className="text-xs sm:text-sm text-muted">
              Drag Greek words to matching images
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Word Bank */}
          <div className="bg-surface border border-border rounded-lg p-3 sm:p-4 md:p-6 mb-6 sm:mb-8">
            <h3 className="font-display text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4 text-center">
              Word Bank - Drag to Match
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
              <AnimatePresence>
                {shuffledWords.map((word) => (
                  <motion.div
                    key={word.id}
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    draggable
                    onDragStart={() => handleDragStart(word)}
                    className="bg-primary text-background px-3 sm:px-4 py-2 sm:py-3 rounded-lg cursor-grab active:cursor-grabbing font-display text-sm sm:text-base md:text-lg hover:bg-primary-dark transition-colors select-none text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="font-bold">{word.greek}</div>
                    {showHints && (
                      <div className="text-xs opacity-80 mt-1">
                        {word.pronunciation}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {shuffledWords.length === 0 && (
              <div className="text-center text-muted py-4 sm:py-6">
                <p className="text-sm sm:text-base">All words have been matched! 🎉</p>
              </div>
            )}
          </div>

          {/* Drop Zones Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
            {dropZones.map((zone) => (
              <motion.div
                key={zone.id}
                className={`aspect-square border-2 border-dashed rounded-lg p-2 sm:p-3 flex flex-col items-center justify-center transition-all duration-300 ${
                  zone.isMatched
                    ? "border-green-400 bg-green-500/20"
                    : draggedItem && draggedItem.id === zone.item.id
                      ? "border-primary bg-primary/20 scale-105"
                      : "border-border bg-surface/50 hover:border-primary/50"
                }`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, zone)}
                whileHover={{ scale: zone.isMatched ? 1 : 1.02 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">
                  {zone.item.icon}
                </div>
                <div className="text-center">
                  <div className="text-xs sm:text-sm font-medium text-primary mb-1">
                    {zone.item.english}
                  </div>
                  {showHints && !zone.isMatched && (
                    <div className="text-xs text-muted">
                      {zone.item.pronunciation}
                    </div>
                  )}
                  {zone.isMatched && zone.draggedItem && (
                    <div className="text-sm sm:text-base font-display text-primary font-bold">
                      {zone.draggedItem.greek}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
