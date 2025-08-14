export interface DialogueOption {
  id: string;
  greek: string;
  english: string;
  isCorrect: boolean;
  explanation?: string;
  culturalNote?: string;
}

export interface DialogueTurn {
  id: string;
  speaker: 'waiter' | 'customer';
  greek: string;
  english: string;
  options?: DialogueOption[];
  correctOptionId?: string;
  explanation?: string;
  culturalContext?: string;
}

export interface ConversationScenario {
  id: string;
  title: string;
  englishTitle: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'restaurant' | 'market' | 'travel' | 'social' | 'health';
  context: string;
  culturalBackground: string;
  dialogues: DialogueTurn[];
  vocabulary: {
    greek: string;
    english: string;
    pronunciation: string;
  }[];
}

export const CONVERSATION_SCENARIOS: ConversationScenario[] = [
  {
    id: "restaurant-ordering",
    title: "Στο Εστιατόριο",
    englishTitle: "At the Restaurant",
    description: "Order food and interact with restaurant staff",
    difficulty: "intermediate",
    category: "restaurant",
    context: "You're at a traditional Greek taverna and want to order a meal. The waiter approaches your table.",
    culturalBackground: "In Greece, it's common to order multiple dishes to share. Waiters are usually very friendly and may make recommendations. Tipping is appreciated but not mandatory.",
    dialogues: [
      {
        id: "waiter-greeting",
        speaker: "waiter",
        greek: "Καλησπέρα! Τι θα θέλατε να φάτε;",
        english: "Good evening! What would you like to eat?",
        explanation: "Standard greeting in Greek restaurants. 'Καλησπέρα' is used in the evening.",
        culturalContext: "Greek waiters are typically very welcoming and will often greet you warmly."
      },
      {
        id: "customer-response-1",
        speaker: "customer",
        greek: "",
        english: "",
        options: [
          {
            id: "option-1",
            greek: "Καλησπέρα! Θα ήθελα να δω το μενού, παρακαλώ.",
            english: "Good evening! I would like to see the menu, please.",
            isCorrect: true,
            explanation: "This is a polite and natural way to start the conversation.",
            culturalNote: "Always greet back and use 'παρακαλώ' (please) to be polite."
          },
          {
            id: "option-2",
            greek: "Θέλω φαγητό.",
            english: "I want food.",
            isCorrect: false,
            explanation: "Too direct and impolite in Greek culture.",
            culturalNote: "Greeks value politeness and proper greetings."
          },
          {
            id: "option-3",
            greek: "Πόσο κοστίζει;",
            english: "How much does it cost?",
            isCorrect: false,
            explanation: "Asking about price immediately is considered rude.",
            culturalNote: "Focus on the food and experience first, not the cost."
          }
        ],
        correctOptionId: "option-1"
      },
      {
        id: "waiter-menu",
        speaker: "waiter",
        greek: "Βεβαίως! Ορίστε το μενού. Σήμερα έχουμε φρέσκο ψάρι και καλό κρασί.",
        english: "Of course! Here's the menu. Today we have fresh fish and good wine.",
        explanation: "The waiter offers the menu and mentions daily specials.",
        culturalContext: "Greek restaurants often have daily specials based on fresh local ingredients."
      },
      {
        id: "customer-menu-questions",
        speaker: "customer",
        greek: "",
        english: "",
        options: [
          {
            id: "option-1",
            greek: "Τι προτείνετε;",
            english: "What do you recommend?",
            isCorrect: true,
            explanation: "Asking for recommendations shows interest and respect.",
            culturalNote: "Greeks love to share their knowledge about food and will appreciate this question."
          },
          {
            id: "option-2",
            greek: "Δεν καταλαβαίνω.",
            english: "I don't understand.",
            isCorrect: false,
            explanation: "While honest, it's better to try to engage first.",
            culturalNote: "Try to participate in the conversation before admitting difficulty."
          },
          {
            id: "option-3",
            greek: "Θέλω μόνο νερό.",
            english: "I only want water.",
            isCorrect: false,
            explanation: "Too abrupt and doesn't engage with the waiter's suggestions.",
            culturalNote: "Even if you want something simple, be more polite about it."
          }
        ],
        correctOptionId: "option-1"
      },
      {
        id: "waiter-recommendation",
        speaker: "waiter",
        greek: "Προτείνω τη σαλάτα χωριάτικη και τη μουσακά. Είναι παραδοσιακά ελληνικά φαγητά.",
        english: "I recommend the Greek salad and moussaka. They are traditional Greek dishes.",
        explanation: "The waiter makes specific recommendations of traditional dishes.",
        culturalContext: "Greek waiters are proud of their traditional cuisine and love to share it."
      },
      {
        id: "customer-order",
        speaker: "customer",
        greek: "",
        english: "",
        options: [
          {
            id: "option-1",
            greek: "Ακούγεται υπέροχα! Θα πάρω τη σαλάτα χωριάτικη και τη μουσακά, παρακαλώ.",
            english: "That sounds wonderful! I'll have the Greek salad and moussaka, please.",
            isCorrect: true,
            explanation: "Shows enthusiasm and uses proper ordering language.",
            culturalNote: "Expressing enthusiasm about Greek food will make the waiter happy."
          },
          {
            id: "option-2",
            greek: "Εντάξει.",
            english: "Okay.",
            isCorrect: false,
            explanation: "Too casual and doesn't show appreciation.",
            culturalNote: "Show more enthusiasm when ordering traditional Greek food."
          },
          {
            id: "option-3",
            greek: "Έχει κάτι άλλο;",
            english: "Do you have anything else?",
            isCorrect: false,
            explanation: "Asking for more options after getting good recommendations can seem dismissive.",
            culturalNote: "Trust the waiter's recommendations, especially for traditional dishes."
          }
        ],
        correctOptionId: "option-1"
      },
      {
        id: "waiter-confirmation",
        speaker: "waiter",
        greek: "Εξαιρετική επιλογή! Θέλετε και ένα καλό κρασί;",
        english: "Excellent choice! Would you like a good wine as well?",
        explanation: "The waiter confirms the order and suggests wine.",
        culturalContext: "Wine is an important part of Greek dining culture."
      },
      {
        id: "customer-wine-response",
        speaker: "customer",
        greek: "",
        english: "",
        options: [
          {
            id: "option-1",
            greek: "Ναι, παρακαλώ! Τι κρασί προτείνετε;",
            english: "Yes, please! What wine do you recommend?",
            isCorrect: true,
            explanation: "Shows interest in Greek wine culture and asks for guidance.",
            culturalNote: "Greek wines are excellent and asking for recommendations is appreciated."
          },
          {
            id: "option-2",
            greek: "Όχι, ευχαριστώ.",
            english: "No, thank you.",
            isCorrect: false,
            explanation: "While polite, you're missing out on the full Greek dining experience.",
            culturalNote: "Greek meals are enhanced by local wines."
          },
          {
            id: "option-3",
            greek: "Πόσο κοστίζει το κρασί;",
            english: "How much does the wine cost?",
            isCorrect: false,
            explanation: "Asking about price immediately can seem cheap.",
            culturalNote: "Focus on the experience first, price can be discussed later."
          }
        ],
        correctOptionId: "option-1"
      },
      {
        id: "waiter-wine-suggestion",
        speaker: "waiter",
        greek: "Έχουμε ένα ωραίο κρασί από τη Σαντορίνη. Ταιριάζει τέλεια με τη μουσακά.",
        english: "We have a nice wine from Santorini. It pairs perfectly with moussaka.",
        explanation: "The waiter suggests a specific wine with cultural context.",
        culturalContext: "Greek waiters often suggest wines from specific regions that complement the food."
      },
      {
        id: "customer-final-order",
        speaker: "customer",
        greek: "",
        english: "",
        options: [
          {
            id: "option-1",
            greek: "Τέλεια! Θα πάρω αυτό το κρασί. Ευχαριστώ πολύ!",
            english: "Perfect! I'll have that wine. Thank you very much!",
            isCorrect: true,
            explanation: "Shows enthusiasm and gratitude for the recommendations.",
            culturalNote: "Expressing gratitude is very important in Greek culture."
          },
          {
            id: "option-2",
            greek: "Εντάξει.",
            english: "Okay.",
            isCorrect: false,
            explanation: "Too casual for such a nice dining experience.",
            culturalNote: "Show more appreciation for the personalized service."
          },
          {
            id: "option-3",
            greek: "Πότε θα είναι έτοιμο;",
            english: "When will it be ready?",
            isCorrect: false,
            explanation: "Too impatient - Greek dining is about the experience, not speed.",
            culturalNote: "Greek meals are meant to be enjoyed slowly, not rushed."
          }
        ],
        correctOptionId: "option-1"
      },
      {
        id: "waiter-closing",
        speaker: "waiter",
        greek: "Θα είναι έτοιμο σε λίγα λεπτά. Καλή όρεξη!",
        english: "It will be ready in a few minutes. Enjoy your meal!",
        explanation: "The waiter confirms the order and wishes you a good meal.",
        culturalContext: "'Καλή όρεξη' is the traditional Greek way to wish someone a good meal."
      }
    ],
    vocabulary: [
      {
        greek: "εστιατόριο",
        english: "restaurant",
        pronunciation: "es-tee-a-TO-ree-o"
      },
      {
        greek: "μενού",
        english: "menu",
        pronunciation: "me-NOO"
      },
      {
        greek: "σαλάτα χωριάτικη",
        english: "Greek salad",
        pronunciation: "sa-LA-ta ho-ree-A-tee-kee"
      },
      {
        greek: "μουσακά",
        english: "moussaka",
        pronunciation: "moo-sa-KA"
      },
      {
        greek: "κρασί",
        english: "wine",
        pronunciation: "kra-SEE"
      },
      {
        greek: "καλή όρεξη",
        english: "enjoy your meal",
        pronunciation: "ka-LEE o-RE-ksi"
      },
      {
        greek: "παρακαλώ",
        english: "please",
        pronunciation: "pa-ra-ka-LO"
      },
      {
        greek: "ευχαριστώ",
        english: "thank you",
        pronunciation: "ef-ha-ree-STO"
      }
    ]
  },
  {
    id: "market-shopping",
    title: "Στο Παζάρι",
    englishTitle: "At the Market",
    description: "Buy fresh produce and interact with vendors at a Greek market",
    difficulty: "beginner",
    category: "market",
    context: "You're at a traditional Greek market (laiki agora) and want to buy some fresh fruits and vegetables.",
    culturalBackground: "Greek markets are vibrant places where bargaining is common and vendors are very friendly. Fresh produce is a big part of Greek culture.",
    dialogues: [
      {
        id: "vendor-greeting",
        speaker: "waiter",
        greek: "Καλημέρα! Τι θα θέλατε σήμερα;",
        english: "Good morning! What would you like today?",
        explanation: "Standard greeting in Greek markets.",
        culturalContext: "Greek vendors are very welcoming and will often greet you warmly."
      },
      {
        id: "customer-greeting",
        speaker: "customer",
        greek: "",
        english: "",
        options: [
          {
            id: "option-1",
            greek: "Καλημέρα! Θέλω λίγα φρούτα, παρακαλώ.",
            english: "Good morning! I would like some fruits, please.",
            isCorrect: true,
            explanation: "Polite greeting and clear request.",
            culturalNote: "Always greet back and be specific about what you want."
          },
          {
            id: "option-2",
            greek: "Πόσο κοστίζει;",
            english: "How much does it cost?",
            isCorrect: false,
            explanation: "Too direct - greet first, then ask about prices.",
            culturalNote: "Greeks value politeness and proper greetings."
          }
        ],
        correctOptionId: "option-1"
      }
    ],
    vocabulary: [
      {
        greek: "παζάρι",
        english: "market",
        pronunciation: "pa-ZA-ree"
      },
      {
        greek: "φρούτα",
        english: "fruits",
        pronunciation: "FROO-ta"
      },
      {
        greek: "λαχανικά",
        english: "vegetables",
        pronunciation: "la-ha-nee-KA"
      }
    ]
  }
];

export const getScenarioById = (id: string): ConversationScenario | undefined => {
  return CONVERSATION_SCENARIOS.find(scenario => scenario.id === id);
};

export const getScenariosByCategory = (category: ConversationScenario['category']): ConversationScenario[] => {
  return CONVERSATION_SCENARIOS.filter(scenario => scenario.category === category);
};

export const getScenariosByDifficulty = (difficulty: ConversationScenario['difficulty']): ConversationScenario[] => {
  return CONVERSATION_SCENARIOS.filter(scenario => scenario.difficulty === difficulty);
};
