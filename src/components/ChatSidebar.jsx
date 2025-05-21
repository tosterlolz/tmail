import React, { useState } from "react";
import GroupChatManager from "./GroupChatManager";
import UserSearchBar from "./UserSearchBar";
import Avatar from "./Avatar";
import ProfileCard from "./ProfileCard";

export default function ChatSidebar({ conversations, select, selected, username, onLogout, groups = [], token, onGroupAdded, users, userMap }) {
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [showProfile, setShowProfile] = useState(null);

  return (
    <aside className="w-80 bg-glassdark/90 backdrop-blur-2xl flex flex-col h-full border-r border-glasslight shadow-2xl z-10">
      <div className="flex items-center justify-between px-7 py-6 border-b border-glasslight select-none">
        <span
          className="font-extrabold text-white text-xl tracking-tight cursor-pointer flex items-center gap-2"
          onClick={() => setShowProfile(userMap?.[username] || { username })}
        >
          <Avatar user={userMap?.[username] || { username }} size={8} />
          {username}
        </span>
        <button className="px-3 py-1 bg-primary rounded-xl font-bold text-white text-base shadow hover:bg-red-700 transition" onClick={onLogout}>
          Logout
        </button>
      </div>
      <div className="p-4 flex flex-col gap-2 border-b border-glasslight">
        <UserSearchBar token={token} onSelect={u => select(u.username)} />
        <button
          className="w-full py-2 mt-1 rounded-xl bg-primary hover:bg-red-700 text-white font-bold text-base shadow transition"
          onClick={() => setShowNewGroup(true)}
        >+ New Group</button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <h3 className="text-white font-semibold text-lg tracking-wide mb-1">Chats & Groups</h3>
        <ul>
          {groups.map(g => (
            <li
              key={g.id}
              onClick={() => select(g.id)}
              className={`p-4 rounded-2xl mb-2 cursor-pointer transition-all border border-transparent ${
                selected === g.id
                  ? "bg-primary/90 text-white border-primary shadow-accent"
                  : "bg-glasslight/60 hover:bg-primary/20 text-white hover:border-primary"
              } flex items-center gap-2`}
            >
              <Avatar user={g} size={8} />
              <div>
                <div className="font-semibold truncate text-base">{g.name}</div>
                <div className="text-xs text-zinc-200/70 truncate">Group chat</div>
              </div>
            </li>
          ))}
          {conversations.length === 0 && <li className="text-zinc-400 text-base p-2">No conversations yet</li>}
          {conversations.map(c => (
            <li
              key={c.partner}
              onClick={() => select(c.partner)}
              className={`p-4 rounded-2xl mb-2 cursor-pointer transition-all border border-transparent ${
                selected === c.partner
                  ? "bg-primary/90 text-white border-primary shadow-accent"
                  : "bg-glasslight/60 hover:bg-primary/20 text-white hover:border-primary"
              } flex items-center gap-2`}
            >
              <Avatar user={userMap?.[c.partner] || { username: c.partner }} size={8} />
              <div>
                <div className="font-semibold truncate text-base">{c.partner}</div>
                <div className="text-xs text-zinc-200/70 truncate">{c.body}</div>
                <div className="text-[11px] text-zinc-400">{new Date(c.timestamp).toLocaleString()}</div>
              </div>
              <span className="ml-auto flex items-center gap-1">
                {/* Online dot */}
                {users?.includes(c.partner) && (
                  <span className="inline-block w-3 h-3 rounded-full bg-green-400 border-2 border-glassdark"></span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {showNewGroup && (
        <GroupChatManager
          token={token}
          username={username}
          onCreated={() => { setShowNewGroup(false); onGroupAdded && onGroupAdded(); }}
          onClose={() => setShowNewGroup(false)}
        />
      )}
      {showProfile && (
        <ProfileCard
          user={showProfile}
          online={users?.includes(showProfile.username)}
          onClose={() => setShowProfile(null)}
        />
      )}
    </aside>
  );
}