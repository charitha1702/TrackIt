import { motion } from "framer-motion";
import TrackerLayout from "@/components/TrackerLayout";
import { useWater } from "@/hooks/useWater";

const WaterPage = () => {
  const { log, saveWater, percent, streak } = useWater();
  const glasses = log?.glasses || 0;
  const goal = log?.daily_goal || 8;

  const addGlass = () => saveWater({ glasses: glasses + 1, daily_goal: goal });
  const removeGlass = () => { if (glasses > 0) saveWater({ glasses: glasses - 1, daily_goal: goal }); };

  return (
    <TrackerLayout title="Water" icon="💧">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        {/* Water visual */}
        <div className="glass-card p-6 text-center">
          <div className="relative w-24 h-36 mx-auto mb-4 rounded-b-2xl rounded-t-lg border-2 border-primary/40 overflow-hidden">
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-primary/30"
              animate={{ height: `${Math.min(100, percent)}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-display font-bold text-foreground">{glasses}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground font-body">{percent}% of daily goal ({goal} glasses)</p>

          <div className="flex items-center justify-center gap-4 mt-4">
            <button onClick={removeGlass}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-foreground font-bold text-lg hover:scale-105 transition-transform">
              −
            </button>
            <button onClick={addGlass}
              className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl hover:scale-105 transition-transform">
              +
            </button>
            <button onClick={removeGlass}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-foreground font-bold text-lg opacity-0 pointer-events-none">
              −
            </button>
          </div>
        </div>

        {/* Goal setting */}
        <div className="glass-card p-5">
          <label className="text-sm font-body text-muted-foreground mb-2 block">Daily Goal: {goal} glasses</label>
          <input type="range" min={4} max={16} value={goal}
            onChange={(e) => saveWater({ daily_goal: Number(e.target.value) })}
            className="w-full accent-primary" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-display font-semibold text-foreground">{percent}%</p>
            <p className="text-xs text-muted-foreground font-body">Hydration</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-display font-semibold text-foreground">{streak}🔥</p>
            <p className="text-xs text-muted-foreground font-body">Day Streak</p>
          </div>
        </div>

        {percent >= 100 && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="glass-card-strong p-4 text-center">
            <p className="text-lg font-display font-semibold text-foreground">🎉 Goal reached!</p>
            <p className="text-sm text-muted-foreground font-body">Great hydration today!</p>
          </motion.div>
        )}
      </motion.div>
    </TrackerLayout>
  );
};

export default WaterPage;
