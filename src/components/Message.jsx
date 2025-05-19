import React, { useState } from 'react';

function Message({ message, onReply, replies = [], accent = "blue" }) {
  const { id, from, to, subject, body, timestamp } = message || {};
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyBody, setReplyBody] = useState('');

  if (!message) return null;

  const colors = accent === "green"
    ? {
        border: "border-green-800",
        bg: "bg-green-900",
        avatar: "bg-gradient-to-br from-green-600 to-green-400",
        name: "text-green-200",
        subjectBold: "text-green-200",
        body: "text-green-50",
        replyBtn: "from-green-700 to-green-500 hover:from-green-800 hover:to-green-700",
        repliesLabel: "text-green-400",
        borderLeft: "border-green-700"
      }
    : {
        border: "border-blue-800",
        bg: "bg-slate-900",
        avatar: "bg-gradient-to-br from-blue-600 to-blue-400",
        name: "text-blue-200",
        subjectBold: "text-blue-200",
        body: "text-slate-100",
        replyBtn: "from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700",
        repliesLabel: "text-blue-400",
        borderLeft: "border-blue-700"
      };

  const handleReply = () => {
    if (replyBody.trim() && onReply) {
      onReply(id, replyBody);
      setReplyBody('');
      setShowReplyForm(false);
    }
  };

  return (
    <div className={`relative group ${colors.bg} border ${colors.border} rounded-3xl shadow-2xl p-6 mb-8 transition-transform duration-150 hover:scale-[1.012] hover:shadow-3xl`}>
      <div className="flex items-center gap-4 mb-3">
        <div className={`flex-shrink-0 w-12 h-12 rounded-full ${colors.avatar} flex items-center justify-center text-white font-bold text-xl shadow-xl border-4 border-slate-900`}>
          {from ? from[0].toUpperCase() : <span>?</span>}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${colors.name}`}>{from}</span>
            <span className="text-xs text-slate-500">→</span>
            <span className={`font-semibold ${colors.name}`}>{to}</span>
          </div>
          <div className="text-xs text-slate-500">{new Date(timestamp).toLocaleString()}</div>
        </div>
      </div>
      <div className="mb-2">
        <div className={`font-extrabold text-xl ${colors.subjectBold} tracking-tight`}>{subject}</div>
      </div>
      <div className={`mb-4 whitespace-pre-wrap ${colors.body} text-base`}>{body}</div>
      {replies && replies.length > 0 && (
        <div className={`ml-8 mt-6 border-l-4 ${colors.borderLeft} pl-5 space-y-6`}>
          <div className={`font-semibold ${colors.repliesLabel} mb-2`}>Replies:</div>
          {replies.map(reply => (
            <Message key={reply.id} message={reply} onReply={onReply} replies={[]} accent={accent} />
          ))}
        </div>
      )}
      <div className="mt-4">
        <button
          className={`bg-gradient-to-r ${colors.replyBtn} text-white rounded-xl px-4 py-1.5 text-sm font-semibold shadow transition inline-block`}
          onClick={() => setShowReplyForm(v => !v)}
        >
          {showReplyForm ? 'Cancel' : 'Reply'}
        </button>
        {showReplyForm && (
          <div className="mt-4">
            <textarea
              className="w-full border border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700 bg-slate-800 text-white min-h-[60px] mb-2"
              value={replyBody}
              onChange={e => setReplyBody(e.target.value)}
              placeholder="Type your reply here..."
            />
            <button
              className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white rounded-xl px-4 py-1.5 font-semibold transition shadow"
              onClick={handleReply}
            >
              Send Reply
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;