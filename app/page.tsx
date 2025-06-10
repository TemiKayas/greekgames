import Image from "next/image";

export default function Home() {
  // Placeholder games data - will be replaced with real data later
  const featuredGames = [
    {
      id: 1,
      title: "Odyssey Quest",
      description: "Embark on an epic journey through ancient Greece",
      status: "Coming Soon",
      image: "🏛️"
    },
    {
      id: 2,
      title: "Gods of Olympus",
      description: "Battle alongside the mighty Greek gods",
      status: "In Development",
      image: "⚡"
    },
    {
      id: 3,
      title: "Spartan Warriors",
      description: "Lead your army to victory in ancient battles",
      status: "Planning",
      image: "🛡️"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 greek-pattern opacity-10"></div>
        <div className="relative container mx-auto px-6 py-24 text-center">
          <h1 className="font-display text-6xl md:text-8xl font-bold text-primary mb-6">
            Greek Games
          </h1>
          <p className="text-xl md:text-2xl text-muted mb-8 max-w-3xl mx-auto">
            Immerse yourself in the legendary world of ancient Greece through epic interactive experiences
          </p>
          <div className="h-1 w-24 golden-gradient mx-auto mb-8"></div>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            From the heights of Mount Olympus to the depths of the underworld, 
            discover games that bring Greek mythology to life with modern technology
          </p>
        </div>
      </header>

      {/* Featured Games Section */}
      <main className="container mx-auto px-6 py-16">
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary mb-4">
              Epic Adventures Await
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Choose your path through these mythological realms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGames.map((game) => (
              <div 
                key={game.id} 
                className="bg-surface border border-border rounded-[--border-radius-card] p-8 hover:shadow-[--shadow-glow] transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{game.image}</div>
                  <h3 className="font-display text-2xl font-semibold text-primary mb-3">
                    {game.title}
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    {game.description}
                  </p>
                  <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-[--border-radius-button] text-sm font-medium">
                    {game.status}
                  </span>
                </div>
                <button 
                  className="w-full bg-primary hover:bg-primary-dark text-background font-semibold py-3 px-6 rounded-[--border-radius-button] transition-colors duration-200 opacity-50 cursor-not-allowed"
                  disabled
                >
                  Play Game
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="text-center bg-surface/50 rounded-[--border-radius-card] p-12 border border-border">
          <h2 className="font-display text-3xl font-semibold text-primary mb-6">
            Built with Modern Technology
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl mb-2">⚛️</div>
              <p className="text-sm text-muted">React</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📘</div>
              <p className="text-sm text-muted">TypeScript</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🎨</div>
              <p className="text-sm text-muted">Tailwind CSS</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">⚡</div>
              <p className="text-sm text-muted">Next.js</p>
            </div>
          </div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Experience the power of ancient myths through cutting-edge web technologies. 
            Our games combine the timeless appeal of Greek mythology with modern interactive design.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-20">
        <div className="container mx-auto px-6 py-12 text-center">
          <div className="greek-pattern h-1 w-full mb-8 opacity-30"></div>
          <p className="text-muted mb-4">
            © 2024 Greek Games. Bringing mythology to life through interactive experiences.
          </p>
          <p className="text-sm text-muted/70">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
