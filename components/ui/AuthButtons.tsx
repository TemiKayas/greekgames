"use client";

import { AuthModals } from "@/components/auth/AuthModals";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, LogOut, User, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function AuthButtons() {
  const { user, profile, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState<"login" | "signup">(
    "login"
  );

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error signing out:", error);
    }
  };

  const openLoginModal = () => {
    setAuthModalType("login");
    setShowAuthModal(true);
  };

  const openSignUpModal = () => {
    setAuthModalType("signup");
    setShowAuthModal(true);
  };

  if (user && profile) {
    // User is authenticated
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-3 py-2 text-foreground/80 hover:text-primary transition-colors font-medium"
        >
          <User size={18} />
          <span className="hidden sm:block">
            {profile.full_name || "Dashboard"}
          </span>
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-3 py-2 text-foreground/80 hover:text-accent transition-colors font-medium"
        >
          <LogOut size={18} />
          <span className="hidden sm:block">Sign Out</span>
        </button>
      </div>
    );
  }

  // User is not authenticated
  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={openLoginModal}
          className="flex items-center gap-2 px-3 py-2 text-foreground/80 hover:text-primary transition-colors font-medium"
        >
          <LogIn size={18} />
          <span className="hidden sm:block">Sign In</span>
        </button>
        <button
          onClick={openSignUpModal}
          className="flex items-center gap-2 px-3 py-2 bg-primary text-background rounded-lg hover:bg-primary-dark transition-colors font-medium"
        >
          <UserPlus size={18} />
          <span className="hidden sm:block">Sign Up</span>
        </button>
      </div>

      <AuthModals
        isOpen={showAuthModal}
        initialModal={authModalType}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
