import { useGetAllClassesQuery } from "@/redux/services/classApi";

export const useClasses = (date?: string) => {
  const {
    data: allDataClasses,
    error,
    isLoading: isLoadingDataClasses,
  } = useGetAllClassesQuery({ date });

  return { allDataClasses, error, isLoadingDataClasses };
};
