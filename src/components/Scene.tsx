import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import type { Mesh } from "three";

function Box() {
  const ref = useRef<Mesh>(null);

  useEffect(() => {
    if (!ref.current) return;
    const tween = gsap.to(ref.current.rotation, { y: Math.PI * 2, duration: 4, repeat: -1, ease: "none" });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [3, 3, 3] }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} />
      <Box />
      <OrbitControls />
    </Canvas>
  );
}
