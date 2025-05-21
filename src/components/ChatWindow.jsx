import React, { useState, useRef, useEffect } from "react";
import { useTyping } from "../hooks/useTyping";
import Avatar from "./Avatar";
import MentionsAutocomplete from "./MentionsAutocomplete";
import LinkPreview from "./LinkPreview";

function extractLinks(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const found = text.match(urlRegex);
  return found || [];
}

export default function ChatWindow({
  messages,
  onSend,
  username,
  partner,
  usersInChat = [],
  userMap = {},
  onEdit,
  onDelete,
  onReply,
  threadId,
  onThreadOpen,
}) {
  const [body, setBody] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editBody, setEditBody] = useState("");
  const [mentionQuery, setMentionQuery] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const msgEndRef = useRef(null);

  // Typing indicator
  const { typingUsers, sendTyping } = useTyping(partner, username);

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleInput(e) {
    setBody(e.target.value);
    // Detect @mentions
    const atIdx = e.target.value.lastIndexOf("@");
    if (atIdx >= 0) {
      const query = e.target.value.slice(atIdx + 1).split(" ")[0];
      setMentionQuery(query);
      setShowMentions(query.length > 0);
    } else {
      setShowMentions(false);
    }
    sendTyping(!!e.target.value);
  }

  function handleMentionSelect(user) {
    // Replace the last @mention query with the full username
    const atIdx = body.lastIndexOf("@");
    const before = body.slice(0, atIdx);
    setBody(`${before}@${user.username} `);
    setShowMentions(false);
  }

  function handleSend(e) {
    e.preventDefault();
    if (editing) {
      onEdit && onEdit(editing.id, editBody);
      setEditing(null);
      setEditBody("");
      return;
    }
    if (!body.trim()) return;
    onSend(body, replyTo?.id, threadId);
    setBody("");
    setReplyTo(null);
    sendTyping(false);
  }

  function handleEdit(msg) {
    setEditing(msg);
    setEditBody(msg.body);
  }

  function handleReply(msg) {
    setReplyTo(msg);
  }

  function handleDelete(msg) {
    if (window.confirm("Delete this message?")) onDelete && onDelete(msg.id);
  }

  // Thread replies
  function handleThreadOpen(threadRootId) {
    onThreadOpen && onThreadOpen(threadRootId);
  }

  return (
    <div className="flex flex-col h-full bg-transparent min-w-0 relative">
      {/* Header */}
      <header className="px-10 py-7 border-b border-glasslight flex gap-4 items-center backdrop-blur-xl bg-glassdark/80 shadow-lg z-10">
        <Avatar user={userMap?.[partner] || { username: partner }} size={12} />
        <div>
          <div className="font-extrabold text-xl text-white drop-shadow">{partner}</div>
          <div className="text-xs text-zinc-200 tracking-wide">Direct Message</div>
        </div>
      </header>
      {/* Chat body */}
      <main className="flex-1 overflow-y-auto px-14 py-8 flex flex-col gap-4 bg-transparent">
        {messages.map((m, idx) => {
          const isOwn = m.from === username;
          const prev = messages[idx - 1];
          const showName = !prev || prev.from !== m.from;
          const links = extractLinks(m.body);
          return (
            <div key={m.id} className={`flex ${isOwn ? "justify-end" : "justify-start"} items-end group relative`}>
              <div className={`max-w-[68%] mb-1`}>
                {showName && (
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar user={userMap?.[m.from] || { username: m.from }} size={7} />
                    <span className={`font-bold text-sm ${isOwn ? "text-primary" : "text-red-300"} drop-shadow`}>
                      {m.from}
                    </span>
                    <span className="text-xs text-zinc-400">{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                )}
                <div className={`relative group`}>
                  {m.replyToId && (
                    <div className="text-xs text-primary/80 pl-2 mb-1 border-l-2 border-primary">
                      Replying to: "
                      {messages.find(x => x.id === m.replyToId)?.body || "..."}
                      "
                    </div>
                  )}
                  {/* Message bubble */}
                  <div className={`p-4 rounded-3xl shadow-lg text-base font-medium transition-all
                    ${isOwn
                      ? "bg-gradient-to-br from-primary to-red-500/90 text-white rounded-br-md animate-in fade-in"
                      : "bg-glassdark text-red-100 rounded-bl-md animate-in fade-in"}
                  `}>
                    {editing && editing.id === m.id ? (
                      <form onSubmit={handleSend}>
                        <input className="bg-glasslight text-white rounded px-3 py-2"
                          value={editBody}
                          onChange={e => setEditBody(e.target.value)}
                        />
                        <button type="submit" className="ml-2 text-primary font-bold">Save</button>
                        <button type="button" className="ml-2 text-zinc-400" onClick={() => setEditing(null)}>Cancel</button>
                      </form>
                    ) : (
                      <>
                        {m.body}
                        {/* Link previews */}
                        {links.map(url => <LinkPreview key={url} url={url} />)}
                      </>
                    )}
                  </div>
                  {/* Edit/Delete/Reply/Thread actions */}
                  <div className={`absolute right-0 -top-8 hidden group-hover:flex gap-2`}>
                    {isOwn && (
                      <>
                        <button className="text-xs text-zinc-300 hover:text-primary" onClick={() => handleEdit(m)}>Edit</button>
                        <button className="text-xs text-zinc-300 hover:text-primary" onClick={() => handleDelete(m)}>Delete</button>
                      </>
                    )}
                    <button className="text-xs text-zinc-300 hover:text-primary" onClick={() => handleReply(m)}>Reply</button>
                    {m.threadId && (
                      <button className="text-xs text-blue-300 hover:text-blue-500" onClick={() => handleThreadOpen(m.threadId)}>
                        View thread
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={msgEndRef}></div>
        {/* Typing indicator */}
        {typingUsers.length > 0 && (
          <div className="px-6 mt-4 text-zinc-300 text-sm italic animate-pulse">
            {typingUsers.join(", ")} typing...
          </div>
        )}
      </main>
      {/* Reply bar */}
      {replyTo && (
        <div className="flex items-center gap-3 bg-primary/10 px-14 py-2 text-sm text-primary font-semibold backdrop-blur-xl z-10">
          <span>Replying to: "{replyTo.body}"</span>
          <button className="ml-auto text-red-700 font-bold" onClick={() => setReplyTo(null)}>
            Cancel
          </button>
        </div>
      )}
      {/* Input bar */}
      <form onSubmit={handleSend} className="flex gap-3 border-t border-glasslight px-14 py-7 bg-glassdark/85 backdrop-blur-xl shadow-glass z-10 relative">
        <input
          className="flex-1 px-5 py-3 rounded-full bg-glasslight text-white border border-glasslight focus:ring-2 focus:ring-primary focus:border-primary outline-none font-medium transition-all"
          value={editing ? editBody : body}
          onChange={editing ? e => setEditBody(e.target.value) : handleInput}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) handleSend(e);
          }}
          placeholder={editing ? "Edit message…" : "Type your message..."}
        />
        <button className="px-8 py-3 rounded-full bg-primary hover:bg-red-700 text-white font-semibold shadow-accent transition text-lg" type="submit">
          {editing ? "Save" : "Send"}
        </button>
        {showMentions && (
          <div className="absolute left-10 bottom-20">
            <MentionsAutocomplete
              users={usersInChat.map(u => userMap?.[u] || { username: u })}
              onSelect={handleMentionSelect}
              query={mentionQuery}
            />
          </div>
        )}
      </form>
    </div>
  );
}