import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const useSignOut = () => {
  const router = useRouter();

  const signOut = () => {
    const token = Cookies.get("token");

    if (token) {
      Cookies.remove("token");
      router.push("/sign-in");
    }
  };

  return { signOut };
};
