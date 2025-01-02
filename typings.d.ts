import React from "react";

export type imgType = {
  img: string;
  width: number;
  height: number;
  imgIndex: number;
  gap: number;
  length: number;
  activeImgIndex: {
    activeImgIndex: number;
    prevActiveImgIndex: number;
  };
  activeWidth: number;
  setActiveImgIndex: React.Dispatch<
    React.SetStateAction<{
      activeImgIndex: number;
      prevActiveImgIndex: number;
    }>
  >;
  group: number;
  activeGroup: {
    activeGroup: number;
    prevGroup: number;
  };
  setActiveGroup: React.Dispatch<
    React.SetStateAction<{
      activeGroup: number;
      prevGroup: number;
    }>
  >;
  setIteration: React.Dispatch<
    React.SetStateAction<{
      curIteration: number;
      nextIteration: number;
    }>
  >;
};
