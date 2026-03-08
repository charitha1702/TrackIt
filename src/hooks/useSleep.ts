import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface SleepLog {
  id: string;
  date: string;
  bedtime: string;
  wake_time: string;
  hours_slept: number;
  sleep_quality: number;
  bad_dreams: boolean;
  dream_notes: string;
  morning_energy: number;
}

const todayStr = () => new Date().toISOString().split("T")[0];

export const useSleep = () => {
  const { user } = useAuth();
  const [log, setLog] = useState<SleepLog | null>(null);
  const [weekLogs, setWeekLogs] = useState<SleepLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchToday = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("sleep_logs" as any)
      .select("*")
      .eq("user_id", user.id)
      .eq("date", todayStr())
      .maybeSingle();
    if (data) setLog(data as any);
    else setLog(null);

    // Fetch last 7 days
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 6);
    const { data: week } = await supabase
      .from("sleep_logs" as any)
      .select("*")
      .eq("user_id", user.id)
      .gte("date", weekAgo.toISOString().split("T")[0])
      .order("date");
    if (week) setWeekLogs(week as any);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchToday(); }, [fetchToday]);

  const saveSleep = async (data: Partial<SleepLog>) => {
    if (!user) return;
    if (log) {
      await supabase.from("sleep_logs" as any).update(data).eq("id", log.id);
      setLog({ ...log, ...data } as SleepLog);
    } else {
      const { data: row } = await supabase
        .from("sleep_logs" as any)
        .insert({ user_id: user.id, date: todayStr(), ...data })
        .select()
        .single();
      if (row) setLog(row as any);
    }
    fetchToday();
  };

  const avgSleep = weekLogs.length > 0
    ? (weekLogs.reduce((s, l) => s + Number(l.hours_slept), 0) / weekLogs.length).toFixed(1)
    : "0";

  return { log, weekLogs, loading, saveSleep, avgSleep };
};
