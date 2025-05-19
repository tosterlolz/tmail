import React from 'react';
import SortSelect from './SortSelect';
import Message from './Message';

export default function Inbox({ messages, onRefresh, sortBy, setSortBy, onReply }) {
  const sorted = [...(messages || [])].sort((a, b) => {
    switch (sortBy) {
      case 'date-asc': return new Date(a.timestamp) - new Date(b.timestamp);
      case 'date-desc': return new Date(b.timestamp) - new Date(a.timestamp);
      case 'sender-asc': return a.from.localeCompare(b.from);
      case 'sender-desc': return b.from.localeCompare(a.from);
      default: return 0;
    }
  });

  return (
    <div>
      <h3>Inbox</h3>
      <button onClick={onRefresh}>Refresh</button>
      <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
      <ul>
        {sorted.map(msg => (
          <li key={msg.id}>
            <Message message={msg} onReply={onReply} replies={msg.replies || []} />
          </li>
        ))}
      </ul>
    </div>
  );
}