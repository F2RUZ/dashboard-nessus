"use client";

import { configureStore } from "@reduxjs/toolkit";
import { randomUsersApi } from "../api/randomUsersApi";

export const store = configureStore({
  reducer: {
    [randomUsersApi.reducerPath]: randomUsersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(randomUsersApi.middleware),
});
