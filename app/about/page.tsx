"use client";

import { motion } from "framer-motion";
import { BookOpen, Home, Star } from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-primary hover:text-primary-dark mb-8 sm:mb-12 bg-primary/10 hover:bg-primary/20 px-6 py-3 rounded-lg transition-all duration-300 text-lg font-semibold"
          >
            <Home size={20} className="sm:w-6 sm:h-6" />
            Back to Home
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 sm:mb-6"
          >
            Learn Modern Greek Through Interactive Games
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.2 }}
            className="h-1 w-16 sm:w-24 golden-gradient mx-auto mb-6 sm:mb-8"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl text-muted max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed"
          >
            The ultimate destination for Greek language learning games, vocabulary exercises, and grammar practice. Master Modern Greek through engaging, interactive activities designed for all skill levels.
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
          {/* Main About Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-surface/50 border border-border rounded-lg p-6 sm:p-8 md:p-12"
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-primary mb-6 sm:mb-8 text-center">
              Why Choose Our Greek Learning Platform?
            </h2>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-12">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-primary mb-4">
                  🎮 Interactive Greek Learning Games
                </h3>
                <p className="text-foreground/80 text-base sm:text-lg leading-relaxed mb-6">
                  Our comprehensive collection of Greek learning games makes mastering the Modern Greek language fun and engaging. From alphabet matching games to advanced vocabulary challenges, we offer interactive experiences that accelerate your Greek language acquisition.
                </p>

                <h3 className="font-display text-xl sm:text-2xl font-semibold text-primary mb-4">
                  📚 Comprehensive Greek Vocabulary Exercises
                </h3>
                <p className="text-foreground/80 text-base sm:text-lg leading-relaxed">
                  Build your Greek vocabulary with our extensive library of vocabulary exercises. Practice everyday Greek words, learn pronunciation, and master Greek-to-English translations through drag-and-drop activities, matching games, and interactive quizzes.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-primary mb-4">
                  ✏️ Greek Grammar Exercises & Writing Practice
                </h3>
                <p className="text-foreground/80 text-base sm:text-lg leading-relaxed mb-6">
                  Master Modern Greek grammar through our structured writing exercises. Practice verb conjugations, sentence completion, and Greek grammar rules with instant feedback and detailed explanations for every exercise.
                </p>

                <h3 className="font-display text-xl sm:text-2xl font-semibold text-primary mb-4">
                  🔤 Greek Alphabet Mastery
                </h3>
                <p className="text-foreground/80 text-base sm:text-lg leading-relaxed">
                  Learn the Greek alphabet through our memory games and matching exercises. Practice uppercase and lowercase Greek letters, understand letter pronunciation, and build the foundation for reading and writing in Greek.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Features Grid */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-primary mb-8 sm:mb-12 text-center">
              Complete Greek Language Learning Solution
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  icon: <div className="text-4xl">🎮</div>,
                  title: "Interactive Games",
                  description: "Engaging Greek learning games that make language acquisition fun and memorable through gamification."
                },
                {
                  icon: <BookOpen size={32} className="text-primary" />,
                  title: "Vocabulary Building",
                  description: "Comprehensive Greek vocabulary exercises covering everyday words, phrases, and cultural expressions."
                },
                {
                  icon: <div className="text-4xl">🎓</div>,
                  title: "Grammar Practice",
                  description: "Structured Greek grammar exercises with verb conjugations, sentence structure, and writing practice."
                },
                {
                  icon: <Star size={32} className="text-primary" />,
                  title: "Skill Progression",
                  description: "Progressive difficulty levels from beginner Greek alphabet to advanced conversation skills."
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-surface border border-border rounded-lg p-6 text-center hover:shadow-[--shadow-glow] transition-all duration-300"
                >
                  <div className="mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/70 text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Learning Categories */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-surface/30 border border-border rounded-lg p-6 sm:p-8 md:p-12"
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-primary mb-6 sm:mb-8 text-center">
              Greek Learning Categories
            </h2>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🔤</div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-primary mb-3">
                  Greek Alphabet Games
                </h3>
                <p className="text-foreground/70 text-sm sm:text-base">
                  Master all 24 Greek letters through memory games, matching exercises, and pronunciation practice.
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">📖</div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-primary mb-3">
                  Vocabulary Exercises
                </h3>
                <p className="text-foreground/70 text-sm sm:text-base">
                  Build your Greek vocabulary with interactive word games, image matching, and translation exercises.
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">✍️</div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-primary mb-3">
                  Grammar & Writing
                </h3>
                <p className="text-foreground/70 text-sm sm:text-base">
                  Practice Greek grammar rules, verb conjugations, and sentence construction through guided exercises.
                </p>
              </div>
            </div>
          </motion.section>

          {/* SEO Content Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="prose prose-lg max-w-none"
          >
            <div className="bg-surface/50 border border-border rounded-lg p-6 sm:p-8 md:p-12">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-primary mb-6">
                Learn Modern Greek Online - Free Interactive Games & Exercises
              </h2>

              <div className="text-foreground/80 space-y-6 text-base sm:text-lg leading-relaxed">
                <p>
                  <strong>Greek Games</strong> is the premier online platform for learning Modern Greek through interactive games and exercises. Whether you're a complete beginner starting with the Greek alphabet or an intermediate learner looking to improve your Greek vocabulary and grammar skills, our comprehensive collection of Greek learning games provides an engaging path to fluency.
                </p>

                <p>
                  Our <strong>Greek vocabulary exercises</strong> cover essential everyday words, phrases, and expressions used in Modern Greek. Through drag-and-drop activities, image matching games, and interactive quizzes, you'll build a strong foundation in Greek vocabulary while having fun. Each vocabulary exercise includes pronunciation guides and cultural context to enhance your learning experience.
                </p>

                <p>
                  Master <strong>Greek grammar</strong> through our structured writing exercises and grammar games. Practice verb conjugations, learn proper sentence structure, and understand Greek grammar rules through interactive activities with instant feedback. Our Greek grammar exercises are designed to build confidence in both written and spoken Modern Greek.
                </p>

                <p>
                  Start your Greek learning journey with our <strong>Greek alphabet games</strong>. Learn all 24 letters of the Greek alphabet through memory matching games, pronunciation exercises, and letter recognition activities. Our alphabet games make learning Greek letters engaging and memorable for learners of all ages.
                </p>

                <p>
                  All our <strong>Greek learning games</strong> are completely free and designed to work on any device. Whether you prefer studying on your computer, tablet, or smartphone, you can access our full library of Greek exercises anytime, anywhere. Join thousands of learners who have chosen our platform to master the beautiful Greek language.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-center bg-primary/10 border border-primary/20 rounded-lg p-6 sm:p-8 md:p-12"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-primary mb-4 sm:mb-6">
              Start Learning Greek Today
            </h2>
            <p className="text-foreground/80 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join our community of Greek language learners and start your journey to fluency with our free interactive games and exercises.
            </p>
            <Link href="/">
              <button className="bg-primary hover:bg-primary-dark text-background font-semibold py-4 px-8 rounded-lg transition-colors text-lg">
                Explore Greek Learning Games
              </button>
            </Link>
          </motion.section>

          {/* Credit Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="text-center py-8 border-t border-border"
          >
            <p className="text-muted text-sm sm:text-base">
              Games and website developed by{" "}
              <span className="text-primary font-semibold">Blue Dev Digital</span>
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
