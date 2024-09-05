import { User } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  profile: User | null;
  setProfile: (userData: User) => void;
  logout: () => void;
}

export const useProfile = create<AuthState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile: User) => {
        set({ profile });
      },
      logout: () => {
        set({ profile: null });
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => sessionStorage,
    },
  ),
);
