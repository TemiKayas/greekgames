import { VerbData } from "@/app/utils/games/data/verbs/verbData";

export type Tense = "present" | "future" | "past";
export type Person =
  | "εγώ"
  | "εσύ"
  | "αυτός"
  | "αυτή"
  | "αυτό"
  | "εμείς"
  | "εσείς"
  | "αυτοί"
  | "αυτές"
  | "αυτά";
export type Difficulty = "easy" | "medium" | "hard";
export type Category = "basic" | "movement" | "communication" | "daily";

export interface VerbQuestion {
  id: string;
  verb: VerbData;
  tense: Tense;
  person: Person;
  correctAnswer: string;
  options: string[];
  question: string; // "What is the present tense of 'γράφω' for 'εγώ'?"
}

export interface GameState {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  selectedVerb?: VerbData;
  selectedTense: Tense;
  selectedCategory?: Category;
  selectedDifficulty?: Difficulty;
  questions: VerbQuestion[];
  isGameComplete: boolean;
  showResults: boolean;
  accuracy: number;
}

export interface GameSettings {
  category?: Category;
  difficulty?: Difficulty;
  tense: Tense;
  questionCount: number;
  includeAllPersons: boolean;
}

export interface GameResult {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  accuracy: number;
  timeSpent: number;
  verbsPracticed: string[];
  tensesPracticed: Tense[];
}
