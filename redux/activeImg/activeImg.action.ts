import { AppDispatch } from "../store";
import {
  setInitials,
  setImg,
  initialState,
  setActiveImgState,
} from "./activeImg.slice";

import { sections } from "@/data/sections.data";

const length = sections.length;
const arrCenterLength = length - 1;
const centerImg =
  arrCenterLength % 2 === 0
    ? arrCenterLength / 2
    : Math.floor(arrCenterLength / 2) + 1;

export const setInitialsAction = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setInitials({ centerImg, length }));
    dispatch(
      setImg({ activeImgIndex: centerImg, prevActiveImgIndex: centerImg })
    );
  };
};

export const resetActiveImgAction = () => {
  return (dispatch: AppDispatch) => {
    const state = { ...initialState };
    state.length = length;
    state.centerImg = centerImg;
    state.img = { activeImgIndex: centerImg, prevActiveImgIndex: centerImg };

    dispatch(setActiveImgState(state));
  };
};
