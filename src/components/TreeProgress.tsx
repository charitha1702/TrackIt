import { motion } from "framer-motion";

interface TreeProgressProps {
  percent: number;
}

const stages = [
  { min: 0, emoji: "🌱", label: "Seed", desc: "Start tracking your habits" },
  { min: 25, emoji: "🌿", label: "Sprout", desc: "Building momentum" },
  { min: 50, emoji: "🌲", label: "Growing Tree", desc: "Great consistency today" },
  { min: 100, emoji: "🌳", label: "Full Tree", desc: "All habits complete!" },
];

const getStage = (percent: number) => {
  if (percent >= 100) return stages[3];
  if (percent >= 50) return stages[2];
  if (percent >= 25) return stages[1];
  return stages[0];
};

const TreeProgress = ({ percent }: TreeProgressProps) => {
  const stage = getStage(percent);

  return (
    <div className="glass-card p-6 text-center">
      <motion.div
        key={stage.label}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-6xl mb-3"
      >
        {stage.emoji}
      </motion.div>
      <h3 className="font-display text-lg font-semibold text-foreground">{stage.label}</h3>
      <p className="text-sm text-muted-foreground font-body mt-1">{stage.desc}</p>
      <div className="mt-4 h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2 font-body">{percent}% complete</p>
    </div>
  );
};

export default TreeProgress;
