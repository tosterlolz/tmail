import React from "react";
import Avatar from "./Avatar";

export default function MentionsAutocomplete({ users, onSelect, query }) {
  if (!users || !query) return null;
  const filtered = users.filter(u =>
    u.username.toLowerCase().startsWith(query.toLowerCase()) && query.length > 0
  ).slice(0, 5);

  if (filtered.length === 0) return null;
  return (
    <div className="absolute z-50 bg-glassdark border border-glasslight rounded-xl mt-1 shadow-xl min-w-[10rem]">
      {filtered.map(user => (
        <div
          key={user.username}
          className="p-2 flex items-center gap-2 cursor-pointer hover:bg-primary/20 rounded"
          onMouseDown={() => onSelect(user)}
        >
          <Avatar user={user} size={7} />
          <span className="text-white">@{user.username}</span>
        </div>
      ))}
    </div>
  );
}