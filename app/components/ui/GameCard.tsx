"use client";

import type { GameMetadata } from "@/app/types/games";
import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";
import Link from "next/link";

interface GameCardProps {
  game: GameMetadata;
  index: number;
  showFeatures?: boolean;
}

export function GameCard({ game, index, showFeatures = false }: GameCardProps) {
  const statusConfig = {
    available: {
      bgColor: "bg-green-500/20",
      color: "text-green-400",
      text: "Available",
    },
    beta: {
      bgColor: "bg-blue-500/20",
      color: "text-blue-400",
      text: "Beta",
    },
    "coming-soon": {
      bgColor: "bg-amber-500/20",
      color: "text-amber-400",
      text: "Coming Soon",
    },
    "in-development": {
      bgColor: "bg-purple-500/20",
      color: "text-purple-400",
      text: "In Development",
    },
    planning: {
      bgColor: "bg-muted/20",
      color: "text-muted",
      text: "Planning",
    },
  };

  const config = statusConfig[game.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-[--shadow-glow] transition-all duration-300 group"
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${config.bgColor} ${config.color}`}
          >
            {config.text}
          </span>
          <div className="text-xl sm:text-2xl">{game.icon}</div>
        </div>

        <h3 className="font-display text-lg sm:text-xl md:text-2xl font-semibold text-primary mb-2 sm:mb-3 group-hover:text-primary-dark transition-colors">
          {game.title}
        </h3>

        <p className="text-foreground/70 text-sm sm:text-base mb-4 sm:mb-6 line-clamp-2 leading-relaxed">
          {game.description}
        </p>

        {/* Game Info */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted mb-4 sm:mb-6">
          <div className="flex items-center gap-1">
            <Clock size={12} className="sm:w-3 sm:h-3" />
            <span>{game.estimatedPlayTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={12} className="sm:w-3 sm:h-3" />
            <span className="capitalize">{game.difficulty}</span>
          </div>
          <div className="capitalize">{game.category}</div>
        </div>

        {showFeatures && game.features && (
          <div className="mb-4 sm:mb-6">
            <h4 className="text-xs sm:text-sm font-medium text-primary mb-2 sm:mb-3">
              What you&apos;ll learn:
            </h4>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {game.features.slice(0, 3).map((feature, i) => (
                <span
                  key={i}
                  className="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                >
                  {feature}
                </span>
              ))}
              {game.features.length > 3 && (
                <span className="inline-block px-2 py-1 bg-muted/10 text-muted rounded text-xs">
                  +{game.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {game.status === "available" ? (
          <Link href={game.href}>
            <button className="w-full bg-primary hover:bg-primary-dark text-background font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-[--border-radius-button] transition-colors duration-200 text-sm sm:text-base">
              Play Now
            </button>
          </Link>
        ) : (
          <button
            disabled
            className="w-full bg-muted/20 text-muted font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-[--border-radius-button] cursor-not-allowed text-sm sm:text-base"
          >
            {game.status === "coming-soon" ? "Coming Soon" : "Not Available"}
          </button>
        )}
      </div>
    </motion.div>
  );
}
