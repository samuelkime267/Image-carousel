import { createSlice } from "@reduxjs/toolkit";

type groupType = {
  activeGroup: number;
  prevGroup: number;
};

type iterationType = {
  curIteration: number;
  nextIteration: number;
};

type imgType = {
  activeImgIndex: number;
  prevActiveImgIndex: number;
};
type lengthCenterImgType = {
  length: number;
  centerImg: number;
};

type initialStateType = {
  group: groupType;
  iteration: iterationType;
  img: imgType;
  centerImg: number;
  length: number;
  animationFinished: boolean;
};

export const initialState: initialStateType = {
  group: {
    activeGroup: 0,
    prevGroup: 0,
  },
  iteration: {
    curIteration: 0,
    nextIteration: 1,
  },
  img: {
    activeImgIndex: 0,
    prevActiveImgIndex: 0,
  },
  centerImg: 0,
  length: 0,
  animationFinished: false,
};

const activeImgSlice = createSlice({
  name: "activeImg",
  initialState,
  reducers: {
    setGroup(state, action: { payload: groupType }) {
      state.group = action.payload;
    },
    setIteration(state, action: { payload: iterationType }) {
      state.iteration = action.payload;
    },
    setImg(state, action: { payload: imgType }) {
      state.img = action.payload;
    },
    setInitials(state, action: { payload: lengthCenterImgType }) {
      state.centerImg = action.payload.centerImg;
      state.length = action.payload.length;
    },
    setAnimationFinished(state, action: { payload: boolean }) {
      state.animationFinished = action.payload;
    },
    setActiveImgState(state, action: { payload: initialStateType }) {
      state = action.payload;
    },
  },
});

export const {
  setGroup,
  setImg,
  setIteration,
  setInitials,
  setAnimationFinished,
  setActiveImgState,
} = activeImgSlice.actions;

export default activeImgSlice.reducer;
