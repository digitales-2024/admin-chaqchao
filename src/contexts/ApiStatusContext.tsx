"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

type ApiStatusContextType = {
  isApiOnline: boolean;
};

export const ApiStatusContext = createContext<ApiStatusContextType>({
  isApiOnline: false,
});

export const ApiStatusProvider = ({ children }: { children: ReactNode }) => {
  const [isApiOnline, setIsApiOnline] = useState(false);
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/ping`,
          {
            method: "POST",
          },
        );
        if (!response.ok) {
          toast.error("Error al verificar el estado de la API");
        }
        setIsApiOnline(true);
      } catch (error) {
        setIsApiOnline(false);
      }
    };

    const intervalId = setInterval(checkApiStatus, 3000); // 30 seconds

    checkApiStatus();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <ApiStatusContext.Provider value={{ isApiOnline }}>
      {children}
    </ApiStatusContext.Provider>
  );
};
