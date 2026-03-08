import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import ThemeToggle from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";

type AuthView = "login" | "signup" | "forgot";

const AuthPage = () => {
  const { signIn, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState<AuthView>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const switchView = (v: AuthView) => {
    setView(v);
    setError("");
    setSuccess("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (view === "forgot") {
      const err = await resetPassword(email);
      if (err) setError(err);
      else setSuccess("Check your email for a password reset link!");
      setLoading(false);
      return;
    }

    if (view === "login") {
      const err = await signIn(email, password);
      if (err) setError(err);
    } else {
      if (!name.trim()) { setError("Name is required"); setLoading(false); return; }
      if (password !== confirmPassword) { setError("Passwords do not match"); setLoading(false); return; }
      if (password.length < 6) { setError("Password must be at least 6 characters"); setLoading(false); return; }
      const err = await signUp(email, password, name);
      if (err) setError(err);
      else setSuccess("Check your email to confirm your account!");
    }
    setLoading(false);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <AnimatedBackground />
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card-strong p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-semibold text-foreground mb-2">
            TrackIt 🌿
          </h1>
          <p className="text-muted-foreground font-body text-sm">
            {view === "login" && "Welcome back! Sign in to continue."}
            {view === "signup" && "Create your account and start growing."}
            {view === "forgot" && "Enter your email to reset your password."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {view === "signup" && (
              <motion.div key="name" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                <label className="block text-sm font-body text-muted-foreground mb-1">Display Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Your name" />
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-sm font-body text-muted-foreground mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} placeholder="you@example.com" />
          </div>

          {view !== "forgot" && (
            <>
              <div>
                <label className="block text-sm font-body text-muted-foreground mb-1">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className={inputClass} placeholder="••••••••" />
              </div>

              {view === "login" && (
                <div className="text-right">
                  <button type="button" onClick={() => switchView("forgot")} className="text-xs text-primary hover:underline font-body">
                    Forgot Password?
                  </button>
                </div>
              )}

              {view === "signup" && (
                <div>
                  <label className="block text-sm font-body text-muted-foreground mb-1">Confirm Password</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} className={inputClass} placeholder="••••••••" />
                </div>
              )}
            </>
          )}

          {error && <p className="text-destructive text-sm font-body">{error}</p>}
          {success && <p className="text-primary text-sm font-body">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-body font-medium transition-all duration-300 hover:opacity-90 hover:scale-[1.01] disabled:opacity-50"
          >
            {loading ? "..." : view === "login" ? "Sign In" : view === "signup" ? "Create Account" : "Send Reset Link"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-muted-foreground font-body space-y-1">
          {view === "login" && (
            <p>Don't have an account?{" "}
              <button onClick={() => switchView("signup")} className="text-primary hover:underline font-medium">Sign Up</button>
            </p>
          )}
          {view === "signup" && (
            <p>Already have an account?{" "}
              <button onClick={() => switchView("login")} className="text-primary hover:underline font-medium">Sign In</button>
            </p>
          )}
          {view === "forgot" && (
            <p>Remember your password?{" "}
              <button onClick={() => switchView("login")} className="text-primary hover:underline font-medium">Sign In</button>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
