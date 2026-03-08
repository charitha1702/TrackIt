import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TrackerLayout from "@/components/TrackerLayout";
import { useStudy } from "@/hooks/useStudy";
import { Check, Plus, Trash2, X } from "lucide-react";

const TIMER_PRESETS = [
  { label: "Pomodoro 25m", seconds: 25 * 60 },
  { label: "Focus 50m", seconds: 50 * 60 },
  { label: "Custom", seconds: 0 },
];

const StudyPage = () => {
  const { subjects, sessions, addSubject, addTopic, toggleTopic, logSession, deleteSubject, totalStudyMinutes } = useStudy();

  // Add subject form
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [examName, setExamName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [targetScore, setTargetScore] = useState("");

  // Add topic
  const [addingTopicFor, setAddingTopicFor] = useState<string | null>(null);
  const [topicName, setTopicName] = useState("");

  // Timer
  const [timerMode, setTimerMode] = useState(0);
  const [customMin, setCustomMin] = useState(25);
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [timerSubject, setTimerSubject] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft <= 0 && running) {
      setRunning(false);
      const preset = TIMER_PRESETS[timerMode];
      const dur = preset.seconds > 0 ? preset.seconds / 60 : customMin;
      logSession(timerSubject, dur, `${preset.label || customMin + "m"} session`);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, timeLeft]);

  const startTimer = () => {
    const secs = TIMER_PRESETS[timerMode].seconds || customMin * 60;
    setTimeLeft(secs);
    setRunning(true);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const handleAddSubject = () => {
    if (examName.trim() && subjectName.trim()) {
      addSubject(examName.trim(), subjectName.trim(), Number(targetScore) || 0);
      setExamName(""); setSubjectName(""); setTargetScore(""); setShowAddSubject(false);
    }
  };

  const handleAddTopic = (subjectId: string) => {
    if (topicName.trim()) {
      addTopic(subjectId, topicName.trim());
      setTopicName(""); setAddingTopicFor(null);
    }
  };

  return (
    <TrackerLayout title="Study" icon="📚">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        {/* Timer */}
        <div className="glass-card p-5 text-center space-y-3">
          <h3 className="font-display font-medium text-foreground">Study Timer</h3>
          <div className="flex justify-center gap-2 flex-wrap">
            {TIMER_PRESETS.map((p, i) => (
              <button key={i} onClick={() => setTimerMode(i)}
                className={`px-3 py-1.5 rounded-lg text-sm font-body transition-all ${timerMode === i ? "bg-primary text-primary-foreground" : "glass-card text-foreground"}`}>
                {p.label}
              </button>
            ))}
          </div>
          {timerMode === 2 && (
            <input type="number" value={customMin} onChange={(e) => setCustomMin(Number(e.target.value))} min={1} max={180}
              className="w-24 px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm text-center" />
          )}
          {subjects.length > 0 && (
            <select value={timerSubject || ""} onChange={(e) => setTimerSubject(e.target.value || null)}
              className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm">
              <option value="">No subject</option>
              {subjects.map((s) => <option key={s.id} value={s.id}>{s.subject_name}</option>)}
            </select>
          )}
          <p className="text-4xl font-display font-bold text-foreground">{running ? formatTime(timeLeft) : "Ready"}</p>
          <div className="flex justify-center gap-2">
            {!running ? (
              <button onClick={startTimer} className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm">Start</button>
            ) : (
              <button onClick={() => setRunning(false)} className="px-6 py-2 rounded-lg bg-destructive text-destructive-foreground font-body font-medium text-sm">Stop</button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-display font-semibold text-foreground">{Math.round(totalStudyMinutes / 60)}h</p>
            <p className="text-xs text-muted-foreground font-body">Total Study</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-display font-semibold text-foreground">{sessions.length}</p>
            <p className="text-xs text-muted-foreground font-body">Sessions</p>
          </div>
        </div>

        {/* Subjects & Topics */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-medium text-foreground text-lg">Subjects</h3>
            <button onClick={() => setShowAddSubject(!showAddSubject)}
              className="glass-card p-2 text-muted-foreground hover:text-foreground transition-colors">
              {showAddSubject ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          </div>

          <AnimatePresence>
            {showAddSubject && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                className="glass-card-strong p-4 space-y-2">
                <input value={examName} onChange={(e) => setExamName(e.target.value)} placeholder="Exam name"
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm placeholder:text-muted-foreground/60" />
                <input value={subjectName} onChange={(e) => setSubjectName(e.target.value)} placeholder="Subject name"
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm placeholder:text-muted-foreground/60" />
                <input value={targetScore} onChange={(e) => setTargetScore(e.target.value)} placeholder="Target score (optional)" type="number"
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm placeholder:text-muted-foreground/60" />
                <button onClick={handleAddSubject}
                  className="w-full py-2 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm">Add Subject</button>
              </motion.div>
            )}
          </AnimatePresence>

          {subjects.map((sub) => (
            <div key={sub.id} className="glass-card p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body font-medium text-foreground">{sub.subject_name}</p>
                  <p className="text-xs text-muted-foreground font-body">{sub.exam_name}{sub.target_score ? ` • Target: ${sub.target_score}` : ""}</p>
                </div>
                <button onClick={() => deleteSubject(sub.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {sub.topics?.map((topic) => (
                <label key={topic.id} className="flex items-center gap-2 text-sm font-body cursor-pointer">
                  <button onClick={() => toggleTopic(topic.id, !topic.completed)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      topic.completed ? "bg-success border-success" : "border-border"}`}>
                    {topic.completed && <Check className="w-3 h-3 text-success-foreground" />}
                  </button>
                  <span className={topic.completed ? "line-through text-muted-foreground" : "text-foreground"}>{topic.name}</span>
                </label>
              ))}
              {addingTopicFor === sub.id ? (
                <div className="flex gap-2">
                  <input value={topicName} onChange={(e) => setTopicName(e.target.value)} placeholder="Topic name"
                    className="flex-1 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm" />
                  <button onClick={() => handleAddTopic(sub.id)} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-body">Add</button>
                </div>
              ) : (
                <button onClick={() => setAddingTopicFor(sub.id)}
                  className="text-sm text-primary font-body hover:underline">+ Add topic</button>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </TrackerLayout>
  );
};

export default StudyPage;
