"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva } from "leva";
import { Stats } from "@react-three/drei";

export default function CanvasContainer() {
  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <Leva />
      <Canvas dpr={1}>
        <Stats />
        <Experience />
      </Canvas>
    </div>
  );
}
