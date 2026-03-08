import { motion } from "framer-motion";
import { Check } from "lucide-react";
import TrackerLayout from "@/components/TrackerLayout";
import { useNutrition } from "@/hooks/useNutrition";
import { useState } from "react";

const MEAL_ITEMS = [
  { key: "breakfast", label: "Breakfast", icon: "🍳" },
  { key: "lunch", label: "Lunch", icon: "🥪" },
  { key: "dinner", label: "Dinner", icon: "🍽️" },
  { key: "fruit_intake", label: "Fruit Intake", icon: "🍎" },
  { key: "vegetable_intake", label: "Vegetables", icon: "🥦" },
  { key: "healthy_meal", label: "Healthy Meal", icon: "🥗" },
];

const NutritionPage = () => {
  const { log, saveNutrition, score, weekLogs } = useNutrition();
  const [calories, setCalories] = useState(log?.calories || 0);

  const toggleMeal = (key: string) => {
    const current = (log as any)?.[key] || false;
    saveNutrition({ [key]: !current });
  };

  const weeklyHealthy = weekLogs.filter((l) => {
    const items = [l.breakfast, l.lunch, l.dinner, l.fruit_intake, l.vegetable_intake, l.healthy_meal];
    return items.filter(Boolean).length >= 4;
  }).length;

  return (
    <TrackerLayout title="Nutrition" icon="🥗">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        {/* Score */}
        <div className="glass-card p-5 text-center">
          <p className="text-4xl font-display font-bold text-foreground">{score}%</p>
          <p className="text-sm text-muted-foreground font-body mt-1">Daily Nutrition Score</p>
          <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
            <motion.div className="h-full rounded-full bg-primary" animate={{ width: `${score}%` }} transition={{ duration: 0.8 }} />
          </div>
        </div>

        {/* Meal checklist */}
        <div className="glass-card p-5 space-y-2">
          <h3 className="font-display font-medium text-foreground mb-3">Today's Meals</h3>
          {MEAL_ITEMS.map((item) => {
            const done = (log as any)?.[item.key] || false;
            return (
              <motion.button key={item.key} onClick={() => toggleMeal(item.key)} whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${done ? "glass-card-strong" : "glass-card"}`}>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  done ? "bg-success border-success" : "border-border"}`}>
                  {done && <Check className="w-3.5 h-3.5 text-success-foreground" />}
                </div>
                <span className="text-lg mr-2">{item.icon}</span>
                <span className={`font-body text-sm ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>{item.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Calories */}
        <div className="glass-card p-5">
          <label className="text-sm font-body text-muted-foreground mb-2 block">Calories (optional)</label>
          <div className="flex gap-2">
            <input type="number" value={calories} onChange={(e) => setCalories(Number(e.target.value))} placeholder="0"
              className="flex-1 px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm" />
            <button onClick={() => saveNutrition({ calories })}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm">Save</button>
          </div>
        </div>

        {/* Weekly */}
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-display font-semibold text-foreground">{weeklyHealthy}/7</p>
          <p className="text-xs text-muted-foreground font-body">Healthy Days This Week</p>
        </div>
      </motion.div>
    </TrackerLayout>
  );
};

export default NutritionPage;
