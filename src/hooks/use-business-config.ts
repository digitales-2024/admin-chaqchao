import { useGetBusinessConfigAllQuery } from "@/redux/services/businessConfigApi";

export const useBussinessConfig = () => {
  const {
    data: dataBusinessConfigAll,
    error,
    isLoading,
    isSuccess,
  } = useGetBusinessConfigAllQuery();

  return { dataBusinessConfigAll, error, isLoading, isSuccess };
};
