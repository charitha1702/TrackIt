import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface MeditationSession {
  id: string;
  date: string;
  duration_minutes: number;
  calmness_level: number;
  stress_before: number;
  reflection: string;
}

const todayStr = () => new Date().toISOString().split("T")[0];

export const useMeditation = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<MeditationSession[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("meditation_sessions" as any)
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(30);
    if (data) setSessions(data as any);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const logSession = async (durationMinutes: number, calmnessLevel: number, stressBefore: number, reflection: string) => {
    if (!user) return;
    await supabase.from("meditation_sessions" as any).insert({
      user_id: user.id, date: todayStr(), duration_minutes: durationMinutes,
      calmness_level: calmnessLevel, stress_before: stressBefore, reflection,
    });
    fetchData();
  };

  const totalMinutes = sessions.reduce((s, ss) => s + ss.duration_minutes, 0);
  const totalSessions = sessions.length;

  return { sessions, loading, logSession, totalMinutes, totalSessions };
};
