import React, { useState } from "react";

/**
 * BlockReportMenu - Dropdown for block/report actions on a user.
 * @param {Object} props
 * @param {string} props.username - Username to act on
 * @param {function} [props.onBlock] - Called when user is blocked
 * @param {function} [props.onReport] - Called when user is reported
 */
export default function BlockReportMenu({ username, onBlock, onReport }) {
  const [open, setOpen] = useState(false);

  function handleBlock() {
    setOpen(false);
    if (onBlock) onBlock(username);
  }
  function handleReport() {
    setOpen(false);
    if (onReport) onReport(username);
  }

  return (
    <div className="relative inline-block text-left">
      <button
        className="text-gray-400 hover:text-red-400 px-2"
        title="More actions"
        onClick={() => setOpen(o => !o)}
      >
        ⋮
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-[#23272a] border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
          <button
            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900"
            onClick={handleBlock}
          >
            Block
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900"
            onClick={handleReport}
          >
            Report
          </button>
        </div>
      )}
    </div>
  );
}