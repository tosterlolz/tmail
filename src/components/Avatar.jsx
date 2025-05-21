import React from "react";
import { generateAvatar } from "../utils/avatar";

export default function Avatar({ user, size = 40 }) {
  const src =
    user && user.avatar
      ? user.avatar
      : generateAvatar(user?.username || user?.name || "?");
  return (
    <img
      src={src}
      alt={user?.username || user?.name || "avatar"}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        border: "2px solid #ff1e4b",
        background: "#222",
      }}
      loading="lazy"
    />
  );
}