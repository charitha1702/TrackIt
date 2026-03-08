import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Check, Plus, X } from "lucide-react";
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
  onAddTask: (goalId: string, title: string) => void;
  onToggleTask: (taskId: string, completed: boolean) => void;
  onDeleteTask: (taskId: string) => void;
  index: number;
}

const GoalCard = ({ goal, onToggle, onDelete, onMotivate, onAddTask, onToggleTask, onDeleteTask, index }: GoalCardProps) => {
  const [addingTask, setAddingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  const handleToggle = () => {
    const newCompleted = !goal.completed;
    onToggle(goal.id, newCompleted);
    if (newCompleted) {
      const msg = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      onMotivate(msg);
    }
  };

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      onAddTask(goal.id, taskTitle.trim());
      setTaskTitle("");
      setAddingTask(false);
    }
  };

  const tasks = goal.tasks || [];
  const completedTasks = tasks.filter((t) => t.completed).length;
  const taskPercent = tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-card p-4 space-y-3 group"
    >
      {/* Header row */}
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggle}
          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
            goal.completed ? "bg-success border-success" : "border-border hover:border-primary"
          }`}
        >
          {goal.completed && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
              <Check className="w-3.5 h-3.5 text-success-foreground" />
            </motion.div>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h4 className={`font-body font-medium transition-all duration-500 ${goal.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
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
      </div>

      {/* Progress bar for tasks */}
      {tasks.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground font-body">{completedTasks}/{tasks.length} tasks</span>
            <span className="text-xs text-muted-foreground font-body">{taskPercent}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              animate={{ width: `${taskPercent}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
      )}

      {/* Sub-tasks */}
      {tasks.length > 0 && (
        <div className="space-y-1 pl-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-2 group/task">
              <button
                onClick={() => onToggleTask(task.id, !task.completed)}
                className={`w-4 h-4 rounded border flex items-center justify-center transition-all flex-shrink-0 ${
                  task.completed ? "bg-success border-success" : "border-border hover:border-primary"
                }`}
              >
                {task.completed && <Check className="w-2.5 h-2.5 text-success-foreground" />}
              </button>
              <span className={`text-sm font-body flex-1 ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                {task.title}
              </span>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="opacity-0 group-hover/task:opacity-100 text-muted-foreground hover:text-destructive transition-all"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add task */}
      {addingTask ? (
        <div className="flex gap-2 pl-2">
          <input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            placeholder="Task name"
            autoFocus
            className="flex-1 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button onClick={handleAddTask} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-body">Add</button>
          <button onClick={() => { setAddingTask(false); setTaskTitle(""); }} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setAddingTask(true)}
          className="text-xs text-primary font-body hover:underline flex items-center gap-1 pl-2"
        >
          <Plus className="w-3 h-3" /> Add task
        </button>
      )}
    </motion.div>
  );
};

export default GoalCard;
