import { useGetRolesQuery } from "@/redux/services/rolesApi";
import { useMemo } from "react";

export const useRol = () => {
  const { data: users, isLoading } = useGetRolesQuery();
  const data = useMemo(() => {
    if (users) {
      return users;
    }
    return [];
  }, [users]);

  return { data, isLoading };
};
