import React from 'react';
import Message from './Message';
import SortSelect from './SortSelect';

function Sent({ messages, onRefresh, sortBy, setSortBy }) {
  const sortedMessages = [...messages];

  sortedMessages.sort((a, b) => {
    if (sortBy === 'date-desc') return new Date(b.timestamp) - new Date(a.timestamp);
    if (sortBy === 'date-asc') return new Date(a.timestamp) - new Date(b.timestamp);
    if (sortBy === 'to-asc') return a.to.localeCompare(b.to);
    if (sortBy === 'to-desc') return b.to.localeCompare(a.to);
    return 0;
  });

  return (
    <div className="sent">
      <h3>Sent Messages</h3>
      <SortSelect
        sortBy={sortBy}
        setSortBy={setSortBy}
        options={[
          { value: 'date-desc', label: 'Date ↓' },
          { value: 'date-asc', label: 'Date ↑' },
          { value: 'to-asc', label: 'To A-Z' },
          { value: 'to-desc', label: 'To Z-A' },
        ]}
      />
      <button onClick={onRefresh}>Refresh</button>
      {sortedMessages.length === 0 ? (
        <p>No sent messages</p>
      ) : (
        sortedMessages.map(msg => (
          <Message key={msg.id} message={msg} />
        ))
      )}
    </div>
  );
}

export default Sent;
