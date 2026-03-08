import { useState } from "react";
import { motion } from "framer-motion";
import TrackerLayout from "@/components/TrackerLayout";
import { useScreenTime } from "@/hooks/useScreenTime";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ScreenTimePage = () => {
  const { log, weekLogs, saveScreenTime } = useScreenTime();
  const [total, setTotal] = useState(log?.total_hours || 0);
  const [social, setSocial] = useState(log?.social_media_hours || 0);
  const [study, setStudy] = useState(log?.study_hours || 0);

  const handleSave = () => {
    saveScreenTime({ total_hours: total, social_media_hours: social, study_hours: study });
  };

  const chartData = weekLogs.map((l) => ({
    day: new Date(l.date).toLocaleDateString("en", { weekday: "short" }),
    total: Number(l.total_hours),
    social: Number(l.social_media_hours),
  }));

  const overuse = total > 8;

  return (
    <TrackerLayout title="Screen Time" icon="📱">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="glass-card p-5 space-y-4">
          <div>
            <label className="text-sm font-body text-muted-foreground mb-1 block">Total Screen Hours: {total}h</label>
            <input type="range" min={0} max={16} step={0.5} value={total}
              onChange={(e) => setTotal(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <div>
            <label className="text-sm font-body text-muted-foreground mb-1 block">Social Media: {social}h</label>
            <input type="range" min={0} max={12} step={0.5} value={social}
              onChange={(e) => setSocial(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <div>
            <label className="text-sm font-body text-muted-foreground mb-1 block">Study Screen Time: {study}h</label>
            <input type="range" min={0} max={12} step={0.5} value={study}
              onChange={(e) => setStudy(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <button onClick={handleSave}
            className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm">Save</button>
        </div>

        {overuse && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card-strong p-4 text-center border-destructive/30 border">
            <p className="text-sm font-body text-destructive font-medium">⚠️ High screen time detected. Consider taking breaks!</p>
          </motion.div>
        )}

        {chartData.length > 0 && (
          <div className="glass-card p-5">
            <h3 className="font-display font-medium text-foreground mb-3">Weekly Usage</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={chartData}>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Total" />
                <Bar dataKey="social" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Social" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </motion.div>
    </TrackerLayout>
  );
};

export default ScreenTimePage;
