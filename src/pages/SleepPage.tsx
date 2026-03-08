import { useState } from "react";
import { motion } from "framer-motion";
import TrackerLayout from "@/components/TrackerLayout";
import { useSleep } from "@/hooks/useSleep";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const SleepPage = () => {
  const { log, weekLogs, saveSleep, avgSleep } = useSleep();
  const [bedtime, setBedtime] = useState(log?.bedtime || "");
  const [wakeTime, setWakeTime] = useState(log?.wake_time || "");
  const [quality, setQuality] = useState(log?.sleep_quality || 5);
  const [badDreams, setBadDreams] = useState(log?.bad_dreams || false);
  const [dreamNotes, setDreamNotes] = useState(log?.dream_notes || "");
  const [energy, setEnergy] = useState(log?.morning_energy || 5);

  const calcHours = (bed: string, wake: string) => {
    if (!bed || !wake) return 0;
    const [bh, bm] = bed.split(":").map(Number);
    const [wh, wm] = wake.split(":").map(Number);
    let diff = (wh * 60 + wm) - (bh * 60 + bm);
    if (diff < 0) diff += 24 * 60;
    return Math.round((diff / 60) * 10) / 10;
  };

  const handleSave = () => {
    const hours = calcHours(bedtime, wakeTime);
    saveSleep({
      bedtime, wake_time: wakeTime, hours_slept: hours,
      sleep_quality: quality, bad_dreams: badDreams,
      dream_notes: dreamNotes, morning_energy: energy,
    });
  };

  const chartData = weekLogs.map((l) => ({
    day: new Date(l.date).toLocaleDateString("en", { weekday: "short" }),
    hours: Number(l.hours_slept),
  }));

  return (
    <TrackerLayout title="Sleep" icon="😴">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="glass-card p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-body text-muted-foreground mb-1 block">Bedtime</label>
              <input type="time" value={bedtime} onChange={(e) => setBedtime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
            <div>
              <label className="text-sm font-body text-muted-foreground mb-1 block">Wake-up</label>
              <input type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
          </div>
          {bedtime && wakeTime && (
            <p className="text-sm font-body text-muted-foreground text-center">
              💤 {calcHours(bedtime, wakeTime)} hours of sleep
            </p>
          )}
          <div>
            <label className="text-sm font-body text-muted-foreground mb-1 block">Sleep Quality: {quality}/10</label>
            <input type="range" min={1} max={10} value={quality} onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-primary" />
          </div>
          <div>
            <label className="text-sm font-body text-muted-foreground mb-1 block">Morning Energy: {energy}/10</label>
            <input type="range" min={1} max={10} value={energy} onChange={(e) => setEnergy(Number(e.target.value))}
              className="w-full accent-primary" />
          </div>
          <label className="flex items-center gap-2 text-sm font-body text-foreground cursor-pointer">
            <input type="checkbox" checked={badDreams} onChange={(e) => setBadDreams(e.target.checked)}
              className="rounded border-border accent-primary" />
            Bad dreams?
          </label>
          <textarea value={dreamNotes} onChange={(e) => setDreamNotes(e.target.value)}
            placeholder="Dream notes (optional)" rows={2}
            className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40" />
          <button onClick={handleSave}
            className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm transition-all hover:opacity-90">
            Save Sleep Log
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-display font-semibold text-foreground">{avgSleep}h</p>
            <p className="text-xs text-muted-foreground font-body">Avg Sleep (7 days)</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-display font-semibold text-foreground">{weekLogs.length}</p>
            <p className="text-xs text-muted-foreground font-body">Days Tracked</p>
          </div>
        </div>

        {/* Weekly Chart */}
        {chartData.length > 0 && (
          <div className="glass-card p-5">
            <h3 className="font-display font-medium text-foreground mb-3">Weekly Sleep</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={chartData}>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </motion.div>
    </TrackerLayout>
  );
};

export default SleepPage;
