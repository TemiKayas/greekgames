"use client";

import { createSupabaseClient } from "@/lib/supabase-client";
import { User as DatabaseUser } from "@/types/database.types";
import { User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  profile: DatabaseUser | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    role: "student" | "teacher"
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<DatabaseUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<DatabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createSupabaseClient();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user) {
        await fetchProfile(session.user.id);
      }

      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        // If profile doesn't exist, create one
        if (error.code === "PGRST116") {
          await createProfileForUser(userId);
          return;
        }
        console.error("Error fetching profile:", error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const createProfileForUser = async (userId: string) => {
    try {
      // Get current user data
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const user = userData.user;
      const fullName =
        user.user_metadata.full_name ||
        user.user_metadata.name ||
        user.email?.split("@")[0] ||
        "User";

      const role = user.user_metadata.role || "student";

      const { data, error } = await supabase
        .from("users")
        .insert({
          id: userId,
          email: user.email!,
          full_name: fullName,
          role: role,
          avatar_url: user.user_metadata.avatar_url,
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating profile:", error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error("Error creating profile for user:", error);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    role: "student" | "teacher"
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    if (error) throw error;

    // For email/password signup, the user needs to verify their email first
    // The profile will be created when they confirm their email and sign in
    // This prevents the error you were seeing

    // Note: We don't create the profile here because the user isn't confirmed yet
    // The profile creation will happen in the auth callback or when they sign in
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const updateProfile = async (updates: Partial<DatabaseUser>) => {
    if (!user) throw new Error("No user logged in");

    const { error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", user.id);

    if (error) throw error;

    // Update local state
    setProfile((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
