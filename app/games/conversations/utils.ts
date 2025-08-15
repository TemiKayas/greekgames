import { ConversationScenario, DialogueOption, DialogueTurn } from "@/app/utils/games/data/conversations/conversationData";
import { Category, Difficulty } from "./types";

export const calculateAccuracy = (correct: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

export const getDifficultyDisplayName = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case "beginner":
      return "Beginner";
    case "intermediate":
      return "Intermediate";
    case "advanced":
      return "Advanced";
    default:
      return "All Levels";
  }
};

export const getCategoryDisplayName = (category: Category): string => {
  switch (category) {
    case "restaurant":
      return "Restaurant";
    case "market":
      return "Market";
    case "travel":
      return "Travel";
    case "social":
      return "Social";
    case "health":
      return "Health";
    default:
      return "All Categories";
  }
};

export const getGreekPhrase = (score: number, total: number): string => {
  const percentage = (score / total) * 100;

  if (percentage >= 90) {
    return "Εξαιρετικά! Μιλάτε ελληνικά πολύ καλά!";
  } else if (percentage >= 80) {
    return "Πολύ καλά! Συνεχίστε την καλή δουλειά!";
  } else if (percentage >= 70) {
    return "Καλά! Κάθε μέρα γίνεστε καλύτερος!";
  } else if (percentage >= 60) {
    return "Μια χαρά! Η πρακτική κάνει τέλεια!";
  } else {
    return "Μην απελπίζεστε! Η μάθηση χρειάζεται χρόνο!";
  }
};

export const getEnglishPhrase = (score: number, total: number): string => {
  const percentage = (score / total) * 100;

  if (percentage >= 90) {
    return "Excellent! You speak Greek very well!";
  } else if (percentage >= 80) {
    return "Very good! Keep up the great work!";
  } else if (percentage >= 70) {
    return "Good! You're getting better every day!";
  } else if (percentage >= 60) {
    return "Not bad! Practice makes perfect!";
  } else {
    return "Don't give up! Learning takes time!";
  }
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getDialogueOptions = (dialogue: DialogueTurn): DialogueOption[] => {
  if (!dialogue.options) return [];
  return shuffleArray(dialogue.options);
};

export const isCorrectAnswer = (dialogue: DialogueTurn, selectedOptionId: string): boolean => {
  return dialogue.correctOptionId === selectedOptionId;
};

export const getSpeakerDisplayName = (speaker: 'waiter' | 'customer' | 'vendor' | 'staff' | 'receptionist' | 'guest'): string => {
  switch (speaker) {
    case 'waiter':
      return 'Waiter';
    case 'customer':
      return 'You';
    case 'vendor':
      return 'Vendor';
    case 'staff':
      return 'Staff';
    case 'receptionist':
      return 'Receptionist';
    case 'guest':
      return 'You';
    default:
      return 'Unknown';
  }
};

export const getSpeakerIcon = (speaker: 'waiter' | 'customer' | 'vendor' | 'staff' | 'receptionist' | 'guest'): string => {
  switch (speaker) {
    case 'waiter':
      return '👨‍🍳';
    case 'customer':
      return '👤';
    case 'vendor':
      return '🛒';
    case 'staff':
      return '✈️';
    case 'receptionist':
      return '🏨';
    case 'guest':
      return '👤';
    default:
      return '💬';
  }
};

export const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}m`;
};

export const getScenarioEstimatedTime = (scenario: ConversationScenario): string => {
  const dialogueCount = scenario.dialogues.length;
  const estimatedMinutes = Math.ceil(dialogueCount * 1.5); // 1.5 minutes per dialogue
  return formatTime(estimatedMinutes);
};
