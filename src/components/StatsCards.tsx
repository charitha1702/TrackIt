import { motion } from "framer-motion";
import { Target, CheckCircle, TrendingUp } from "lucide-react";

interface StatsCardsProps {
  total: number;
  completed: number;
  percent: number;
}

const StatsCards = ({ total, completed, percent }: StatsCardsProps) => {
  const stats = [
    { icon: Target, label: "Total Habits", value: total },
    { icon: CheckCircle, label: "Completed Today", value: completed },
    { icon: TrendingUp, label: "Daily Progress", value: `${percent}%` },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="glass-card p-4 text-center"
        >
          <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
          <p className="text-xl font-display font-semibold text-foreground">{stat.value}</p>
          <p className="text-xs text-muted-foreground font-body">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;
