import { TOKEN } from "@/constants";
import { User } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    // Actualizar información del usuario por id del parametro /users/:id
    updateUser: build.mutation<User, Partial<User>>({
      query: ({ id, ...body }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body,
        headers: {
          Authorization: `Bearer ${Cookies.get(TOKEN)}`,
        },
      }),

      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useUpdateUserMutation } = usersApi;
