import { createSlice } from "@reduxjs/toolkit";

type loadingType = "initial" | "page-transition";

type initialStateType = {
  isLoading: boolean;
  loadingType: loadingType;
  showLoader: boolean;
};

const initialState: initialStateType = {
  isLoading: true,
  loadingType: "initial",
  showLoader: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLoadingType: (state, action: { payload: loadingType }) => {
      state.loadingType = action.payload;
    },
    setPageTransitionStart(state) {
      state.loadingType = "page-transition";
      state.showLoader = true;
    },
    setShowLoader(state, action: { payload: boolean }) {
      state.showLoader = action.payload;
    },
  },
});

export const { setIsLoading, setPageTransitionStart, setShowLoader } =
  loaderSlice.actions;
export default loaderSlice.reducer;
