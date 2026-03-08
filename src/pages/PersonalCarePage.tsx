import { motion } from "framer-motion";
import { Check } from "lucide-react";
import TrackerLayout from "@/components/TrackerLayout";
import { usePersonalCare, CARE_TASKS } from "@/hooks/usePersonalCare";

const PersonalCarePage = () => {
  const { completedTasks, toggleTask, percent } = usePersonalCare();

  return (
    <TrackerLayout title="Personal Care" icon="🧴">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        {/* Score */}
        <div className="glass-card p-5 text-center">
          <p className="text-4xl font-display font-bold text-foreground">{percent}%</p>
          <p className="text-sm text-muted-foreground font-body mt-1">
            {completedTasks.length} / {CARE_TASKS.length} tasks completed
          </p>
          <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="glass-card p-5 space-y-2">
          <h3 className="font-display font-medium text-foreground mb-3">Today's Care</h3>
          {CARE_TASKS.map((task) => {
            const done = completedTasks.includes(task.key);
            return (
              <motion.button
                key={task.key}
                onClick={() => toggleTask(task.key)}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  done ? "glass-card-strong" : "glass-card"
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  done ? "bg-success border-success" : "border-border"
                }`}>
                  {done && <Check className="w-3.5 h-3.5 text-success-foreground" />}
                </div>
                <span className="text-lg mr-2">{task.icon}</span>
                <span className={`font-body text-sm ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {task.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </TrackerLayout>
  );
};

export default PersonalCarePage;
