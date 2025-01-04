import { configureStore } from "@reduxjs/toolkit";
import activeImgSlice from "./activeImg/activeImg.slice";

const store = configureStore({
  reducer: {
    activeImg: activeImgSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
