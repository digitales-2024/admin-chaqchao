import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type User = {
  username: string;
  token: string;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API_URL }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    login: build.mutation<User, { username: string; password: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation } = authApi;
