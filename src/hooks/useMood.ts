import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface MoodLog {
  id: string;
  date: string;
  mood: string;
  stress_level: number;
  energy_level: number;
  notes: string;
}

export const MOODS = [
  { value: "happy", emoji: "😊", label: "Happy" },
  { value: "good", emoji: "🙂", label: "Good" },
  { value: "neutral", emoji: "😐", label: "Neutral" },
  { value: "low", emoji: "😔", label: "Low" },
  { value: "stressed", emoji: "😰", label: "Stressed" },
];

const todayStr = () => new Date().toISOString().split("T")[0];

export const useMood = () => {
  const { user } = useAuth();
  const [log, setLog] = useState<MoodLog | null>(null);
  const [weekLogs, setWeekLogs] = useState<MoodLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("mood_logs" as any)
      .select("*")
      .eq("user_id", user.id)
      .eq("date", todayStr())
      .maybeSingle();
    if (data) setLog(data as any);
    else setLog(null);

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 6);
    const { data: week } = await supabase
      .from("mood_logs" as any)
      .select("*")
      .eq("user_id", user.id)
      .gte("date", weekAgo.toISOString().split("T")[0])
      .order("date");
    if (week) setWeekLogs(week as any);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const saveMood = async (data: Partial<MoodLog>) => {
    if (!user) return;
    if (log) {
      await supabase.from("mood_logs" as any).update(data).eq("id", log.id);
      setLog({ ...log, ...data } as MoodLog);
    } else {
      const { data: row } = await supabase
        .from("mood_logs" as any)
        .insert({ user_id: user.id, date: todayStr(), ...data })
        .select()
        .single();
      if (row) setLog(row as any);
    }
    fetchData();
  };

  const mostFrequent = weekLogs.length > 0
    ? Object.entries(weekLogs.reduce((acc, l) => { acc[l.mood] = (acc[l.mood] || 0) + 1; return acc; }, {} as Record<string, number>))
        .sort((a, b) => b[1] - a[1])[0]?.[0] || "neutral"
    : "neutral";

  return { log, weekLogs, loading, saveMood, mostFrequent };
};
