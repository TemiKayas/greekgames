# 🎮 How to Add New Games to Greek Games

## ⚡ Quick Start (2 Steps!)

### 1. Add your game to the registry

Edit `app/utils/games/registry.ts` and add your game to the `GAMES` array:

```typescript
{
  id: "your-game-id",                    // Unique identifier
  title: "Your Game Title",              // Display name
  description: "Your game description",  // Short description
  status: "beta",                        // See status options below
  icon: "🎮",                           // Emoji icon
  href: "/your-game",                    // Route to your game
  category: "puzzle",                    // Game category
  difficulty: "medium",                  // Difficulty level
  estimatedPlayTime: "5-10 min",        // How long to play
  features: ["Feature 1", "Feature 2"], // Key features
  releaseDate: "2024-12-10"             // Optional release date
}
```

### 2. Create your game page

Create a new file at `app/your-game/page.tsx`:

```typescript
export default function YourGame() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-8">
        <h1 className="font-display text-4xl font-bold text-primary mb-8">
          Your Game Title
        </h1>
        {/* Your game content here */}
      </div>
    </div>
  );
}
```

That's it! Your game will automatically appear on the homepage! 🚀

## 📋 Configuration Options

### Game Status Options

```typescript
"available"; // ✅ Fully playable
"beta"; // 🧪 Beta testing
"coming-soon"; // 📅 Announced but not ready
"in-development"; // 🔨 Being built
"planning"; // 📝 Just an idea
```

### Game Categories

```typescript
"memory"; // Memory/matching games
"strategy"; // Strategy and tactics
"adventure"; // Story-driven games
"puzzle"; // Logic puzzles
"action"; // Fast-paced games
```

### Difficulty Levels

```typescript
"easy"; // Beginner friendly
"medium"; // Balanced challenge
"hard"; // For experts
```

## 🎨 Using Greek Theme

Your game automatically gets access to:

- **Colors**: `text-primary`, `bg-surface`, `border-border`
- **Fonts**: `font-display` (Cinzel), `font-body` (Crimson Text)
- **Animations**: Framer Motion already installed
- **State**: Zustand for state management
- **Icons**: Lucide React icons

## 🏗️ Folder Structure

Create organized folders for complex games:

```
app/
└── your-game/
    ├── page.tsx          # Main game page
    ├── components/       # Game-specific components
    │   ├── GameBoard.tsx
    │   └── PlayerHUD.tsx
    ├── hooks/           # Custom hooks
    │   └── useGameLogic.ts
    └── utils/           # Game utilities
        └── gameHelpers.ts
```

## 📱 Responsive Design

Use these Tailwind classes for responsive design:

```css
/* Mobile first approach */
text-sm md:text-base lg:text-lg
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
p-4 md:p-6 lg:p-8
```

## 🎯 Featured Games

To feature your game on the homepage, add its ID to `FEATURED_GAME_IDS` in `registry.ts`:

```typescript
export const FEATURED_GAME_IDS = [
  "gods-of-olympus",
  "your-game-id", // Add here
  "spartan-warriors",
];
```

## 🔍 Game Discovery

Games are automatically organized by:

- **Homepage**: Featured games prominently displayed
- **Categories**: Auto-grouped by category
- **Status**: Filtered by availability
- **Search**: (Coming soon) Searchable by title/description

## ✨ Examples

Check out the existing memory game at `app/memory/page.tsx` for a complete example of:

- Game state management with Zustand
- Responsive design with Tailwind
- Animations with Framer Motion
- Greek theming integration

## 🚀 Deployment

Your games automatically deploy with the main site. No extra configuration needed!

---

_Happy game building! May the gods inspire your creations! 🏛️⚡_
