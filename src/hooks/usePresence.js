import { useEffect, useState } from "react";
import { socket } from "../utils/socket";

export function usePresence(username) {
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    if (!username) return;
    socket.on("presence", setOnlineUsers);
    socket.emit("login", username);
    return () => {
      socket.emit("logout");
      socket.off("presence");
    };
  }, [username]);
  return onlineUsers;
}