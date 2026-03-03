import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Goal {
  id: string;
  title: string;
  description: string | null;
  deadline: string | null;
  completed: boolean;
  created_at: string;
}

export const useGoals = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGoals = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("goals")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (data) setGoals(data);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const addGoal = async (title: string, description: string, deadline: string | null) => {
    if (!user) return;
    const { error } = await supabase.from("goals").insert({
      user_id: user.id,
      title,
      description: description || "",
      deadline: deadline || null,
    });
    if (!error) fetchGoals();
    return error?.message ?? null;
  };

  const toggleGoal = async (id: string, completed: boolean) => {
    await supabase.from("goals").update({ completed }).eq("id", id);
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, completed } : g)));
  };

  const deleteGoal = async (id: string) => {
    await supabase.from("goals").delete().eq("id", id);
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.completed).length;
  const completionPercent = totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100);

  return { goals, loading, addGoal, toggleGoal, deleteGoal, totalGoals, completedGoals, completionPercent };
};
