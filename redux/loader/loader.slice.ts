import { createSlice } from "@reduxjs/toolkit";

type loadingType = "initial" | "page-transition";

type initialStateType = {
  isLoading: boolean;
  loadingType: loadingType;
};

const initialState: initialStateType = {
  isLoading: true,
  loadingType: "initial",
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
      state.isLoading = true;
    },
  },
});

export const { setIsLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
