"use client";

import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Home, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function DashboardNav() {
  const { profile, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const navItems = [
    {
      href: "/dashboard",
      label: "Home",
      icon: Home,
    },
    {
      href: "/dashboard/games",
      label: "Games",
      icon: BookOpen,
    },
    {
      href: "/dashboard/profile",
      label: "Profile",
      icon: User,
    },
  ];

  // Add teacher-specific navigation items
  if (profile?.role === "teacher") {
    navItems.splice(2, 0, {
      href: "/dashboard/classes",
      label: "Classes",
      icon: BookOpen,
    });
  }

  return (
    <nav className="bg-surface/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-display font-bold text-primary">
              🇬🇷 Greek Games
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "text-primary bg-primary/5"
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}

            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-3 py-2 text-foreground/80 hover:text-accent transition-colors"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
