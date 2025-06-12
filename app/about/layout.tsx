import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn Modern Greek Online - Free Interactive Games & Vocabulary Exercises | Greek Games",
  description: "Master Modern Greek with our free interactive learning games, vocabulary exercises, and grammar practice. Learn Greek alphabet, vocabulary, and grammar through engaging activities designed for all skill levels.",
  keywords: [
    "Greek learning games",
    "Greek vocabulary exercises",
    "Greek grammar exercises",
    "Modern Greek learning",
    "Greek alphabet games",
    "learn Greek online",
    "free Greek lessons",
    "Greek language learning",
    "interactive Greek games",
    "Greek writing practice",
    "Greek pronunciation",
    "Greek language exercises",
    "Greek vocabulary building",
    "Greek grammar practice",
    "Greek language games",
    "learn Greek alphabet",
    "Greek language course",
    "Greek language app",
    "Greek language learning platform",
    "Modern Greek vocabulary"
  ],
  authors: [{ name: "Blue Dev Digital" }],
  creator: "Blue Dev Digital",
  publisher: "Blue Dev Digital",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Learn Modern Greek Online - Free Interactive Games & Vocabulary Exercises",
    description: "Master Modern Greek with our free interactive learning games, vocabulary exercises, and grammar practice. Perfect for beginners and intermediate learners.",
    url: "https://greekgames.com/about",
    siteName: "Greek Games",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Modern Greek Online - Free Interactive Games & Vocabulary Exercises",
    description: "Master Modern Greek with our free interactive learning games, vocabulary exercises, and grammar practice.",
    creator: "@BlueDevDigital",
  },
  alternates: {
    canonical: "https://greekgames.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
