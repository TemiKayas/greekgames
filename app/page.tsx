"use client";

import { GameCard } from "@/app/components/ui/GameCard";
import {
  getAvailableGames,
  getGameCollection,
} from "@/app/utils/games/registry";
import { motion } from "framer-motion";

export default function Home() {
  const { featured, all } = getGameCollection();
  const availableGames = getAvailableGames();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 greek-pattern opacity-10"></div>
        <div className="relative container mx-auto px-6 py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-6xl md:text-8xl font-bold text-primary mb-6"
          >
            Greek Games
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-muted mb-8 max-w-3xl mx-auto"
          >
            Immerse yourself in the legendary world of ancient Greece through
            epic interactive experiences
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.2 }}
            className="h-1 w-24 golden-gradient mx-auto mb-8"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-foreground/80 max-w-2xl mx-auto"
          >
            From the heights of Mount Olympus to the depths of the underworld,
            discover games that bring Greek mythology to life with modern
            technology
          </motion.p>
        </div>
      </header>

      {/* Featured Games Section */}
      <main className="container mx-auto px-6 py-16">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary mb-4">
              Epic Adventures Await
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Choose your path through these mythological realms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((game, index) => (
              <GameCard
                key={game.id}
                game={game}
                index={index}
                showFeatures={true}
              />
            ))}
          </div>
        </motion.section>

        {/* Game Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center bg-surface/50 rounded-[--border-radius-card] p-8 md:p-12 border border-border mb-20"
        >
          <h2 className="font-display text-3xl font-semibold text-primary mb-6">
            Growing Collection
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {all.length}
              </div>
              <p className="text-muted text-sm">Total Games</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {availableGames.length}
              </div>
              <p className="text-muted text-sm">Playable Now</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {Object.keys(getGameCollection().categories).length}
              </div>
              <p className="text-muted text-sm">Categories</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                ∞
              </div>
              <p className="text-muted text-sm">Fun Hours</p>
            </div>
          </div>

          {availableGames.length > 0 && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 inline-block">
              <p className="text-primary font-semibold">
                🚀 {availableGames.length} Games Ready to Play!
              </p>
              <p className="text-sm text-primary/80">
                Start your mythological journey today
              </p>
            </div>
          )}
        </motion.section>

        {/* Technology Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center bg-surface/50 rounded-[--border-radius-card] p-8 md:p-12 border border-border"
        >
          <h2 className="font-display text-3xl font-semibold text-primary mb-6">
            Built with Modern Technology
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {[
              { icon: "⚛️", name: "React" },
              { icon: "📘", name: "TypeScript" },
              { icon: "🎨", name: "Tailwind CSS" },
              { icon: "⚡", name: "Next.js" },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="text-center group cursor-default"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <p className="text-sm text-muted group-hover:text-primary transition-colors">
                  {tech.name}
                </p>
              </motion.div>
            ))}
          </div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Experience the power of ancient myths through cutting-edge web
            technologies. Our games combine the timeless appeal of Greek
            mythology with modern interactive design.
          </p>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-20">
        <div className="container mx-auto px-6 py-12 text-center">
          <div className="greek-pattern h-1 w-full mb-8 opacity-30"></div>
          <p className="text-muted mb-4">
            © 2024 Greek Games. Bringing mythology to life through interactive
            experiences.
          </p>
          <p className="text-sm text-muted/70">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
