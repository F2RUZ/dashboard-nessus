import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const randomUsersApi = createApi({
  reducerPath: "randomUsersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.freeapi.app/api/v1/public/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page = 1, limit = 15 }) =>
        `randomusers?page=${page}&limit=${limit}`,
    }),
  }),
});

export const { useGetUsersQuery } = randomUsersApi;
