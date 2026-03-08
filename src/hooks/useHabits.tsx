import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface HabitEntry {
  id: string;
  category: string;
  value: string;
  completed: boolean;
  date: string;
}

export const HABIT_CATEGORIES = [
  { key: "sleep", label: "Sleep", icon: "🛏️", unit: "hours", type: "number" as const, placeholder: "Hours slept" },
  { key: "water", label: "Water", icon: "💧", unit: "glasses", type: "number" as const, placeholder: "Glasses consumed" },
  { key: "mood", label: "Mood", icon: "😊", unit: "", type: "mood" as const, placeholder: "How do you feel?" },
  { key: "study", label: "Study", icon: "📚", unit: "hours", type: "number" as const, placeholder: "Study hours" },
  { key: "personal_care", label: "Personal Care", icon: "🧴", unit: "", type: "check" as const, placeholder: "" },
  { key: "meditation", label: "Meditation", icon: "🧘", unit: "minutes", type: "number" as const, placeholder: "Minutes meditated" },
  { key: "screen_time", label: "Screen Time", icon: "📱", unit: "hours", type: "number" as const, placeholder: "Screen hours" },
  { key: "menstrual_cycle", label: "Menstrual Cycle", icon: "🌸", unit: "", type: "text" as const, placeholder: "Cycle day or notes" },
  { key: "nutrition", label: "Nutrition", icon: "🥗", unit: "", type: "text" as const, placeholder: "Meals or calories" },
];

export const MOOD_OPTIONS = [
  { value: "happy", emoji: "😊", label: "Happy" },
  { value: "neutral", emoji: "😐", label: "Neutral" },
  { value: "tired", emoji: "😴", label: "Tired" },
  { value: "sad", emoji: "😢", label: "Sad" },
  { value: "stressed", emoji: "😰", label: "Stressed" },
  { value: "energetic", emoji: "⚡", label: "Energetic" },
];

const todayStr = () => new Date().toISOString().split("T")[0];

export const useHabits = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState<HabitEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(todayStr);

  const fetchHabits = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("daily_habits")
      .select("*")
      .eq("user_id", user.id)
      .eq("date", date);
    if (data) setHabits(data as HabitEntry[]);
    setLoading(false);
  }, [user, date]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const upsertHabit = async (category: string, value: string, completed: boolean) => {
    if (!user) return;
    const existing = habits.find((h) => h.category === category);
    if (existing) {
      await supabase
        .from("daily_habits")
        .update({ value, completed })
        .eq("id", existing.id);
      setHabits((prev) =>
        prev.map((h) => (h.id === existing.id ? { ...h, value, completed } : h))
      );
    } else {
      const { data } = await supabase
        .from("daily_habits")
        .insert({ user_id: user.id, date, category, value, completed })
        .select()
        .single();
      if (data) setHabits((prev) => [...prev, data as HabitEntry]);
    }
  };

  const getHabit = (category: string): HabitEntry | undefined =>
    habits.find((h) => h.category === category);

  const completedCount = habits.filter((h) => h.completed).length;
  const totalCategories = HABIT_CATEGORIES.length;
  const completionPercent =
    totalCategories === 0 ? 0 : Math.round((completedCount / totalCategories) * 100);

  return {
    habits,
    loading,
    date,
    setDate,
    upsertHabit,
    getHabit,
    completedCount,
    totalCategories,
    completionPercent,
  };
};
