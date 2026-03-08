import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TrackerLayout from "@/components/TrackerLayout";
import { useWater } from "@/hooks/useWater";

/* ---------- Plant SVG stages ---------- */

const SeedPlant = () => (
  <svg viewBox="0 0 120 140" className="w-full h-full">
    <ellipse cx="60" cy="125" rx="35" ry="8" fill="hsl(30,30%,40%)" opacity={0.4} />
    <motion.ellipse cx="60" cy="115" rx="8" ry="5" fill="hsl(35,50%,45%)"
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} />
    <motion.path d="M60 115 Q58 108 56 105 Q60 102 64 105 Q62 108 60 115Z"
      fill="hsl(130,45%,45%)" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
      style={{ originY: 1 }} transition={{ delay: 0.3, duration: 0.5 }} />
  </svg>
);

const SproutPlant = () => (
  <svg viewBox="0 0 120 140" className="w-full h-full">
    <ellipse cx="60" cy="125" rx="35" ry="8" fill="hsl(30,30%,40%)" opacity={0.4} />
    <motion.path d="M60 125 Q60 105 60 90" stroke="hsl(130,35%,40%)" strokeWidth="3"
      fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 0.6 }} />
    {[
      { d: "M60 108 Q48 100 44 92 Q52 96 60 108", delay: 0.3 },
      { d: "M60 98 Q72 88 76 82 Q68 86 60 98", delay: 0.5 },
    ].map((l, i) => (
      <motion.path key={i} d={l.d} fill="hsl(135,50%,50%)"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: l.delay, type: "spring" }} />
    ))}
  </svg>
);

const SmallPlant = () => (
  <svg viewBox="0 0 120 140" className="w-full h-full">
    <ellipse cx="60" cy="125" rx="35" ry="8" fill="hsl(30,30%,40%)" opacity={0.4} />
    <motion.path d="M60 125 Q60 100 60 75" stroke="hsl(125,30%,38%)" strokeWidth="4"
      fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 0.6 }} />
    {[
      { d: "M60 115 Q42 105 38 95 Q48 100 60 115", delay: 0.2 },
      { d: "M60 105 Q78 92 82 85 Q72 90 60 105", delay: 0.4 },
      { d: "M60 92 Q44 82 40 74 Q50 78 60 92", delay: 0.6 },
      { d: "M60 82 Q74 72 80 65 Q70 70 60 82", delay: 0.8 },
    ].map((l, i) => (
      <motion.path key={i} d={l.d} fill={i % 2 === 0 ? "hsl(135,55%,48%)" : "hsl(145,50%,52%)"}
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: l.delay, type: "spring" }} />
    ))}
    <motion.circle cx="60" cy="72" r="8" fill="hsl(140,50%,50%)"
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }} />
  </svg>
);

const HealthyPlant = () => (
  <svg viewBox="0 0 120 140" className="w-full h-full">
    <motion.circle cx="60" cy="70" r="40" fill="hsl(135,60%,60%)" opacity={0.08}
      animate={{ r: [38, 44, 38], opacity: [0.06, 0.12, 0.06] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
    <ellipse cx="60" cy="125" rx="35" ry="8" fill="hsl(30,30%,40%)" opacity={0.4} />
    <motion.path d="M58 125 Q57 95 58 65 M62 125 Q63 95 62 65"
      stroke="hsl(125,30%,35%)" strokeWidth="3" fill="none" strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
    {[
      { d: "M60 118 Q38 108 32 98 Q42 104 60 118", delay: 0.2 },
      { d: "M60 110 Q82 98 88 90 Q78 96 60 110", delay: 0.3 },
      { d: "M60 100 Q36 88 30 78 Q42 84 60 100", delay: 0.4 },
      { d: "M60 90 Q84 78 90 68 Q80 74 60 90", delay: 0.5 },
      { d: "M60 80 Q40 68 35 58 Q46 64 60 80", delay: 0.6 },
      { d: "M60 72 Q78 62 85 52 Q76 58 60 72", delay: 0.7 },
    ].map((l, i) => (
      <motion.path key={i} d={l.d}
        fill={["hsl(130,50%,42%)", "hsl(140,55%,48%)", "hsl(135,45%,44%)"][i % 3]}
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.92 }}
        transition={{ delay: l.delay, type: "spring" }} />
    ))}
    {[
      { cx: 55, cy: 55, r: 12 }, { cx: 68, cy: 58, r: 10 },
      { cx: 60, cy: 48, r: 14 }, { cx: 48, cy: 62, r: 10 }, { cx: 72, cy: 65, r: 9 },
    ].map((c, i) => (
      <motion.circle key={i} {...c} fill={i % 2 === 0 ? "hsl(135,50%,45%)" : "hsl(145,55%,50%)"}
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.9 }}
        transition={{ delay: 0.7 + i * 0.08, type: "spring" }} />
    ))}
    {/* sparkles */}
    {[{ cx: 50, cy: 50 }, { cx: 70, cy: 45 }, { cx: 60, cy: 40 }].map((s, i) => (
      <motion.circle key={`sp-${i}`} cx={s.cx} cy={s.cy} r={1.5} fill="hsl(50,80%,85%)"
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
        transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }} />
    ))}
    {/* flower */}
    <motion.circle cx="60" cy="48" r="5" fill="hsl(340,60%,70%)" opacity={0.7}
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: "spring" }} />
  </svg>
);

