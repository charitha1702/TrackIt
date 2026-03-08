import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface MenstrualLog {
  id: string;
  date: string;
  period_start: string | null;
  period_end: string | null;
  flow_intensity: string;
  mood: string;
  symptoms: string[];
  notes: string;
}

export const SYMPTOMS = [
  "Cramps", "Headache", "Fatigue", "Mood swings", "Bloating",
  "Back pain", "Nausea", "Acne", "Insomnia",
];

const todayStr = () => new Date().toISOString().split("T")[0];

export const useMenstrual = () => {
  const { user } = useAuth();
  const [log, setLog] = useState<MenstrualLog | null>(null);
  const [allLogs, setAllLogs] = useState<MenstrualLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("menstrual_logs" as any)
      .select("*")
      .eq("user_id", user.id)
      .eq("date", todayStr())
      .maybeSingle();
    if (data) setLog(data as any);
    else setLog(null);

    const { data: all } = await supabase
      .from("menstrual_logs" as any)
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false })
      .limit(90);
    if (all) setAllLogs(all as any);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const saveLog = async (data: Partial<MenstrualLog>) => {
    if (!user) return;
    if (log) {
      await supabase.from("menstrual_logs" as any).update(data).eq("id", log.id);
      setLog({ ...log, ...data } as MenstrualLog);
    } else {
      const { data: row } = await supabase
        .from("menstrual_logs" as any)
        .insert({ user_id: user.id, date: todayStr(), ...data })
        .select()
        .single();
      if (row) setLog(row as any);
    }
    fetchData();
  };

  // Cycle insights
  const periodStarts = allLogs.filter((l) => l.period_start).map((l) => l.period_start!).sort();
  let avgCycleLength = 28;
  if (periodStarts.length >= 2) {
    const diffs: number[] = [];
    for (let i = 1; i < periodStarts.length; i++) {
      const diff = Math.abs(new Date(periodStarts[i]).getTime() - new Date(periodStarts[i - 1]).getTime());
      diffs.push(Math.round(diff / (1000 * 60 * 60 * 24)));
    }
    avgCycleLength = Math.round(diffs.reduce((a, b) => a + b, 0) / diffs.length);
  }

  const mostCommonSymptom = allLogs.length > 0
    ? Object.entries(
        allLogs.flatMap((l) => l.symptoms || []).reduce((acc, s) => {
          acc[s] = (acc[s] || 0) + 1; return acc;
        }, {} as Record<string, number>)
      ).sort((a, b) => b[1] - a[1])[0]?.[0] || "None"
    : "None";

  return { log, allLogs, loading, saveLog, avgCycleLength, mostCommonSymptom };
};
