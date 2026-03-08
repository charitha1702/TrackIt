export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      daily_habits: {
        Row: {
          category: string
          completed: boolean
          created_at: string
          date: string
          id: string
          updated_at: string
          user_id: string
          value: string
        }
        Insert: {
          category: string
          completed?: boolean
          created_at?: string
          date?: string
          id?: string
          updated_at?: string
          user_id: string
          value?: string
        }
        Update: {
          category?: string
          completed?: boolean
          created_at?: string
          date?: string
          id?: string
          updated_at?: string
          user_id?: string
          value?: string
        }
        Relationships: []
      }
      goals: {
        Row: {
          completed: boolean
          created_at: string
          deadline: string | null
          description: string | null
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          deadline?: string | null
          description?: string | null
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          deadline?: string | null
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      meditation_sessions: {
        Row: {
          calmness_level: number | null
          created_at: string
          date: string
          duration_minutes: number | null
          id: string
          reflection: string | null
          stress_before: number | null
          user_id: string
        }
        Insert: {
          calmness_level?: number | null
          created_at?: string
          date?: string
          duration_minutes?: number | null
          id?: string
          reflection?: string | null
          stress_before?: number | null
          user_id: string
        }
        Update: {
          calmness_level?: number | null
          created_at?: string
          date?: string
          duration_minutes?: number | null
          id?: string
          reflection?: string | null
          stress_before?: number | null
          user_id?: string
        }
        Relationships: []
      }
      menstrual_logs: {
        Row: {
          created_at: string
          date: string
          flow_intensity: string | null
          id: string
          mood: string | null
          notes: string | null
          period_end: string | null
          period_start: string | null
          symptoms: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          flow_intensity?: string | null
          id?: string
          mood?: string | null
          notes?: string | null
          period_end?: string | null
          period_start?: string | null
          symptoms?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          flow_intensity?: string | null
          id?: string
          mood?: string | null
          notes?: string | null
          period_end?: string | null
          period_start?: string | null
          symptoms?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      mood_logs: {
        Row: {
          created_at: string
          date: string
          energy_level: number | null
          id: string
          mood: string | null
          notes: string | null
          stress_level: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          energy_level?: number | null
          id?: string
          mood?: string | null
          notes?: string | null
          stress_level?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          energy_level?: number | null
          id?: string
          mood?: string | null
          notes?: string | null
          stress_level?: number | null
          user_id?: string
        }
        Relationships: []
      }
      nutrition_logs: {
        Row: {
          breakfast: boolean | null
          calories: number | null
          created_at: string
          date: string
          dinner: boolean | null
          fruit_intake: boolean | null
          healthy_meal: boolean | null
          id: string
          lunch: boolean | null
          user_id: string
          vegetable_intake: boolean | null
        }
        Insert: {
          breakfast?: boolean | null
          calories?: number | null
          created_at?: string
          date?: string
          dinner?: boolean | null
          fruit_intake?: boolean | null
          healthy_meal?: boolean | null
          id?: string
          lunch?: boolean | null
          user_id: string
          vegetable_intake?: boolean | null
        }
        Update: {
          breakfast?: boolean | null
          calories?: number | null
          created_at?: string
          date?: string
          dinner?: boolean | null
          fruit_intake?: boolean | null
          healthy_meal?: boolean | null
          id?: string
          lunch?: boolean | null
          user_id?: string
          vegetable_intake?: boolean | null
        }
        Relationships: []
      }
      personal_care_logs: {
        Row: {
          completed_tasks: Json | null
          created_at: string
          date: string
          id: string
          user_id: string
        }
        Insert: {
          completed_tasks?: Json | null
          created_at?: string
          date?: string
          id?: string
          user_id: string
        }
        Update: {
          completed_tasks?: Json | null
          created_at?: string
          date?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      screen_time_logs: {
        Row: {
          created_at: string
          date: string
          id: string
          social_media_hours: number | null
          study_hours: number | null
          total_hours: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          id?: string
          social_media_hours?: number | null
          study_hours?: number | null
          total_hours?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          social_media_hours?: number | null
          study_hours?: number | null
          total_hours?: number | null
          user_id?: string
        }
        Relationships: []
      }
      sleep_logs: {
        Row: {
          bad_dreams: boolean | null
          bedtime: string | null
          created_at: string
          date: string
          dream_notes: string | null
          hours_slept: number | null
          id: string
          morning_energy: number | null
          sleep_quality: number | null
          user_id: string
          wake_time: string | null
        }
        Insert: {
          bad_dreams?: boolean | null
          bedtime?: string | null
          created_at?: string
          date?: string
          dream_notes?: string | null
          hours_slept?: number | null
          id?: string
          morning_energy?: number | null
          sleep_quality?: number | null
          user_id: string
          wake_time?: string | null
        }
        Update: {
          bad_dreams?: boolean | null
          bedtime?: string | null
          created_at?: string
          date?: string
          dream_notes?: string | null
          hours_slept?: number | null
          id?: string
          morning_energy?: number | null
          sleep_quality?: number | null
          user_id?: string
          wake_time?: string | null
        }
        Relationships: []
      }
      study_sessions: {
        Row: {
          created_at: string
          date: string
          duration_minutes: number | null
          id: string
          notes: string | null
          subject_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          subject_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          subject_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_sessions_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "study_subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      study_subjects: {
        Row: {
          created_at: string
          exam_name: string
          id: string
          subject_name: string
          target_score: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          exam_name?: string
          id?: string
          subject_name?: string
          target_score?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          exam_name?: string
          id?: string
          subject_name?: string
          target_score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      study_topics: {
        Row: {
          completed: boolean | null
          created_at: string
          id: string
          name: string
          subject_id: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          id?: string
          name?: string
          subject_id: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          id?: string
          name?: string
          subject_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_topics_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "study_subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      water_logs: {
        Row: {
          bottle_size_ml: number | null
          created_at: string
          daily_goal: number | null
          date: string
          glasses: number | null
          id: string
          user_id: string
        }
        Insert: {
          bottle_size_ml?: number | null
          created_at?: string
          daily_goal?: number | null
          date?: string
          glasses?: number | null
          id?: string
          user_id: string
        }
        Update: {
          bottle_size_ml?: number | null
          created_at?: string
          daily_goal?: number | null
          date?: string
          glasses?: number | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
