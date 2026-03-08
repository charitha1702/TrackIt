import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TreeProgressProps {
  percent: number;
}

const STAGES = [
  { min: 0, max: 20, label: "Seed", desc: "Plant the seed of good habits" },
  { min: 21, max: 40, label: "Sprout", desc: "Your habits are taking root" },
  { min: 41, max: 60, label: "Small Plant", desc: "Growing stronger every day" },
  { min: 61, max: 80, label: "Young Tree", desc: "Branches of progress appear" },
  { min: 81, max: 100, label: "Healthy Tree", desc: "Your tree is thriving!" },
];

const getStage = (p: number) => {
  if (p >= 81) return 4;
  if (p >= 61) return 3;
  if (p >= 41) return 2;
  if (p >= 21) return 1;
  return 0;
};

/* ---------- SVG tree stages ---------- */

const SeedSVG = () => (
  <svg viewBox="0 0 200 220" className="w-full h-full">
    {/* soil */}
    <ellipse cx="100" cy="195" rx="60" ry="12" fill="hsl(30,30%,40%)" opacity={0.5} />
    {/* seed */}
    <motion.ellipse
      cx="100" cy="175" rx="12" ry="8"
      fill="hsl(35,50%,45%)"
      initial={{ scale: 0 }} animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    />
    {/* tiny sprout */}
    <motion.path
      d="M100 175 Q98 165 95 160 Q100 155 105 160 Q102 165 100 175Z"
      fill="hsl(130,45%,45%)"
      initial={{ scaleY: 0, originY: 1 }} animate={{ scaleY: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    />
  </svg>
);

const SproutSVG = () => (
  <svg viewBox="0 0 200 220" className="w-full h-full">
    <ellipse cx="100" cy="195" rx="55" ry="10" fill="hsl(30,30%,40%)" opacity={0.5} />
    {/* stem */}
    <motion.path
      d="M100 195 Q100 165 100 145"
      stroke="hsl(130,35%,40%)" strokeWidth="4" fill="none" strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 0.8 }}
    />
    {/* leaves */}
    {[{ d: "M100 165 Q85 155 80 145 Q90 148 100 165", delay: 0.4 },
      { d: "M100 155 Q115 145 120 135 Q110 140 100 155", delay: 0.6 }].map((l, i) => (
      <motion.path key={i} d={l.d} fill="hsl(135,50%,50%)"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: l.delay, type: "spring" }}
      />
    ))}
  </svg>
);

const SmallPlantSVG = () => (
  <svg viewBox="0 0 200 220" className="w-full h-full">
    <ellipse cx="100" cy="195" rx="55" ry="10" fill="hsl(30,30%,40%)" opacity={0.5} />
    <motion.path d="M100 195 Q100 155 100 120" stroke="hsl(125,30%,35%)" strokeWidth="5" fill="none" strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
    {/* branches + leaves */}
    {[
      { d: "M100 170 Q80 158 70 150 Q82 152 100 170", delay: 0.3 },
      { d: "M100 155 Q120 140 130 132 Q118 138 100 155", delay: 0.5 },
      { d: "M100 140 Q82 128 75 118 Q85 124 100 140", delay: 0.7 },
      { d: "M100 125 Q115 115 125 108 Q114 113 100 125", delay: 0.9 },
    ].map((l, i) => (
      <motion.path key={i} d={l.d} fill="hsl(135,55%,48%)"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: l.delay, type: "spring" }} />
    ))}
    {/* top leaf cluster */}
    <motion.circle cx="100" cy="115" r="12" fill="hsl(140,50%,50%)"
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }} />
  </svg>
);

const YoungTreeSVG = () => (
  <svg viewBox="0 0 200 220" className="w-full h-full">
    <ellipse cx="100" cy="195" rx="55" ry="10" fill="hsl(30,30%,40%)" opacity={0.5} />
    {/* trunk */}
    <motion.path d="M100 195 Q99 160 100 110" stroke="hsl(25,35%,35%)" strokeWidth="7" fill="none" strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
    {/* branches */}
    {[
      "M100 160 Q75 145 65 140", "M100 150 Q125 135 135 130",
      "M100 135 Q78 120 68 112", "M100 125 Q122 110 132 105",
    ].map((d, i) => (
      <motion.path key={i} d={d} stroke="hsl(25,30%,38%)" strokeWidth="3" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }} />
    ))}
    {/* leaf clusters */}
    {[
      { cx: 60, cy: 135, r: 16 }, { cx: 140, cy: 125, r: 14 },
      { cx: 63, cy: 108, r: 15 }, { cx: 137, cy: 100, r: 13 },
      { cx: 100, cy: 100, r: 18 },
    ].map((c, i) => (
      <motion.circle key={i} {...c} fill={i % 2 === 0 ? "hsl(135,50%,45%)" : "hsl(145,55%,50%)"}
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.9 }}
        transition={{ delay: 0.8 + i * 0.1, type: "spring" }} />
    ))}
  </svg>
);

