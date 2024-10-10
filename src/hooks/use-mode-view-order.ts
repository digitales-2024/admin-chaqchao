import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define los tipos para el estado y las acciones
interface ViewModeState {
  viewMode: "table" | "kanban";
  toggleViewMode: () => void;
}

// Define el store usando el middleware persist
export const useViewModeStore = create<ViewModeState>()(
  persist(
    (set) => ({
      viewMode: "table", // Estado inicial es 'table'
      toggleViewMode: () =>
        set((state) => ({
          viewMode: state.viewMode === "table" ? "kanban" : "table",
        })),
    }),
    {
      name: "view-mode-storage", // Nombre del item en localStorage
    },
  ),
);
