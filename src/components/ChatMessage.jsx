import React, { useState } from "react";
import { getAvatar } from "../utils/avatar";

export default function ChatMessage({ msg, username, theme, isPinned, onPin, onEdit, onDelete, onReact, onProfile }) {
  const [editing, setEditing] = useState(false);
  const [editBody, setEditBody] = useState(msg.body);

  return (
    <div className={`flex items-end gap-2 ${msg.from === username ? "justify-end" : "justify-start"} group`}>
      {msg.from !== username && (
        <button onClick={() => onProfile(msg.from)}>
          <img src={getAvatar(msg.from)} alt="avatar" className="w-8 h-8 rounded-full bg-discord-accent object-cover" />
        </button>
      )}
      <div className="flex flex-col max-w-[70%]">
        <div className={`flex items-center gap-2`}>
          <span className="text-xs text-gray-400">{msg.from}</span>
          {isPinned && <span className="text-yellow-400 text-xs font-semibold">📌 Pinned</span>}
          {msg.read && <span className="text-green-400 text-xs">Read</span>}
        </div>
        {editing ? (
          <form onSubmit={e => {e.preventDefault(); onEdit(msg.id, editBody); setEditing(false);}}>
            <input className="bg-discord-bg border border-[#23272a] text-white rounded px-2 py-1 w-full" value={editBody} onChange={e => setEditBody(e.target.value)} />
            <button className="ml-2 text-xs text-discord-accent" type="submit">Save</button>
            <button className="ml-2 text-xs text-gray-400" onClick={() => setEditing(false)}>Cancel</button>
          </form>
        ) : (
          <div
            className={`
              px-4 py-2 rounded-2xl text-sm shadow group-hover:bg-discord-sidebar/80 transition
              ${msg.from === username
                ? "bg-discord-accent2 text-white rounded-br-md"
                : "bg-[#36393f] text-gray-100 rounded-bl-md"
              }
            `}
          >
            {msg.body}
            {msg.attachments && msg.attachments.map((f, i) => (
              <div key={i} className="mt-2">
                {f.type.startsWith("image/") ? (
                  <img src={f.url} alt={f.name} className="max-h-40 rounded-md border mt-1" />
                ) : (
                  <a href={f.url} className="text-discord-accent underline" download>{f.name}</a>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2 mt-1">
          <span className="text-gray-400 text-xs">{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          <button className="text-xs text-discord-accent hover:underline" onClick={() => onPin(msg.id)}>Pin</button>
          {msg.from === username && (
            <>
              <button className="text-xs text-discord-accent hover:underline" onClick={() => setEditing(true)}>Edit</button>
              <button className="text-xs text-red-400 hover:underline" onClick={() => onDelete(msg.id)}>Delete</button>
            </>
          )}
          <button className="text-xs hover:bg-discord-accent/20 rounded px-1" onClick={() => onReact(msg.id, "👍")}>👍</button>
          <button className="text-xs hover:bg-discord-accent/20 rounded px-1" onClick={() => onReact(msg.id, "😂")}>😂</button>
          <button className="text-xs hover:bg-discord-accent/20 rounded px-1" onClick={() => onReact(msg.id, "🔥")}>🔥</button>
        </div>
        {msg.reactions && (
          <div className="flex gap-1 mt-1 text-sm">
            {Object.entries(msg.reactions).map(([emoji, arr]) => (
              <span key={emoji} className="bg-discord-accent2/40 px-2 py-0.5 rounded">{emoji} {arr.length}</span>
            ))}
          </div>
        )}
      </div>
      {msg.from === username && (
        <img src={getAvatar(msg.from)} alt="avatar" className="w-8 h-8 rounded-full bg-discord-accent object-cover" />
      )}
    </div>
  );
}