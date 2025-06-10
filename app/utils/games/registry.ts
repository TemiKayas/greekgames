import { GameCollection, GameMetadata } from "@/app/types/games";

// 🎮 GAMES REGISTRY
// Add new games here and they'll automatically appear on the homepage!

export const GAMES: GameMetadata[] = [
  // ✅ EXISTING GAMES
  {
    id: "gods-of-olympus",
    title: "Gods of Olympus",
    description: "Test your memory with the mighty Greek gods",
    status: "beta",
    icon: "⚡",
    href: "/memory",
    category: "memory",
    difficulty: "easy",
    estimatedPlayTime: "3-8 min",
    features: [
      "12 Greek Gods",
      "3 Difficulty Levels",
      "Score Tracking",
      "Responsive Design",
    ],
    releaseDate: "2024-12-09",
    version: "0.1.0-beta",
  },

  // 📋 PLANNED GAMES (Add new games here!)
  {
    id: "odyssey-quest",
    title: "Odyssey Quest",
    description: "Embark on an epic journey through ancient Greece",
    status: "planning",
    icon: "🏛️",
    href: "/odyssey", // Will be created when ready
    category: "adventure",
    difficulty: "medium",
    estimatedPlayTime: "15-30 min",
    features: [
      "Epic Storyline",
      "Multiple Paths",
      "Greek Mythology",
      "Turn-based Combat",
    ],
    releaseDate: "TBA",
  },

  {
    id: "spartan-warriors",
    title: "Spartan Warriors",
    description: "Lead your army to victory in ancient battles",
    status: "planning",
    icon: "🛡️",
    href: "/spartan",
    category: "strategy",
    difficulty: "hard",
    estimatedPlayTime: "20-45 min",
    features: [
      "Army Management",
      "Battle Tactics",
      "Historical Accuracy",
      "Multiplayer",
    ],
    releaseDate: "TBA",
  },

  {
    id: "greek-word-match",
    title: "Greek Word Match",
    description: "Learn Greek vocabulary by matching words with their meanings",
    status: "coming-soon",
    icon: "📚",
    href: "/word-match",
    category: "puzzle",
    difficulty: "medium",
    estimatedPlayTime: "5-15 min",
    features: [
      "Language Learning",
      "Progressive Difficulty",
      "Audio Pronunciation",
      "Daily Challenges",
    ],
    releaseDate: "2025-01-15",
  },

  {
    id: "temple-builder",
    title: "Temple Builder",
    description: "Design and construct magnificent Greek temples",
    status: "in-development",
    icon: "🏗️",
    href: "/temple-builder",
    category: "strategy",
    difficulty: "medium",
    estimatedPlayTime: "10-25 min",
    features: [
      "Creative Building",
      "Historical Architecture",
      "Resource Management",
      "3D Preview",
    ],
    releaseDate: "2025-02-01",
  },

  {
    id: "myth-trivia",
    title: "Mythology Trivia",
    description: "Challenge your knowledge of Greek myths and legends",
    status: "coming-soon",
    icon: "❓",
    href: "/trivia",
    category: "puzzle",
    difficulty: "easy",
    estimatedPlayTime: "2-5 min",
    features: [
      "1000+ Questions",
      "Difficulty Levels",
      "Leaderboards",
      "Daily Quests",
    ],
    releaseDate: "2025-01-30",
  },
];

// 🏆 FEATURED GAMES (games to highlight on homepage)
export const FEATURED_GAME_IDS = [
  "gods-of-olympus",
  "odyssey-quest",
  "spartan-warriors",
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
