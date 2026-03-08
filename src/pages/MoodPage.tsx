import { useState } from "react";
import { motion } from "framer-motion";
import TrackerLayout from "@/components/TrackerLayout";
import { useMood, MOODS } from "@/hooks/useMood";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const moodToNum: Record<string, number> = { happy: 5, good: 4, neutral: 3, low: 2, stressed: 1 };

const MoodPage = () => {
  const { log, weekLogs, saveMood, mostFrequent } = useMood();
  const [notes, setNotes] = useState(log?.notes || "");
  const [stress, setStress] = useState(log?.stress_level || 5);
  const [energy, setEnergy] = useState(log?.energy_level || 5);

  const chartData = weekLogs.map((l) => ({
    day: new Date(l.date).toLocaleDateString("en", { weekday: "short" }),
    mood: moodToNum[l.mood] || 3,
  }));

  const freqEmoji = MOODS.find((m) => m.value === mostFrequent)?.emoji || "😐";

  return (
    <TrackerLayout title="Mood" icon="🙂">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        {/* Mood selector */}
        <div className="glass-card p-5">
          <h3 className="font-display font-medium text-foreground mb-3">How are you feeling?</h3>
          <div className="flex justify-center gap-3 flex-wrap">
            {MOODS.map((m) => (
              <button
                key={m.value}
                onClick={() => saveMood({ mood: m.value })}
                className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                  log?.mood === m.value
                    ? "glass-card-strong scale-110 ring-2 ring-primary/40"
                    : "glass-card hover:scale-105"
                }`}
              >
                <span className="text-2xl mb-1">{m.emoji}</span>
                <span className="text-xs font-body text-muted-foreground">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div className="glass-card p-5 space-y-4">
          <div>
            <label className="text-sm font-body text-muted-foreground mb-1 block">Stress Level: {stress}/10</label>
            <input type="range" min={1} max={10} value={stress}
              onChange={(e) => { setStress(Number(e.target.value)); saveMood({ stress_level: Number(e.target.value) }); }}
              className="w-full accent-primary" />
          </div>
          <div>
            <label className="text-sm font-body text-muted-foreground mb-1 block">Energy Level: {energy}/10</label>
            <input type="range" min={1} max={10} value={energy}
              onChange={(e) => { setEnergy(Number(e.target.value)); saveMood({ energy_level: Number(e.target.value) }); }}
              className="w-full accent-primary" />
          </div>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
            onBlur={() => saveMood({ notes })}
            placeholder="How's your day going?" rows={2}
            className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>

        {/* Insights */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card p-4 text-center">
            <p className="text-2xl">{freqEmoji}</p>
            <p className="text-xs text-muted-foreground font-body">Most Frequent</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-display font-semibold text-foreground">{weekLogs.length}</p>
            <p className="text-xs text-muted-foreground font-body">Days Tracked</p>
          </div>
        </div>

        {/* Weekly Mood Chart */}
        {chartData.length > 0 && (
          <div className="glass-card p-5">
            <h3 className="font-display font-medium text-foreground mb-3">Weekly Mood Trend</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={chartData}>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="mood" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </motion.div>
    </TrackerLayout>
  );
};

export default MoodPage;
