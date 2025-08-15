import { getGameCollection, getAvailableGames } from "@/app/utils/games/registry";
import { GameCard } from "@/app/components/ui/GameCard";
import { Home } from "lucide-react";
import Link from "next/link";

export default function GamesPage() {
  const { all } = getGameCollection();
  const availableGames = getAvailableGames();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 greek-pattern opacity-10"></div>
        <div className="relative container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 text-center">
          <div className="mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              🇬🇷 All Greek Learning Games
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary mb-4 sm:mb-6">
            Greek Games
            <span className="block text-foreground">Collection</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Explore our complete collection of interactive Greek language
            learning games
          </p>

          <div className="h-1 w-16 sm:w-24 golden-gradient mx-auto mb-6 sm:mb-8"></div>

          <div className="flex justify-center px-4">
            <Link href="/">
              <button className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary/10 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-colors text-base sm:text-lg">
                <Home size={20} />
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Games Grid */}
      <main className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {availableGames.map((game, index) => (
            <GameCard
              key={game.id}
              game={game}
              index={index}
              showFeatures={true}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
