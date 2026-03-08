import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface NutritionLog {
  id: string;
  date: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  fruit_intake: boolean;
  vegetable_intake: boolean;
  healthy_meal: boolean;
  calories: number;
}

const todayStr = () => new Date().toISOString().split("T")[0];

export const useNutrition = () => {
  const { user } = useAuth();
  const [log, setLog] = useState<NutritionLog | null>(null);
  const [weekLogs, setWeekLogs] = useState<NutritionLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("nutrition_logs" as any)
      .select("*")
      .eq("user_id", user.id)
      .eq("date", todayStr())
      .maybeSingle();
    if (data) setLog(data as any);
    else setLog(null);

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 6);
    const { data: week } = await supabase
      .from("nutrition_logs" as any)
      .select("*")
      .eq("user_id", user.id)
      .gte("date", weekAgo.toISOString().split("T")[0])
      .order("date");
    if (week) setWeekLogs(week as any);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const saveNutrition = async (data: Partial<NutritionLog>) => {
    if (!user) return;
    if (log) {
      await supabase.from("nutrition_logs" as any).update(data).eq("id", log.id);
      setLog({ ...log, ...data } as NutritionLog);
    } else {
      const { data: row } = await supabase
        .from("nutrition_logs" as any)
        .insert({ user_id: user.id, date: todayStr(), ...data })
        .select()
        .single();
      if (row) setLog(row as any);
    }
    fetchData();
  };

  const score = log
    ? Math.round(
        ([log.breakfast, log.lunch, log.dinner, log.fruit_intake, log.vegetable_intake, log.healthy_meal]
          .filter(Boolean).length / 6) * 100
      )
    : 0;

  return { log, weekLogs, loading, saveNutrition, score };
};
