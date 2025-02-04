import { CreateClassCapacitySchema } from "@/schemas/classConfig/createClassCapacitySchema";
import { ClassCapacityData, TypeClassCapacitiesData } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const classCapacityApi = createApi({
  reducerPath: "classCapacityApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["ClassCapacity"],
  endpoints: (build) => ({
    // Crear una nueva capacidad de clase
    createClassCapacity: build.mutation<
      ClassCapacityData,
      CreateClassCapacitySchema
    >({
      query: (body) => ({
        url: "/class-capacity",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ClassCapacity"],
    }),

    // Obtener todas las capacidades según el tipo de clase
    getClassCapacities: build.query<TypeClassCapacitiesData, void>({
      query: () => ({
        url: `/class-capacity`,
        method: "GET",
      }),
      providesTags: ["ClassCapacity"],
    }),

    // Obtener una capacidad de clase por id
    getClassCapacityById: build.query<ClassCapacityData, string>({
      query: (id) => ({
        url: `/class-capacity/${id}`,
        method: "GET",
      }),
      providesTags: ["ClassCapacity"],
    }),

    // Actualizar una capacidad de clase por id
    updateClassCapacity: build.mutation<ClassCapacityData, ClassCapacityData>({
      query: ({ id, ...body }) => ({
        url: `/class-capacity/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ClassCapacity"],
    }),

    // Eliminar una capacidad de clase por id
    deleteClassCapacity: build.mutation<ClassCapacityData, string>({
      query: (id) => ({
        url: `/class-capacity/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ClassCapacity"],
    }),
  }),
});

export const {
  useCreateClassCapacityMutation,
  useUpdateClassCapacityMutation,
  useDeleteClassCapacityMutation,
  useGetClassCapacitiesQuery,
  useGetClassCapacityByIdQuery,
} = classCapacityApi;
