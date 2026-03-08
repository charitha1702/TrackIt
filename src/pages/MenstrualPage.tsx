import { useState } from "react";
import { motion } from "framer-motion";
import TrackerLayout from "@/components/TrackerLayout";
import { useMenstrual, SYMPTOMS } from "@/hooks/useMenstrual";

const FLOW_OPTIONS = ["light", "medium", "heavy"];
const MOOD_OPTIONS = [
  { value: "happy", emoji: "😊" },
  { value: "neutral", emoji: "😐" },
  { value: "low", emoji: "😔" },
  { value: "irritable", emoji: "😤" },
  { value: "anxious", emoji: "😰" },
];

const MenstrualPage = () => {
  const { log, saveLog, avgCycleLength, mostCommonSymptom } = useMenstrual();
  const [periodStart, setPeriodStart] = useState(log?.period_start || "");
  const [periodEnd, setPeriodEnd] = useState(log?.period_end || "");
  const [flow, setFlow] = useState(log?.flow_intensity || "medium");
  const [mood, setMood] = useState(log?.mood || "neutral");
  const [symptoms, setSymptoms] = useState<string[]>(log?.symptoms || []);
  const [notes, setNotes] = useState(log?.notes || "");

  const toggleSymptom = (s: string) => {
    const updated = symptoms.includes(s) ? symptoms.filter((x) => x !== s) : [...symptoms, s];
    setSymptoms(updated);
  };

  const handleSave = () => {
    saveLog({
      period_start: periodStart || null,
      period_end: periodEnd || null,
      flow_intensity: flow,
      mood,
      symptoms,
      notes,
    });
  };

  return (
    <TrackerLayout title="Menstrual Cycle" icon="🌸">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        {/* Period dates */}
        <div className="glass-card p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-body text-muted-foreground mb-1 block">Period Start</label>
              <input type="date" value={periodStart} onChange={(e) => setPeriodStart(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm" />
            </div>
            <div>
              <label className="text-sm font-body text-muted-foreground mb-1 block">Period End</label>
              <input type="date" value={periodEnd} onChange={(e) => setPeriodEnd(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm" />
            </div>
          </div>

          {/* Flow */}
          <div>
            <label className="text-sm font-body text-muted-foreground mb-2 block">Flow Intensity</label>
            <div className="flex gap-2">
              {FLOW_OPTIONS.map((f) => (
                <button key={f} onClick={() => setFlow(f)}
                  className={`flex-1 py-2 rounded-lg text-sm font-body capitalize transition-all ${
                    flow === f ? "bg-primary text-primary-foreground" : "glass-card text-foreground"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div>
            <label className="text-sm font-body text-muted-foreground mb-2 block">Mood</label>
            <div className="flex gap-2 justify-center">
              {MOOD_OPTIONS.map((m) => (
                <button key={m.value} onClick={() => setMood(m.value)}
                  className={`p-2 rounded-xl text-2xl transition-all ${
                    mood === m.value ? "glass-card-strong scale-110 ring-2 ring-primary/40" : "glass-card"}`}>
                  {m.emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Symptoms */}
        <div className="glass-card p-5">
          <h3 className="font-display font-medium text-foreground mb-3">Symptoms</h3>
          <div className="flex flex-wrap gap-2">
            {SYMPTOMS.map((s) => (
              <button key={s} onClick={() => toggleSymptom(s)}
                className={`px-3 py-1.5 rounded-full text-sm font-body transition-all ${
                  symptoms.includes(s) ? "bg-primary text-primary-foreground" : "glass-card text-foreground"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="glass-card p-5 space-y-3">
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional notes..." rows={2}
            className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40" />
          <button onClick={handleSave}
            className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm">Save Log</button>
        </div>

        {/* Insights */}
        <div className="glass-card p-5">
          <h3 className="font-display font-medium text-foreground mb-3">Cycle Insights</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <p className="text-2xl font-display font-semibold text-foreground">{avgCycleLength}d</p>
              <p className="text-xs text-muted-foreground font-body">Avg Cycle Length</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-body font-medium text-foreground">{mostCommonSymptom}</p>
              <p className="text-xs text-muted-foreground font-body">Most Common Symptom</p>
            </div>
          </div>
        </div>
      </motion.div>
    </TrackerLayout>
  );
};

export default MenstrualPage;
