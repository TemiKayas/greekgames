import { GameCollection, GameMetadata } from "@/app/types/games";

// 🇬🇷 MODERN GREEK LANGUAGE LEARNING GAMES
// Add new language learning activities here and they'll automatically appear!

export const GAMES: GameMetadata[] = [
  // ✅ EXISTING GAMES (Alphabet Learning)
  {
    id: "greek-alphabet-master",
    title: "Greek Alphabet Master",
    description:
      "Match uppercase and lowercase Greek letters to master the alphabet",
    status: "available",
    icon: "Αα",
    href: "/memory",
    category: "memory",
    difficulty: "easy",
    estimatedPlayTime: "3-8 min",
    features: [
      "24 Greek Letters",
      "Upper & Lowercase",
      "Letter Names",
      "Pronunciation Guide",
    ],
    releaseDate: "2024-12-09",
    version: "1.0.0",
  },

  // 📚 CORE LANGUAGE LEARNING GAMES
  {
    id: "alphabet-writing",
    title: "Greek Writing Practice",
    description:
      "Practice Greek writing with fill-in-the-blank exercises for verbs, vocabulary, and sentences",
    status: "available",
    icon: "✍️",
    href: "/writing",
    category: "puzzle",
    difficulty: "medium",
    estimatedPlayTime: "8-15 min",
    features: [
      "Verb Conjugations",
      "Basic Vocabulary",
      "Sentence Completion",
      "Greek Keyboard Support",
    ],
    releaseDate: "2024-12-10",
    version: "1.0.0",
  },

  {
    id: "everyday-vocabulary",
    title: "Everyday Greek Words",
    description:
      "Learn essential Greek vocabulary by dragging words to matching images",
    status: "available",
    icon: "💬",
    href: "/vocabulary",
    category: "memory",
    difficulty: "medium",
    estimatedPlayTime: "5-12 min",
    features: [
      "18+ Common Words",
      "Drag & Drop Matching",
      "Visual Learning",
      "Pronunciation Guide",
    ],
    releaseDate: "2024-12-10",
    version: "1.0.0",
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
  "greek-alphabet-master",
  "alphabet-writing",
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
