"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import React from "react";
import { AuthModals } from "./AuthModals";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: "student" | "teacher";
  fallback?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  requireRole,
  fallback,
}: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  // Show loading state while checking authentication
  if (loading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2
              size={48}
              className="animate-spin text-blue-600 mx-auto mb-4"
            />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      )
    );
  }

  // If not authenticated, show auth modal
  if (!user) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please sign in to access this page and continue your Greek
              learning journey.
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>

        <AuthModals
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialModal="login"
        />
      </>
    );
  }

  // If role is required but user doesn't have the right role
  if (requireRole && profile?.role !== requireRole) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Access Restricted
            </h2>
            <p className="text-gray-600 mb-4">
              This page is only available to {requireRole}s.
            </p>
            <p className="text-sm text-gray-500">
              Your account type: {profile?.role || "Unknown"}
            </p>
            <button
              onClick={() => window.history.back()}
              className="mt-4 bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      )
    );
  }

  // User is authenticated and has the right role, render children
  return <>{children}</>;
}
