import { User } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UserUpdate {
  data: User;
  message: string;
  statusCode: number;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    // Actualizar información del usuario por id del parametro /users/:id
    updateUser: build.mutation<UserUpdate, Partial<User>>({
      query: ({ id, ...body }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body,
        credentials: "include",
      }),

      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useUpdateUserMutation } = usersApi;
