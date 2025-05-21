import React from "react";

/**
 * TypingIndicator - Shows who is typing in the chat.
 * @param {Object} props
 * @param {string[]} props.users - List of user display names currently typing
 */
export default function TypingIndicator({ users = [] }) {
  if (!users.length) return null;

  let message;
  if (users.length === 1) {
    message = `${users[0]} is typing...`;
  } else if (users.length === 2) {
    message = `${users[0]} and ${users[1]} are typing...`;
  } else {
    message = `${users.slice(0, 2).join(", ")} and ${users.length - 2} more are typing...`;
  }

  return (
    <div className="px-8 pb-2 text-sm text-gray-400 flex items-center gap-2 animate-pulse">
      <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-bounce"></span>
      {message}
    </div>
  );
}