import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TrackerLayout from "@/components/TrackerLayout";
import { useMeditation } from "@/hooks/useMeditation";
import { Volume2, VolumeX } from "lucide-react";

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

const SOUND_OPTIONS = [
  { key: "none", label: "None", emoji: "🔇" },
  { key: "alpha", label: "Alpha Waves", emoji: "🧠" },
  { key: "beta", label: "Beta Waves", emoji: "⚡" },
  { key: "forest", label: "Forest", emoji: "🌲" },
];

// Generate calming tones using Web Audio API
const createOscillator = (ctx: AudioContext, type: string) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  gain.gain.value = 0.08;
  osc.connect(gain);
  gain.connect(ctx.destination);

  if (type === "alpha") {
    // Alpha: binaural-style gentle hum at ~10Hz difference
    osc.type = "sine";
    osc.frequency.value = 200;
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    gain2.gain.value = 0.08;
    osc2.type = "sine";
    osc2.frequency.value = 210;
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start();
    return { nodes: [osc, osc2, gain, gain2], start: () => osc.start(), stop: () => { osc.stop(); osc2.stop(); } };
  } else if (type === "beta") {
    osc.type = "sine";
    osc.frequency.value = 300;
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    gain2.gain.value = 0.06;
    osc2.type = "sine";
    osc2.frequency.value = 320;
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start();
    return { nodes: [osc, osc2, gain, gain2], start: () => osc.start(), stop: () => { osc.stop(); osc2.stop(); } };
  } else {
    // Forest: low brown noise approximation
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.15;
    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    return { nodes: [noise, noiseGain], start: () => noise.start(), stop: () => noise.stop() };
  }
};

const MeditationPage = () => {
  const { logSession, totalMinutes, totalSessions } = useMeditation();
  const [timerIdx, setTimerIdx] = useState(0);
  const [customMin, setCustomMin] = useState(5);
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [calmness, setCalmness] = useState(5);
  const [stressBefore, setStressBefore] = useState(5);
  const [reflection, setReflection] = useState("");
  const [showLog, setShowLog] = useState(false);
  const [soundType, setSoundType] = useState("none");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const breathRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<{ stop: () => void } | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft <= 0 && running) {
      setRunning(false);
      setShowLog(true);
      stopSound();
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, timeLeft]);

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

  const startSound = (type: string) => {
    stopSound();
    if (type === "none") return;
    try {
      const ctx = new AudioContext();
      ctxRef.current = ctx;
      const sound = createOscillator(ctx, type);
      sound.start();
      audioRef.current = sound;
    } catch {}
  };

  const stopSound = () => {
    try { audioRef.current?.stop(); } catch {}
    try { ctxRef.current?.close(); } catch {}
    audioRef.current = null;
    ctxRef.current = null;
  };

  const startTimer = () => {
    const secs = TIMER_OPTIONS[timerIdx].seconds || customMin * 60;
    setTimeLeft(secs);
    setRunning(true);
    setShowLog(false);
    startSound(soundType);
  };

  const stopTimer = () => {
    setRunning(false);
    setShowLog(true);
    stopSound();
  };

  const saveSession = () => {
    const dur = TIMER_OPTIONS[timerIdx].seconds > 0 ? TIMER_OPTIONS[timerIdx].seconds / 60 : customMin;
    logSession(dur, calmness, stressBefore, reflection);
    setShowLog(false);
    setReflection("");
  };

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
  const quote = MEDITATION_QUOTES[Math.floor(Date.now() / 60000) % MEDITATION_QUOTES.length];

  const totalSecs = TIMER_OPTIONS[timerIdx].seconds || customMin * 60;
  const progressPercent = running ? ((totalSecs - timeLeft) / totalSecs) * 100 : 0;

  return (
    <TrackerLayout title="Meditation" icon="🧘">
      {/* Dim overlay when running */}
      <AnimatePresence>
        {running && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/40 backdrop-blur-sm z-40 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 relative z-50">
        {/* Timer & Breathing */}
        <div className="glass-card p-6 text-center space-y-4">
          {running ? (
            <>
              {/* Breathing circle with progress ring */}
              <div className="relative w-40 h-40 mx-auto">
                {/* Progress ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--secondary))" strokeWidth="3" />
                  <motion.circle
                    cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--primary))" strokeWidth="3"
                    strokeDasharray={283}
                    animate={{ strokeDashoffset: 283 - (283 * progressPercent) / 100 }}
                    strokeLinecap="round"
                  />
                </svg>
                <motion.div
                  className="absolute inset-4 rounded-full border-2 border-primary/30 flex flex-col items-center justify-center"
                  animate={{
                    scale: breathPhase === "inhale" ? 1.15 : breathPhase === "hold" ? 1.15 : 0.9,
                    borderColor: breathPhase === "inhale" ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.3)",
                  }}
                  transition={{ duration: 4, ease: "easeInOut" }}
                >
                  <span className="text-xs font-body text-muted-foreground capitalize mb-1">{breathPhase}</span>
                  <span className="text-2xl font-display font-bold text-foreground">{formatTime(timeLeft)}</span>
                </motion.div>
              </div>
              <p className="text-sm text-muted-foreground font-body italic">"{quote}"</p>
              <button onClick={stopTimer}
                className="px-6 py-2.5 rounded-lg bg-destructive text-destructive-foreground font-body font-medium text-sm hover:opacity-90 transition-opacity">
                End Session
              </button>
            </>
          ) : (
            <>
              <h3 className="font-display font-medium text-foreground">Choose Duration</h3>
              <div className="flex justify-center gap-2 flex-wrap">
                {TIMER_OPTIONS.map((t, i) => (
                  <button key={i} onClick={() => setTimerIdx(i)}
                    className={`px-4 py-2 rounded-lg text-sm font-body transition-all ${timerIdx === i ? "bg-primary text-primary-foreground" : "glass-card text-foreground hover:scale-105"}`}>
                    {t.label}
                  </button>
                ))}
              </div>
              {timerIdx === 3 && (
                <input type="number" value={customMin} onChange={(e) => setCustomMin(Number(e.target.value))} min={1} max={120}
                  className="w-24 px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm text-center" />
              )}

              {/* Sound options */}
              <div>
                <p className="text-sm font-body text-muted-foreground mb-2">Background Sound</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  {SOUND_OPTIONS.map((s) => (
                    <button key={s.key} onClick={() => setSoundType(s.key)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-body transition-all flex items-center gap-1 ${
                        soundType === s.key ? "bg-primary text-primary-foreground" : "glass-card text-foreground hover:scale-105"}`}>
                      <span>{s.emoji}</span> {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={startTimer}
                className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm hover:opacity-90 transition-opacity">
                Begin Meditation
              </button>
            </>
          )}
        </div>

        {/* Post-session log */}
        <AnimatePresence>
          {showLog && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass-card-strong p-5 space-y-3">
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
                className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm hover:opacity-90 transition-opacity">
                Save Session
              </button>
            </motion.div>
          )}
        </AnimatePresence>

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
