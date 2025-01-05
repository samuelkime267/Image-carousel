import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  isLoading: boolean;
  showLoader: boolean;
};

const initialState: initialStateType = {
  isLoading: true,
  showLoader: true,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPageTransitionStart(state) {
      state.showLoader = true;
      state.isLoading = true;
    },
    setPageTransitionEnd(state) {
      state.showLoader = false;
      state.isLoading = false;
    },
    setShowLoader(state, action: { payload: boolean }) {
      state.showLoader = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setPageTransitionStart,
  setShowLoader,
  setPageTransitionEnd,
} = loaderSlice.actions;
export default loaderSlice.reducer;
