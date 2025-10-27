import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Greek Learning Games - Interactive Language Learning Activities | Greek Games",
  description:
    "Explore our complete collection of free Greek learning games. Master vocabulary, grammar, the Greek alphabet, and conversation skills through interactive activities.",
  keywords: [
    "Greek learning games",
    "Greek language games",
    "learn Greek",
    "Greek games collection",
    "interactive Greek activities",
  ],
  openGraph: {
    title: "Greek Learning Games Collection",
    description:
      "Explore our complete collection of interactive Greek language learning games",
    url: "https://greekgames.io/games",
    siteName: "Greek Games",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://greekgames.io/games",
  },
};

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
