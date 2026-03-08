import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import ForestBackground2D from "@/components/ForestBackground2D";
import TreeProgress from "@/components/TreeProgress";
import { useHabits } from "@/hooks/useHabits";
import ThemeToggle from "@/components/ThemeToggle";
import QuoteDisplay from "@/components/QuoteDisplay";

const TRACKERS = [
  { key: "goals", label: "Goals", icon: "🌳", path: "/goals" },
  { key: "sleep", label: "Sleep", icon: "😴", path: "/sleep" },
  { key: "water", label: "Water", icon: "💧", path: "/water" },
  { key: "mood", label: "Mood", icon: "🙂", path: "/mood" },
  { key: "study", label: "Study", icon: "📚", path: "/study" },
  { key: "personal_care", label: "Personal Care", icon: "🧴", path: "/personal-care" },
  { key: "meditation", label: "Meditation", icon: "🧘", path: "/meditation" },
  { key: "nutrition", label: "Nutrition", icon: "🥗", path: "/nutrition" },
  { key: "menstrual", label: "Menstrual Tracker", icon: "🌸", path: "/menstrual" },
];

const DashboardHub = () => {
  const { displayName, signOut } = useAuth();
  const navigate = useNavigate();
  const { completionPercent } = useHabits();

  return (
    <div className="min-h-screen relative">
      <ForestBackground2D />

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
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

        {/* Quote */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <QuoteDisplay />
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

        {/* Wellness Tree */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <TreeProgress percent={completionPercent} />
        </motion.div>

        {/* Tracker Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {TRACKERS.map((tracker, i) => (
            <motion.button
              key={tracker.key}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.04 }}
              onClick={() => navigate(tracker.path)}
              className="glass-card p-5 text-center transition-all duration-300 group hover:scale-[1.03] cursor-pointer"
            >
              <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform duration-300">
                {tracker.icon}
              </span>
              <p className="font-body text-sm font-medium text-foreground">{tracker.label}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHub;
