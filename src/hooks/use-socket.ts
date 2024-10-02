import { useEffect, useState } from "react";
import { Manager } from "socket.io-client";

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);

  const manager = new Manager("http://localhost:5000", {
    reconnectionAttempts: 3,
    reconnectionDelay: 1000,
  });

  const socket = manager.socket("/");

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return { isConnected, socket };
};
