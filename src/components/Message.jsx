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
    <div className="message">
      {from && <p><strong>From:</strong> {from}</p>}
      {to && <p><strong>To:</strong> {to}</p>}
      <p><strong>Date:</strong> {new Date(timestamp).toLocaleString()}</p>
      <p><strong>Subject:</strong> {subject}</p>
      <p>{body}</p>
      {onReply && (
        <button onClick={() => setShowReplyForm(v => !v)}>
          {showReplyForm ? 'Cancel' : 'Reply'}
        </button>
      )}
      {showReplyForm && (
        <div style={{ marginTop: "1em" }}>
          <textarea
            value={replyBody}
            onChange={e => setReplyBody(e.target.value)}
            placeholder="Type your reply here..."
          />
          <button onClick={handleReply}>Send Reply</button>
        </div>
      )}
      {replies && replies.length > 0 && (
        <div style={{ marginLeft: "2em", marginTop: "1em", borderLeft: "2px solid #ccc", paddingLeft: "1em" }}>
          <strong>Replies:</strong>
          {replies.map(reply => (
            <Message key={reply.id} message={reply} onReply={onReply} replies={[]} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Message;