import { useCallback, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const LEAF_PATHS = [
  "M10 0C10 0 5 8 0 10C5 12 10 20 10 20C10 20 15 12 20 10C15 8 10 0 10 0Z",
  "M8 0C8 0 3 6 0 8C3 10 8 16 8 16C8 16 13 10 16 8C13 6 8 0 8 0Z",
];

const ForestBackground2D = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 1500);
  }, []);

  const leaves = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        left: `${5 + ((i * 17) % 90)}%`,
        size: 10 + (i % 3) * 4,
        duration: 18 + (i % 5) * 4,
        delay: i * 1.5,
        path: LEAF_PATHS[i % 2],
        rotate: (i * 30) % 360,
      })),
    []
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: `${(i * 5.2) % 100}%`,
        size: 2 + (i % 3),
        duration: 12 + (i % 6) * 3,
        delay: i * 0.8,
      })),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" onClick={handleClick}>
      {/* Gradient sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(160,30%,88%)] via-[hsl(170,25%,85%)] to-[hsl(180,30%,80%)] dark:from-[hsl(200,35%,10%)] dark:via-[hsl(195,30%,12%)] dark:to-[hsl(190,25%,15%)]" />

      {/* Sunlight glow */}
      <div className="absolute top-[-10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-[hsl(50,60%,85%)] dark:bg-[hsl(45,40%,15%)] opacity-30 blur-3xl" />

      {/* Water layer at bottom */}
      <svg
        className="absolute bottom-0 left-0 w-[200%] opacity-20 dark:opacity-10 water-layer"
        viewBox="0 0 2880 320"
        preserveAspectRatio="none"
        style={{ height: "35%" }}
      >
        <path
          fill="hsl(178, 55%, 30%)"
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L0,320Z"
        />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-[200%] opacity-15 dark:opacity-8 water-layer-2"
        viewBox="0 0 2880 320"
        preserveAspectRatio="none"
        style={{ height: "30%" }}
      >
        <path
          fill="hsl(185, 60%, 40%)"
          d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,208C840,213,960,203,1080,186.7C1200,171,1320,149,1380,138.7L1440,128L1440,320L0,320Z"
        />
      </svg>

      {/* Floating leaves */}
      {leaves.map((leaf) => (
        <motion.svg
          key={leaf.id}
          className="absolute text-[hsl(var(--accent))] opacity-20 dark:opacity-15"
          width={leaf.size}
          height={leaf.size}
          viewBox="0 0 20 20"
          style={{ left: leaf.left, top: "-20px" }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.sin(leaf.id) * 60, 0],
            rotate: [leaf.rotate, leaf.rotate + 360],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <path d={leaf.path} fill="currentColor" />
        </motion.svg>
      ))}

      {/* Light particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[hsl(var(--water-1))] dark:bg-[hsl(var(--water-2))]"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            bottom: 0,
          }}
          animate={{
            y: [0, -window.innerHeight * 0.8],
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute w-8 h-8 rounded-full border-2 border-[hsl(var(--water-2))]/40"
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

export default ForestBackground2D;
