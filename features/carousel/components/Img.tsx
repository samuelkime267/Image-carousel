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
  group: number;
  activeGroup: number;
  setActiveGroup: React.Dispatch<React.SetStateAction<number>>;
  setIteration: React.Dispatch<
    React.SetStateAction<{
      curIteration: number;
      nextIteration: number;
    }>
  >;
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
  group,
  setActiveGroup,
  setIteration,
  activeGroup,
}: imgType) {
  const isActive = index === activeImgIndex;
  const centerImgIndex = Math.floor(length / 2);
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
    const distanceToFirstImg = activeWidth / 2 + width / 2 + gap;

    if (isActive) {
      if (activeImgIndex === centerImgIndex) {
        return 0;
      }
      if (activeImgIndex > centerImgIndex) {
        return (width + gap) * (imgIndex - centerImgIndex);
      } else {
        return -(width + gap) * (centerImgIndex - imgIndex);
      }
    }

    // order: 3d, sports, architecture, animals, fashion, food, nature
    if (activeImgIndex > imgIndex) {
      return -(
        distanceToFirstImg -
        (width + gap) * (imgIndex - centerImgIndex + 1)
      );
    } else {
      return (
        distanceToFirstImg + (width + gap) * (imgIndex - centerImgIndex - 1)
      );
    }
  };

  return (
    <>
      <mesh
        onClick={() => {
          const clickedGroup = group;
          setIteration((iteration) => {
            const isPosRight = index >= centerImgIndex;
            const curIteration =
              activeGroup === clickedGroup
                ? iteration.curIteration
                : iteration.nextIteration;

            const nextIteration =
              activeGroup === clickedGroup
                ? iteration.curIteration
                : iteration.nextIteration;
            return {
              curIteration,
              nextIteration: isPosRight ? nextIteration + 1 : nextIteration - 1,
            };
          });
          setActiveGroup(group);
          setActiveImgIndex(index);
        }}
        position={[getPos(isActive, activeImgIndex, index), 0, 0]}
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
