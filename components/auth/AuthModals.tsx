"use client";

import { useEffect, useState } from "react";
import { LoginModal } from "./LoginModal";
import { SignUpModal } from "./SignUpModal";

type AuthModalType = "login" | "signup" | null;

interface AuthModalsProps {
  isOpen: boolean;
  initialModal?: AuthModalType;
  onClose: () => void;
}

export function AuthModals({
  isOpen,
  initialModal = "login",
  onClose,
}: AuthModalsProps) {
  const [currentModal, setCurrentModal] = useState<AuthModalType>(initialModal);

  // Sync currentModal with initialModal when it changes
  useEffect(() => {
    if (isOpen) {
      setCurrentModal(initialModal);
    }
  }, [isOpen, initialModal]);

  const handleClose = () => {
    setCurrentModal(null);
    onClose();
  };

  const handleSwitchToLogin = () => {
    setCurrentModal("login");
  };

  const handleSwitchToSignUp = () => {
    setCurrentModal("signup");
  };

  return (
    <>
      <LoginModal
        isOpen={isOpen && currentModal === "login"}
        onClose={handleClose}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
      <SignUpModal
        isOpen={isOpen && currentModal === "signup"}
        onClose={handleClose}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
}
