import React, { useState, useEffect } from 'react';
import './App.css';
import Inbox from './components/Inbox';
import Sent from './components/Sent';
import AuthForm from './components/AuthForm';

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

  // --- REPLY FUNCTIONALITY ---
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

  if (!loggedIn) {
    return (
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
    );
  }

  return (
    <div
      className="app-container"
      style={{
        display: 'flex',
        height: '100vh',
        minWidth: '70vw',
        padding: 10,
        flexDirection: 'column',
      }}
    >
      <header>
        <h2>TMail</h2>
        <div>
          <span style={{ marginRight: 8 }}>Logged in as <b>{username}</b></span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>
      <main style={{ display: 'flex', flex: 1, gap: '32px' }}>
        <section style={{ flex: 1 }}>
          <Inbox
            messages={inbox}
            onRefresh={loadInbox}
            sortBy={inboxSortBy}
            setSortBy={setInboxSortBy}
            onReply={handleReply}
          />
        </section>
        <section style={{ flex: 1 }}>
          <Sent
            messages={sent}
            onRefresh={loadSent}
            sortBy={sentSortBy}
            setSortBy={setSentSortBy}
            onReply={handleReply}
          />
        </section>
        <section style={{ flex: 1, maxWidth: 350 }}>
          <h3>Send Mail</h3>
          <form
            onSubmit={e => {
              e.preventDefault();
              sendMail();
            }}
          >
            <input
              placeholder="To"
              value={to}
              onChange={e => setTo(e.target.value)}
              required
            />
            <input
              placeholder="Subject"
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
            <textarea
              placeholder="Body"
              value={body}
              onChange={e => setBody(e.target.value)}
              required
            />
            <button type="submit">Send</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </section>
      </main>
    </div>
  );
}

export default App;