import { Role } from "@/types/roles";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const rolesApi = createApi({
  reducerPath: "rolesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Roles"],
  endpoints: (build) => ({
    // Obtener todos los roles
    getRoles: build.query<Role[], void>({
      query: () => ({
        url: `/rol`,
        credentials: "include",
      }),
      providesTags: ["Roles"],
    }),

    // Obtener un rol por id
    getRole: build.query({
      query: (id: string) => ({
        url: `rol/${id}`,
        credentials: "include",
      }),
    }),

    // Crear un nuevo rol
    createRole: build.mutation<Role, Partial<Role>>({
      query: (body) => ({
        url: `roles`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Roles"],
    }),
    // Actualizar un rol por id
    updateRole: build.mutation<Role, Partial<Role>>({
      query: ({ id, ...body }) => ({
        url: `roles/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Roles"],
    }),
    // Eliminar un rol por id
    deleteRole: build.mutation<void, number>({
      query: (id) => ({
        url: `roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Roles"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRoleQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = rolesApi;
