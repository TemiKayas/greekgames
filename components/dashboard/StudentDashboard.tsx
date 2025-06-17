"use client";

import { BookOpen, Clock, Target, Trophy } from "lucide-react";

export function StudentDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Progress Overview Card */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="text-primary" size={24} />
          <h2 className="text-xl font-semibold">Progress Overview</h2>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-foreground/70">Overall Progress</span>
            <span className="font-medium">0%</span>
          </div>
          <div className="h-2 bg-border rounded-full">
            <div className="h-full bg-primary rounded-full" style={{ width: "0%" }} />
          </div>
        </div>
      </div>

      {/* Recent Activity Card */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="text-primary" size={24} />
          <h2 className="text-xl font-semibold">Recent Activity</h2>
        </div>
        <div className="space-y-4">
          <p className="text-foreground/70">No recent activity</p>
        </div>
      </div>

      {/* Learning Goals Card */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Target className="text-primary" size={24} />
          <h2 className="text-xl font-semibold">Learning Goals</h2>
        </div>
        <div className="space-y-4">
          <p className="text-foreground/70">No goals set yet</p>
        </div>
      </div>

      {/* Recommended Games Card */}
      <div className="bg-surface border border-border rounded-xl p-6 md:col-span-2 lg:col-span-3">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="text-primary" size={24} />
          <h2 className="text-xl font-semibold">Recommended Games</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <p className="text-foreground/70">No recommendations yet</p>
        </div>
      </div>
    </div>
  );
}
