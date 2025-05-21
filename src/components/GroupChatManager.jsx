import React, { useState } from "react";
import { createGroup } from "../utils/api";
import UserSearchBar from "./UserSearchBar";
import Avatar from "./Avatar";

export default function GroupChatManager({ token, username, onCreated, onClose }) {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([username]);
  const [usersToAdd, setUsersToAdd] = useState([]);
  const [avatar, setAvatar] = useState("");

  function handleAddUser(user) {
    if (!members.includes(user.username)) setMembers(m => [...m, user.username]);
  }
  async function handleCreate() {
    await createGroup(token, groupName, members, avatar);
    onCreated();
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative p-6 rounded-3xl shadow-2xl bg-glassdark/95 backdrop-blur-2xl border border-glasslight w-[400px] flex flex-col gap-4">
        <h2 className="font-bold text-2xl text-white">New Group Chat</h2>
        <input
          className="px-3 py-2 rounded-xl bg-glasslight text-white border border-glasslight focus:border-primary"
          placeholder="Group name"
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
        />
        <UserSearchBar token={token} onSelect={handleAddUser} />
        <div className="flex flex-wrap gap-2">
          {members.map(m => (
            <span key={m} className="px-3 py-1 rounded-xl bg-primary text-white font-bold">{m}</span>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <label className="text-white">Avatar URL</label>
          <input
            className="px-2 py-1 rounded bg-glasslight text-white border border-glasslight focus:border-primary"
            placeholder="Image URL"
            value={avatar}
            onChange={e => setAvatar(e.target.value)}
          />
        </div>
        <div className="flex gap-4 mt-2">
          <button className="px-4 py-2 bg-primary rounded-xl text-white font-bold shadow hover:bg-red-700" onClick={handleCreate}>
            Create
          </button>
          <button className="px-4 py-2 bg-zinc-500 rounded-xl text-white font-bold shadow hover:bg-zinc-700" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}