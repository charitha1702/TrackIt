import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface ScreenTimeLog {
  id: string;
  date: string;
  total_hours: number;
  social_media_hours: number;
  study_hours: number;
}

const todayStr = () => new Date().toISOString().split("T")[0];

export const useScreenTime = () => {
  const { user } = useAuth();
  const [log, setLog] = useState<ScreenTimeLog | null>(null);
  const [weekLogs, setWeekLogs] = useState<ScreenTimeLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("screen_time_logs" as any)
      .select("*")
      .eq("user_id", user.id)
      .eq("date", todayStr())
      .maybeSingle();
    if (data) setLog(data as any);
    else setLog(null);

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 6);
    const { data: week } = await supabase
      .from("screen_time_logs" as any)
      .select("*")
      .eq("user_id", user.id)
      .gte("date", weekAgo.toISOString().split("T")[0])
      .order("date");
    if (week) setWeekLogs(week as any);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const saveScreenTime = async (data: Partial<ScreenTimeLog>) => {
    if (!user) return;
    if (log) {
      await supabase.from("screen_time_logs" as any).update(data).eq("id", log.id);
      setLog({ ...log, ...data } as ScreenTimeLog);
    } else {
      const { data: row } = await supabase
        .from("screen_time_logs" as any)
        .insert({ user_id: user.id, date: todayStr(), ...data })
        .select()
        .single();
      if (row) setLog(row as any);
    }
    fetchData();
  };

  return { log, weekLogs, loading, saveScreenTime };
};
