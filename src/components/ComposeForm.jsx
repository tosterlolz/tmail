import React from 'react';

export default function ComposeForm({ to, setTo, subject, setSubject, body, setBody, onSend }) {
  return (
    <div>
      <h3>Compose</h3>
      <input placeholder="To (e.g. bob#1234)" value={to} onChange={e => setTo(e.target.value)} />
      <input placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
      <textarea placeholder="Body" value={body} onChange={e => setBody(e.target.value)} />
      <button onClick={onSend}>Send</button>
    </div>
  );
}
