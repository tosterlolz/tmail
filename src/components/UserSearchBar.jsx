import React, { useState } from "react";
import { searchUsers } from "../utils/api";
import Avatar from "./Avatar";

export default function UserSearchBar({ token, onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [active, setActive] = useState(false);

  async function onSearch(e) {
    setQuery(e.target.value);
    if (e.target.value.length < 2) {
      setResults([]);
      setActive(false);
      return;
    }
    const res = await searchUsers(token, e.target.value);
    setResults(res.users || []);
    setActive(true);
  }
  return (
    <div className="relative">
      <input
        className="w-full px-3 py-2 rounded-xl bg-glasslight text-white border border-glasslight focus:border-primary transition"
        placeholder="Find user…"
        value={query}
        onChange={onSearch}
        onFocus={() => setActive(true)}
        onBlur={() => setTimeout(() => setActive(false), 100)}
      />
      {active && results.length > 0 && (
        <div className="absolute left-0 right-0 z-50 bg-glassdark border border-glasslight rounded-xl mt-1 shadow-xl max-h-64 overflow-y-auto">
          {results.map(user => (
            <div
              key={user.username}
              className="p-2 flex items-center gap-2 cursor-pointer hover:bg-primary/20 rounded"
              onClick={() => { onSelect(user); setQuery(""); setResults([]); setActive(false); }}
            >
              <Avatar user={user} size={8} />
              <span className="text-white">{user.username}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}