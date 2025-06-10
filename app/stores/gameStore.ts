import { GameCard, GameState, GameStats } from "@/app/types/game";
import { GAME_CONFIG, GREEK_ALPHABET } from "@/app/utils/game/greekGods";
import { create } from "zustand";

interface GameStore extends GameState {
  // Actions
  startGame: (difficulty: GameState["difficulty"]) => void;
  flipCard: (cardId: string) => void;
  resetGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  updateStats: (stats: Partial<GameStats>) => void;
}

const createGameCards = (difficulty: GameState["difficulty"]): GameCard[] => {
  const pairCount = GAME_CONFIG[difficulty].pairs;
  const selectedLetters = GREEK_ALPHABET.slice(0, pairCount);

  // Create pairs of cards - one uppercase, one lowercase for each letter
  const cards: GameCard[] = [];
  selectedLetters.forEach((letter, index) => {
    // Uppercase card
    cards.push({
      id: `${letter.id}-upper`,
      letterId: letter.id,
      letterType: "uppercase",
      isFlipped: false,
      isMatched: false,
      position: index * 2,
    });
    // Lowercase card
    cards.push({
      id: `${letter.id}-lower`,
      letterId: letter.id,
      letterType: "lowercase",
      isFlipped: false,
      isMatched: false,
      position: index * 2 + 1,
    });
  });

  // Shuffle the cards
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  // Update positions after shuffle
  cards.forEach((card, index) => {
    card.position = index;
  });

  return cards;
};

const initialStats: GameStats = {
  moves: 0,
  matches: 0,
  timeElapsed: 0,
  score: 0,
};

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  cards: [],
  flippedCards: [],
  gameStatus: "menu",
  difficulty: "easy",
  stats: initialStats,

  // Actions
  startGame: (difficulty) => {
    const cards = createGameCards(difficulty);
    set({
      cards,
      difficulty,
      gameStatus: "playing",
      flippedCards: [],
      stats: { ...initialStats },
    });
  },

  flipCard: (cardId) => {
    const state = get();
    if (
      state.gameStatus !== "playing" ||
      state.flippedCards.length >= 2 ||
      state.flippedCards.includes(cardId)
    ) {
      return;
    }

    const updatedCards = state.cards.map((card) =>
      card.id === cardId ? { ...card, isFlipped: true } : card
    );

    const newFlippedCards = [...state.flippedCards, cardId];

    set({
      cards: updatedCards,
      flippedCards: newFlippedCards,
      stats: { ...state.stats, moves: state.stats.moves + 1 },
    });

    // Check for match if two cards are flipped
    if (newFlippedCards.length === 2) {
      const [card1Id, card2Id] = newFlippedCards;
      const card1 = updatedCards.find((c) => c.id === card1Id);
      const card2 = updatedCards.find((c) => c.id === card2Id);

      if (card1 && card2 && card1.letterId === card2.letterId) {
        // Match found! (Same letter, different cases)
        setTimeout(() => {
          const matchedCards = get().cards.map((card) =>
            card.id === card1Id || card.id === card2Id
              ? { ...card, isMatched: true }
              : card
          );

          const newMatches = get().stats.matches + 1;
          const newScore = get().stats.score + 100;

          set({
            cards: matchedCards,
            flippedCards: [],
            stats: {
              ...get().stats,
              matches: newMatches,
              score: newScore,
            },
          });

          // Check if game is won
          const totalPairs = GAME_CONFIG[get().difficulty].pairs;
          if (newMatches === totalPairs) {
            set({ gameStatus: "won" });
          }
        }, 500);
      } else {
        // No match - flip cards back
        setTimeout(() => {
          const resetCards = get().cards.map((card) =>
            card.id === card1Id || card.id === card2Id
              ? { ...card, isFlipped: false }
              : card
          );
          set({
            cards: resetCards,
            flippedCards: [],
          });
        }, 1000);
      }
    }
  },

  resetGame: () => {
    set({
      cards: [],
      flippedCards: [],
      gameStatus: "menu",
      stats: { ...initialStats },
    });
  },

  pauseGame: () => {
    set({ gameStatus: "paused" });
  },

  resumeGame: () => {
    set({ gameStatus: "playing" });
  },

  updateStats: (newStats) => {
    set({ stats: { ...get().stats, ...newStats } });
  },
}));
