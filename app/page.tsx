"use client";

import { GameCard } from "@/app/components/ui/GameCard";
import {
  getAvailableGames,
  getGameCollection,
} from "@/app/utils/games/registry";
import { AuthButtons } from "@/components/ui/AuthButtons";
import { motion } from "framer-motion";
import { BookOpen, Target, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { featured, all } = getGameCollection();
  const availableGames = getAvailableGames();

  const scrollToGames = () => {
    const gamesSection = document.getElementById("games-section");
    if (gamesSection) {
      gamesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-display font-bold text-primary">
                🇬🇷 Greek Games
              </span>
            </Link>

            <div className="flex items-center gap-6">
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                About
              </Link>
              <AuthButtons />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 greek-pattern opacity-10"></div>
        <div className="relative container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 sm:mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              🇬🇷 Modern Greek Language Learning
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary mb-4 sm:mb-6"
          >
            Learn Greek
            <span className="block text-foreground">Through Play</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
          >
            Master Modern Greek with interactive games, vocabulary exercises,
            and cultural immersion
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3 }}
            className="h-1 w-16 sm:w-24 golden-gradient mx-auto mb-6 sm:mb-8"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm sm:text-base lg:text-lg text-foreground/80 max-w-2xl mx-auto mb-8 sm:mb-12 px-4"
          >
            From the Greek alphabet to everyday conversations, build your
            language skills with engaging activities rooted in Greek culture and
            mythology
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
          >
            <button
              onClick={scrollToGames}
              className="bg-primary hover:bg-primary-dark text-background font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-colors text-base sm:text-lg"
            >
              Start Learning Free
            </button>
            <Link href="/about">
              <button className="border border-primary text-primary hover:bg-primary/10 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-colors text-base sm:text-lg">
                About Us
              </button>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Learning Path Stats */}
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-16"
        >
          {[
            {
              icon: <BookOpen size={20} className="sm:w-6 sm:h-6" />,
              number: "500+",
              label: "Greek Words",
            },
            {
              icon: <Target size={20} className="sm:w-6 sm:h-6" />,
              number: `${all.length}`,
              label: "Learning Activities",
            },
            {
              icon: <Zap size={20} className="sm:w-6 sm:h-6" />,
              number: "24",
              label: "Alphabet Letters",
            },
            {
              icon: <Users size={20} className="sm:w-6 sm:h-6" />,
              number: "∞",
              label: "Cultural Stories",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="text-center bg-surface/50 rounded-lg p-3 sm:p-4 md:p-6 border border-border"
            >
              <div className="text-primary mb-2 sm:mb-3 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1 sm:mb-2">
                {stat.number}
              </div>
              <p className="text-muted text-xs sm:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Learning Activities */}
      <main className="container mx-auto px-4 sm:px-6">
        <motion.section
          id="games-section"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-3 sm:mb-4">
              Start Your Greek Journey
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted max-w-2xl mx-auto px-4">
              Interactive activities designed to make learning Greek engaging
              and effective
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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

        {/* Learning Progress Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="text-center bg-surface/50 rounded-[--border-radius-card] p-6 sm:p-8 md:p-12 border border-border mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-primary mb-4 sm:mb-6">
            Your Learning Dashboard
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 sm:mb-2">
                {all.length}
              </div>
              <p className="text-muted text-xs sm:text-sm">
                Learning Activities
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 sm:mb-2">
                {availableGames.length}
              </div>
              <p className="text-muted text-xs sm:text-sm">Ready to Play</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 sm:mb-2">
                {Object.keys(getGameCollection().categories).length}
              </div>
              <p className="text-muted text-xs sm:text-sm">Skill Areas</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 sm:mb-2">
                100%
              </div>
              <p className="text-muted text-xs sm:text-sm">Free Access</p>
            </div>
          </div>

          <p className="text-foreground/70 text-sm sm:text-base max-w-lg mx-auto mb-6 sm:mb-8">
            Track your progress across different learning categories and unlock
            new challenges as you advance
          </p>

          <button className="bg-primary hover:bg-primary-dark text-background font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base">
            View Progress Details
          </button>
        </motion.section>
      </main>

      {/* Footer CTA */}
      <footer className="bg-surface/30 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center">
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-primary mb-3 sm:mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-foreground/70 text-sm sm:text-base max-w-lg mx-auto mb-6 sm:mb-8 px-4">
            Join thousands of learners discovering the beauty of the Greek
            language through interactive games and cultural exploration
          </p>
          <button
            onClick={scrollToGames}
            className="bg-primary hover:bg-primary-dark text-background font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-colors text-base sm:text-lg"
          >
            Begin Your Journey
          </button>
        </div>
      </footer>
    </div>
  );
}
