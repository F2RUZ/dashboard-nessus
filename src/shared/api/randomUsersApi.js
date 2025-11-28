// src/shared/api/randomUsersApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const randomUsersApi = createApi({
  reducerPath: "randomUsersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.freeapi.app/api/v1/public/",
  }),
  tagTypes: ["UserList"],
  endpoints: (builder) => ({
    // 'search' parametrini qabul qiladigan qilib yangilandi
    getUsers: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => {
        // Asosiy so'rov satri
        let queryString = `randomusers?page=${page}&limit=${limit}`;

        // Agar qidiruv so'zi bo'lsa, uni so'rovga qo'shamiz (real API uchun)
        if (search) {
          // Real API uchun query: randomusers?page=1&limit=10&search=john
          queryString += `&search=${search}`;
        }

        return queryString;
      },
      providesTags: ["UserList"],
    }),
  }),
});

export const { useGetUsersQuery } = randomUsersApi;
