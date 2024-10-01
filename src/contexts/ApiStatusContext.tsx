"use client";
import { createContext, ReactNode, useEffect, useState } from "react";

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
            method: "GET",
          },
        );
        if (!response.ok) {
          setIsApiOnline(false);
        }
        setIsApiOnline(true);
      } catch (error) {
        setIsApiOnline(false);
      }
    };
    checkApiStatus();
  }, []);

  return (
    <ApiStatusContext.Provider value={{ isApiOnline }}>
      {children}
    </ApiStatusContext.Provider>
  );
};
