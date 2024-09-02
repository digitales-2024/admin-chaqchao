import { TOKEN } from "@/constants";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const useSignOut = () => {
  const router = useRouter();

  const signOut = () => {
    const token = Cookies.get(TOKEN);

    if (token) {
      Cookies.remove(TOKEN);
      router.push("/sign-in");
    }
  };

  return { signOut };
};
