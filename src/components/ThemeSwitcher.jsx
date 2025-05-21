import React from "react";

export default function ThemeSwitcher({ theme, setTheme }) {
  return (
    <button
      className="flex items-center gap-1 bg-[#23272a] hover:bg-[#7289da] text-white px-3 py-1 rounded transition"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title="Toggle theme"
      type="button"
    >
      {theme === "dark" ? (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71m-13.9 13.9l-.71.71M21 12h-1M4 12H3m16.66 4.95l-.71-.71m-13.9-13.9l-.71-.71M12 21a9 9 0 110-18 9 9 0 010 18z" />
          </svg>
          <span className="text-sm hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
          </svg>
          <span className="text-sm hidden sm:inline">Dark</span>
        </>
      )}
    </button>
  );
}