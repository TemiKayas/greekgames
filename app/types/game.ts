// Greek Gods Memory Game Types

export interface GreekGod {
  id: string;
  name: string;
  symbol: string;
  domain: string;
  description: string;
}

export interface GameCard {
  id: string;
  godId: string;
  isFlipped: boolean;
  isMatched: boolean;
  position: number;
}

export interface GameStats {
  moves: number;
  matches: number;
  timeElapsed: number;
  score: number;
}

export interface GameState {
  cards: GameCard[];
  flippedCards: string[];
  gameStatus: "menu" | "playing" | "paused" | "won" | "lost";
  difficulty: "easy" | "medium" | "hard";
  stats: GameStats;
}

export interface GameSettings {
  difficulty: "easy" | "medium" | "hard";
  timeLimit?: number;
  soundEnabled: boolean;
  animationsEnabled: boolean;
}

// Game Actions
export type GameAction =
  | { type: "START_GAME"; difficulty: GameState["difficulty"] }
  | { type: "FLIP_CARD"; cardId: string }
  | { type: "MATCH_CARDS"; cardIds: string[] }
  | { type: "RESET_FLIPPED" }
  | { type: "PAUSE_GAME" }
  | { type: "RESUME_GAME" }
  | { type: "END_GAME"; won: boolean }
  | { type: "RESET_GAME" }
  | { type: "UPDATE_STATS"; stats: Partial<GameStats> };
