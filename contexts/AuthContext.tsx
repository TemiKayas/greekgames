"use client";

import { createSupabaseClient } from "@/lib/supabase-client";
import { User as DatabaseUser } from "@/types/database.types";
import { User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

// Security constants
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours

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
  isRateLimited: boolean;
  remainingLockoutTime: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<DatabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState<{ [key: string]: { count: number; timestamp: number } }>({});
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [remainingLockoutTime, setRemainingLockoutTime] = useState(0);
  const supabase = createSupabaseClient();

  // Check rate limiting status
  useEffect(() => {
    const checkRateLimit = () => {
      const now = Date.now();
      let isLimited = false;
      let minRemainingTime = 0;

      Object.entries(loginAttempts).forEach(([email, data]) => {
        if (data.count >= MAX_LOGIN_ATTEMPTS) {
          const timeSinceLastAttempt = now - data.timestamp;
          if (timeSinceLastAttempt < LOCKOUT_DURATION) {
            isLimited = true;
            const remaining = LOCKOUT_DURATION - timeSinceLastAttempt;
            minRemainingTime = Math.max(minRemainingTime, remaining);
          } else {
            // Reset attempts if lockout period has passed
            setLoginAttempts(prev => {
              const newAttempts = { ...prev };
              delete newAttempts[email];
              return newAttempts;
            });
          }
        }
      });

      setIsRateLimited(isLimited);
      setRemainingLockoutTime(minRemainingTime);
    };

    const interval = setInterval(checkRateLimit, 1000);
    return () => clearInterval(interval);
  }, [loginAttempts]);

  // Session timeout check
  useEffect(() => {
    if (!user) return;

    const checkSessionTimeout = () => {
      const lastActivity = localStorage.getItem('lastActivity');
      if (lastActivity) {
        const timeSinceLastActivity = Date.now() - parseInt(lastActivity);
        if (timeSinceLastActivity > SESSION_TIMEOUT) {
          signOut();
        }
      }
    };

    const updateLastActivity = () => {
      localStorage.setItem('lastActivity', Date.now().toString());
    };

    // Update last activity on user interaction
    window.addEventListener('mousemove', updateLastActivity);
    window.addEventListener('keydown', updateLastActivity);
    window.addEventListener('click', updateLastActivity);

    const interval = setInterval(checkSessionTimeout, 60000); // Check every minute

    return () => {
      window.removeEventListener('mousemove', updateLastActivity);
      window.removeEventListener('keydown', updateLastActivity);
      window.removeEventListener('click', updateLastActivity);
      clearInterval(interval);
    };
  }, [user]);

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
        // eslint-disable-next-line no-console
        console.error("Error fetching profile:", error);
        return;
      }

      setProfile(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching profile:", error);
    }
  };

  const createProfileForUser = async (userId: string) => {
    try {
      // Get current user data
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const user = userData.user;

      // Only create profile for confirmed users
      if (!user.email_confirmed_at) {
        // eslint-disable-next-line no-console
        console.log("User email not confirmed yet, skipping profile creation");
        return;
      }

      // Check if profile already exists to prevent duplicate creation
      const { data: existingProfile } = await supabase
        .from("users")
        .select("id")
        .eq("id", userId)
        .single();

      if (existingProfile) {
        // eslint-disable-next-line no-console
        console.log("Profile already exists for user:", userId);
        // Fetch the full profile data
        await fetchProfile(userId);
        return;
      }

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
        // Check if it's a duplicate key error
        if (error.code === "23505") {
          // eslint-disable-next-line no-console
          console.log("Profile already exists (duplicate key), fetching existing profile");
          await fetchProfile(userId);
          return;
        }
        // eslint-disable-next-line no-console
        console.error("Error creating profile:", error);
        return;
      }

      setProfile(data);
      // eslint-disable-next-line no-console
      console.log("Profile created successfully:", data);
    } catch (error) {
      // eslint-disable-next-line no-console
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
    // Check rate limiting
    const now = Date.now();
    const userAttempts = loginAttempts[email] || { count: 0, timestamp: now };

    if (userAttempts.count >= MAX_LOGIN_ATTEMPTS) {
      const timeSinceLastAttempt = now - userAttempts.timestamp;
      if (timeSinceLastAttempt < LOCKOUT_DURATION) {
        throw new Error(`Too many login attempts. Please try again in ${Math.ceil((LOCKOUT_DURATION - timeSinceLastAttempt) / 60000)} minutes.`);
      }
      // Reset attempts if lockout period has passed
      setLoginAttempts(prev => {
        const newAttempts = { ...prev };
        delete newAttempts[email];
        return newAttempts;
      });
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Increment failed attempts
        setLoginAttempts(prev => ({
          ...prev,
          [email]: {
            count: (prev[email]?.count || 0) + 1,
            timestamp: now,
          },
        }));
        throw error;
      }

      // Reset attempts on successful login
      setLoginAttempts(prev => {
        const newAttempts = { ...prev };
        delete newAttempts[email];
        return newAttempts;
      });

      // Update last activity timestamp
      localStorage.setItem('lastActivity', now.toString());
    } catch (error) {
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: "select_account",
          access_type: "offline",
          hd: "*", // Allow any Google domain
        },
        scopes: "email profile",
        skipBrowserRedirect: false,
      },
    });

    if (error) throw error;
  };

  const signOut = async () => {
    try {
      // Clear local state first
      setUser(null);
      setProfile(null);

      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error signing out:", error);
      throw error;
    }
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
    isRateLimited,
    remainingLockoutTime,
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
