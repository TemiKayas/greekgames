"use client";

import { BarChart2, BookOpen, Settings, Users } from "lucide-react";

export function TeacherDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Class Overview Card */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Users className="text-primary" size={24} />
          <h2 className="text-xl font-semibold">Class Overview</h2>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-foreground/70">Total Students</span>
            <span className="font-medium">0</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-foreground/70">Active Classes</span>
            <span className="font-medium">0</span>
          </div>
        </div>
      </div>

      {/* Game Statistics Card */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="text-primary" size={24} />
          <h2 className="text-xl font-semibold">Game Statistics</h2>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-foreground/70">Total Games</span>
            <span className="font-medium">0</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-foreground/70">Active Sessions</span>
            <span className="font-medium">0</span>
          </div>
        </div>
      </div>

      {/* Performance Metrics Card */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <BarChart2 className="text-primary" size={24} />
          <h2 className="text-xl font-semibold">Performance Metrics</h2>
        </div>
        <div className="space-y-4">
          <p className="text-foreground/70">No data available yet</p>
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="bg-surface border border-border rounded-xl p-6 md:col-span-2 lg:col-span-3">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="text-primary" size={24} />
          <h2 className="text-xl font-semibold">Quick Actions</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <p className="text-foreground/70">No actions available yet</p>
        </div>
      </div>
    </div>
  );
}
