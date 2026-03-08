import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export const CARE_TASKS = [
  { key: "skincare", label: "Skincare", icon: "🧴" },
  { key: "haircare", label: "Haircare", icon: "💇" },
  { key: "exercise", label: "Exercise", icon: "🏃" },
  { key: "stretching", label: "Stretching", icon: "🧘" },
  { key: "bath", label: "Bath", icon: "🛁" },
  { key: "outdoor", label: "Outdoor Time", icon: "🌿" },
  { key: "reading", label: "Reading", icon: "📖" },
  { key: "journaling", label: "Journaling", icon: "📝" },
];

const todayStr = () => new Date().toISOString().split("T")[0];

export const usePersonalCare = () => {
  const { user } = useAuth();
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [logId, setLogId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("personal_care_logs" as any)
      .select("*")
      .eq("user_id", user.id)
      .eq("date", todayStr())
      .maybeSingle();
    if (data) {
      setCompletedTasks((data as any).completed_tasks || []);
      setLogId((data as any).id);
    } else {
      setCompletedTasks([]);
      setLogId(null);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const toggleTask = async (taskKey: string) => {
    if (!user) return;
    const updated = completedTasks.includes(taskKey)
      ? completedTasks.filter((t) => t !== taskKey)
      : [...completedTasks, taskKey];

    if (logId) {
      await supabase.from("personal_care_logs" as any)
        .update({ completed_tasks: updated })
        .eq("id", logId);
    } else {
      const { data } = await supabase.from("personal_care_logs" as any)
        .insert({ user_id: user.id, date: todayStr(), completed_tasks: updated })
        .select()
        .single();
      if (data) setLogId((data as any).id);
    }
    setCompletedTasks(updated);
  };

  const percent = Math.round((completedTasks.length / CARE_TASKS.length) * 100);

  return { completedTasks, loading, toggleTask, percent };
};
