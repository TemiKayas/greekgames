export interface GreekVocabularyItem {
  id: string;
  greek: string;
  english: string;
  pronunciation: string;
  category: string;
  description: string;
  icon: string; // Emoji representation for now
  difficulty: "easy" | "medium" | "hard";
}

export const GREEK_VOCABULARY: GreekVocabularyItem[] = [
  // Easy - Basic Items (6 words)
  {
    id: "water",
    greek: "νερό",
    english: "water",
    pronunciation: "ne-RO",
    category: "Drinks",
    description: "Essential liquid for life",
    icon: "💧",
    difficulty: "easy",
  },
  {
    id: "bread",
    greek: "ψωμί",
    english: "bread",
    pronunciation: "pso-MEE",
    category: "Food",
    description: "Basic food staple",
    icon: "🍞",
    difficulty: "easy",
  },
  {
    id: "house",
    greek: "σπίτι",
    english: "house",
    pronunciation: "SPEE-tee",
    category: "Home",
    description: "Place where people live",
    icon: "🏠",
    difficulty: "easy",
  },
  {
    id: "sun",
    greek: "ήλιος",
    english: "sun",
    pronunciation: "EE-lee-os",
    category: "Nature",
    description: "The star that lights our world",
    icon: "☀️",
    difficulty: "easy",
  },
  {
    id: "book",
    greek: "βιβλίο",
    english: "book",
    pronunciation: "vee-VLEE-oh",
    category: "Education",
    description: "Collection of pages for reading",
    icon: "📚",
    difficulty: "easy",
  },
  {
    id: "car",
    greek: "αυτοκίνητο",
    english: "car",
    pronunciation: "af-to-KEE-nee-to",
    category: "Transport",
    description: "Vehicle for transportation",
    icon: "🚗",
    difficulty: "easy",
  },

  // Medium - Daily Life (6 words)
  {
    id: "coffee",
    greek: "καφές",
    english: "coffee",
    pronunciation: "ka-FES",
    category: "Drinks",
    description: "Popular morning beverage",
    icon: "☕",
    difficulty: "medium",
  },
  {
    id: "phone",
    greek: "τηλέφωνο",
    english: "phone",
    pronunciation: "tee-LE-fo-no",
    category: "Technology",
    description: "Device for communication",
    icon: "📱",
    difficulty: "medium",
  },
  {
    id: "money",
    greek: "χρήματα",
    english: "money",
    pronunciation: "KHREE-ma-ta",
    category: "Finance",
    description: "Currency for transactions",
    icon: "💰",
    difficulty: "medium",
  },
  {
    id: "school",
    greek: "σχολείο",
    english: "school",
    pronunciation: "skho-LEE-o",
    category: "Education",
    description: "Place of learning",
    icon: "🏫",
    difficulty: "medium",
  },
  {
    id: "family",
    greek: "οικογένεια",
    english: "family",
    pronunciation: "ee-ko-YE-nee-a",
    category: "People",
    description: "Related group of people",
    icon: "👨‍👩‍👧‍👦",
    difficulty: "medium",
  },
  {
    id: "food",
    greek: "φαγητό",
    english: "food",
    pronunciation: "fa-yi-TO",
    category: "Food",
    description: "Nourishment for the body",
    icon: "🍽️",
    difficulty: "medium",
  },

  // Hard - Abstract/Complex (6 words)
  {
    id: "love",
    greek: "αγάπη",
    english: "love",
    pronunciation: "a-YA-pee",
    category: "Emotions",
    description: "Deep affection and care",
    icon: "❤️",
    difficulty: "hard",
  },
  {
    id: "time",
    greek: "ώρα",
    english: "time",
    pronunciation: "O-ra",
    category: "Abstract",
    description: "Measurement of duration",
    icon: "⏰",
    difficulty: "hard",
  },
  {
    id: "health",
    greek: "υγεία",
    english: "health",
    pronunciation: "ee-YEE-a",
    category: "Wellness",
    description: "State of physical well-being",
    icon: "🏥",
    difficulty: "hard",
  },
  {
    id: "work",
    greek: "δουλειά",
    english: "work",
    pronunciation: "doo-lee-A",
    category: "Career",
    description: "Employment or labor",
    icon: "💼",
    difficulty: "hard",
  },
  {
    id: "music",
    greek: "μουσική",
    english: "music",
    pronunciation: "moo-see-KEE",
    category: "Arts",
    description: "Art form using sound and rhythm",
    icon: "🎵",
    difficulty: "hard",
  },
  {
    id: "friendship",
    greek: "φιλία",
    english: "friendship",
    pronunciation: "fee-LEE-a",
    category: "Relationships",
    description: "Bond between friends",
    icon: "🤝",
    difficulty: "hard",
  },
];

// Game configuration
export const VOCABULARY_CONFIG = {
  easy: {
    wordCount: 6,
    timeLimit: 180,
    description: "Basic everyday items",
  },
  medium: {
    wordCount: 6,
    timeLimit: 240,
    description: "Daily life vocabulary",
  },
  hard: {
    wordCount: 6,
    timeLimit: 300,
    description: "Abstract concepts",
  },
  mixed: {
    wordCount: 12,
    timeLimit: 360,
    description: "Mix of all levels",
  },
};

export const getVocabularyByDifficulty = (
  difficulty: keyof typeof VOCABULARY_CONFIG
) => {
  if (difficulty === "mixed") {
    // Return a mix from all difficulties
    const easy = GREEK_VOCABULARY.filter(
      (item) => item.difficulty === "easy"
    ).slice(0, 4);
    const medium = GREEK_VOCABULARY.filter(
      (item) => item.difficulty === "medium"
    ).slice(0, 4);
    const hard = GREEK_VOCABULARY.filter(
      (item) => item.difficulty === "hard"
    ).slice(0, 4);
    return [...easy, ...medium, ...hard];
  }
  return GREEK_VOCABULARY.filter((item) => item.difficulty === difficulty);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
