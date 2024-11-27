import { useGetAllClaimsQuery } from "@/redux/services/claimApi";

export const useClaims = (date?: string) => {
  const {
    data: responseData,
    error,
    isLoading: isLoadingDataClaims,
    refetch,
  } = useGetAllClaimsQuery({ date });

  const allDataClaims = Array.isArray(responseData?.data)
    ? responseData.data
    : [];

  return {
    allDataClaims,
    error,
    isLoadingDataClaims,
    refetchClaims: refetch,
  };
};
