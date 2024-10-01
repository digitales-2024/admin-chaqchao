"use client";
import { ApiStatusContext } from "@/contexts/ApiStatusContext";
import { Circle } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import { Alert, AlertDescription } from "../ui/alert";

export const ApiStatus = () => {
  const autoCloseDelay = 3000;
  const { isApiOnline } = useContext(ApiStatusContext);

  const online = useMemo(() => isApiOnline, [isApiOnline]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, autoCloseDelay);

    return () => clearTimeout(timer);
  }, [autoCloseDelay, isVisible]);

  useEffect(() => {
    setIsVisible(true);
  }, [online]);

  if (!isVisible) return null;

  return (
    <Alert
      variant="destructive"
      className="absolute bottom-0 right-2 z-50 m-0 w-fit border-none p-0"
    >
      <AlertDescription className="m-0 flex h-fit items-center justify-center gap-1 p-0">
        <Circle
          className={cn("size-2 stroke-none", {
            "fill-green-500": online,
            "fill-red-500": !online,
          })}
        />
        <span
          className={cn({
            "text-green-500": online,
            "text-red-500": !online,
          })}
        >
          {online ? "Online" : "Offline"}
        </span>
      </AlertDescription>
    </Alert>
  );
};
