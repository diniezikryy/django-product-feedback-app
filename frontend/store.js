import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/features/user";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
