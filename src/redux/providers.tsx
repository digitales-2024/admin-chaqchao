"use client";
import { ApiStatusProvider } from "@/contexts/ApiStatusContext";
import { Provider } from "react-redux";

import { store } from "./store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ApiStatusProvider>{children}</ApiStatusProvider>
    </Provider>
  );
}
