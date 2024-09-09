import { useLogoutMutation } from "@/redux/services/authApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "./use-auth";

export const useLogout = () => {
  const { clearUser } = useAuth();

  const [logout, { data, isLoading, error }] = useLogoutMutation();

  const signOut = async () => {
    await logout();
  };

  const router = useRouter();

  useEffect(() => {
    if (data) {
      if (data?.statusCode === 200) {
        clearUser();
        router.push("/sign-in");
      } else {
        router.refresh();
      }
    }
  }, [data]);

  return { signOut, isLoading, error };
};
