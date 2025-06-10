import { GreekGod } from "@/app/types/game";

export const GREEK_GODS: GreekGod[] = [
  {
    id: "zeus",
    name: "Zeus",
    symbol: "⚡",
    domain: "Sky & Thunder",
    description: "King of the gods, ruler of Mount Olympus",
  },
  {
    id: "poseidon",
    name: "Poseidon",
    symbol: "🔱",
    domain: "Sea & Earthquakes",
    description: "God of the sea, storms, and horses",
  },
  {
    id: "athena",
    name: "Athena",
    symbol: "🦉",
    domain: "Wisdom & War",
    description: "Goddess of wisdom, warfare, and crafts",
  },
  {
    id: "apollo",
    name: "Apollo",
    symbol: "☀️",
    domain: "Sun & Music",
    description: "God of the sun, music, poetry, and prophecy",
  },
  {
    id: "artemis",
    name: "Artemis",
    symbol: "🏹",
    domain: "Hunt & Moon",
    description: "Goddess of the hunt, wilderness, and moon",
  },
  {
    id: "aphrodite",
    name: "Aphrodite",
    symbol: "🌹",
    domain: "Love & Beauty",
    description: "Goddess of love, beauty, and pleasure",
  },
  {
    id: "ares",
    name: "Ares",
    symbol: "⚔️",
    domain: "War & Courage",
    description: "God of war, courage, and civil order",
  },
  {
    id: "hephaestus",
    name: "Hephaestus",
    symbol: "🔨",
    domain: "Fire & Forge",
    description: "God of fire, metalworking, and crafts",
  },
  {
    id: "demeter",
    name: "Demeter",
    symbol: "🌾",
    domain: "Harvest & Agriculture",
    description: "Goddess of the harvest and agriculture",
  },
  {
    id: "dionysus",
    name: "Dionysus",
    symbol: "🍇",
    domain: "Wine & Festivity",
    description: "God of wine, festivity, and theater",
  },
  {
    id: "hermes",
    name: "Hermes",
    symbol: "🪽",
    domain: "Messenger & Trade",
    description: "Messenger god, god of trade and thieves",
  },
  {
    id: "hera",
    name: "Hera",
    symbol: "👑",
    domain: "Marriage & Family",
    description: "Queen of the gods, goddess of marriage",
  },
];

// Game configuration based on difficulty
export const GAME_CONFIG = {
  easy: { pairs: 6, timeLimit: 120 }, // 12 cards
  medium: { pairs: 8, timeLimit: 100 }, // 16 cards
  hard: { pairs: 10, timeLimit: 80 }, // 20 cards
};

export const DIFFICULTY_DESCRIPTIONS = {
  easy: "6 pairs - Perfect for beginners",
  medium: "8 pairs - A balanced challenge",
  hard: "10 pairs - For memory masters",
};
