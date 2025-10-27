import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Cinzel, Crimson_Text } from "next/font/google";
import ConsentBanner from "./components/ConsentBanner";
import Footer from "./components/Footer";
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
  metadataBase: new URL("https://greekgames.io"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon-32.png",
  },
  openGraph: {
    title: "Learn Greek Through Play - Interactive Language Learning",
    description:
      "Master Modern Greek with engaging games and cultural immersion",
    type: "website",
    locale: "en_US",
    url: "https://greekgames.io",
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
        className={`${cinzel.variable} ${crimsonText.variable} antialiased flex flex-col min-h-screen`}
      >
        <div className="flex-1">{children}</div>
        <Footer />
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
