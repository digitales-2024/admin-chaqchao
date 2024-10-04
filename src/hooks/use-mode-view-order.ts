import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface useModeViewOrderStore {
  modeViewOrder: "kanban" | "table";
  setModeViewOrder: (mode: "kanban" | "table") => void;
}

export const useModeViewOrder = create(
  persist<useModeViewOrderStore>(
    (set, get) => ({
      modeViewOrder: "table",
      setModeViewOrder: () => {
        set({
          modeViewOrder: get().modeViewOrder === "table" ? "kanban" : "table",
        });
      },
    }),
    {
      name: "modeViewOrder",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
