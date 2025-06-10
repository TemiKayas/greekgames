import { GAME_STATUS_CONFIG, GameMetadata } from "@/app/types/games";
import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";
import Link from "next/link";

interface GameCardProps {
  game: GameMetadata;
  index?: number;
  showFeatures?: boolean;
  size?: "small" | "medium" | "large";
}

export const GameCard = ({
  game,
  index = 0,
  showFeatures = false,
  size = "medium",
}: GameCardProps) => {
  const statusConfig = GAME_STATUS_CONFIG[game.status];
  const isAvailable = statusConfig.available;

  const sizeClasses = {
    small: "p-4",
    medium: "p-6",
    large: "p-8",
  };

  const iconSizes = {
    small: "text-4xl",
    medium: "text-5xl",
    large: "text-6xl",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-surface border border-border rounded-[--border-radius-card] ${sizeClasses[size]} hover:shadow-[--shadow-glow] transition-all duration-300 hover:scale-105 group relative overflow-hidden`}
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}
        >
          {statusConfig.label}
        </span>
      </div>

      {/* Main Content */}
      <div className="text-center mb-6 relative">
        <div
          className={`${iconSizes[size]} mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          {game.icon}
        </div>

        <h3 className="font-display text-xl md:text-2xl font-semibold text-primary mb-3 group-hover:text-primary-dark transition-colors">
          {game.title}
        </h3>

        <p className="text-foreground/70 mb-4 text-sm md:text-base">
          {game.description}
        </p>

        {/* Game Info */}
        <div className="flex items-center justify-center gap-4 text-xs text-muted mb-4">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            {game.estimatedPlayTime}
          </div>
          <div className="flex items-center gap-1">
            <Star size={12} />
            {game.difficulty}
          </div>
          <div className="capitalize">{game.category}</div>
        </div>

        {/* Features (optional) */}
        {showFeatures && game.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1 justify-center">
              {game.features.slice(0, 3).map((feature, idx) => (
                <span
                  key={idx}
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
      </div>

      {/* Action Button */}
      {isAvailable ? (
        <Link href={game.href} className="block">
          <motion.button
            className="w-full bg-primary hover:bg-primary-dark text-background font-semibold py-3 px-6 rounded-[--border-radius-button] transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {statusConfig.buttonText}
          </motion.button>
        </Link>
      ) : (
        <button
          className="w-full bg-muted/20 text-muted font-semibold py-3 px-6 rounded-[--border-radius-button] cursor-not-allowed"
          disabled
        >
          {statusConfig.buttonText}
        </button>
      )}

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};
