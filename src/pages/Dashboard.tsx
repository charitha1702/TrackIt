import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useGoals } from "@/hooks/useGoals";
import AnimatedBackground from "@/components/AnimatedBackground";
import ThemeToggle from "@/components/ThemeToggle";
import TreeProgress from "@/components/TreeProgress";
import StatsCards from "@/components/StatsCards";
import GoalCard from "@/components/GoalCard";
import AddGoalForm from "@/components/AddGoalForm";

const Dashboard = () => {
  const { displayName, signOut } = useAuth();
  const { goals, addGoal, toggleGoal, deleteGoal, totalGoals, completedGoals, completionPercent } = useGoals();
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
          className="flex items-center justify-between"
        >
          <h1 className="text-2xl font-display font-semibold text-foreground">
            Welcome, {displayName || "Friend"} 🌿
          </h1>
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
          <h3 className="font-display font-medium text-foreground mb-2">How It Works</h3>
          <ul className="text-sm text-muted-foreground font-body space-y-1">
            <li>• Add your goals</li>
            <li>• Mark them complete</li>
            <li>• Watch your tree grow 🌳</li>
            <li>• Stay consistent daily</li>
          </ul>
        </motion.div>

        {/* Tree Progress */}
        <TreeProgress percent={completionPercent} />

        {/* Stats */}
        <StatsCards total={totalGoals} completed={completedGoals} percent={completionPercent} />

        {/* Add Goal */}
        <AddGoalForm onAdd={addGoal} />

        {/* Goal List */}
        <div className="space-y-3">
          <AnimatePresence>
            {goals.map((goal, i) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onToggle={toggleGoal}
                onDelete={deleteGoal}
                onMotivate={handleMotivate}
                index={i}
              />
            ))}
          </AnimatePresence>
          {goals.length === 0 && (
            <p className="text-center text-muted-foreground font-body text-sm py-8">
              No goals yet. Plant your first seed! 🌱
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
