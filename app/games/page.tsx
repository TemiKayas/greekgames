import { GAMES } from "@/app/utils/games/registry";
import { Home } from "lucide-react";
import Link from "next/link";

export default function GamesPage() {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {GAMES.filter((game) => game.status === "available").map(
            (game, index) => (
              <div key={game.id}>
                <Link
                  href={game.href}
                  className="block bg-surface/50 rounded-[--border-radius-card] shadow-lg hover:shadow-xl transition-all p-6 group border border-border hover:border-primary/30"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl">{game.icon}</span>
                    <span className="text-xl font-bold text-primary group-hover:text-primary-dark transition-colors">
                      {game.title}
                    </span>
                  </div>
                  <div className="text-muted mb-4 min-h-[48px]">
                    {game.description}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-semibold">
                      {game.category}
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                      {game.difficulty}
                    </span>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-semibold">
                      {game.estimatedPlayTime}
                    </span>
                  </div>
                  <div>
                    <button className="w-full bg-primary hover:bg-primary-dark text-background py-3 px-4 rounded-lg font-bold text-lg transition-colors">
                      Play Now
                    </button>
                  </div>
                </Link>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}
