import {
  GREEK_VERBS,
  VerbData,
  getVerbsByCategory,
  getVerbsByDifficulty,
} from "@/app/utils/games/data/verbs/verbData";
import { Category, Difficulty, Person, Tense, VerbQuestion } from "./types";

const PERSONS: Person[] = [
  "εγώ",
  "εσύ",
  "αυτός",
  "αυτή",
  "αυτό",
  "εμείς",
  "εσείς",
  "αυτοί",
  "αυτές",
  "αυτά",
];

export const generateVerbQuestion = (
  verb: VerbData,
  tense: Tense,
  person: Person,
  allVerbs: VerbData[]
): VerbQuestion => {
  const correctAnswer = verb.conjugations[tense][person];

  // Generate 3 wrong options from other verbs
  const otherVerbs = allVerbs.filter((v) => v.id !== verb.id);
  const wrongOptions: string[] = [];

  // If we don't have enough other verbs, use the same verb with different persons
  const availableVerbsForOptions = otherVerbs.length > 0 ? otherVerbs : [verb];

  while (wrongOptions.length < 3) {
    const randomVerb =
      availableVerbsForOptions[
        Math.floor(Math.random() * availableVerbsForOptions.length)
      ];

    if (!randomVerb) {
      // Fallback: use the same verb with different persons
      const randomPerson = PERSONS[
        Math.floor(Math.random() * PERSONS.length)
      ] as Person;
      const option = verb.conjugations[tense][randomPerson];

      if (!wrongOptions.includes(option) && option !== correctAnswer) {
        wrongOptions.push(option);
      }
      continue;
    }

    const randomPerson = PERSONS[
      Math.floor(Math.random() * PERSONS.length)
    ] as Person;
    const option = randomVerb.conjugations[tense][randomPerson];

    if (!wrongOptions.includes(option) && option !== correctAnswer) {
      wrongOptions.push(option);
    }
  }

  // Shuffle options
  const options = [correctAnswer, ...wrongOptions].sort(
    () => Math.random() - 0.5
  );

  const question = `What is the ${tense} tense of '${verb.infinitive}' (${verb.english}) for '${person}'?`;

  return {
    id: `${verb.id}-${tense}-${person}`,
    verb,
    tense,
    person,
    correctAnswer,
    options,
    question,
  };
};

export const generateQuestions = (settings: {
  category?: Category;
  difficulty?: Difficulty;
  tense: Tense;
  questionCount: number;
  includeAllPersons: boolean;
}): VerbQuestion[] => {
  let availableVerbs = GREEK_VERBS;

  // Filter by category if specified
  if (settings.category) {
    availableVerbs = getVerbsByCategory(settings.category);
  }

  // Filter by difficulty if specified
  if (settings.difficulty) {
    availableVerbs = getVerbsByDifficulty(settings.difficulty);
  }

  // If no verbs are available after filtering, use all verbs
  if (availableVerbs.length === 0) {
    availableVerbs = GREEK_VERBS;
  }

  const questions: VerbQuestion[] = [];
  const persons = settings.includeAllPersons
    ? PERSONS
    : (["εγώ", "εσύ", "αυτός", "εμείς", "εσείς", "αυτοί"] as Person[]);

  // Generate questions
  for (let i = 0; i < settings.questionCount; i++) {
    const randomVerb =
      availableVerbs[Math.floor(Math.random() * availableVerbs.length)];
    const randomPerson = persons[Math.floor(Math.random() * persons.length)];

    const question = generateVerbQuestion(
      randomVerb,
      settings.tense,
      randomPerson,
      availableVerbs
    );
    questions.push(question);
  }

  return questions;
};

export const calculateAccuracy = (correct: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

export const getTenseDisplayName = (tense: Tense): string => {
  switch (tense) {
    case "present":
      return "Present Tense";
    case "future":
      return "Future Tense";
    case "past":
      return "Past Tense";
    default:
      return tense;
  }
};

export const getCategoryDisplayName = (category: Category): string => {
  switch (category) {
    case "basic":
      return "Basic Verbs";
    case "movement":
      return "Movement Verbs";
    case "communication":
      return "Communication Verbs";
    case "daily":
      return "Daily Activities";
    default:
      return category;
  }
};

export const getDifficultyDisplayName = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case "easy":
      return "Easy";
    case "medium":
      return "Medium";
    case "hard":
      return "Hard";
    default:
      return difficulty;
  }
};

export const getGreekPhrase = (accuracy: number): string => {
  if (accuracy >= 90) {
    return "Εξαιρετικά! (Excellent!)";
  } else if (accuracy >= 80) {
    return "Πολύ καλά! (Very good!)";
  } else if (accuracy >= 70) {
    return "Καλά! (Good!)";
  } else if (accuracy >= 60) {
    return "Αρκετά καλά! (Quite good!)";
  } else {
    return "Συνεχίστε να εξασκείστε! (Keep practicing!)";
  }
};
