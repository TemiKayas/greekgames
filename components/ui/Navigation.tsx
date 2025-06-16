"use client";

import Link from "next/link";
import { AuthButtons } from "./AuthButtons";

interface NavigationProps {
  className?: string;
}

export function Navigation({ className = "" }: NavigationProps) {
  return (
    <nav
      className={`bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 ${className}`}
    >
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
  );
}
