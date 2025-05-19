import React from 'react';

export default function SortSelect({ sortBy, setSortBy }) {
  return (
    <div>
      <label>Sort by:</label>
      <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value="date-desc">Date (newest)</option>
        <option value="date-asc">Date (oldest)</option>
        <option value="sender-asc">Sender (A–Z)</option>
        <option value="sender-desc">Sender (Z–A)</option>
      </select>
    </div>
  );
}
