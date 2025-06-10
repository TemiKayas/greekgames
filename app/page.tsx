"use client";

import { GameCard } from "@/app/components/ui/GameCard";
import {
  getAvailableGames,
  getGameCollection,
} from "@/app/utils/games/registry";
import { motion } from "framer-motion";
import { BookOpen, Target, Users, Zap } from "lucide-react";

export default function Home() {
  const { featured, all } = getGameCollection();
  const availableGames = getAvailableGames();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 greek-pattern opacity-10"></div>
        <div className="relative container mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              🇬🇷 Modern Greek Language Learning
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-primary mb-6"
          >
            Learn Greek
            <span className="block text-foreground">Through Play</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-muted mb-8 max-w-3xl mx-auto"
          >
            Master Modern Greek with interactive games, vocabulary exercises,
            and cultural immersion
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3 }}
            className="h-1 w-24 golden-gradient mx-auto mb-8"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-foreground/80 max-w-2xl mx-auto mb-12"
          >
            From the Greek alphabet to everyday conversations, build your
            language skills with engaging activities rooted in Greek culture and
            mythology
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-primary hover:bg-primary-dark text-background font-semibold py-4 px-8 rounded-lg transition-colors text-lg">
              Start Learning Free
            </button>
            <button className="border border-primary text-primary hover:bg-primary/10 font-semibold py-4 px-8 rounded-lg transition-colors text-lg">
              Browse Activities
            </button>
          </motion.div>
        </div>
      </header>

      {/* Learning Path Stats */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            {
              icon: <BookOpen size={24} />,
              number: "500+",
              label: "Greek Words",
            },
            {
              icon: <Target size={24} />,
              number: `${all.length}`,
              label: "Learning Activities",
            },
            {
              icon: <Zap size={24} />,
              number: "24",
              label: "Alphabet Letters",
            },
            {
              icon: <Users size={24} />,
              number: "∞",
              label: "Cultural Stories",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="text-center bg-surface/50 rounded-lg p-6 border border-border"
            >
              <div className="text-primary mb-3 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <p className="text-muted text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Learning Activities */}
      <main className="container mx-auto px-6">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary mb-4">
              Start Your Greek Journey
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Interactive activities designed to make learning Greek engaging
              and effective
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

        {/* Learning Progress Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="text-center bg-surface/50 rounded-[--border-radius-card] p-8 md:p-12 border border-border mb-20"
        >
          <h2 className="font-display text-3xl font-semibold text-primary mb-6">
            Your Learning Dashboard
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {all.length}
              </div>
              <p className="text-muted text-sm">Learning Activities</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {availableGames.length}
              </div>
              <p className="text-muted text-sm">Ready to Play</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {Object.keys(getGameCollection().categories).length}
              </div>
              <p className="text-muted text-sm">Skill Areas</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                100%
              </div>
              <p className="text-muted text-sm">Free Access</p>
            </div>
          </div>

          {availableGames.length > 0 && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 inline-block">
              <h3 className="text-primary font-semibold text-lg mb-2">
                🚀 Ready to Start Learning?
              </h3>
              <p className="text-sm text-primary/80 mb-4">
                {availableGames.length} activities are ready for you to explore
              </p>
              <button className="bg-primary hover:bg-primary-dark text-background font-semibold py-2 px-6 rounded-lg transition-colors">
                Begin Your Journey
              </button>
            </div>
          )}
        </motion.section>

        {/* Learning Method Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center bg-surface/50 rounded-[--border-radius-card] p-8 md:p-12 border border-border"
        >
          <h2 className="font-display text-3xl font-semibold text-primary mb-6">
            Learn Through Greek Culture
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {[
              { icon: "🏛️", title: "Mythology", desc: "Gods & Legends" },
              { icon: "🎭", title: "Culture", desc: "Traditions & Arts" },
              { icon: "🗣️", title: "Speaking", desc: "Real Conversations" },
              { icon: "📝", title: "Writing", desc: "Greek Script" },
            ].map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                className="text-center group cursor-default"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>
                <h3 className="font-semibold text-primary mb-1 group-hover:text-primary-dark transition-colors">
                  {method.title}
                </h3>
                <p className="text-sm text-muted">{method.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Immerse yourself in authentic Greek culture while building language
            skills. Our activities combine traditional learning methods with
            modern technology for an engaging educational experience.
          </p>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-20">
        <div className="container mx-auto px-6 py-12 text-center">
          <div className="greek-pattern h-1 w-full mb-8 opacity-30"></div>
          <p className="text-muted mb-4">
            © 2024 Learn Greek Through Play. Making Modern Greek accessible
            through interactive learning.
          </p>
          <p className="text-sm text-muted/70">
            Built with Next.js, TypeScript, and love for the Greek language 🇬🇷
          </p>
        </div>
      </footer>
    </div>
  );
}
