import React from "react";
import Avatar from "./Avatar";

export default function ProfileCard({ user, online, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative p-8 rounded-3xl shadow-2xl bg-glassdark/80 backdrop-blur-2xl border border-glasslight w-80 flex flex-col items-center gap-2">
        <Avatar user={user} size={24} />
        <div className="font-bold text-2xl text-white">{user.username || user.name}</div>
        <div className={`text-base font-semibold ${online ? "text-green-400" : "text-zinc-500"}`}>
          {online ? "Online" : "Offline"}
        </div>
        <button className="mt-4 px-5 py-2 bg-primary rounded-xl text-white font-bold shadow hover:bg-red-700" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}