const PLANT_STAGES = [
  { component: SeedPlant, label: "Seed", desc: "Add some water to start growing!" },
  { component: SproutPlant, label: "Sprout", desc: "Your plant is sprouting!" },
  { component: SmallPlant, label: "Growing", desc: "Great hydration progress!" },
  { component: HealthyPlant, label: "Blooming", desc: "Fully hydrated! 🌺" },
];

const getPlantStage = (glasses: number): number => {
  if (glasses >= 7) return 3;
  if (glasses >= 5) return 2;
  if (glasses >= 3) return 1;
  return 0;
};

/* ---------- Water Drop Animation ---------- */

interface WaterDrop {
  id: number;
  x: number;
}

const WaterDropAnimation = ({ drops }: { drops: WaterDrop[] }) => (
  <AnimatePresence>
    {drops.map((drop) => (
      <motion.div
        key={drop.id}
        className="absolute text-xl pointer-events-none"
        style={{ left: `${drop.x}%`, top: "10%" }}
        initial={{ opacity: 1, y: 0, scale: 1 }}
        animate={{ y: 80, opacity: 0, scale: 0.5 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeIn" }}
      >
        💧
      </motion.div>
    ))}
  </AnimatePresence>
);

/* ---------- Main Component ---------- */

const WaterPage = () => {
  const { log, saveWater, percent, streak } = useWater();
  const glasses = log?.glasses || 0;
  const goal = log?.daily_goal || 8;
  const stageIdx = getPlantStage(glasses);
  const stage = PLANT_STAGES[stageIdx];
  const PlantSVG = stage.component;

  const [drops, setDrops] = useState<WaterDrop[]>([]);
  const [showSplash, setShowSplash] = useState(false);

  const addGlass = useCallback(() => {
    // water drop animation
    const newDrop: WaterDrop = { id: Date.now(), x: 35 + Math.random() * 30 };
    setDrops((prev) => [...prev, newDrop]);
    setShowSplash(true);
    setTimeout(() => setDrops((prev) => prev.filter((d) => d.id !== newDrop.id)), 1000);
    setTimeout(() => setShowSplash(false), 1200);
    saveWater({ glasses: glasses + 1, daily_goal: goal });
  }, [glasses, goal, saveWater]);

  const removeGlass = useCallback(() => {
    if (glasses > 0) saveWater({ glasses: glasses - 1, daily_goal: goal });
  }, [glasses, goal, saveWater]);

  return (
    <TrackerLayout title="Water" icon="💧">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">

        {/* Plant visual card */}
        <div className="glass-card p-6 text-center relative overflow-hidden">
          {/* Water drops */}
          <WaterDropAnimation drops={drops} />

          {/* Splash feedback */}
          <AnimatePresence>
            {showSplash && (
              <motion.div
                className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-body font-medium backdrop-blur-sm border border-primary/20 z-10"
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                +1 glass 💧
              </motion.div>
            )}
          </AnimatePresence>

          {/* Plant SVG */}
          <motion.div
            key={stageIdx}
            className="w-28 h-32 mx-auto mb-3"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
          >
            <PlantSVG />
          </motion.div>

          <h3 className="font-display text-lg font-semibold text-foreground">{stage.label}</h3>
          <p className="text-sm text-muted-foreground font-body mt-1">{stage.desc}</p>

          {/* Progress bar */}
          <div className="mt-4 h-2.5 rounded-full bg-secondary overflow-hidden relative">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(var(--water-1)), hsl(var(--primary)))" }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, percent)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: "linear-gradient(90deg, transparent 0%, hsla(0,0%,100%,0.3) 50%, transparent 100%)", width: "30%" }}
              animate={{ x: ["-30%", "400%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 font-body">
            {glasses} / {goal} glasses · {percent}%
          </p>

          {/* Add / Remove buttons */}
          <div className="flex items-center justify-center gap-4 mt-5">
            <motion.button
              onClick={removeGlass}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-foreground font-bold text-lg hover:scale-105 transition-transform"
            >
              −
            </motion.button>
            <motion.button
              onClick={addGlass}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.08 }}
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-medium text-sm flex items-center gap-2 shadow-lg"
            >
              <span className="text-lg">💧</span> Add Water
            </motion.button>
            <div className="w-10" /> {/* spacer */}
          </div>
        </div>

        {/* Goal slider */}
        <div className="glass-card p-5">
          <label className="text-sm font-body text-muted-foreground mb-2 block">
            Daily Goal: {goal} glasses
          </label>
          <input
            type="range" min={4} max={16} value={goal}
            onChange={(e) => saveWater({ daily_goal: Number(e.target.value) })}
            className="w-full accent-primary"
          />
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

        {/* Goal reached celebration */}
        {percent >= 100 && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-5 text-center border border-accent/30">
            <p className="text-lg font-display font-semibold text-foreground">🎉 Goal Reached!</p>
            <p className="text-sm text-muted-foreground font-body mt-1">
              Your plant is fully hydrated & your Wellness Tree gained progress!
            </p>
          </motion.div>
        )}
      </motion.div>
    </TrackerLayout>
  );
};

export default WaterPage;
