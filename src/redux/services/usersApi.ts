import {
  CreateUsersSchema,
  UpdateUsersSchema,
} from "@/schemas/users/createUsersSchema";
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
    // Crear un nuevo usuario
    createUser: build.mutation<CreateUsersSchema, CreateUsersSchema>({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Users"],
    }),

    // Actualizar información del usuario por id del parametro /users/:id
    updateUser: build.mutation<UserUpdate, UpdateUsersSchema>({
      query: ({ id, ...body }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body,
        credentials: "include",
      }),

      invalidatesTags: ["Users"],
    }),

    // Eliminar un usuario por id del parametro /users/:id
    deleteUser: build.mutation<User, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Users"],
    }),

    // Eliminar varios usuarios
    deleteUsers: build.mutation<void, { ids: string[] }>({
      query: (ids) => ({
        url: "users/deactivate/all",
        method: "DELETE",
        body: ids,
        credentials: "include",
      }),
      invalidatesTags: ["Users"],
    }),

    // Reactivar varios usuarios
    reactivateUsers: build.mutation<void, { ids: string[] }>({
      query: (ids) => ({
        url: "users/reactivate/all",
        method: "PATCH",
        body: ids,
        credentials: "include",
      }),
      invalidatesTags: ["Users"],
    }),

    // Mostrar todos los usuarios
    getUsers: build.query<User[], void>({
      query: () => ({
        url: "users",
        credentials: "include",
      }),
      providesTags: ["Users"],
    }),

    // Generar una constraseña
    generatePassword: build.mutation({
      query: () => ({
        url: "users/generate-password",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useGetUsersQuery,
  useGeneratePasswordMutation,
  useCreateUserMutation,
  useDeleteUserMutation,
  useDeleteUsersMutation,
  useReactivateUsersMutation,
} = usersApi;
