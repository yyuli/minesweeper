import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./boardSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
