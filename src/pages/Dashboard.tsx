import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useHabits, HABIT_CATEGORIES } from "@/hooks/useHabits";
import AnimatedBackground from "@/components/AnimatedBackground";
import ThemeToggle from "@/components/ThemeToggle";
import TreeProgress from "@/components/TreeProgress";
import StatsCards from "@/components/StatsCards";
import HabitCard from "@/components/HabitCard";

const Dashboard = () => {
  const { displayName, signOut } = useAuth();
  const { habits, upsertHabit, getHabit, completedCount, totalCategories, completionPercent } = useHabits();
  const [motivMsg, setMotivMsg] = useState<string | null>(null);

  const handleMotivate = useCallback((msg: string) => {
    setMotivMsg(msg);
    setTimeout(() => setMotivMsg(null), 3000);
  }, []);

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      {/* Motivational popup */}
      <AnimatePresence>
        {motivMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-card-strong px-6 py-3 text-foreground font-body font-medium"
          >
            {motivMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-display font-semibold text-foreground">
            TrackIt 🌿
          </h1>
          <p className="text-sm text-muted-foreground font-body mt-1">
            Track small habits. Grow a better life.
          </p>
        </motion.div>

        {/* User bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex items-center justify-between"
        >
          <p className="text-lg font-display font-medium text-foreground">
            Welcome, {displayName || "Friend"} 🌿
          </p>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={signOut}
              className="glass-card p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Sign out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5"
        >
          <h3 className="font-display font-medium text-foreground mb-2">How TrackIt Works</h3>
          <ul className="text-sm text-muted-foreground font-body space-y-1">
            <li>• Track your daily habits</li>
            <li>• Stay consistent</li>
            <li>• Watch your progress grow 🌱</li>
            <li>• Build better routines</li>
          </ul>
        </motion.div>

        {/* Tree Progress */}
        <TreeProgress percent={completionPercent} />

        {/* Stats */}
        <StatsCards total={totalCategories} completed={completedCount} percent={completionPercent} />

        {/* Habit Cards */}
        <div className="space-y-3">
          <h3 className="font-display font-medium text-foreground text-lg">Today's Habits</h3>
          {HABIT_CATEGORIES.map((cat, i) => (
            <HabitCard
              key={cat.key}
              category={cat}
              habit={getHabit(cat.key)}
              onUpdate={upsertHabit}
              onMotivate={handleMotivate}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
