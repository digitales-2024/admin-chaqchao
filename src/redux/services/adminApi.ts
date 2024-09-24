import { User } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Admin"],
  endpoints: (build) => ({
    profile: build.query<User, void>({
      query: () => ({
        url: "/profile",
        credentials: "include",
      }),

      providesTags: ["Admin"],
    }),
    updatePassword: build.mutation<
      User,
      {
        password: string;
        newPassword: string;
        confirmPassword: string;
      }
    >({
      query: (body) => ({
        url: "/update-password",
        method: "PATCH",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const { useProfileQuery, useUpdatePasswordMutation } = adminApi;
