import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { HABIT_CATEGORIES, MOOD_OPTIONS, type HabitEntry } from "@/hooks/useHabits";

const motivationalMessages = [
  "Small habits build strong lives 🌱",
  "Consistency grows success 🌳",
  "You're doing great 🌿",
  "Every step counts 🍃",
  "Nature rewards patience 🌸",
];

interface HabitCardProps {
  category: (typeof HABIT_CATEGORIES)[number];
  habit: HabitEntry | undefined;
  onUpdate: (category: string, value: string, completed: boolean) => void;
  onMotivate: (msg: string) => void;
  index: number;
}

const HabitCard = ({ category, habit, onUpdate, onMotivate, index }: HabitCardProps) => {
  const [localValue, setLocalValue] = useState(habit?.value || "");
  const completed = habit?.completed || false;

  const handleComplete = () => {
    const newCompleted = !completed;
    const val = localValue || (category.type === "check" ? "done" : localValue);
    onUpdate(category.key, val, newCompleted);
    if (newCompleted) {
      const msg = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      onMotivate(msg);
    }
  };

  const handleValueChange = (val: string) => {
    setLocalValue(val);
    onUpdate(category.key, val, completed);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="glass-card p-4 space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{category.icon}</span>
          <h4 className="font-body font-medium text-foreground text-sm">{category.label}</h4>
          {category.unit && (
            <span className="text-xs text-muted-foreground font-body">({category.unit})</span>
          )}
        </div>
        <button
          onClick={handleComplete}
          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
            completed ? "bg-success border-success" : "border-border hover:border-primary"
          }`}
        >
          {completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Check className="w-3.5 h-3.5 text-success-foreground" />
            </motion.div>
          )}
        </button>
      </div>

      {/* Input based on type */}
      {category.type === "number" && (
        <input
          type="number"
          min="0"
          step="0.5"
          value={localValue}
          onChange={(e) => handleValueChange(e.target.value)}
          placeholder={category.placeholder}
          className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-sm"
        />
      )}

      {category.type === "text" && (
        <input
          type="text"
          value={localValue}
          onChange={(e) => handleValueChange(e.target.value)}
          placeholder={category.placeholder}
          className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-sm"
        />
      )}

      {category.type === "mood" && (
        <div className="flex flex-wrap gap-2">
          {MOOD_OPTIONS.map((mood) => (
            <button
              key={mood.value}
              onClick={() => handleValueChange(mood.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-body transition-all duration-300 ${
                localValue === mood.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
            >
              {mood.emoji} {mood.label}
            </button>
          ))}
        </div>
      )}

      {category.type === "check" && (
        <p className="text-xs text-muted-foreground font-body">
          {completed ? "✅ Completed for today" : "Tap the check to mark as done"}
        </p>
      )}
    </motion.div>
  );
};

export default HabitCard;
