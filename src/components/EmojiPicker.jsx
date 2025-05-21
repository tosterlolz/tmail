import React from "react";

// A simple emoji picker. You can expand this list with more emojis.
const EMOJIS = [
  "😀", "😃", "😄", "😁", "😆", "😅", "😂",
  "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍",
  "😘", "😗", "😙", "😚", "😋", "😜", "😝",
  "🤔", "🤗", "🤩", "🥳", "😎", "🤓", "🧐",
  "😏", "😒", "😞", "😔", "😟", "😕", "🙁",
  "😤", "😭", "😱", "😡", "😇", "🔥", "❤️",
  "👍", "👎", "👏", "🙏", "😺", "😸", "💯"
];

export default function EmojiPicker({ onSelect }) {
  return (
    <div className="absolute bottom-20 left-6 z-50 bg-white dark:bg-[#2c2f33] border border-gray-200 dark:border-[#23272a] rounded-lg shadow-lg p-2 flex flex-wrap gap-1 w-72">
      {EMOJIS.map((emoji, idx) => (
        <button
          key={idx}
          className="text-xl hover:bg-gray-200 dark:hover:bg-[#23272a] rounded p-1 transition"
          onClick={() => onSelect(emoji)}
          type="button"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}