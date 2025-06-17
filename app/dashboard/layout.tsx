"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { RoleSwitcher } from "@/components/dashboard/RoleSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/70">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardNav />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <RoleSwitcher />
      </div>
    </ProtectedRoute>
  );
}
