"use client";

import { GameCard } from "@/app/components/ui/GameCard";
import { getGameCollection } from "@/app/utils/games/registry";
import { Navigation } from "@/components/ui/Navigation";
import { Home } from "lucide-react";
import Link from "next/link";

export default function GamesPage() {
  const { all } = getGameCollection();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-6 sm:mb-8"
          >
            <Home size={16} className="sm:w-5 sm:h-5" />
            Back to Home
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary mb-4 sm:mb-6">
            Greek Learning Games
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted mb-6 sm:mb-8">
            Choose a game to start learning Greek
          </p>
          <div className="h-1 w-16 sm:w-24 golden-gradient mx-auto mb-6 sm:mb-8"></div>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {all.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} showFeatures />
          ))}
        </div>
      </main>
    </div>
  );
}
