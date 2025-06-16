export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: "student" | "teacher" | "admin";
          avatar_url: string | null;
          preferences: Json;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: "student" | "teacher" | "admin";
          avatar_url?: string | null;
          preferences?: Json;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: "student" | "teacher" | "admin";
          avatar_url?: string | null;
          preferences?: Json;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      games: {
        Row: {
          id: string;
          game_key: string;
          name: string;
          description: string | null;
          category: string;
          difficulty_level: number;
          max_score: number;
          version: string;
          is_active: boolean;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          game_key: string;
          name: string;
          description?: string | null;
          category: string;
          difficulty_level?: number;
          max_score?: number;
          version?: string;
          is_active?: boolean;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          game_key?: string;
          name?: string;
          description?: string | null;
          category?: string;
          difficulty_level?: number;
          max_score?: number;
          version?: string;
          is_active?: boolean;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      student_progress: {
        Row: {
          id: string;
          student_id: string;
          game_id: string;
          current_level: number;
          total_score: number;
          best_score: number;
          times_played: number;
          total_time_spent: number;
          last_played_at: string | null;
          progress_data: Json;
          completion_percentage: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          game_id: string;
          current_level?: number;
          total_score?: number;
          best_score?: number;
          times_played?: number;
          total_time_spent?: number;
          last_played_at?: string | null;
          progress_data?: Json;
          completion_percentage?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          game_id?: string;
          current_level?: number;
          total_score?: number;
          best_score?: number;
          times_played?: number;
          total_time_spent?: number;
          last_played_at?: string | null;
          progress_data?: Json;
          completion_percentage?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      game_sessions: {
        Row: {
          id: string;
          student_id: string;
          game_id: string;
          score: number;
          duration: number;
          completed: boolean;
          session_data: Json;
          started_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          student_id: string;
          game_id: string;
          score?: number;
          duration?: number;
          completed?: boolean;
          session_data?: Json;
          started_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          student_id?: string;
          game_id?: string;
          score?: number;
          duration?: number;
          completed?: boolean;
          session_data?: Json;
          started_at?: string;
          completed_at?: string | null;
        };
      };
    };
    Views: {
      games_with_stats: {
        Row: {
          id: string;
          game_key: string;
          name: string;
          description: string | null;
          category: string;
          difficulty_level: number;
          max_score: number;
          version: string;
          is_active: boolean;
          metadata: Json;
          created_at: string;
          updated_at: string;
          total_players: number;
          avg_completion: number | null;
          highest_score: number | null;
          total_sessions: number;
        };
      };
    };
    Functions: {
      sync_game_registry: {
        Args: {
          p_game_key: string;
          p_name: string;
          p_description?: string;
          p_category?: string;
          p_difficulty_level?: number;
          p_max_score?: number;
          p_version?: string;
          p_metadata?: Json;
        };
        Returns: string;
      };
      update_student_progress: {
        Args: {
          p_student_id: string;
          p_game_id: string;
          p_session_score: number;
          p_session_duration: number;
          p_session_completed: boolean;
          p_session_data?: Json;
        };
        Returns: string;
      };
      calculate_completion_percentage: {
        Args: {
          p_student_id: string;
          p_game_id: string;
        };
        Returns: number;
      };
    };
  };
}

// Convenience types for easier usage
export type User = Database["public"]["Tables"]["users"]["Row"];
export type Game = Database["public"]["Tables"]["games"]["Row"];
export type StudentProgress =
  Database["public"]["Tables"]["student_progress"]["Row"];
export type GameSession = Database["public"]["Tables"]["game_sessions"]["Row"];
export type GameWithStats =
  Database["public"]["Views"]["games_with_stats"]["Row"];

export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type GameInsert = Database["public"]["Tables"]["games"]["Insert"];
export type StudentProgressInsert =
  Database["public"]["Tables"]["student_progress"]["Insert"];
export type GameSessionInsert =
  Database["public"]["Tables"]["game_sessions"]["Insert"];

export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];
export type GameUpdate = Database["public"]["Tables"]["games"]["Update"];
export type StudentProgressUpdate =
  Database["public"]["Tables"]["student_progress"]["Update"];
export type GameSessionUpdate =
  Database["public"]["Tables"]["game_sessions"]["Update"];
