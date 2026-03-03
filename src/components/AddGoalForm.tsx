import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

interface AddGoalFormProps {
  onAdd: (title: string, description: string, deadline: string | null) => Promise<string | null>;
}

const AddGoalForm = ({ onAdd }: AddGoalFormProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    await onAdd(title.trim(), description.trim(), deadline || null);
    setTitle("");
    setDescription("");
    setDeadline("");
    setOpen(false);
    setLoading(false);
  };

  return (
    <div>
      <AnimatePresence>
        {!open ? (
          <motion.button
            key="trigger"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(true)}
            className="w-full glass-card p-4 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground font-body transition-all duration-300 hover:scale-[1.01]"
          >
            <Plus className="w-5 h-5" /> Add New Goal
          </motion.button>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="glass-card-strong p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display font-medium text-foreground">New Goal</h3>
              <button type="button" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Goal title *"
              required
              maxLength={200}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-sm"
            />

            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              maxLength={500}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-sm"
            />

            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-sm"
            />

            <button
              type="submit"
              disabled={loading || !title.trim()}
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm transition-all duration-300 hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Goal"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddGoalForm;
