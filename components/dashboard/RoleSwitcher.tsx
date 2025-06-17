"use client";

import { useAuth } from "@/contexts/AuthContext";
import { GraduationCap, Loader2, User } from "lucide-react";
import { useState } from "react";

export function RoleSwitcher() {
  const { profile, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const toggleRole = async () => {
    if (!profile) return;

    setLoading(true);
    setError("");

    try {
      const newRole = profile.role === "teacher" ? "student" : "teacher";
      await updateProfile({ role: newRole });
    } catch (err) {
      setError("Failed to switch role. Please try again.");
      console.error("Error switching role:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleRole}
        disabled={loading}
        className="flex items-center gap-2 bg-surface border border-border px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Development Tool: Switch Role"
      >
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : profile?.role === "teacher" ? (
          <>
            <GraduationCap size={18} />
            <span>Switch to Student</span>
          </>
        ) : (
          <>
            <User size={18} />
            <span>Switch to Teacher</span>
          </>
        )}
      </button>
      {error && (
        <div className="absolute bottom-full right-0 mb-2 bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
