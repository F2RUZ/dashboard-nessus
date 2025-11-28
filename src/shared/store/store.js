import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "@/features/auth/model/authSlice";
import { authApi } from "@/features/auth/model/authApi";
import { randomUsersApi } from "@/shared/api/randomUsersApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [randomUsersApi.reducerPath]: randomUsersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(randomUsersApi.middleware),
});

setupListeners(store.dispatch);
