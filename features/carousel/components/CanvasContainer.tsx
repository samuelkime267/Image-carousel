"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva } from "leva";
import { Stats } from "@react-three/drei";

export default function CanvasContainer() {
  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <Leva />
      <Canvas
        camera={{ position: [0, 0, 2], fov: 70, near: 0.001, far: 1000 }}
        dpr={1}
      >
        <Stats />
        <Experience />
      </Canvas>
    </div>
  );
}
