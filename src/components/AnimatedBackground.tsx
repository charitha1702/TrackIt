import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const AnimatedBackground = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 1500);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" onClick={handleClick}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-water-1/30 via-water-2/20 to-water-3/30" />

      {/* Animated water layers */}
      <div className="absolute inset-[-50px] water-layer opacity-40">
        <div className="absolute inset-0 bg-gradient-to-tr from-water-1/25 via-transparent to-water-2/20 rounded-full scale-150" />
      </div>
      <div className="absolute inset-[-80px] water-layer-2 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-bl from-water-2/20 via-transparent to-water-3/15 rounded-full scale-125" />
      </div>

      {/* Wave SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-10 water-layer"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: "40%" }}
      >
        <path
          fill="currentColor"
          className="text-water-2"
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>

      {/* Dark mode floating particles */}
      <div className="hidden dark:block">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-water-1/50"
            style={{
              left: `${10 + i * 12}%`,
              bottom: "0",
              animation: `float-particle ${15 + i * 3}s ease-in-out infinite`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute w-8 h-8 rounded-full border-2 border-water-2/40"
            style={{ left: ripple.x - 16, top: ripple.y - 16 }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedBackground;
