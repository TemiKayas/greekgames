import { ConversationScenario } from "@/app/utils/games/data/conversations/conversationData";

export interface ConversationGameState {
  currentScenario: ConversationScenario | null;
  currentDialogueIndex: number;
  totalDialogues: number;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  isGameComplete: boolean;
  showResults: boolean;
  accuracy: number;
  selectedAnswers: Record<string, string>;
  showExplanation: boolean;
  showVocabulary: boolean;
}

export interface ConversationSettings {
  scenarioId: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "all";
  category: "restaurant" | "market" | "travel" | "social" | "health" | "all";
}

export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Category = "restaurant" | "market" | "travel" | "social" | "health";

export interface GameProgress {
  scenarioId: string;
  completed: boolean;
  score: number;
  accuracy: number;
  completedAt: Date;
}

export interface VocabularyItem {
  greek: string;
  english: string;
  pronunciation: string;
  learned: boolean;
}
