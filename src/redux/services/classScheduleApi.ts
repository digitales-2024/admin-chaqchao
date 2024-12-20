import { ClassScheduleData } from "@/types";
import { TypeClassScheduleData } from "@/types/classConfigs";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";
export const classScheduleApi = createApi({
  reducerPath: "classScheduleApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["ClassSchedule"],
  endpoints: (build) => ({
    createClassSchedule: build.mutation<
      ClassScheduleData,
      Partial<ClassScheduleData>
    >({
      query: (body) => ({
        url: "/class-schedule",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["ClassSchedule"],
    }),
    updateClassSchedule: build.mutation<
      ClassScheduleData,
      Partial<ClassScheduleData> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/class-schedule/${id}`,
        method: "PATCH",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["ClassSchedule"],
    }),
    getClassScheduleById: build.query<ClassScheduleData, string>({
      query: (id) => ({
        url: `/class-schedule/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error, id) => [{ type: "ClassSchedule", id }],
    }),
    getClassSchedulesAll: build.query<TypeClassScheduleData, void>({
      query: () => ({
        url: "/class-schedule",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["ClassSchedule"],
    }),
    deleteClassSchedule: build.mutation<{ success: boolean }, { id: string }>({
      query: ({ id }) => ({
        url: `/class-schedule/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["ClassSchedule"],
    }),
  }),
});

export const {
  useCreateClassScheduleMutation,
  useUpdateClassScheduleMutation,
  useGetClassScheduleByIdQuery,
  useGetClassSchedulesAllQuery,
  useDeleteClassScheduleMutation,
} = classScheduleApi;
