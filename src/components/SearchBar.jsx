import React from "react";

/**
 * SearchBar - A simple input for searching chats/messages.
 * @param {Object} props
 * @param {string} props.value - Current value of search box
 * @param {function} props.setValue - Function to change search value
 * @param {string} [props.placeholder] - Optional placeholder text
 */
export default function SearchBar({ value, setValue, placeholder = "Search..." }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 dark:border-[#23272a] py-2 pl-9 pr-3 bg-white dark:bg-[#23272a] text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-discord-accent transition"
      />
      <span className="absolute left-2 top-2.5 text-gray-400 pointer-events-none">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
    </div>
  );
}