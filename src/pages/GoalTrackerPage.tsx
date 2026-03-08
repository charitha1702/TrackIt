import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TrackerLayout from "@/components/TrackerLayout";
import { useGoals } from "@/hooks/useGoals";
import StatsCards from "@/components/StatsCards";
import GoalCard from "@/components/GoalCard";
import AddGoalForm from "@/components/AddGoalForm";

const GoalTrackerPage = () => {
  const { goals, addGoal, toggleGoal, deleteGoal, addTask, toggleTask, deleteTask, totalGoals, completedGoals, completionPercent } = useGoals();
  const [motivMsg, setMotivMsg] = useState<string | null>(null);

  const handleMotivate = useCallback((msg: string) => {
    setMotivMsg(msg);
    setTimeout(() => setMotivMsg(null), 3000);
  }, []);

  return (
    <TrackerLayout title="Goals" icon="🌳">
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

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
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
                onAddTask={addTask}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
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
      </motion.div>
    </TrackerLayout>
  );
};

export default GoalTrackerPage;
