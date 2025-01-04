"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva } from "leva";
// import { Stats } from "@react-three/drei";
import { useMemo } from "react";

export default function CanvasContainer() {
  const { camWidth, camHeight } = useMemo(() => {
    const camWidth = 16;
    const camHeight = 9;

    return { camWidth, camHeight };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <Leva collapsed hidden />
      <Canvas
        dpr={[1, 1.5]}
        orthographic
        camera={{
          position: [0, 0, 1],
          zoom: 1,
          left: -camWidth / 2,
          right: camWidth / 2,
          top: camHeight / 2,
          bottom: -camHeight / 2,
        }}
      >
        {/* <Stats  /> */}
        <Experience />
      </Canvas>
    </div>
  );
}
