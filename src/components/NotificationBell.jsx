import React from "react";

export default function NotificationBell({ notifications = [] }) {
  const unread = notifications.filter(n => !n.read).length;
  return (
    <button className="relative group" title="Notifications">
      <svg
        className="w-7 h-7 text-gray-300 group-hover:text-discord-accent transition"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      {unread > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
          {unread}
        </span>
      )}
    </button>
  );
}