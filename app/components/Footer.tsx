"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface/30 border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-muted">
          <p className="text-foreground/60">
            © {new Date().getFullYear()} Greek Games. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors underline"
            >
              Terms of Service
            </Link>
            <Link
              href="/about"
              className="hover:text-primary transition-colors underline"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
