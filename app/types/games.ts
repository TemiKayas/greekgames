// Game Registry Types - for managing multiple games

export type GameStatus =
  | "available"
  | "beta"
  | "coming-soon"
  | "in-development"
  | "planning";

export interface GameMetadata {
  id: string;
  title: string;
  description: string;
  status: GameStatus;
  icon: string; // Emoji or icon
  href: string;
  category: "memory" | "strategy" | "adventure" | "puzzle" | "action";
  difficulty: "easy" | "medium" | "hard";
  estimatedPlayTime: string; // e.g., "5-10 min"
  features: string[];
  releaseDate?: string;
  lastUpdated?: string;
  version?: string;
}

export interface GameCollection {
  featured: GameMetadata[];
  all: GameMetadata[];
  categories: Record<GameMetadata["category"], GameMetadata[]>;
}

// Game component props interface
export interface GamePageProps {
  params: { gameId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Status configurations
export const GAME_STATUS_CONFIG: Record<
  GameStatus,
  {
    label: string;
    color: string;
    bgColor: string;
    available: boolean;
    buttonText: string;
  }
> = {
  available: {
    label: "Available",
    color: "text-green-400",
    bgColor: "bg-green-400/20",
    available: true,
    buttonText: "Play Game",
  },
  beta: {
    label: "Beta Available",
    color: "text-primary",
    bgColor: "bg-primary/20",
    available: true,
    buttonText: "Try Beta",
  },
  "coming-soon": {
    label: "Coming Soon",
    color: "text-muted",
    bgColor: "bg-muted/20",
    available: false,
    buttonText: "Coming Soon",
  },
  "in-development": {
    label: "In Development",
    color: "text-blue-400",
    bgColor: "bg-blue-400/20",
    available: false,
    buttonText: "In Development",
  },
  planning: {
    label: "Planning",
    color: "text-muted",
    bgColor: "bg-muted/20",
    available: false,
    buttonText: "Planning",
  },
};
