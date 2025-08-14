export interface GreekNumber {
  digit: number;
  greek: string;
  english: string;
  pronunciation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface MathProblem {
  id: string;
  operation: "+" | "-" | "×" | "÷";
  num1: number;
  num2: number;
  answer: number;
  greekQuestion: string;
  englishQuestion: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface TimeExercise {
  id: string;
  time: string; // "14:30"
  greekTime: string; // "δύο και μισή"
  englishTime: string; // "two thirty"
  difficulty: "easy" | "medium" | "hard";
}

// Greek numbers 1-100
export const GREEK_NUMBERS: GreekNumber[] = [
  // Easy numbers (1-20)
  {
    digit: 1,
    greek: "ένα",
    english: "one",
    pronunciation: "EH-nah",
    difficulty: "easy",
  },
  {
    digit: 2,
    greek: "δύο",
    english: "two",
    pronunciation: "THEE-oh",
    difficulty: "easy",
  },
  {
    digit: 3,
    greek: "τρία",
    english: "three",
    pronunciation: "TREE-ah",
    difficulty: "easy",
  },
  {
    digit: 4,
    greek: "τέσσερα",
    english: "four",
    pronunciation: "TE-se-ra",
    difficulty: "easy",
  },
  {
    digit: 5,
    greek: "πέντε",
    english: "five",
    pronunciation: "PEN-de",
    difficulty: "easy",
  },
  {
    digit: 6,
    greek: "έξι",
    english: "six",
    pronunciation: "E-xee",
    difficulty: "easy",
  },
  {
    digit: 7,
    greek: "εφτά",
    english: "seven",
    pronunciation: "ef-TA",
    difficulty: "easy",
  },
  {
    digit: 8,
    greek: "οχτώ",
    english: "eight",
    pronunciation: "okh-TO",
    difficulty: "easy",
  },
  {
    digit: 9,
    greek: "εννιά",
    english: "nine",
    pronunciation: "e-NYA",
    difficulty: "easy",
  },
  {
    digit: 10,
    greek: "δέκα",
    english: "ten",
    pronunciation: "THE-ka",
    difficulty: "easy",
  },
  {
    digit: 11,
    greek: "έντεκα",
    english: "eleven",
    pronunciation: "EN-de-ka",
    difficulty: "easy",
  },
  {
    digit: 12,
    greek: "δώδεκα",
    english: "twelve",
    pronunciation: "THO-the-ka",
    difficulty: "easy",
  },
  {
    digit: 13,
    greek: "δεκατρία",
    english: "thirteen",
    pronunciation: "the-ka-TREE-ah",
    difficulty: "easy",
  },
  {
    digit: 14,
    greek: "δεκατέσσερα",
    english: "fourteen",
    pronunciation: "the-ka-TE-se-ra",
    difficulty: "easy",
  },
  {
    digit: 15,
    greek: "δεκαπέντε",
    english: "fifteen",
    pronunciation: "the-ka-PEN-de",
    difficulty: "easy",
  },
  {
    digit: 16,
    greek: "δεκαέξι",
    english: "sixteen",
    pronunciation: "the-ka-E-xee",
    difficulty: "easy",
  },
  {
    digit: 17,
    greek: "δεκαεφτά",
    english: "seventeen",
    pronunciation: "the-ka-ef-TA",
    difficulty: "easy",
  },
  {
    digit: 18,
    greek: "δεκαοχτώ",
    english: "eighteen",
    pronunciation: "the-ka-okh-TO",
    difficulty: "easy",
  },
  {
    digit: 19,
    greek: "δεκαεννιά",
    english: "nineteen",
    pronunciation: "the-ka-e-NYA",
    difficulty: "easy",
  },
  {
    digit: 20,
    greek: "είκοσι",
    english: "twenty",
    pronunciation: "EE-ko-see",
    difficulty: "easy",
  },

  // Medium numbers (21-50)
  {
    digit: 21,
    greek: "είκοσι ένα",
    english: "twenty-one",
    pronunciation: "EE-ko-see EH-nah",
    difficulty: "medium",
  },
  {
    digit: 25,
    greek: "είκοσι πέντε",
    english: "twenty-five",
    pronunciation: "EE-ko-see PEN-de",
    difficulty: "medium",
  },
  {
    digit: 30,
    greek: "τριάντα",
    english: "thirty",
    pronunciation: "tree-AN-da",
    difficulty: "medium",
  },
  {
    digit: 35,
    greek: "τριάντα πέντε",
    english: "thirty-five",
    pronunciation: "tree-AN-da PEN-de",
    difficulty: "medium",
  },
  {
    digit: 40,
    greek: "σαράντα",
    english: "forty",
    pronunciation: "sa-RAN-da",
    difficulty: "medium",
  },
  {
    digit: 45,
    greek: "σαράντα πέντε",
    english: "forty-five",
    pronunciation: "sa-RAN-da PEN-de",
    difficulty: "medium",
  },
  {
    digit: 50,
    greek: "πενήντα",
    english: "fifty",
    pronunciation: "pe-NIN-da",
    difficulty: "medium",
  },

  // Hard numbers (51-100)
  {
    digit: 60,
    greek: "εξήντα",
    english: "sixty",
    pronunciation: "e-XIN-da",
    difficulty: "hard",
  },
  {
    digit: 70,
    greek: "εβδομήντα",
    english: "seventy",
    pronunciation: "ev-do-MIN-da",
    difficulty: "hard",
  },
  {
    digit: 80,
    greek: "ογδόντα",
    english: "eighty",
    pronunciation: "og-DON-da",
    difficulty: "hard",
  },
  {
    digit: 90,
    greek: "ενενήντα",
    english: "ninety",
    pronunciation: "e-ne-NIN-da",
    difficulty: "hard",
  },
  {
    digit: 100,
    greek: "εκατό",
    english: "hundred",
    pronunciation: "e-ka-TO",
    difficulty: "hard",
  },
];

// Math problems in Greek
export const GREEK_MATH_PROBLEMS: MathProblem[] = [
  // Easy addition
  {
    id: "add-1",
    operation: "+",
    num1: 2,
    num2: 3,
    answer: 5,
    greekQuestion: "δύο συν τρία",
    englishQuestion: "two plus three",
    difficulty: "easy",
  },
  {
    id: "add-2",
    operation: "+",
    num1: 5,
    num2: 4,
    answer: 9,
    greekQuestion: "πέντε συν τέσσερα",
    englishQuestion: "five plus four",
    difficulty: "easy",
  },
  {
    id: "add-3",
    operation: "+",
    num1: 7,
    num2: 8,
    answer: 15,
    greekQuestion: "εφτά συν οχτώ",
    englishQuestion: "seven plus eight",
    difficulty: "easy",
  },

  // Easy subtraction
  {
    id: "sub-1",
    operation: "-",
    num1: 10,
    num2: 3,
    answer: 7,
    greekQuestion: "δέκα μείον τρία",
    englishQuestion: "ten minus three",
    difficulty: "easy",
  },
  {
    id: "sub-2",
    operation: "-",
    num1: 15,
    num2: 6,
    answer: 9,
    greekQuestion: "δεκαπέντε μείον έξι",
    englishQuestion: "fifteen minus six",
    difficulty: "easy",
  },
  {
    id: "sub-3",
    operation: "-",
    num1: 12,
    num2: 5,
    answer: 7,
    greekQuestion: "δώδεκα μείον πέντε",
    englishQuestion: "twelve minus five",
    difficulty: "easy",
  },
  {
    id: "sub-4",
    operation: "-",
    num1: 18,
    num2: 9,
    answer: 9,
    greekQuestion: "δεκαοχτώ μείον εννιά",
    englishQuestion: "eighteen minus nine",
    difficulty: "easy",
  },
  {
    id: "sub-5",
    operation: "-",
    num1: 20,
    num2: 8,
    answer: 12,
    greekQuestion: "είκοσι μείον οχτώ",
    englishQuestion: "twenty minus eight",
    difficulty: "easy",
  },
  {
    id: "sub-6",
    operation: "-",
    num1: 14,
    num2: 7,
    answer: 7,
    greekQuestion: "δεκατέσσερα μείον εφτά",
    englishQuestion: "fourteen minus seven",
    difficulty: "easy",
  },
  {
    id: "sub-7",
    operation: "-",
    num1: 16,
    num2: 8,
    answer: 8,
    greekQuestion: "δεκαέξι μείον οχτώ",
    englishQuestion: "sixteen minus eight",
    difficulty: "easy",
  },

  // Medium subtraction
  {
    id: "sub-6",
    operation: "-",
    num1: 25,
    num2: 12,
    answer: 13,
    greekQuestion: "είκοσι πέντε μείον δώδεκα",
    englishQuestion: "twenty-five minus twelve",
    difficulty: "medium",
  },
  {
    id: "sub-7",
    operation: "-",
    num1: 30,
    num2: 15,
    answer: 15,
    greekQuestion: "τριάντα μείον δεκαπέντε",
    englishQuestion: "thirty minus fifteen",
    difficulty: "medium",
  },
  {
    id: "sub-8",
    operation: "-",
    num1: 40,
    num2: 18,
    answer: 22,
    greekQuestion: "σαράντα μείον δεκαοχτώ",
    englishQuestion: "forty minus eighteen",
    difficulty: "medium",
  },

  // Easy multiplication
  {
    id: "mult-easy-1",
    operation: "×",
    num1: 2,
    num2: 3,
    answer: 6,
    greekQuestion: "δύο επί τρία",
    englishQuestion: "two times three",
    difficulty: "easy",
  },
  {
    id: "mult-easy-2",
    operation: "×",
    num1: 2,
    num2: 4,
    answer: 8,
    greekQuestion: "δύο επί τέσσερα",
    englishQuestion: "two times four",
    difficulty: "easy",
  },
  {
    id: "mult-easy-3",
    operation: "×",
    num1: 3,
    num2: 3,
    answer: 9,
    greekQuestion: "τρία επί τρία",
    englishQuestion: "three times three",
    difficulty: "easy",
  },
  {
    id: "mult-easy-4",
    operation: "×",
    num1: 2,
    num2: 5,
    answer: 10,
    greekQuestion: "δύο επί πέντε",
    englishQuestion: "two times five",
    difficulty: "easy",
  },
  {
    id: "mult-easy-5",
    operation: "×",
    num1: 4,
    num2: 2,
    answer: 8,
    greekQuestion: "τέσσερα επί δύο",
    englishQuestion: "four times two",
    difficulty: "easy",
  },

  // Medium multiplication
  {
    id: "mult-1",
    operation: "×",
    num1: 3,
    num2: 4,
    answer: 12,
    greekQuestion: "τρία επί τέσσερα",
    englishQuestion: "three times four",
    difficulty: "medium",
  },
  {
    id: "mult-2",
    operation: "×",
    num1: 5,
    num2: 6,
    answer: 30,
    greekQuestion: "πέντε επί έξι",
    englishQuestion: "five times six",
    difficulty: "medium",
  },
  {
    id: "mult-3",
    operation: "×",
    num1: 4,
    num2: 5,
    answer: 20,
    greekQuestion: "τέσσερα επί πέντε",
    englishQuestion: "four times five",
    difficulty: "medium",
  },
  {
    id: "mult-4",
    operation: "×",
    num1: 6,
    num2: 4,
    answer: 24,
    greekQuestion: "έξι επί τέσσερα",
    englishQuestion: "six times four",
    difficulty: "medium",
  },
  {
    id: "mult-5",
    operation: "×",
    num1: 7,
    num2: 3,
    answer: 21,
    greekQuestion: "εφτά επί τρία",
    englishQuestion: "seven times three",
    difficulty: "medium",
  },

  // Easy division
  {
    id: "div-easy-1",
    operation: "÷",
    num1: 8,
    num2: 2,
    answer: 4,
    greekQuestion: "οχτώ δια δύο",
    englishQuestion: "eight divided by two",
    difficulty: "easy",
  },
  {
    id: "div-easy-2",
    operation: "÷",
    num1: 10,
    num2: 2,
    answer: 5,
    greekQuestion: "δέκα δια δύο",
    englishQuestion: "ten divided by two",
    difficulty: "easy",
  },
  {
    id: "div-easy-3",
    operation: "÷",
    num1: 6,
    num2: 2,
    answer: 3,
    greekQuestion: "έξι δια δύο",
    englishQuestion: "six divided by two",
    difficulty: "easy",
  },
  {
    id: "div-easy-4",
    operation: "÷",
    num1: 9,
    num2: 3,
    answer: 3,
    greekQuestion: "εννιά δια τρία",
    englishQuestion: "nine divided by three",
    difficulty: "easy",
  },
  {
    id: "div-easy-5",
    operation: "÷",
    num1: 12,
    num2: 4,
    answer: 3,
    greekQuestion: "δώδεκα δια τέσσερα",
    englishQuestion: "twelve divided by four",
    difficulty: "easy",
  },

  // Medium division
  {
    id: "div-1",
    operation: "÷",
    num1: 12,
    num2: 3,
    answer: 4,
    greekQuestion: "δώδεκα δια τρία",
    englishQuestion: "twelve divided by three",
    difficulty: "medium",
  },
  {
    id: "div-2",
    operation: "÷",
    num1: 20,
    num2: 4,
    answer: 5,
    greekQuestion: "είκοσι δια τέσσερα",
    englishQuestion: "twenty divided by four",
    difficulty: "medium",
  },
  {
    id: "div-3",
    operation: "÷",
    num1: 15,
    num2: 3,
    answer: 5,
    greekQuestion: "δεκαπέντε δια τρία",
    englishQuestion: "fifteen divided by three",
    difficulty: "medium",
  },
  {
    id: "div-4",
    operation: "÷",
    num1: 24,
    num2: 6,
    answer: 4,
    greekQuestion: "είκοσι τέσσερα δια έξι",
    englishQuestion: "twenty-four divided by six",
    difficulty: "medium",
  },
  {
    id: "div-5",
    operation: "÷",
    num1: 18,
    num2: 2,
    answer: 9,
    greekQuestion: "δεκαοχτώ δια δύο",
    englishQuestion: "eighteen divided by two",
    difficulty: "medium",
  },
  {
    id: "div-6",
    operation: "÷",
    num1: 16,
    num2: 4,
    answer: 4,
    greekQuestion: "δεκαέξι δια τέσσερα",
    englishQuestion: "sixteen divided by four",
    difficulty: "medium",
  },

  // Hard problems
  {
    id: "hard-1",
    operation: "+",
    num1: 25,
    num2: 35,
    answer: 60,
    greekQuestion: "είκοσι πέντε συν τριάντα πέντε",
    englishQuestion: "twenty-five plus thirty-five",
    difficulty: "hard",
  },
  {
    id: "hard-2",
    operation: "×",
    num1: 8,
    num2: 9,
    answer: 72,
    greekQuestion: "οχτώ επί εννιά",
    englishQuestion: "eight times nine",
    difficulty: "hard",
  },
];

// Time exercises
export const GREEK_TIME_EXERCISES: TimeExercise[] = [
  // Easy times
  {
    id: "time-1",
    time: "12:00",
    greekTime: "δώδεκα η ώρα",
    englishTime: "twelve o'clock",
    difficulty: "easy",
  },
  {
    id: "time-2",
    time: "3:00",
    greekTime: "τρεις η ώρα",
    englishTime: "three o'clock",
    difficulty: "easy",
  },
  {
    id: "time-3",
    time: "6:00",
    greekTime: "έξι η ώρα",
    englishTime: "six o'clock",
    difficulty: "easy",
  },

  // Medium times
  {
    id: "time-4",
    time: "2:30",
    greekTime: "δύο και μισή",
    englishTime: "two thirty",
    difficulty: "medium",
  },
  {
    id: "time-5",
    time: "4:15",
    greekTime: "τέσσερις και τέταρτο",
    englishTime: "four fifteen",
    difficulty: "medium",
  },
  {
    id: "time-6",
    time: "7:45",
    greekTime: "εφτά και τρία τέταρτα",
    englishTime: "seven forty-five",
    difficulty: "medium",
  },

  // Hard times
  {
    id: "time-7",
    time: "11:20",
    greekTime: "έντεκα και είκοσι",
    englishTime: "eleven twenty",
    difficulty: "hard",
  },
  {
    id: "time-8",
    time: "14:35",
    greekTime: "δύο και τριάντα πέντε",
    englishTime: "two thirty-five",
    difficulty: "hard",
  },
];

// Game configuration
export const NUMBERS_CONFIG = {
  easy: {
    numberCount: 10,
    timeLimit: 180,
    description: "Numbers 1-20 and basic math",
    gameTypes: [
      "number-recognition",
      "addition",
      "subtraction",
      "multiplication",
      "division",
    ] as const,
  },
  medium: {
    numberCount: 15,
    timeLimit: 240,
    description: "Numbers 1-50 and basic math",
    gameTypes: [
      "number-recognition",
      "addition",
      "subtraction",
      "multiplication",
      "division",
    ] as const,
  },
  hard: {
    numberCount: 20,
    timeLimit: 300,
    description: "Numbers 1-100 and all operations",
    gameTypes: [
      "number-recognition",
      "addition",
      "subtraction",
      "multiplication",
      "division",
      "time",
    ] as const,
  },
  mixed: {
    numberCount: 25,
    timeLimit: 360,
    description: "Mix of all levels and operations",
    gameTypes: [
      "number-recognition",
      "addition",
      "subtraction",
      "multiplication",
      "division",
      "time",
    ] as const,
  },
};

export type GameType =
  | "number-recognition"
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division"
  | "time";

export const getNumbersByDifficulty = (
  difficulty: keyof typeof NUMBERS_CONFIG
) => {
  if (difficulty === "mixed") {
    return GREEK_NUMBERS;
  }
  return GREEK_NUMBERS.filter((num) => num.difficulty === difficulty);
};

export const getMathProblemsByDifficulty = (
  difficulty: keyof typeof NUMBERS_CONFIG
) => {
  if (difficulty === "mixed") {
    return GREEK_MATH_PROBLEMS;
  }
  return GREEK_MATH_PROBLEMS.filter(
    (problem) => problem.difficulty === difficulty
  );
};

export const getTimeExercisesByDifficulty = (
  difficulty: keyof typeof NUMBERS_CONFIG
) => {
  if (difficulty === "mixed") {
    return GREEK_TIME_EXERCISES;
  }
  return GREEK_TIME_EXERCISES.filter(
    (exercise) => exercise.difficulty === difficulty
  );
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
