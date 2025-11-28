
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const randomUsersApi = createApi({
  reducerPath: "randomUsersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.freeapi.app/api/v1/public/",
  }),
  tagTypes: ["UserList"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page = 1, limit = 15, search = "" }) => {
        let queryString = `randomusers?page=${page}&limit=${limit}`;
        if (search) {
          queryString += `&search=${search}`;
        }
        return queryString;
      },
      providesTags: ["UserList"],
    }),

    addUser: builder.mutation({
      queryFn: async (newUser) => {
        console.log("UI Mock ADD Mutation: New User Data:", newUser);
        return {
          data: {
            success: true,
            message: "User successfully added to UI cache.",
          },
        };
      },
      async onQueryStarted(newUser, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          const mockUserWithFullData = {
            ...newUser,
            login: {
              uuid: Math.random().toString(36).substring(2) + Date.now(),
            },
            picture: {
              thumbnail: "https://via.placeholder.com/48/007bff/ffffff?text=U",
            },
          };

          dispatch(
            randomUsersApi.util.updateQueryData(
              "getUsers",
              { page: 1, limit: 15, search: "" },
              (draft) => {
                if (draft.data?.data) {
                  draft.data.data.unshift(mockUserWithFullData);
                  if (draft.data.data.length > 15) {
                    draft.data.data.pop();
                  }
                }
              }
            )
          );
        } catch (error) {
          console.error("Manual cache update error:", error);
        }
      },
      invalidatesTags: ["UserList"],
    }),

    updateUser: builder.mutation({
      queryFn: async (updatedUser) => {
        console.log("UI Mock UPDATE Mutation: Updated User Data:", updatedUser);
        return {
          data: {
            success: true,
            message: "User successfully updated in UI cache.",
          },
        };
      },
      async onQueryStarted(updatedUser, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            randomUsersApi.util.updateQueryData(
              "getUsers",
              { page: 1, limit: 15, search: "" },
              (draft) => {
                if (draft.data?.data) {
                  const userIndex = draft.data.data.findIndex(
                    (user) => user.login?.uuid === updatedUser.login.uuid
                  );

                  if (userIndex !== -1) {
                    draft.data.data[userIndex] = {
                      ...draft.data.data[userIndex],
                      name: updatedUser.name,
                      email: updatedUser.email,
                      gender: updatedUser.gender,
                    };
                  }
                }
              }
            )
          );
        } catch (error) {
          console.error("Manual cache update error (Update):", error);
        }
      },
      invalidatesTags: ["UserList"],
    }),

    deleteUser: builder.mutation({
      queryFn: async (userId) => {
        console.log("UI Mock DELETE Mutation: User ID:", userId);
        return {
          data: {
            success: true,
            message: `User ${userId} deleted from UI cache.`,
          },
        };
      },
      async onQueryStarted(userId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          randomUsersApi.util.updateQueryData(
            "getUsers",
            { page: 1, limit: 15, search: "" },
            (draft) => {
              const index = draft.data?.data.findIndex(
                (user) => user.login?.uuid === userId
              );
              if (index !== -1) {
                draft.data.data.splice(index, 1);
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["UserList"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = randomUsersApi;
