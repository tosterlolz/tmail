import React from "react";
import { getAvatar } from "../utils/avatar";

/**
 * ProfileModal - displays a simple user profile popup.
 * @param {Object} props
 * @param {string} props.user - Username or ID of the user to show
 * @param {function} props.onClose - Called when modal is closed
 */
export default function ProfileModal({ user, onClose }) {
  if (!user) return null;

  // You can fetch and display more user info here if you have it
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div
        className="bg-white dark:bg-[#2c2f33] rounded-lg shadow-xl p-8 min-w-[300px] relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-400 text-2xl"
          onClick={onClose}
          title="Close"
        >×</button>
        <div className="flex flex-col items-center">
          <img
            src={getAvatar(user)}
            alt="avatar"
            className="w-20 h-20 rounded-full mb-3 bg-discord-accent object-cover"
          />
          <div className="text-lg font-bold text-discord-accent">{user}</div>
          {/* Add more user info here if available */}
          <div className="text-sm text-gray-400 mt-2">No profile details</div>
        </div>
      </div>
    </div>
  );
}