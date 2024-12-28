"use client";

import * as THREE from "three";
import React, { useEffect, useMemo, useRef } from "react";
import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";
import { useTexture } from "@react-three/drei";

type imgType = {
  img: string;
  width: number;
  height: number;
  index: number;
  gap: number;
  length: number;
  activeImgIndex: number;
  activeWidth: number;
  setActiveImgIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function Img({
  height,
  img,
  width,
  gap,
  index,
  length,
  activeImgIndex,
  activeWidth,
  setActiveImgIndex,
}: imgType) {
  const isActive = index === activeImgIndex;
  const shaderMaterial = useRef<THREE.ShaderMaterial>(null);

  useEffect(() => {
    if (shaderMaterial.current && !isActive) {
      shaderMaterial.current.uniforms.uRes.value = new THREE.Vector2(
        width,
        height
      );
    }

    if (shaderMaterial.current && isActive) {
      shaderMaterial.current.uniforms.uRes.value = new THREE.Vector2(
        activeWidth,
        height
      );
    }
  }, [height, width, isActive, activeWidth]);

  const texture = useTexture(img);

  const uniforms = useMemo(() => {
    const uniforms = {
      uRes: { value: new THREE.Vector2(width, height) },
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

  const getPos = (
    isActive: boolean,
    activeImgIndex: number,
    imgIndex: number
  ) => {
    // console.log({ activeImgIndex, imgIndex, length });

    if (isActive) return 0;
    const distanceToFirstImg = activeWidth / 2 + width / 2 + gap;

    // order: 3d, sports, architecture, animals, fashion, food, nature

    if (activeImgIndex > imgIndex) {
      return -(
        distanceToFirstImg -
        (width + gap) * (imgIndex - activeImgIndex + 1)
      );
    } else {
      return (
        distanceToFirstImg +
        (width + gap) * (imgIndex - Math.floor(length / 2) - 1)
      );
    }
  };

  return (
    <>
      <mesh
        onClick={() => {
          // console.log({ index, length, activeImgIndex });

          setActiveImgIndex(index);
        }}
        position={[getPos(isActive, activeImgIndex, index), 0, 0]}
        // position={[
        //   (width + gap) * index - ((width + gap) * (length - 1)) / 2,
        //   0,
        //   0,
        // ]}
      >
        <planeGeometry args={[isActive ? activeWidth : width, height]} />
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
