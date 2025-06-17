# 🇬🇷 How to Add Learning Activities to Learn Greek Through Play

## ⚡ Quick Start (3 Steps!)

### 1. Add your learning activity to the registry

Edit `app/utils/games/registry.ts` and add your activity to the `GAMES` array:

```typescript
{
  id: "your-activity-id",                    // Unique identifier
  title: "Your Activity Title",              // Display name
  description: "Learn Greek vocabulary...",  // Educational description
  status: "beta",                            // See status options below
  icon: "📚",                               // Emoji icon
  href: "/games/your-activity",              // Route to your activity
  category: "memory",                        // Learning category
  difficulty: "medium",                      // Difficulty level
  estimatedPlayTime: "5-10 min",            // How long to complete
  features: ["Greek Words", "Audio Guide"], // Key learning features
  releaseDate: "2024-12-10"                 // Optional release date
}
```

### 2. Create your learning activity page

Create a new file at `app/games/your-activity/page.tsx`:

```typescript
import { useGameSession } from "@/hooks/useGameSession";
import { useGameProgress } from "@/hooks/useGameProgress";
import { useGameAchievements } from "@/hooks/useGameAchievements";

export default function YourActivity() {
  const { startSession, endSession } = useGameSession();
  const { updateProgress } = useGameProgress();
  const { checkAchievements } = useGameAchievements();

  const handleGameStart = () => {
    startSession();
  };

  const handleGameEnd = (score: number, level: number) => {
    endSession(score, level);
    updateProgress({ score, level });
    checkAchievements({ score, level });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-8">
        <h1 className="font-display text-4xl font-bold text-primary mb-8">
          Your Learning Activity
        </h1>
        {/* Your educational content here */}
      </div>
    </div>
  );
}
```

### 3. Implement Progress Tracking

Add these components to your activity:

```typescript
import { GameProgressBar } from "@/components/game/GameProgressBar";
import { AchievementDisplay } from "@/components/game/AchievementDisplay";

// In your component:
<GameProgressBar />
<AchievementDisplay />
```

That's it! Your activity will automatically appear on the homepage with progress tracking! 🚀

## 📋 Configuration Options

### Activity Status Options

```typescript
"available"; // ✅ Fully functional learning tool
"beta"; // 🧪 Beta testing for learners
"coming-soon"; // 📅 Announced but not ready
"in-development"; // 🔨 Being built
"planning"; // 📝 Just an idea
```

### Learning Categories

```typescript
"memory"; // Memory games and vocabulary matching
"puzzle"; // Logic puzzles and language games
"adventure"; // Story-driven learning experiences
"action"; // Fast-paced language practice
"strategy"; // Advanced language construction
```

### Difficulty Levels

```typescript
"easy"; // Beginner (A1-A2 level)
"medium"; // Intermediate (B1-B2 level)
"hard"; // Advanced (C1-C2 level)
```

## 🎮 Progress Tracking

Your activity automatically gets:

- **Session Tracking**: Start/end times, scores, levels
- **Progress Saving**: Total scores, highest levels
- **Achievements**: Track and display accomplishments
- **Analytics**: Basic performance metrics

### Required Progress Data

```typescript
// Session data (automatically tracked)
{
  score: number;      // Game score
  level: number;      // Current level
  duration: number;   // Time spent
  completed: boolean; // Whether game was finished
}

// Progress data (automatically saved)
{
  totalScore: number;    // Cumulative score
  highestLevel: number;  // Best level reached
  lastPlayed: Date;      // Last session date
}
```

## 🏗️ Folder Structure for Learning Activities

Create organized folders for complex activities:

```
app/
└── games/
    └── your-activity/
        ├── page.tsx              # Main activity page
        ├── components/           # Activity-specific components
        │   ├── VocabularyCard.tsx
        │   ├── ProgressTracker.tsx
        │   └── AudioPlayer.tsx
        ├── hooks/               # Custom learning hooks
        │   ├── useVocabulary.ts
        │   └── useProgress.ts
        ├── utils/               # Activity utilities
        │   ├── greekHelpers.ts
        │   └── pronunciation.ts
        └── data/                # Learning content
            ├── vocabulary.ts
            └── lessons.ts
```

## 📱 Responsive Learning Design

Use these Tailwind classes for multi-device learning:

```css
/* Mobile-first responsive design */
text-sm md:text-base lg:text-lg
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
p-4 md:p-6 lg:p-8

/* Greek text sizing */
text-xl md:text-2xl /* For Greek characters */
leading-relaxed    /* Better spacing for Greek text */
```

## 🎯 Featured Learning Activities

To feature your activity on the homepage, add its ID to `FEATURED_GAME_IDS` in `registry.ts`:

```typescript
export const FEATURED_GAME_IDS = [
  "gods-of-olympus",
  "your-activity-id", // Add here
  "alphabet-master",
];
```

## 🔍 Learning Activity Discovery

Activities are automatically organized by:

- **Homepage**: Featured activities prominently displayed
- **Categories**: Auto-grouped by learning type
- **Difficulty**: Filtered by language level
- **Progress**: Track learner advancement

## ✨ Educational Examples

Check out the existing memory game at `app/games/memory/page.tsx` for:

- Vocabulary learning with visual associations
- Progress tracking and scoring
- Greek cultural context (gods and mythology)
- Responsive design for all devices
- Audio pronunciation guides (planned)

## 🎓 Learning Best Practices

When creating activities:

1. **Start Simple**: Begin with basic vocabulary
2. **Add Context**: Use Greek culture and stories
3. **Include Audio**: Pronunciation is crucial
4. **Track Progress**: Show learner advancement
5. **Make it Fun**: Gamify the learning experience
6. **Test Thoroughly**: Ensure educational accuracy

## 🚀 Deployment

Your learning activities automatically deploy with the main site. No extra configuration needed!

## 📚 Greek Language Resources

- **Unicode Greek**: Use proper Greek characters (Α-Ω, α-ω)
- **Phonetic Guides**: Include pronunciation help
- **Cultural Context**: Explain when/where words are used
- **Grammar Notes**: Add brief explanations when needed

---

_Καλή τύχη! (Good luck!) May your activities inspire Greek language learners! 🇬🇷📚_
