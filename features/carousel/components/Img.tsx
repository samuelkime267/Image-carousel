"use client";

import * as THREE from "three";
import React, { useRef } from "react";
import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";
import useHandleImg from "@/utils/useHandleImg";
import { imgType } from "@/typings";

export default function Img(props: imgType) {
  const shaderMaterial = useRef<THREE.ShaderMaterial>(null);
  const planeMesh = useRef<THREE.Mesh>(null);
  const { handleMeshClick, uniforms, handleMouseEnter, handleMouseLeave } =
    useHandleImg(props, shaderMaterial, planeMesh);

  return (
    <>
      <mesh
        ref={planeMesh}
        onClick={handleMeshClick}
        onPointerEnter={handleMouseEnter}
        onPointerLeave={handleMouseLeave}
        position={[0, 0, 0]}
      >
        <planeGeometry args={[1, props.height]} />
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
