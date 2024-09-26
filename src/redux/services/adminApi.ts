import { User } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
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
