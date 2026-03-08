import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import ThemeToggle from "@/components/ThemeToggle";

const ResetPasswordPage = () => {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setIsRecovery(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (password !== confirmPassword) { setError("Passwords do not match"); return; }
    setLoading(true);
    const err = await updatePassword(password);
    if (err) {
      setError(err);
    } else {
      setSuccess("Password updated! Redirecting to login...");
      setTimeout(() => navigate("/"), 2000);
    }
    setLoading(false);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <AnimatedBackground />
      <div className="absolute top-4 right-4"><ThemeToggle /></div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="glass-card-strong p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-semibold text-foreground mb-2">Reset Password 🔑</h1>
          <p className="text-muted-foreground font-body text-sm">Enter your new password below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-body text-muted-foreground mb-1">New Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className={inputClass} placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-sm font-body text-muted-foreground mb-1">Confirm New Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} className={inputClass} placeholder="••••••••" />
          </div>

          {error && <p className="text-destructive text-sm font-body">{error}</p>}
          {success && <p className="text-primary text-sm font-body">{success}</p>}

          <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-body font-medium transition-all duration-300 hover:opacity-90 disabled:opacity-50">
            {loading ? "..." : "Update Password"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
