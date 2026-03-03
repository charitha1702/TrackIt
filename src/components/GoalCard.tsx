import { motion } from "framer-motion";
import { Trash2, Check } from "lucide-react";
import type { Goal } from "@/hooks/useGoals";

const motivationalMessages = [
  "Growth happens daily 🌿",
  "Consistency builds forests 🌲",
  "Small steps matter 🌱",
  "You're blooming beautifully 🌸",
  "Nature rewards patience 🍃",
];

interface GoalCardProps {
  goal: Goal;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onMotivate: (msg: string) => void;
  index: number;
}

const GoalCard = ({ goal, onToggle, onDelete, onMotivate, index }: GoalCardProps) => {
  const handleToggle = () => {
    const newCompleted = !goal.completed;
    onToggle(goal.id, newCompleted);
    if (newCompleted) {
      const msg = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      onMotivate(msg);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-card p-4 flex items-start gap-3 group"
    >
      <button
        onClick={handleToggle}
        className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
          goal.completed
            ? "bg-success border-success"
            : "border-border hover:border-primary"
        }`}
      >
        {goal.completed && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
            <Check className="w-3.5 h-3.5 text-success-foreground" />
          </motion.div>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <h4
          className={`font-body font-medium transition-all duration-500 ${
            goal.completed ? "line-through text-muted-foreground" : "text-foreground"
          }`}
        >
          {goal.title}
        </h4>
        {goal.description && (
          <p className="text-sm text-muted-foreground font-body mt-0.5 truncate">{goal.description}</p>
        )}
        {goal.deadline && (
          <p className="text-xs text-muted-foreground/70 font-body mt-1">
            📅 {new Date(goal.deadline).toLocaleDateString()}
          </p>
        )}
      </div>

      <button
        onClick={() => onDelete(goal.id)}
        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all duration-300 mt-1"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default GoalCard;
