import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

const todayStr = () => new Date().toISOString().split("T")[0];

export const useWellnessProgress = () => {
  const { user } = useAuth();
  const [percent, setPercent] = useState(0);
  const [breakdown, setBreakdown] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const calculate = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    const today = todayStr();
    const uid = user.id;

    const [sleep, mood, meditation, water, personalCare, goalTasks] = await Promise.all([
      supabase.from("sleep_logs").select("id").eq("user_id", uid).eq("date", today).limit(1),
      supabase.from("mood_logs").select("id").eq("user_id", uid).eq("date", today).limit(1),
      supabase.from("meditation_sessions").select("id").eq("user_id", uid).eq("date", today).limit(1),
      supabase.from("water_logs").select("glasses, daily_goal").eq("user_id", uid).eq("date", today).limit(1),
      supabase.from("personal_care_logs").select("completed_tasks").eq("user_id", uid).eq("date", today).limit(1),
      supabase.from("goal_tasks").select("completed").eq("user_id", uid).eq("completed", true),
    ]);

    const hasSleep = (sleep.data?.length ?? 0) > 0;
    const hasMood = (mood.data?.length ?? 0) > 0;
    const hasMeditation = (meditation.data?.length ?? 0) > 0;

    const waterRow = water.data?.[0];
    const hasWater = waterRow ? (waterRow.glasses ?? 0) >= (waterRow.daily_goal ?? 8) : false;

    const pcRow = personalCare.data?.[0];
    const pcTasks = pcRow?.completed_tasks;
    const hasPersonalCare = Array.isArray(pcTasks) && pcTasks.length > 0;

    const hasGoalTasks = (goalTasks.data?.length ?? 0) > 0;

    const result: Record<string, boolean> = {
      sleep: hasSleep,
      mood: hasMood,
      meditation: hasMeditation,
      water: hasWater,
      personal_care: hasPersonalCare,
      goals: hasGoalTasks,
    };

    const score =
      (hasSleep ? 15 : 0) +
      (hasMood ? 10 : 0) +
      (hasMeditation ? 15 : 0) +
      (hasWater ? 15 : 0) +
      (hasPersonalCare ? 15 : 0) +
      (hasGoalTasks ? 30 : 0);

    setBreakdown(result);
    setPercent(Math.min(score, 100));
    setLoading(false);
  }, [user]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return { percent, breakdown, loading, refresh: calculate };
};
