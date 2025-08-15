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
  speaker:
    | "waiter"
    | "customer"
    | "vendor"
    | "staff"
    | "receptionist"
    | "guest";
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
  difficulty: "beginner" | "intermediate" | "advanced";
  category: "restaurant" | "market" | "travel" | "social" | "health";
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
    context:
      "You're at a traditional Greek taverna and want to order a meal. The waiter approaches your table.",
    culturalBackground:
      "In Greece, it's common to order multiple dishes to share. Waiters are usually very friendly and may make recommendations. Tipping is appreciated but not mandatory.",
    dialogues: [
      {
        id: "waiter-greeting",
        speaker: "waiter",
        greek: "Καλησπέρα! Τι θα θέλατε να φάτε;",
        english: "Good evening! What would you like to eat?",
        explanation:
          "Standard greeting in Greek restaurants. 'Καλησπέρα' is used in the evening.",
        culturalContext:
          "Greek waiters are typically very welcoming and will often greet you warmly.",
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
            explanation:
              "This is a polite and natural way to start the conversation.",
            culturalNote:
              "Always greet back and use 'παρακαλώ' (please) to be polite.",
          },
          {
            id: "option-2",
            greek: "Θέλω φαγητό.",
            english: "I want food.",
            isCorrect: false,
            explanation: "Too direct and impolite in Greek culture.",
            culturalNote: "Greeks value politeness and proper greetings.",
          },
          {
            id: "option-3",
            greek: "Πόσο κοστίζει;",
            english: "How much does it cost?",
            isCorrect: false,
            explanation: "Asking about price immediately is considered rude.",
            culturalNote:
              "Focus on the food and experience first, not the cost.",
          },
        ],
        correctOptionId: "option-1",
      },
      {
        id: "waiter-menu",
        speaker: "waiter",
        greek:
          "Βεβαίως! Ορίστε το μενού. Σήμερα έχουμε φρέσκο ψάρι και καλό κρασί.",
        english:
          "Of course! Here's the menu. Today we have fresh fish and good wine.",
        explanation: "The waiter offers the menu and mentions daily specials.",
        culturalContext:
          "Greek restaurants often have daily specials based on fresh local ingredients.",
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
            explanation:
              "Asking for recommendations shows interest and respect.",
            culturalNote:
              "Greeks love to share their knowledge about food and will appreciate this question.",
          },
          {
            id: "option-2",
            greek: "Δεν καταλαβαίνω.",
            english: "I don't understand.",
            isCorrect: false,
            explanation: "While honest, it's better to try to engage first.",
            culturalNote:
              "Try to participate in the conversation before admitting difficulty.",
          },
          {
            id: "option-3",
            greek: "Θέλω μόνο νερό.",
            english: "I only want water.",
            isCorrect: false,
            explanation:
              "Too abrupt and doesn't engage with the waiter's suggestions.",
            culturalNote:
              "Even if you want something simple, be more polite about it.",
          },
        ],
        correctOptionId: "option-1",
      },
      {
        id: "waiter-recommendation",
        speaker: "waiter",
        greek:
          "Προτείνω τη σαλάτα χωριάτικη και τη μουσακά. Είναι παραδοσιακά ελληνικά φαγητά.",
        english:
          "I recommend the Greek salad and moussaka. They are traditional Greek dishes.",
        explanation:
          "The waiter makes specific recommendations of traditional dishes.",
        culturalContext:
          "Greek waiters are proud of their traditional cuisine and love to share it.",
      },
      {
        id: "customer-order",
        speaker: "customer",
        greek: "",
        english: "",
        options: [
          {
            id: "option-1",
            greek:
              "Ακούγεται υπέροχα! Θα πάρω τη σαλάτα χωριάτικη και τη μουσακά, παρακαλώ.",
            english:
              "That sounds wonderful! I'll have the Greek salad and moussaka, please.",
            isCorrect: true,
            explanation: "Shows enthusiasm and uses proper ordering language.",
            culturalNote:
              "Expressing enthusiasm about Greek food will make the waiter happy.",
          },
          {
            id: "option-2",
            greek: "Εντάξει.",
            english: "Okay.",
            isCorrect: false,
            explanation: "Too casual and doesn't show appreciation.",
            culturalNote:
              "Show more enthusiasm when ordering traditional Greek food.",
          },
          {
            id: "option-3",
            greek: "Έχει κάτι άλλο;",
            english: "Do you have anything else?",
            isCorrect: false,
            explanation:
              "Asking for more options after getting good recommendations can seem dismissive.",
            culturalNote:
              "Trust the waiter's recommendations, especially for traditional dishes.",
          },
        ],
        correctOptionId: "option-1",
      },
      {
        id: "waiter-confirmation",
        speaker: "waiter",
        greek: "Εξαιρετική επιλογή! Θέλετε και ένα καλό κρασί;",
        english: "Excellent choice! Would you like a good wine as well?",
        explanation: "The waiter confirms the order and suggests wine.",
        culturalContext: "Wine is an important part of Greek dining culture.",
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
            explanation:
              "Shows interest in Greek wine culture and asks for guidance.",
            culturalNote:
              "Greek wines are excellent and asking for recommendations is appreciated.",
          },
          {
            id: "option-2",
            greek: "Όχι, ευχαριστώ.",
            english: "No, thank you.",
            isCorrect: false,
            explanation:
              "While polite, you're missing out on the full Greek dining experience.",
            culturalNote: "Greek meals are enhanced by local wines.",
          },
          {
            id: "option-3",
            greek: "Πόσο κοστίζει το κρασί;",
            english: "How much does the wine cost?",
            isCorrect: false,
            explanation: "Asking about price immediately can seem cheap.",
            culturalNote:
              "Focus on the experience first, price can be discussed later.",
          },
        ],
        correctOptionId: "option-1",
      },
      {
        id: "waiter-wine-suggestion",
        speaker: "waiter",
        greek:
          "Έχουμε ένα ωραίο κρασί από τη Σαντορίνη. Ταιριάζει τέλεια με τη μουσακά.",
        english:
          "We have a nice wine from Santorini. It pairs perfectly with moussaka.",
        explanation:
          "The waiter suggests a specific wine with cultural context.",
        culturalContext:
          "Greek waiters often suggest wines from specific regions that complement the food.",
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
            explanation:
              "Shows enthusiasm and gratitude for the recommendations.",
            culturalNote:
              "Expressing gratitude is very important in Greek culture.",
          },
          {
            id: "option-2",
            greek: "Εντάξει.",
            english: "Okay.",
            isCorrect: false,
            explanation: "Too casual for such a nice dining experience.",
            culturalNote:
              "Show more appreciation for the personalized service.",
          },
          {
            id: "option-3",
            greek: "Πότε θα είναι έτοιμο;",
            english: "When will it be ready?",
            isCorrect: false,
            explanation:
              "Too impatient - Greek dining is about the experience, not speed.",
            culturalNote:
              "Greek meals are meant to be enjoyed slowly, not rushed.",
          },
        ],
        correctOptionId: "option-1",
      },
      {
        id: "waiter-closing",
        speaker: "waiter",
        greek: "Θα είναι έτοιμο σε λίγα λεπτά. Καλή όρεξη!",
        english: "It will be ready in a few minutes. Enjoy your meal!",
        explanation:
          "The waiter confirms the order and wishes you a good meal.",
        culturalContext:
          "'Καλή όρεξη' is the traditional Greek way to wish someone a good meal.",
      },
    ],
    vocabulary: [
      {
        greek: "εστιατόριο",
        english: "restaurant",
        pronunciation: "es-tee-a-TO-ree-o",
      },
      {
        greek: "μενού",
        english: "menu",
        pronunciation: "me-NOO",
      },
      {
        greek: "σαλάτα χωριάτικη",
        english: "Greek salad",
        pronunciation: "sa-LA-ta ho-ree-A-tee-kee",
      },
      {
        greek: "μουσακά",
        english: "moussaka",
        pronunciation: "moo-sa-KA",
      },
      {
        greek: "κρασί",
        english: "wine",
        pronunciation: "kra-SEE",
      },
      {
        greek: "καλή όρεξη",
        english: "enjoy your meal",
        pronunciation: "ka-LEE o-RE-ksi",
      },
      {
        greek: "παρακαλώ",
        english: "please",
        pronunciation: "pa-ra-ka-LO",
      },
      {
        greek: "ευχαριστώ",
        english: "thank you",
        pronunciation: "ef-ha-ree-STO",
      },
    ],
  },
  {
    id: "market-shopping",
    title: "Στο Παζάρι",
    englishTitle: "At the Market",
    description:
      "Buy fresh produce and interact with vendors at a Greek market",
    difficulty: "beginner",
    category: "market",
    context:
      "You're at a traditional Greek market (laiki agora) and want to buy some fresh fruits and vegetables.",
    culturalBackground:
      "Greek markets are vibrant places where bargaining is common and vendors are very friendly. Fresh produce is a big part of Greek culture.",
    dialogues: [
      {
        id: "vendor-greeting",
        speaker: "waiter",
        greek: "Καλημέρα! Τι θα θέλατε σήμερα;",
        english: "Good morning! What would you like today?",
        explanation: "Standard greeting in Greek markets.",
        culturalContext:
          "Greek vendors are very welcoming and will often greet you warmly.",
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
            culturalNote:
              "Always greet back and be specific about what you want.",
          },
          {
            id: "option-2",
            greek: "Πόσο κοστίζει;",
            english: "How much does it cost?",
            isCorrect: false,
            explanation: "Too direct - greet first, then ask about prices.",
            culturalNote: "Greeks value politeness and proper greetings.",
          },
        ],
        correctOptionId: "option-1",
      },
      {
        id: "vendor-fruits",
        speaker: "vendor",
        greek:
          "Έχουμε πολύ ωραία φρούτα! Μήλα, πορτοκάλια, μπανάνες. Τι προτιμάτε;",
        english:
          "We have very nice fruits! Apples, oranges, bananas. What do you prefer?",
        explanation:
          "The vendor shows available fruits and asks for preference.",
        culturalContext:
          "Greek vendors love to show off their fresh produce and make recommendations.",
      },
      {
        id: "customer-fruit-choice",
        speaker: "customer",
        greek: "",
        english: "",
        options: [
          {
            id: "option-1",
            greek: "Θα ήθελα μήλα και πορτοκάλια. Πόσο κοστίζουν;",
            english: "I would like apples and oranges. How much do they cost?",
            isCorrect: true,
            explanation: "Specific request followed by price inquiry.",
            culturalNote:
              "It's good to be specific about quantities and then ask about price.",
          },
          {
            id: "option-2",
            greek: "Όλα είναι καλά.",
            english: "Everything is good.",
            isCorrect: false,
            explanation: "Too vague - vendor needs to know what you want.",
            culturalNote: "Be specific about what you want to buy.",
          },
        ],
        correctOptionId: "option-1",
      },
      {
        id: "vendor-pricing",
        speaker: "vendor",
        greek:
          "Τα μήλα είναι 2 ευρώ το κιλό και τα πορτοκάλια 1,50 ευρώ. Θέλετε ένα κιλό από κάθε;",
        english:
          "The apples are 2 euros per kilo and the oranges 1.50 euros. Would you like a kilo of each?",
        explanation: "Vendor provides pricing and suggests quantities.",
        culturalContext:
          "Greek markets typically sell by weight (kilo) rather than by piece.",
      },
      {
        id: "customer-quantity",
        speaker: "customer",
        greek: "",
        english: "",
        options: [
          {
            id: "option-1",
            greek: "Ναι, παρακαλώ! Μισό κιλό μήλα και ένα κιλό πορτοκάλια.",
            english:
              "Yes, please! Half a kilo of apples and one kilo of oranges.",
            isCorrect: true,
            explanation: "Polite acceptance with specific quantities.",
            culturalNote:
              "It's common to buy different quantities of different items.",
          },
          {
            id: "option-2",
            greek: "Πάρα πολύ ακριβά.",
            english: "Too expensive.",
            isCorrect: false,
            explanation: "Too direct and potentially rude.",
            culturalNote:
              "If prices are high, it's better to negotiate politely or say you'll think about it.",
          },
        ],
        correctOptionId: "option-1",
      },
      {
        id: "vendor-bargaining",
        speaker: "vendor",
        greek: "Για εσάς, τα μήλα 1,80 ευρώ! Είναι φρέσκα από τη Θεσσαλονίκη.",
        english:
          "For you, the apples 1.80 euros! They are fresh from Thessaloniki.",
        explanation: "Vendor offers a discount and mentions the origin.",
        culturalContext:
          "Greek vendors often offer discounts to friendly customers and mention product origins.",
      },
      {
        id: "customer-bargain-response",
        speaker: "customer",
        greek: "",
        english: "",
        options: [
          {
            id: "option-1",
            greek: "Τέλεια! Ευχαριστώ πολύ. Θέλετε και λίγα λαχανικά;",
            english:
              "Perfect! Thank you very much. Do you also want some vegetables?",
            isCorrect: true,
            explanation: "Shows appreciation and asks about additional items.",
            culturalNote:
              "It's good to show appreciation for the discount and explore more options.",
          },
          {
            id: "option-2",
            greek: "Ακόμα ακριβά.",
            english: "Still expensive.",
            isCorrect: false,
            explanation: "Continuing to complain about price is impolite.",
            culturalNote:
              "Once a vendor offers a discount, it's better to accept graciously.",
          },
        ],
        correctOptionId: "option-1",
      },
      {
        id: "vendor-vegetables",
        speaker: "vendor",
        greek: "Έχουμε ντομάτες, αγγούρια, πιπεριές. Όλα φρέσκα!",
        english: "We have tomatoes, cucumbers, peppers. All fresh!",
        explanation: "Vendor lists available vegetables.",
        culturalContext:
          "Greek vegetables are known for their freshness and quality.",
      },
      {
        id: "customer-final-order",
        speaker: "customer",
        greek: "",
        english: "",
        options: [
          {
            id: "option-1",
            greek: "Θα πάρω και ντομάτες και αγγούρια. Πόσο είναι όλα μαζί;",
            english:
              "I'll take tomatoes and cucumbers too. How much is everything together?",
            isCorrect: true,
            explanation: "Makes final selection and asks for total price.",
            culturalNote:
              "It's common to ask for the total price of all items together.",
          },
          {
            id: "option-2",
            greek: "Δεν θέλω τίποτα άλλο.",
            english: "I don't want anything else.",
            isCorrect: false,
            explanation: "Too abrupt and doesn't complete the transaction.",
            culturalNote: "It's better to complete your purchase politely.",
          },
        ],
        correctOptionId: "option-1",
      },
      {
        id: "vendor-total",
        speaker: "vendor",
        greek: "Συνολικά 4,30 ευρώ. Καλή όρεξη!",
        english: "Total 4.30 euros. Enjoy your meal!",
        explanation: "Vendor provides total and wishes good appetite.",
        culturalContext:
          "'Καλή όρεξη' is commonly used when selling food items.",
      },
    ],
    vocabulary: [
      {
        greek: "παζάρι",
        english: "market",
        pronunciation: "pa-ZA-ree",
      },
      {
        greek: "λαϊκή αγορά",
        english: "farmer's market",
        pronunciation: "la-ee-KEE a-go-RA",
      },
      {
        greek: "φρούτα",
        english: "fruits",
        pronunciation: "FROO-ta",
      },
      {
        greek: "λαχανικά",
        english: "vegetables",
        pronunciation: "la-ha-nee-KA",
      },
      {
        greek: "μήλα",
        english: "apples",
        pronunciation: "MEE-la",
      },
      {
        greek: "πορτοκάλια",
        english: "oranges",
        pronunciation: "por-to-KA-lya",
      },
      {
        greek: "μπανάνες",
        english: "bananas",
        pronunciation: "ba-NA-nes",
      },
      {
        greek: "ντομάτες",
        english: "tomatoes",
        pronunciation: "do-MA-tes",
      },
      {
        greek: "αγγούρια",
        english: "cucumbers",
        pronunciation: "a-GOO-rya",
      },
      {
        greek: "πιπεριές",
        english: "peppers",
        pronunciation: "pee-pe-ree-ES",
      },
      {
        greek: "κιλό",
        english: "kilo",
        pronunciation: "kee-LO",
      },
      {
        greek: "ευρώ",
        english: "euro",
        pronunciation: "ev-RO",
      },
      {
        greek: "συνολικά",
        english: "total",
        pronunciation: "see-no-lee-KA",
      },
    ],
  },
  {
    id: "airport-travel",
    title: "Στο Αεροδρόμιο",
    englishTitle: "At the Airport",
    description: "Navigate airport procedures and interact with staff",
    difficulty: "intermediate",
    category: "travel",
    context:
      "You're at Athens International Airport and need to check in for your flight.",
    culturalBackground:
      "Greek airports are modern and efficient. Staff are generally helpful and many speak English, but using Greek shows respect and can be helpful.",
    dialogues: [
      {
        id: "checkin-greeting",
        speaker: "staff",
        greek: "Καλησπέρα! Μπορώ να σας βοηθήσω με το check-in;",
        english: "Good evening! Can I help you with check-in?",
        explanation: "Airport staff greeting and offering assistance.",
        culturalContext:
          "Greek airport staff are typically very helpful and professional.",
      },
      {
        id: "customer-greeting",
        speaker: "customer",
        greek: "",
        english: "",
        options: [
          {
            id: "option-1",
            greek:
              "Καλησπέρα! Ναι, παρακαλώ. Έχω κράτηση για την πτήση ΑΘ 123.",
            english:
              "Good evening! Yes, please. I have a reservation for flight ATH 123.",
            isCorrect: true,
            explanation: "Polite greeting with specific flight information.",
            culturalNote:
              "Always greet back and provide specific flight details.",
          },
          {
            id: "option-2",
            greek: "Θέλω να πετάξω.",
            english: "I want to fly.",
            isCorrect: false,
            explanation: "Too vague - staff need specific flight information.",
            culturalNote:
              "Be specific about your flight details when checking in.",
          },
        ],
        correctOptionId: "option-1",
      },
      {
        id: "staff-passport",
        speaker: "staff",
        greek:
          "Βεβαίως! Μπορείτε να μου δείξετε το διαβατήριό σας και την κράτησή σας;",
        english: "Of course! Can you show me your passport and reservation?",
        explanation: "Staff requests necessary documents.",
        culturalContext:
          "Greek airport procedures are similar to international standards.",
      },
      {
        id: "customer-documents",
        speaker: "customer",
        greek: "",
        english: "",
        options: [
          {
            id: "option-1",
            greek: "Βεβαίως! Ορίστε το διαβατήριό μου και η κράτηση.",
            english: "Of course! Here are my passport and reservation.",
            isCorrect: true,
            explanation: "Polite response with documents.",
            culturalNote:
              "Always be cooperative and polite when providing documents.",
          },
          {
            id: "option-2",
            greek: "Γιατί χρειάζεστε αυτά;",
            english: "Why do you need these?",
            isCorrect: false,
            explanation: "Questioning standard procedures is unnecessary.",
            culturalNote:
              "Airport procedures are standard and questioning them delays everyone.",
          },
        ],
        correctOptionId: "option-1",
      },
      {
        id: "staff-baggage",
        speaker: "staff",
        greek: "Ευχαριστώ! Έχετε αποσκευές για να παραδώσετε;",
        english: "Thank you! Do you have luggage to check in?",
        explanation: "Staff asks about checked baggage.",
        culturalContext: "Greek airlines have standard baggage policies.",
      },
      {
        id: "customer-baggage",
        speaker: "customer",
        greek: "",
        english: "",
        options: [
          {
            id: "option-1",
            greek: "Ναι, έχω μια βαλίτσα 20 κιλών. Είναι εντός των ορίων;",
            english: "Yes, I have a 20-kilo suitcase. Is it within the limit?",
            isCorrect: true,
            explanation: "Specific information about baggage weight.",
            culturalNote:
              "It's good to know your baggage weight and ask about limits.",
          },
          {
            id: "option-2",
            greek: "Όχι, δεν έχω τίποτα.",
            english: "No, I don't have anything.",
            isCorrect: false,
            explanation: "Unlikely for international travel.",
            culturalNote:
              "Most international travelers have at least some luggage.",
          },
        ],
        correctOptionId: "option-1",
      },
      {
        id: "staff-seat",
        speaker: "staff",
        greek:
          "Εντάξει! Θέλετε να επιλέξετε θέση; Έχουμε θέσεις δίπλα στο παράθυρο.",
        english:
          "Okay! Would you like to choose a seat? We have window seats available.",
        explanation: "Staff offers seat selection.",
        culturalContext: "Greek airlines offer seat selection during check-in.",
      },
      {
        id: "customer-seat-choice",
        speaker: "customer",
        greek: "",
        english: "",
        options: [
          {
            id: "option-1",
            greek:
              "Ναι, παρακαλώ! Θα ήθελα θέση δίπλα στο παράθυρο, αν είναι δυνατόν.",
            english: "Yes, please! I would like a window seat, if possible.",
            isCorrect: true,
            explanation: "Polite request with flexibility.",
            culturalNote: "Being polite and flexible helps get better service.",
          },
          {
            id: "option-2",
            greek: "Δεν με νοιάζει.",
            english: "I don't care.",
            isCorrect: false,
            explanation: "Too casual and dismissive.",
            culturalNote: "Show interest in your travel arrangements.",
          },
        ],
        correctOptionId: "option-1",
      },
      {
        id: "staff-boarding",
        speaker: "staff",
        greek: "Τέλεια! Η πτήση θα απογειωθεί στις 15:30. Η πύλη είναι Α12.",
        english: "Perfect! The flight will depart at 15:30. The gate is A12.",
        explanation: "Staff provides departure information.",
        culturalContext: "Greek airports use 24-hour time format.",
      },
      {
        id: "customer-final",
        speaker: "customer",
        greek: "",
        english: "",
        options: [
          {
            id: "option-1",
            greek: "Ευχαριστώ πολύ! Καλή πτήση!",
            english: "Thank you very much! Have a good flight!",
            isCorrect: true,
            explanation: "Polite thank you and good wishes.",
            culturalNote: "It's polite to thank staff and wish them well.",
          },
          {
            id: "option-2",
            greek: "Πού είναι η πύλη;",
            english: "Where is the gate?",
            isCorrect: false,
            explanation: "Too abrupt - thank first, then ask for directions.",
            culturalNote:
              "Always thank staff before asking additional questions.",
          },
        ],
        correctOptionId: "option-1",
      },
    ],
    vocabulary: [
      {
        greek: "αεροδρόμιο",
        english: "airport",
        pronunciation: "a-e-ro-THRO-mee-o",
      },
      {
        greek: "πτήση",
        english: "flight",
        pronunciation: "PTEE-see",
      },
      {
        greek: "διαβατήριο",
        english: "passport",
        pronunciation: "thee-a-va-TEE-ree-o",
      },
      {
        greek: "κράτηση",
        english: "reservation",
        pronunciation: "kra-TEE-see",
      },
      {
        greek: "αποσκευές",
        english: "luggage",
        pronunciation: "a-po-ske-VES",
      },
      {
        greek: "βαλίτσα",
        english: "suitcase",
        pronunciation: "va-LEET-sa",
      },
      {
        greek: "θέση",
        english: "seat",
        pronunciation: "THE-see",
      },
      {
        greek: "παράθυρο",
        english: "window",
        pronunciation: "pa-RA-thee-ro",
      },
      {
        greek: "απογείωση",
        english: "departure",
        pronunciation: "a-po-YEE-o-see",
      },
      {
        greek: "πύλη",
        english: "gate",
        pronunciation: "PEE-lee",
      },
      {
        greek: "check-in",
        english: "check-in",
        pronunciation: "check-in",
      },
      {
        greek: "κυβέρνηση",
        english: "government",
        pronunciation: "kee-ver-NEE-see",
      },
    ],
  },
  {
    id: "hotel-stay",
    title: "Στο Ξενοδοχείο",
    englishTitle: "At the Hotel",
    description: "Check in and interact with hotel staff",
    difficulty: "intermediate",
    category: "travel",
    context:
      "You're checking into a hotel in Athens and need to arrange your stay.",
    culturalBackground:
      "Greek hotels are known for their hospitality (filoxenia). Staff are very welcoming and often go out of their way to help guests.",
    dialogues: [
      {
        id: "reception-greeting",
        speaker: "receptionist",
        greek: "Καλησπέρα! Καλώς ήρθατε στο Ξενοδοχείο Ακρόπολις!",
        english: "Good evening! Welcome to the Acropolis Hotel!",
        explanation: "Hotel receptionist greeting guests.",
        culturalContext:
          "Greek hotels are very welcoming and often greet guests warmly.",
      },
      {
        id: "guest-greeting",
        speaker: "guest",
        greek: "",
        english: "",
        options: [
          {
            id: "option-1",
            greek:
              "Καλησπέρα! Έχω κράτηση για δύο βράδια. Το όνομά μου είναι Γιώργος Παπαδόπουλος.",
            english:
              "Good evening! I have a reservation for two nights. My name is Giorgos Papadopoulos.",
            isCorrect: true,
            explanation: "Polite greeting with reservation details and name.",
            culturalNote:
              "Always provide your name and reservation details clearly.",
          },
          {
            id: "option-2",
            greek: "Θέλω δωμάτιο.",
            english: "I want a room.",
            isCorrect: false,
            explanation: "Too direct - provide reservation details first.",
            culturalNote:
              "Be specific about your reservation when checking in.",
          },
        ],
        correctOptionId: "option-1",
      },
      {
        id: "reception-confirmation",
        speaker: "receptionist",
        greek:
          "Βεβαίως! Βρίσκω την κράτησή σας. Έχετε κράτηση για δωμάτιο με θέα στην Ακρόπολη.",
        english:
          "Of course! I found your reservation. You have a reservation for a room with Acropolis view.",
        explanation: "Receptionist confirms reservation details.",
        culturalContext:
          "Greek hotels often highlight their views of historical sites.",
      },
      {
        id: "guest-room-questions",
        speaker: "guest",
        greek: "",
        english: "",
        options: [
          {
            id: "option-1",
            greek:
              "Τέλεια! Έχει το δωμάτιο μπαλκόνι; Και τι ώρα είναι το πρωινό;",
            english:
              "Perfect! Does the room have a balcony? And what time is breakfast?",
            isCorrect: true,
            explanation:
              "Asks relevant questions about room amenities and breakfast.",
            culturalNote:
              "It's good to ask about important amenities and meal times.",
          },
          {
            id: "option-2",
            greek: "Πόσο κοστίζει;",
            english: "How much does it cost?",
            isCorrect: false,
            explanation: "Price should already be confirmed in reservation.",
            culturalNote:
              "Focus on room details and services rather than price during check-in.",
          },
        ],
        correctOptionId: "option-1",
      },
      {
        id: "reception-amenities",
        speaker: "receptionist",
        greek:
          "Ναι, έχει μπαλκόνι με υπέροχη θέα! Το πρωινό είναι από 7:00 έως 10:00. Έχετε επίσης πρόσβαση στην πισίνα.",
        english:
          "Yes, it has a balcony with wonderful view! Breakfast is from 7:00 to 10:00. You also have access to the pool.",
        explanation: "Receptionist provides information about amenities.",
        culturalContext:
          "Greek hotels often have pools and emphasize their views.",
      },
      {
        id: "guest-wifi",
        speaker: "guest",
        greek: "",
        english: "",
        options: [
          {
            id: "option-1",
            greek:
              "Εξαιρετικά! Έχει το ξενοδοχείο δωρεάν Wi-Fi; Και πού μπορώ να παρκάρω;",
            english:
              "Excellent! Does the hotel have free Wi-Fi? And where can I park?",
            isCorrect: true,
            explanation: "Asks about important modern amenities and parking.",
            culturalNote:
              "Wi-Fi and parking are important considerations for travelers.",
          },
          {
            id: "option-2",
            greek: "Δεν με νοιάζει.",
            english: "I don't care.",
            isCorrect: false,
            explanation: "Too dismissive of important information.",
            culturalNote: "Show interest in hotel services and amenities.",
          },
        ],
        correctOptionId: "option-1",
      },
      {
        id: "reception-services",
        speaker: "receptionist",
        greek:
          "Ναι, έχουμε δωρεάν Wi-Fi σε όλο το ξενοδοχείο. Έχουμε υπόγειο πάρκινγκ με χρέωση 10 ευρώ την ημέρα.",
        english:
          "Yes, we have free Wi-Fi throughout the hotel. We have underground parking for 10 euros per day.",
        explanation:
          "Receptionist provides information about Wi-Fi and parking.",
        culturalContext:
          "Most Greek hotels offer Wi-Fi, and parking is often available for a fee.",
      },
      {
        id: "guest-checkin",
        speaker: "guest",
        greek: "",
        english: "",
        options: [
          {
            id: "option-1",
            greek:
              "Τέλεια! Μπορώ να κάνω check-in τώρα; Έχω την πιστωτική κάρτα μου.",
            english: "Perfect! Can I check in now? I have my credit card.",
            isCorrect: true,
            explanation: "Polite request to proceed with check-in.",
            culturalNote:
              "Always have your payment method ready during check-in.",
          },
          {
            id: "option-2",
            greek: "Πού είναι το δωμάτιό μου;",
            english: "Where is my room?",
            isCorrect: false,
            explanation: "Too impatient - complete check-in process first.",
            culturalNote:
              "Complete the check-in process before asking about room location.",
          },
        ],
        correctOptionId: "option-1",
      },
      {
        id: "reception-completion",
        speaker: "receptionist",
        greek:
          "Βεβαίως! Το δωμάτιό σας είναι στον 3ο όροφο, αριθμός 305. Ο κλειδιάς σας. Καλή διαμονή!",
        english:
          "Of course! Your room is on the 3rd floor, number 305. Here are your keys. Have a pleasant stay!",
        explanation: "Receptionist provides room details and keys.",
        culturalContext:
          "Greek hotels often wish guests a pleasant stay (καλή διαμονή).",
      },
      {
        id: "guest-thanks",
        speaker: "guest",
        greek: "",
        english: "",
        options: [
          {
            id: "option-1",
            greek: "Ευχαριστώ πολύ! Θα χρειαστώ κάτι άλλο, θα σας ρωτήσω.",
            english:
              "Thank you very much! If I need anything else, I'll ask you.",
            isCorrect: true,
            explanation: "Polite thank you and acknowledgment of service.",
            culturalNote:
              "Always thank hotel staff and acknowledge their willingness to help.",
          },
          {
            id: "option-2",
            greek: "Εντάξει.",
            english: "Okay.",
            isCorrect: false,
            explanation: "Too casual for the level of service provided.",
            culturalNote: "Show appreciation for the hospitality and service.",
          },
        ],
        correctOptionId: "option-1",
      },
    ],
    vocabulary: [
      {
        greek: "ξενοδοχείο",
        english: "hotel",
        pronunciation: "kse-no-tho-KEE-o",
      },
      {
        greek: "κράτηση",
        english: "reservation",
        pronunciation: "kra-TEE-see",
      },
      {
        greek: "δωμάτιο",
        english: "room",
        pronunciation: "tho-MA-tee-o",
      },
      {
        greek: "θέα",
        english: "view",
        pronunciation: "THEE-a",
      },
      {
        greek: "μπαλκόνι",
        english: "balcony",
        pronunciation: "bal-KO-nee",
      },
      {
        greek: "πρωινό",
        english: "breakfast",
        pronunciation: "pro-ee-NO",
      },
      {
        greek: "πισίνα",
        english: "pool",
        pronunciation: "pee-SEE-na",
      },
      {
        greek: "Wi-Fi",
        english: "Wi-Fi",
        pronunciation: "Wi-Fi",
      },
      {
        greek: "πάρκινγκ",
        english: "parking",
        pronunciation: "PAR-king",
      },
      {
        greek: "όροφος",
        english: "floor",
        pronunciation: "O-ro-fos",
      },
      {
        greek: "κλειδιάς",
        english: "keys",
        pronunciation: "klee-THYAS",
      },
      {
        greek: "διαμονή",
        english: "stay",
        pronunciation: "thee-a-mo-NEE",
      },
      {
        greek: "φιλοξενία",
        english: "hospitality",
        pronunciation: "fee-lo-kse-NEE-a",
      },
      {
        greek: "check-in",
        english: "check-in",
        pronunciation: "check-in",
      },
    ],
  },
];

export const getScenarioById = (
  id: string
): ConversationScenario | undefined => {
  return CONVERSATION_SCENARIOS.find((scenario) => scenario.id === id);
};

export const getScenariosByCategory = (
  category: ConversationScenario["category"]
): ConversationScenario[] => {
  return CONVERSATION_SCENARIOS.filter(
    (scenario) => scenario.category === category
  );
};

export const getScenariosByDifficulty = (
  difficulty: ConversationScenario["difficulty"]
): ConversationScenario[] => {
  return CONVERSATION_SCENARIOS.filter(
    (scenario) => scenario.difficulty === difficulty
  );
};
