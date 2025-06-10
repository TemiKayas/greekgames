import { GameCollection, GameMetadata } from "@/app/types/games";

// 🇬🇷 MODERN GREEK LANGUAGE LEARNING GAMES
// Add new language learning activities here and they'll automatically appear!

export const GAMES: GameMetadata[] = [
  // ✅ EXISTING GAMES (Reframed for language learning)
  {
    id: "gods-of-olympus",
    title: "Greek Gods Memory",
    description: "Learn the names of Greek gods and their domains in Greek",
    status: "beta",
    icon: "⚡",
    href: "/memory",
    category: "memory",
    difficulty: "easy",
    estimatedPlayTime: "3-8 min",
    features: [
      "12 Greek Gods",
      "Greek Vocabulary",
      "Visual Learning",
      "Mythology Context",
    ],
    releaseDate: "2024-12-09",
    version: "0.1.0-beta",
  },

  // 📚 CORE LANGUAGE LEARNING GAMES
  {
    id: "alphabet-master",
    title: "Greek Alphabet Master",
    description:
      "Master the 24 letters of the Greek alphabet with interactive exercises",
    status: "coming-soon",
    icon: "Αα",
    href: "/alphabet",
    category: "puzzle",
    difficulty: "easy",
    estimatedPlayTime: "5-15 min",
    features: [
      "24 Greek Letters",
      "Letter Recognition",
      "Pronunciation Guide",
      "Writing Practice",
    ],
    releaseDate: "2025-01-15",
  },

  {
    id: "everyday-vocabulary",
    title: "Everyday Greek Words",
    description:
      "Learn essential Modern Greek vocabulary for daily conversations",
    status: "in-development",
    icon: "💬",
    href: "/vocabulary",
    category: "memory",
    difficulty: "medium",
    estimatedPlayTime: "10-20 min",
    features: [
      "500+ Common Words",
      "Audio Pronunciation",
      "Spaced Repetition",
      "Progress Tracking",
    ],
    releaseDate: "2025-01-30",
  },

  {
    id: "verb-conjugation",
    title: "Greek Verb Trainer",
    description: "Master Greek verb conjugations with interactive practice",
    status: "planning",
    icon: "📝",
    href: "/verbs",
    category: "puzzle",
    difficulty: "hard",
    estimatedPlayTime: "15-25 min",
    features: [
      "Common Verbs",
      "All Tenses",
      "Interactive Quizzes",
      "Conjugation Tables",
    ],
    releaseDate: "2025-02-15",
  },

  {
    id: "conversation-practice",
    title: "Greek Conversations",
    description: "Practice real-world Greek conversations in common scenarios",
    status: "planning",
    icon: "🗣️",
    href: "/conversations",
    category: "adventure",
    difficulty: "medium",
    estimatedPlayTime: "10-30 min",
    features: [
      "Real Scenarios",
      "Voice Recognition",
      "Cultural Context",
      "Difficulty Levels",
    ],
    releaseDate: "2025-03-01",
  },

  {
    id: "numbers-and-counting",
    title: "Greek Numbers Game",
    description: "Learn Greek numbers, counting, and basic mathematics",
    status: "coming-soon",
    icon: "🔢",
    href: "/numbers",
    category: "puzzle",
    difficulty: "easy",
    estimatedPlayTime: "5-10 min",
    features: [
      "Numbers 1-1000",
      "Math Operations",
      "Time & Dates",
      "Money & Prices",
    ],
    releaseDate: "2025-01-20",
  },

  {
    id: "greek-culture-quiz",
    title: "Greek Culture & History",
    description: "Explore Greek culture while learning the language",
    status: "planning",
    icon: "🏛️",
    href: "/culture",
    category: "adventure",
    difficulty: "medium",
    estimatedPlayTime: "15-30 min",
    features: [
      "Cultural Facts",
      "Historical Context",
      "Geography",
      "Traditions",
    ],
    releaseDate: "2025-02-28",
  },

  {
    id: "pronunciation-trainer",
    title: "Greek Pronunciation Coach",
    description: "Perfect your Greek pronunciation with AI-powered feedback",
    status: "planning",
    icon: "🎤",
    href: "/pronunciation",
    category: "action",
    difficulty: "medium",
    estimatedPlayTime: "5-15 min",
    features: [
      "Speech Recognition",
      "Accent Training",
      "Phonetic Guide",
      "Regional Dialects",
    ],
    releaseDate: "2025-03-15",
  },
];

// 🏆 FEATURED LEARNING ACTIVITIES (highlight on homepage)
export const FEATURED_GAME_IDS = [
  "gods-of-olympus",
  "alphabet-master",
  "everyday-vocabulary",
];

// 📊 UTILITY FUNCTIONS
export const getGameCollection = (): GameCollection => {
  const featured = GAMES.filter((game) => FEATURED_GAME_IDS.includes(game.id));

  const categories = GAMES.reduce(
    (acc, game) => {
      if (!acc[game.category]) {
        acc[game.category] = [];
      }
      acc[game.category].push(game);
      return acc;
    },
    {} as Record<string, GameMetadata[]>
  );

  return {
    featured,
    all: GAMES,
    categories,
  };
};

export const getGameById = (id: string): GameMetadata | undefined => {
  return GAMES.find((game) => game.id === id);
};

export const getGamesByStatus = (
  status: GameMetadata["status"]
): GameMetadata[] => {
  return GAMES.filter((game) => game.status === status);
};

export const getGamesByCategory = (
  category: GameMetadata["category"]
): GameMetadata[] => {
  return GAMES.filter((game) => game.category === category);
};

export const getAvailableGames = (): GameMetadata[] => {
  return GAMES.filter(
    (game) => game.status === "available" || game.status === "beta"
  );
};
