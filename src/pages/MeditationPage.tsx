import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import TrackerLayout from "@/components/TrackerLayout";
import { useMeditation } from "@/hooks/useMeditation";

const TIMER_OPTIONS = [
  { label: "2 min", seconds: 2 * 60 },
  { label: "4 min", seconds: 4 * 60 },
  { label: "10 min", seconds: 10 * 60 },
  { label: "Custom", seconds: 0 },
];

const MEDITATION_QUOTES = [
  "Stillness is where clarity grows.",
  "Breathe in calm, breathe out tension.",
  "The present moment is all there is.",
  "Within you is a sanctuary of peace.",
  "Let thoughts drift like clouds.",
];

const MeditationPage = () => {
  const { sessions, logSession, totalMinutes, totalSessions } = useMeditation();
  const [timerIdx, setTimerIdx] = useState(0);
  const [customMin, setCustomMin] = useState(5);
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [calmness, setCalmness] = useState(5);
  const [stressBefore, setStressBefore] = useState(5);
  const [reflection, setReflection] = useState("");
  const [showLog, setShowLog] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const breathRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft <= 0 && running) {
      setRunning(false);
      setShowLog(true);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, timeLeft]);

  // Breathing cycle: 4s inhale, 4s hold, 4s exhale
  useEffect(() => {
    if (running) {
      let phase = 0;
      const phases: ("inhale" | "hold" | "exhale")[] = ["inhale", "hold", "exhale"];
      breathRef.current = setInterval(() => {
        phase = (phase + 1) % 3;
        setBreathPhase(phases[phase]);
      }, 4000);
    }
    return () => { if (breathRef.current) clearInterval(breathRef.current); };
  }, [running]);

  const startTimer = () => {
    const secs = TIMER_OPTIONS[timerIdx].seconds || customMin * 60;
    setTimeLeft(secs);
    setRunning(true);
    setShowLog(false);
  };

  const stopTimer = () => {
    setRunning(false);
    setShowLog(true);
  };

  const saveSession = () => {
    const dur = TIMER_OPTIONS[timerIdx].seconds > 0 ? TIMER_OPTIONS[timerIdx].seconds / 60 : customMin;
    logSession(dur, calmness, stressBefore, reflection);
    setShowLog(false);
    setReflection("");
  };

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
  const quote = MEDITATION_QUOTES[Math.floor(Math.random() * MEDITATION_QUOTES.length)];

  return (
    <TrackerLayout title="Meditation" icon="🧘">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        {/* Timer & Breathing */}
        <div className="glass-card p-6 text-center space-y-4">
          {running ? (
            <>
              {/* Breathing circle */}
              <motion.div
                className="w-32 h-32 mx-auto rounded-full border-4 border-primary/40 flex items-center justify-center"
                animate={{
                  scale: breathPhase === "inhale" ? 1.3 : breathPhase === "hold" ? 1.3 : 1,
                  borderColor: breathPhase === "inhale" ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.4)",
                }}
                transition={{ duration: 4, ease: "easeInOut" }}
              >
                <span className="text-sm font-body text-muted-foreground capitalize">{breathPhase}</span>
              </motion.div>
              <p className="text-3xl font-display font-bold text-foreground">{formatTime(timeLeft)}</p>
              <p className="text-sm text-muted-foreground font-body italic">"{quote}"</p>
              <button onClick={stopTimer}
                className="px-6 py-2 rounded-lg bg-destructive text-destructive-foreground font-body font-medium text-sm">Stop</button>
            </>
          ) : (
            <>
              <h3 className="font-display font-medium text-foreground">Choose Duration</h3>
              <div className="flex justify-center gap-2 flex-wrap">
                {TIMER_OPTIONS.map((t, i) => (
                  <button key={i} onClick={() => setTimerIdx(i)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-body transition-all ${timerIdx === i ? "bg-primary text-primary-foreground" : "glass-card text-foreground"}`}>
                    {t.label}
                  </button>
                ))}
              </div>
              {timerIdx === 3 && (
                <input type="number" value={customMin} onChange={(e) => setCustomMin(Number(e.target.value))} min={1} max={120}
                  className="w-24 px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm text-center" />
              )}
              <button onClick={startTimer}
                className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm">Begin Meditation</button>
            </>
          )}
        </div>

        {/* Post-session log */}
        {showLog && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card-strong p-5 space-y-3">
            <h3 className="font-display font-medium text-foreground">Session Complete 🌿</h3>
            <div>
              <label className="text-sm font-body text-muted-foreground mb-1 block">Stress Before: {stressBefore}/10</label>
              <input type="range" min={1} max={10} value={stressBefore} onChange={(e) => setStressBefore(Number(e.target.value))} className="w-full accent-primary" />
            </div>
            <div>
              <label className="text-sm font-body text-muted-foreground mb-1 block">Calmness After: {calmness}/10</label>
              <input type="range" min={1} max={10} value={calmness} onChange={(e) => setCalmness(Number(e.target.value))} className="w-full accent-primary" />
            </div>
            <textarea value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="Reflection notes..." rows={2}
              className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <button onClick={saveSession}
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm">Save Session</button>
          </motion.div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-display font-semibold text-foreground">{totalMinutes}m</p>
            <p className="text-xs text-muted-foreground font-body">Total Minutes</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-display font-semibold text-foreground">{totalSessions}</p>
            <p className="text-xs text-muted-foreground font-body">Sessions</p>
          </div>
        </div>
      </motion.div>
    </TrackerLayout>
  );
};

export default MeditationPage;