const HealthyTreeSVG = () => (
  <svg viewBox="0 0 200 220" className="w-full h-full">
    {/* glow */}
    <motion.circle cx="100" cy="110" r="70" fill="hsl(135,60%,60%)" opacity={0.08}
      animate={{ r: [65, 75, 65], opacity: [0.06, 0.12, 0.06] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
    <ellipse cx="100" cy="195" rx="55" ry="10" fill="hsl(30,30%,40%)" opacity={0.5} />
    {/* thick trunk */}
    <motion.path d="M96 195 Q95 155 96 115 M104 195 Q105 155 104 115"
      stroke="hsl(25,35%,32%)" strokeWidth="5" fill="none" strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
    {/* branches */}
    {[
      "M98 165 Q70 148 55 142", "M102 158 Q130 140 145 135",
      "M98 145 Q65 125 52 118", "M102 138 Q135 118 148 112",
      "M98 125 Q72 108 62 98", "M102 118 Q128 100 138 92",
    ].map((d, i) => (
      <motion.path key={i} d={d} stroke="hsl(25,30%,35%)" strokeWidth="2.5" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }} />
    ))}
    {/* full canopy */}
    {[
      { cx: 50, cy: 138, r: 18 }, { cx: 150, cy: 130, r: 16 },
      { cx: 48, cy: 112, r: 17 }, { cx: 152, cy: 108, r: 15 },
      { cx: 58, cy: 92, r: 16 }, { cx: 142, cy: 88, r: 15 },
      { cx: 78, cy: 78, r: 18 }, { cx: 122, cy: 75, r: 17 },
      { cx: 100, cy: 70, r: 22 }, { cx: 100, cy: 95, r: 20 },
    ].map((c, i) => (
      <motion.circle key={i} {...c}
        fill={["hsl(130,50%,42%)", "hsl(140,55%,48%)", "hsl(135,45%,44%)", "hsl(145,50%,50%)"][i % 4]}
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.92 }}
        transition={{ delay: 0.6 + i * 0.06, type: "spring" }} />
    ))}
    {/* sparkle dots */}
    {[
      { cx: 80, cy: 80 }, { cx: 120, cy: 72 }, { cx: 95, cy: 65 },
      { cx: 110, cy: 90 }, { cx: 70, cy: 100 },
    ].map((s, i) => (
      <motion.circle key={`sp-${i}`} cx={s.cx} cy={s.cy} r={1.5} fill="hsl(50,80%,85%)"
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
        transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }} />
    ))}
  </svg>
);

const TREE_SVGS = [SeedSVG, SproutSVG, SmallPlantSVG, YoungTreeSVG, HealthyTreeSVG];

/* ---------- Celebration Particles ---------- */

const CelebrationParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: 8 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-sm"
        style={{
          left: `${30 + Math.random() * 40}%`,
          top: `${20 + Math.random() * 30}%`,
        }}
        initial={{ opacity: 1, y: 0, scale: 0 }}
        animate={{ opacity: 0, y: -40 - Math.random() * 30, scale: 1, x: (Math.random() - 0.5) * 60 }}
        transition={{ duration: 1.2 + Math.random() * 0.5, ease: "easeOut" }}
      >
        {["🍃", "✨", "🌿", "💚", "🌱"][i % 5]}
      </motion.div>
    ))}
  </div>
);

/* ---------- Floating Message ---------- */

const FloatingMessage = ({ text }: { text: string }) => (
  <motion.div
    className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-xs font-body font-medium backdrop-blur-sm border border-accent/20"
    initial={{ opacity: 0, y: 10, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.8 }}
    transition={{ duration: 0.5 }}
  >
    {text}
  </motion.div>
);

/* ---------- Main Component ---------- */

const TreeProgress = ({ percent }: TreeProgressProps) => {
  const stageIdx = getStage(percent);
  const stage = STAGES[stageIdx];
  const TreeSVG = TREE_SVGS[stageIdx];

  const prevPercentRef = useRef(percent);
  const [showCelebration, setShowCelebration] = useState(false);
  const [floatingMsg, setFloatingMsg] = useState<string | null>(null);
  const [prevStage, setPrevStage] = useState(stageIdx);

  useEffect(() => {
    const prev = prevPercentRef.current;
    if (percent > prev && prev >= 0) {
      const diff = percent - prev;
      setShowCelebration(true);
      setFloatingMsg(`+${diff}% Growth 🌱`);
      const t1 = setTimeout(() => setShowCelebration(false), 1500);
      const t2 = setTimeout(() => setFloatingMsg(null), 2500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
    prevPercentRef.current = percent;
  }, [percent]);

  useEffect(() => {
    if (stageIdx !== prevStage) {
      setShowCelebration(true);
      setFloatingMsg(`🌿 ${stage.label} stage reached!`);
      const t1 = setTimeout(() => setShowCelebration(false), 2000);
      const t2 = setTimeout(() => setFloatingMsg(null), 3000);
      setPrevStage(stageIdx);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [stageIdx, prevStage, stage.label]);

  return (
    <div className="glass-card p-6 text-center relative overflow-hidden">
      {/* Floating progress message */}
      <AnimatePresence>
        {floatingMsg && <FloatingMessage key={floatingMsg} text={floatingMsg} />}
      </AnimatePresence>

      {/* Celebration particles */}
      <AnimatePresence>
        {showCelebration && <CelebrationParticles key="celebration" />}
      </AnimatePresence>

      {/* Tree visual */}
      <motion.div
        key={stageIdx}
        className="w-32 h-36 mx-auto mb-2"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
      >
        <TreeSVG />
      </motion.div>

      {/* Stage info */}
      <motion.h3
        key={`label-${stageIdx}`}
        className="font-display text-lg font-semibold text-foreground"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {stage.label}
      </motion.h3>
      <p className="text-sm text-muted-foreground font-body mt-1">{stage.desc}</p>

      {/* Animated progress bar */}
      <div className="mt-4 h-2.5 rounded-full bg-secondary overflow-hidden relative">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, hsl(var(--accent)), hsl(var(--primary)))`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        {/* shimmer */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent 0%, hsla(0,0%,100%,0.3) 50%, transparent 100%)",
            width: "30%",
          }}
          animate={{ x: ["-30%", "400%"] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
        />
      </div>

      <p className="text-xs text-muted-foreground mt-2 font-body">{percent}% complete today</p>
    </div>
  );
};

export default TreeProgress;
