import { useGetAllClassesQuery } from "@/redux/services/classApi";

export const useClasses = () => {
  const {
    data: allDataClasses,
    error,
    isLoading: isLoadingDataClasses,
  } = useGetAllClassesQuery();

  return { allDataClasses, error, isLoadingDataClasses };
};
