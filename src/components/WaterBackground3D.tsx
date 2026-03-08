import { useRef, useMemo, useCallback, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const WaterPlane = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.PlaneGeometry(20, 20, 64, 64), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.3;
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z =
        Math.sin(x * 0.4 + t) * 0.15 +
        Math.cos(y * 0.3 + t * 0.8) * 0.12 +
        Math.sin((x + y) * 0.2 + t * 0.5) * 0.08;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geo} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -1.5, 0]}>
      <meshStandardMaterial
        color="#1a7a7a"
        transparent
        opacity={0.35}
        side={THREE.DoubleSide}
        wireframe={false}
        flatShading
      />
    </mesh>
  );
};

const FloatingParticles = () => {
  const count = 40;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = Math.random() * 6 - 1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * 0.1;
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const y = pos.getY(i);
      pos.setY(i, y + Math.sin(t + i) * 0.002);
      pos.setX(i, pos.getX(i) + Math.cos(t * 0.5 + i) * 0.001);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#5eead4" size={0.04} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const Scene = () => (
  <>
    <ambientLight intensity={0.4} />
    <directionalLight position={[5, 5, 5]} intensity={0.3} />
    <WaterPlane />
    <FloatingParticles />
  </>
);

const WaterBackground3D = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 1500);
  }, []);

  return (
    <div className="fixed inset-0 -z-10" onClick={handleClick}>
      <div className="absolute inset-0 bg-gradient-to-br from-water-1/30 via-water-2/20 to-water-3/30" />
      <Canvas
        camera={{ position: [0, 3, 6], fov: 50 }}
        style={{ position: "absolute", inset: 0 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
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

export default WaterBackground3D;
