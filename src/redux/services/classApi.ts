import { ClassData } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const classApi = createApi({
  reducerPath: "classApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Class Admin"],
  endpoints: (build) => ({
    // Obtener todas las clases
    getAllClasses: build.query<ClassData[], void>({
      query: () => ({
        url: "/admin/class",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Class Admin"],
    }),
  }),
});
export const { useGetAllClassesQuery } = classApi;
