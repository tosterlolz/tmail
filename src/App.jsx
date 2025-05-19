import React, { useState, useEffect } from 'react';
import Message from './components/Message';
import AuthForm from './components/AuthForm';
import "./App.css";

const API = 'https://api.toster.lol';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [password, setPassword] = useState('');
  const [inbox, setInbox] = useState([]);
  const [sent, setSent] = useState([]);
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [inboxSortBy, setInboxSortBy] = useState('date-desc');
  const [sentSortBy, setSentSortBy] = useState('date-desc');

  useEffect(() => {
    if (token) {
      loadInbox();
      loadSent();
    }
    // eslint-disable-next-line
  }, [token]);

  const loggedIn = !!token;

  const saveToken = (tok) => {
    localStorage.setItem('token', tok);
    setToken(tok);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken('');
    setInbox([]);
    setSent([]);
    setUsername('');
    setPassword('');
  };

  const register = async () => {
    setError('');
    const res = await fetch(`${API}/tmail/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok) {
      alert('Registered successfully');
      setMode('login');
    } else {
      setError(data.message || 'Registration failed');
    }
  };

  const login = async () => {
    setError('');
    const res = await fetch(`${API}/tmail/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok) {
      saveToken(data.token);
      localStorage.setItem('username', username);
    } else {
      setError(data.message || 'Login failed');
    }
  };

  const sendMail = async (replyToId = null) => {
    setError('');
    const res = await fetch(`${API}/tmail/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({ to, subject, body, replyToId })
    });
    if (res.ok) {
      setTo('');
      setSubject('');
      setBody('');
      loadInbox();
      loadSent();
    } else {
      const data = await res.json();
      setError(data.message || 'Send failed');
    }
  };

  const loadInbox = async () => {
    const res = await fetch(`${API}/tmail/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });
    const data = await res.json();
    if (res.ok) {
      setInbox(data.messages || []);
    } else {
      setError(data.message || 'Inbox load failed');
    }
  };

  const loadSent = async () => {
    try {
      const res = await fetch(`${API}/tmail/list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ folder: 'sent' })
      });
      const data = await res.json();
      if (res.ok && data.status === 'OK') {
        setSent(data.messages || []);
      } else {
        setError(data.message || 'Failed to load sent messages');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReply = async (parentId, replyBody) => {
    setError('');
    const res = await fetch(`${API}/tmail/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({ parentId, body: replyBody })
    });
    if (res.ok) {
      loadInbox();
      loadSent();
    } else {
      const data = await res.json();
      setError(data.message || 'Reply failed');
    }
  };

  // Łączymy inbox i sent, nadając im typ, sortujemy po dacie malejąco
  const mergedMessages = [
    ...inbox.map(msg => ({ ...msg, __type: 'inbox' })),
    ...sent.map(msg => ({ ...msg, __type: 'sent' })),
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950">
        <div className="bg-slate-900/80 shadow-2xl rounded-xl p-8 w-full max-w-md backdrop-blur-md border border-slate-800">
          <AuthForm
            mode={mode}
            setMode={setMode}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            error={error}
            onLogin={login}
            onRegister={register}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-slate-900 via-slate-950 to-blue-950 text-slate-100">
      <header className="flex items-center justify-between px-10 py-6 bg-slate-900/90 shadow-md border-b border-slate-800">
        <div className="flex items-center gap-4">
          <img src="/tm.png" alt="logo" className="h-14 w-14 rounded-lg shadow" />
          <h2 className="text-3xl font-extrabold tracking-tight text-blue-300">TMail</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-300">
            <span className="font-semibold text-blue-200">{username}</span>
          </span>
          <button
            className="ml-2 px-4 py-2 bg-gradient-to-r from-red-700 to-pink-700 hover:from-red-800 hover:to-pink-800 rounded-lg text-white font-semibold shadow transition border border-slate-800"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </header>
      <main className="flex-1 flex flex-col md:flex-row gap-8 px-8 py-10">
        <section className="w-full md:w-2/3">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-2xl font-extrabold text-blue-200">All Messages</h3>
              <button
                className="px-3 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded transition text-sm"
                onClick={() => { loadInbox(); loadSent(); }}
              >
                Refresh
              </button>
            </div>
            <ul className="space-y-6">
              {mergedMessages.length === 0 ? (
                <li className="text-slate-500">No messages</li>
              ) : (
                mergedMessages.map(msg => (
                  <li key={msg.id}>
                    <Message
                      message={msg}
                      onReply={handleReply}
                      replies={msg.replies || []}
                      accent={msg.__type === 'sent' ? 'green' : 'blue'}
                    />
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>
        <section className="w-full md:w-1/3 max-w-md">
          <div className="bg-slate-900/90 rounded-2xl shadow-xl p-6 sticky top-10 border border-slate-800">
            <h3 className="text-2xl font-bold mb-3 text-blue-200">Send Mail</h3>
            <form
              className="flex flex-col gap-4"
              onSubmit={e => {
                e.preventDefault();
                sendMail();
              }}
            >
              <input
                className="border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700 bg-slate-800 text-white"
                placeholder="To"
                value={to}
                onChange={e => setTo(e.target.value)}
                required
              />
              <input
                className="border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700 bg-slate-800 text-white"
                placeholder="Subject"
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />
              <textarea
                className="border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700 bg-slate-800 text-white min-h-[80px]"
                placeholder="Body"
                value={body}
                onChange={e => setBody(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-700 to-sky-700 hover:from-blue-800 hover:to-sky-800 text-white rounded-lg px-4 py-2 font-semibold shadow transition border border-slate-700"
              >
                Send
              </button>
            </form>
            {error && <p className="text-red-400 mt-2">{error}</p>}
          </div>
        </section>
      </main>
      <footer className="py-4 text-center text-slate-600 text-sm border-t border-slate-800">
        &copy; {new Date().getFullYear()} <span className="font-bold text-blue-300">TMail</span>. All rights reserved.
      </footer>
    </div>
  );
}

export default App;