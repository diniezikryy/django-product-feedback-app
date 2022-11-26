import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import userReducer from "./src/features/user";

export const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
    },

    devTools: process.env.NODE_ENV !== "production",
  });

export const wrapper = createWrapper(makeStore);
