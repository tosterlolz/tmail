import React from 'react';
import Message from './Message';

function UnifiedMessages({ inbox, sent, onRefresh, sortBy, setSortBy, onReply }) {
  const sortMessages = (messages, sortBy) => {
    const arr = [...(messages || [])];
    arr.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return arr;
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-4 mb-2">
          <h3 className="text-2xl font-extrabold text-blue-400">Inbox</h3>
          <button
            className="px-3 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded transition text-sm"
            onClick={onRefresh}
          >
            Refresh
          </button>
        </div>
        {inbox.length === 0 ? (
          <p className="text-blue-300">No inbox messages</p>
        ) : (
          <ul className="space-y-6">
            {sortMessages(inbox, sortBy).map(msg => (
              <li key={msg.id}>
                <Message
                  message={msg}
                  onReply={onReply}
                  replies={msg.replies || []}
                  accent="blue"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <div className="flex items-center gap-4 mb-2">
          <h3 className="text-2xl font-extrabold text-green-400">Sent</h3>
          <button
            className="px-3 py-1 bg-green-700 hover:bg-green-800 text-white rounded transition text-sm"
            onClick={onRefresh}
          >
            Refresh
          </button>
        </div>
        {sent.length === 0 ? (
          <p className="text-green-300">No sent messages</p>
        ) : (
          <ul className="space-y-6">
            {sortMessages(sent, sortBy).map(msg => (
              <li key={msg.id}>
                <Message
                  message={msg}
                  onReply={onReply}
                  replies={msg.replies || []}
                  accent="green"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UnifiedMessages;