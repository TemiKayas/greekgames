# 🏛️ Greek Games - Code Quality Setup

## 📋 Overview

This document outlines the complete ESLint and Prettier setup for the Greek Games project to ensure consistent, high-quality code across all mythology-themed games.

## 🔧 Configuration Files

### 1. `.eslintrc.json` - ESLint Configuration

- **Extends**: Next.js core web vitals and Prettier
- **Rules**: Enforces code quality, React hooks, and Next.js best practices
- **Integration**: Works seamlessly with Prettier

### 2. `.prettierrc` - Prettier Configuration

- **Formatting**: Consistent semicolons, double quotes, 80-character lines
- **Style**: 2-space indentation, trailing commas, arrow parentheses
- **Line Endings**: LF format for cross-platform compatibility

### 3. `.prettierignore` - Prettier Ignore Rules

- **Excludes**: Build files, dependencies, generated content, logs
- **Protects**: Package manager files and configuration files

### 4. `.vscode/settings.json` - VS Code Integration

- **Auto-format**: On save and paste
- **ESLint**: Real-time error highlighting and auto-fix
- **TypeScript**: Enhanced IntelliSense and auto-imports

## 📦 Installed Packages

### Core Dependencies

```json
{
  "eslint": "ESLint core engine",
  "eslint-config-next": "Next.js ESLint rules",
  "eslint-config-prettier": "Disables ESLint formatting rules",
  "eslint-plugin-prettier": "Runs Prettier as ESLint rule",
  "prettier": "Code formatter",
  "@typescript-eslint/eslint-plugin": "TypeScript-specific linting rules",
  "@typescript-eslint/parser": "TypeScript parser for ESLint"
}
```

## 🚀 Available Scripts

### Linting Commands

```bash
npm run lint           # Basic linting check
npm run lint:fix       # Auto-fix linting issues
npm run lint:strict    # Zero-warning strict linting
```

### Formatting Commands

```bash
npm run format         # Format all files
npm run format:check   # Check formatting without fixing
```

### Type Checking

```bash
npm run type-check     # TypeScript type validation
```

### Quality Assurance

```bash
npm run quality        # Full quality check (type + lint + format)
npm run quality:fix    # Full quality check with auto-fixes
```

## 🎯 Benefits for Greek Games Development

### 🏗️ Code Consistency

- **Uniform styling** across all game components
- **Consistent imports** and file organization
- **Standardized naming** conventions

### 🐛 Bug Prevention

- **Early error detection** in game logic
- **React hooks validation** for game state management
- **TypeScript integration** for type safety

### 🤝 Team Collaboration

- **Automatic formatting** eliminates style debates
- **Clear error messages** for quick issue resolution
- **Pre-commit validation** ensures quality standards

### ⚡ Development Speed

- **Auto-fix capabilities** save manual correction time
- **VS Code integration** provides real-time feedback
- **One-command quality checks** streamline workflow

## 🛠️ Usage Examples

### Before Committing

```bash
# Check everything is good
npm run quality

# Auto-fix any issues
npm run quality:fix
```

### Daily Development

```bash
# Quick format all files
npm run format

# Fix linting issues
npm run lint:fix
```

### CI/CD Integration

```bash
# Strict quality check for builds
npm run quality
```

## 🎮 Greek Games Specific Rules

### Component Naming

- **Game components**: PascalCase (e.g., `OdysseyQuest`, `GodsOfOlympus`)
- **Utility functions**: camelCase (e.g., `calculateScore`, `handleGameOver`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_PLAYERS`, `GAME_STATES`)

### File Organization

```
app/
├── components/
│   ├── game/           # Game-specific components
│   ├── ui/             # Reusable UI components
│   └── layout/         # Layout components
├── hooks/
│   └── game/           # Game-related custom hooks
├── utils/
│   └── game/           # Game utility functions
└── types/
    └── game.ts         # Game-related TypeScript types
```

## 🚨 Common Issues & Solutions

### ESLint Errors

- **Fix**: Run `npm run lint:fix`
- **Manual review**: Some issues require manual attention

### Formatting Issues

- **Fix**: Run `npm run format`
- **VS Code**: Enable format-on-save in settings

### Type Errors

- **Fix**: Run `npm run type-check` to identify issues
- **Types**: Add proper TypeScript types for game entities

## 🎉 Next Steps

1. **Install VS Code extensions**:

   - ESLint
   - Prettier - Code formatter
   - TypeScript Importer

2. **Enable auto-save formatting** in your editor

3. **Run quality checks** before committing changes

4. **Consider adding pre-commit hooks** for automatic validation

---

_May the gods of code quality watch over your Greek Games development! 🏛️⚡_
