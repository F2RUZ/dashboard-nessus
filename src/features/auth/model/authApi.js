// src/features/auth/model/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Fake URL
  endpoints: (builder) => ({
    login: builder.mutation({
      queryFn: async ({ email, password }) => {
        // 1 soniya kutish
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (email && password) {
          const fakeToken = "fake_jwt_token_" + Date.now();
          return { data: { token: fakeToken, user: { email } } };
        }
        return { error: { status: 400, data: "Email yoki parol xato!" } };
      },
    }),
    register: builder.mutation({
      queryFn: async ({ email, password }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (email && password) {
          const fakeToken = "fake_jwt_token_" + Date.now();
          return { data: { token: fakeToken, user: { email } } };
        }
        return { error: { status: 400, data: "Xatolik yuz berdi" } };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
