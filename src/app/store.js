import { configureStore } from "@reduxjs/toolkit";
import counterFramer from "../features/counter/counterSlice";
import postsReducer from "../features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    framer: counterFramer,
  },
});
