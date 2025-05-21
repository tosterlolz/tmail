import React, { useState } from "react";
import { searchMessages } from "../utils/api";

export default function MessageSearchBar({ token, onResult }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  async function onSearch(e) {
    setQuery(e.target.value);
    if (e.target.value.length < 2) {
      setResults([]);
      return;
    }
    const res = await searchMessages(token, e.target.value);
    setResults(res.messages || []);
    if (onResult) onResult(res.messages || []);
  }
  return (
    <div className="relative">
      <input
        className="w-full px-3 py-2 rounded-xl bg-glasslight text-white border border-glasslight focus:border-primary transition"
        placeholder="Search messages…"
        value={query}
        onChange={onSearch}
      />
      {/* Results are passed to parent for highlighting/move-to */}
    </div>
  );
}