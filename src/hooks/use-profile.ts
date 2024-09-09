import { useAuth } from "./use-auth";

export const useProfile = () => {
  const { user } = useAuth();

  return {
    user,
  };
};
