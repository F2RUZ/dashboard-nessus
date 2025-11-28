// src/shared/api/randomUsersApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const randomUsersApi = createApi({
  reducerPath: "randomUsersApi",
  // Haqiqiy API: FreeAPI.app
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.freeapi.app/api/v1/public/",
  }),
  // Tags (keshni boshqarish uchun)
  tagTypes: ["UserList"],
  endpoints: (builder) => ({
    // Foydalanuvchilarni yuklash querysi (page va limit parametrlarini oladi)
    getUsers: builder.query({
      query: ({ page = 1, limit = 15 }) =>
        // API talabiga mos so'rov: /randomusers?page=1&limit=15
        `randomusers?page=${page}&limit=${limit}`,

      // Bu query natijasini 'UserList' tagi bilan belgilaymiz
      providesTags: ["UserList"],
    }),
  }),
});

export const { useGetUsersQuery } = randomUsersApi;
