import { TOKEN } from "@/constants";
import { Role } from "@/types/roles";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const rolesApi = createApi({
  reducerPath: "rolesApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  tagTypes: ["Roles"],
  endpoints: (build) => ({
    // Obtener todos los roles
    getRoles: build.query<Role[], void>({
      query: () => ({
        url: `/rol`,
        headers: {
          Authorization: `Bearer ${Cookies.get(TOKEN)}`,
        },
      }),
      providesTags: ["Roles"],
    }),

    // Obtener un rol por id
    getRole: build.query<Role, { id?: string }>({
      query: (id) => ({
        url: `rol/${id}`,
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
