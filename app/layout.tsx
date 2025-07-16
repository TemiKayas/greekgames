import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Cinzel, Crimson_Text } from "next/font/google";
import ConsentBanner from "./components/ConsentBanner";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const crimsonText = Crimson_Text({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title:
    "Learn Greek Through Play - Interactive Modern Greek Language Learning",
  description:
    "Master Modern Greek with engaging games, vocabulary exercises, and cultural immersion. Learn the Greek alphabet, everyday words, and conversation skills through interactive activities.",
  keywords: [
    "learn Greek",
    "Modern Greek language",
    "Greek alphabet",
    "Greek vocabulary",
    "language learning games",
    "interactive Greek lessons",
    "Greek culture",
    "Greek conversation",
  ],
  authors: [{ name: "Learn Greek Through Play" }],
  openGraph: {
    title: "Learn Greek Through Play - Interactive Language Learning",
    description:
      "Master Modern Greek with engaging games and cultural immersion",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${crimsonText.variable} antialiased`}
      >
        {children}
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
