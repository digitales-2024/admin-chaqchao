"use client";
import { socket } from "@/socket/socket";
import { Circle } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export const ApiStatus = () => {
  const autoCloseDelay = 3000;

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  socket.on("connect", () => {
    setIsConnected(true);
  });

  socket.on("disconnect", () => {
    setIsConnected(false);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, autoCloseDelay);

    return () => clearTimeout(timer);
  }, [autoCloseDelay, isVisible]);

  if (!isVisible) {
    return null;
  }
  return (
    <Circle
      className={cn("absolute right-2 top-2 z-50 size-2 stroke-none", {
        "fill-green-500": isConnected,
        "fill-red-500": !isConnected,
      })}
    />
  );
};
