import React from 'react';

function Message({ message }) {
  const { from, to, subject, body, timestamp } = message;

  return (
    <div className="message">
      {from && <p><strong>From:</strong> {from}</p>}
      {to && <p><strong>To:</strong> {to}</p>}
      <p><strong>Date:</strong> {new Date(timestamp).toLocaleString()}</p>
      <p><strong>Subject:</strong> {subject}</p>
      <p>{body}</p>
    </div>
  );
}

export default Message;
