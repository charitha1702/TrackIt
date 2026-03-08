import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface WaterLog {
  id: string;
  date: string;
  glasses: number;
  bottle_size_ml: number;
  daily_goal: number;
}

const todayStr = () => new Date().toISOString().split("T")[0];

export const useWater = () => {
  const { user } = useAuth();
  const [log, setLog] = useState<WaterLog | null>(null);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);

  const fetchToday = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("water_logs" as any)
      .select("*")
      .eq("user_id", user.id)
      .eq("date", todayStr())
      .maybeSingle();
    if (data) setLog(data as any);
    else setLog(null);

    // Calculate streak
    const { data: recent } = await supabase
      .from("water_logs" as any)
      .select("date, glasses, daily_goal")
      .eq("user_id", user.id)
      .order("date", { ascending: false })
      .limit(30);
    if (recent) {
      let s = 0;
      const sorted = (recent as any[]).sort((a, b) => b.date.localeCompare(a.date));
      for (const r of sorted) {
        if (r.glasses >= r.daily_goal) s++;
        else break;
      }
      setStreak(s);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchToday(); }, [fetchToday]);

  const saveWater = async (data: Partial<WaterLog>) => {
    if (!user) return;
    if (log) {
      await supabase.from("water_logs" as any).update(data).eq("id", log.id);
      setLog({ ...log, ...data } as WaterLog);
    } else {
      const { data: row } = await supabase
        .from("water_logs" as any)
        .insert({ user_id: user.id, date: todayStr(), ...data })
        .select()
        .single();
      if (row) setLog(row as any);
    }
  };

  const percent = log ? Math.min(100, Math.round((log.glasses / log.daily_goal) * 100)) : 0;

  return { log, loading, saveWater, percent, streak };
};
