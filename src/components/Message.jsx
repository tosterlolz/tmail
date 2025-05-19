import React, { useState } from 'react';

function Message({ message, onReply, replies = [] }) {
  const { id, from, to, subject, body, timestamp } = message || {};
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyBody, setReplyBody] = useState('');

  if (!message) return null;

  const handleReply = () => {
    if (replyBody.trim() && onReply) {
      onReply(id, replyBody);
      setReplyBody('');
      setShowReplyForm(false);
    }
  };

  return (
    <div className="rounded-2xl shadow-xl bg-gradient-to-br from-white via-blue-50 to-blue-100 border border-blue-200 p-5 mb-6 relative transition hover:scale-[1.01] hover:shadow-2xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-xl shadow">
          {from ? from[0].toUpperCase() : <span>?</span>}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-blue-800">{from}</span>
            <span className="text-xs text-gray-500">→</span>
            <span className="font-medium text-blue-600">{to}</span>
          </div>
          <div className="text-xs text-gray-400">{new Date(timestamp).toLocaleString()}</div>
        </div>
      </div>
      <div className="mb-2">
        <div className="font-bold text-blue-900 text-lg">{subject}</div>
      </div>
      <div className="mb-3 whitespace-pre-wrap text-gray-700">{body}</div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-1 text-sm font-semibold transition shadow"
        onClick={() => setShowReplyForm(v => !v)}
      >
        {showReplyForm ? 'Cancel' : 'Reply'}
      </button>
      {showReplyForm && (
        <div className="mt-3">
          <textarea
            className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[60px] mb-2"
            value={replyBody}
            onChange={e => setReplyBody(e.target.value)}
            placeholder="Type your reply here..."
          />
          <button
            className="bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-600 hover:to-sky-500 text-white rounded-md px-4 py-1 font-semibold transition shadow"
            onClick={handleReply}
          >
            Send Reply
          </button>
        </div>
      )}
      {replies && replies.length > 0 && (
        <div className="ml-8 mt-5 border-l-2 border-blue-200 pl-4 space-y-4">
          <div className="font-semibold text-blue-700 mb-1">Replies:</div>
          {replies.map(reply => (
            <Message key={reply.id} message={reply} onReply={onReply} replies={[]} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Message;