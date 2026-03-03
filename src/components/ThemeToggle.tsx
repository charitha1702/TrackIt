import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
    }
  }, []);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="glass-card p-2 transition-all duration-500 hover:scale-105"
      aria-label="Toggle theme"
    >
      {dark ? (
        <Sun className="w-5 h-5 text-accent transition-transform duration-500" />
      ) : (
        <Moon className="w-5 h-5 text-primary transition-transform duration-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
