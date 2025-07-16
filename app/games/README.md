# Games Directory

This directory contains all the Greek language learning games for the application.

## 📁 Current Games

### ✅ Completed Games

- **`/memory`** - Greek Alphabet Master (Memory matching game)
- **`/writing`** - Greek Writing Practice (Fill-in-the-blank exercises)
- **`/vocabulary`** - Everyday Greek Words (Drag & drop vocabulary)

### 🚧 Planned Games

- **`/verbs`** - Greek Verb Trainer (Verb conjugation practice)
- **`/numbers`** - Greek Numbers Game (Numbers and counting)
- **`/conversations`** - Greek Conversations (Real-world scenarios)
- **`/culture`** - Greek Culture & History (Cultural learning)
- **`/pronunciation`** - Greek Pronunciation Coach (AI pronunciation)

## 🏗️ Game Structure

Each game follows this structure:

```
/games/[game-name]/
├── page.tsx          # Main game page
├── components/       # Game-specific components
├── utils/           # Game-specific utilities
└── types/           # Game-specific types
```

## 🎯 Adding New Games

1. Create a new folder in `/games/[game-name]/`
2. Add the game to the registry in `/app/utils/games/registry.ts`
3. Update the TODO with development timeline
4. Follow the existing game patterns for consistency

## 📱 Ad Integration

All games should include:

- **Sidebar ads** (desktop only)
- **In-game ads** (between rounds)
- **Interstitial ads** (after completion)

See `/app/components/ads/` for ad components and `/ADSENSE_SETUP.md` for setup instructions.
