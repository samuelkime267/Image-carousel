import { AppDispatch } from "../store";
import { setInitials, setImg } from "./activeImg.slice";

import { sections } from "@/data/sections.data";

export const setInitialsAction = () => {
  return (dispatch: AppDispatch) => {
    const length = sections.length;
    const arrCenterLength = length - 1;
    const centerImg =
      arrCenterLength % 2 === 0
        ? arrCenterLength / 2
        : Math.floor(arrCenterLength / 2) + 1;
    dispatch(setInitials({ centerImg, length }));
    dispatch(
      setImg({ activeImgIndex: centerImg, prevActiveImgIndex: centerImg })
    );
  };
};
