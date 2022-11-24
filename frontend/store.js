import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./src/features/user";
import { setupListeners } from "@reduxjs/toolkit/query";
import { feedbacksAPI } from "./src/services/feedbacks";

const store = configureStore({
  reducer: {
    user: userReducer,
    [feedbacksAPI.reducerPath]: feedbacksAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feedbacksAPI.middleware),

  devTools: process.env.NODE_ENV !== "production",
});

export default store;
