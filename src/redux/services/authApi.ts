import { UserLogin } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import { adminApi } from "./adminApi";
import baseQueryWithReauth from "./baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    login: build.mutation<UserLogin, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
        credentials: "include",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            adminApi.endpoints.profile.initiate(undefined, {
              forceRefetch: true,
            }),
          );
        } catch (error) {
          console.error(error);
        }
      },
      invalidatesTags: ["Auth"],
    }),
    updatePassword: build.mutation<
      UserLogin,
      {
        email: string;
        password: string;
        newPassword: string;
        confirmPassword: string;
      }
    >({
      query: (body) => ({
        url: "/auth/update-password",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Auth"],
    }),

    logout: build.mutation<{ message: string; statusCode: number }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useUpdatePasswordMutation,
  useLogoutMutation,
} = authApi;
