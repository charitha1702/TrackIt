import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGoals } from "@/hooks/useGoals";
import WaterBackground3D from "@/components/WaterBackground3D";
import ThemeToggle from "@/components/ThemeToggle";
import TreeProgress from "@/components/TreeProgress";
import StatsCards from "@/components/StatsCards";
import GoalCard from "@/components/GoalCard";
import AddGoalForm from "@/components/AddGoalForm";
import QuoteDisplay from "@/components/QuoteDisplay";

const GoalTrackerPage = () => {
  const navigate = useNavigate();
  const { goals, addGoal, toggleGoal, deleteGoal, totalGoals, completedGoals, completionPercent } = useGoals();
  const [motivMsg, setMotivMsg] = useState<string | null>(null);

  const handleMotivate = useCallback((msg: string) => {
    setMotivMsg(msg);
    setTimeout(() => setMotivMsg(null), 3000);
  }, []);

  return (
    <div className="min-h-screen relative">
      <WaterBackground3D />

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
        {/* Header with back */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <button
            onClick={() => navigate("/")}
            className="glass-card p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-display font-semibold text-foreground">
            Goal Tracker 🌳
          </h1>
          <ThemeToggle />
        </motion.div>

        {/* Quote */}
        <QuoteDisplay />

        {/* Tree Progress */}
        <TreeProgress percent={completionPercent} />

        {/* Stats */}
        <StatsCards total={totalGoals} completed={completedGoals} percent={completionPercent} />

        {/* Add Goal */}
        <AddGoalForm onAdd={addGoal} />

        {/* Goals list */}
        <div className="space-y-3">
          <h3 className="font-display font-medium text-foreground text-lg">Your Goals</h3>
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
              No goals yet. Add one to start growing! 🌱
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalTrackerPage;
