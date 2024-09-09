import { TOKEN } from "@/constants";
import { User } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  tagTypes: ["Admin"],
  endpoints: (build) => ({
    profile: build.query<User, void>({
      query: () => ({
        url: "/profile",
        headers: {
          Authorization: `Bearer ${Cookies.get(TOKEN)}`,
        },
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
        headers: {
          Authorization: `Bearer ${Cookies.get(TOKEN)}`,
        },
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const { useProfileQuery, useUpdatePasswordMutation } = adminApi;
