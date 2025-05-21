import { useEffect, useState } from "react";
import { socket } from "../utils/socket";

export function useTyping(room, username) {
  const [typingUsers, setTypingUsers] = useState([]);
  useEffect(() => {
    if (!room) return;
    socket.emit("join", room);
    socket.on("typing", setTypingUsers);
    return () => {
      socket.emit("leave", room);
      socket.off("typing");
    };
  }, [room]);
  const sendTyping = (typing) =>
    socket.emit("typing", { room, username, typing });
  return { typingUsers, sendTyping };
}