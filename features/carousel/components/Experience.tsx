"use client";

import * as THREE from "three";
import React, { useEffect, useMemo, useRef } from "react";
import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";
import { useTexture } from "@react-three/drei";
import randomImg from "@/assets/imgs/animal/bob-brewer-Y3U8HmtxTa8-unsplash.jpg";
import { useControls } from "leva";

export default function Experience() {
  const shaderMaterial = useRef<THREE.ShaderMaterial>(null);
  const { planeHeight, planeWidth } = useControls({
    planeWidth: {
      value: 0.3,
      step: 0.1,
      min: 0.1,
      max: 2,
    },
    planeHeight: {
      value: 1.5,
      step: 0.1,
      min: 0.1,
      max: 2,
    },
  });

  useEffect(() => {
    if (shaderMaterial.current) {
      shaderMaterial.current.uniforms.uRes.value = new THREE.Vector2(
        planeWidth,
        planeHeight
      );
    }
  }, [planeWidth, planeHeight]);

  const texture = useTexture(randomImg.src);

  const uniforms = useMemo(() => {
    const uniforms = {
      uRes: { value: new THREE.Vector2(planeWidth, planeHeight) },
      uImgRes: {
        value: new THREE.Vector2(
          texture.source.data.width,
          texture.source.data.height
        ),
      },
      uTexture: { value: texture },
    };

    return uniforms;
  }, [texture]);

  return (
    <>
      <mesh>
        <planeGeometry args={[planeWidth, planeHeight]} />
        <shaderMaterial
          ref={shaderMaterial}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
    </>
  );
}
