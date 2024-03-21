import { configureStore } from "@reduxjs/toolkit";
import counterFramer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    framer: counterFramer,
  },
});
