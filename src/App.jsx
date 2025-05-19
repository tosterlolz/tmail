import React, { useState, useEffect } from 'react';
import './App.css';
import AuthForm from './components/AuthForm';
import ComposeForm from './components/ComposeForm';
import Inbox from './components/Inbox';
import Sent from './components/Sent';

const API = 'https://api.toster.lol';
const ver = '1.1.8'

function App() {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const [inbox, setInbox] = useState([]);
  const [sent, setSent] = useState([]);

  const [sortByInbox, setSortByInbox] = useState('date-desc');
  const [sortBySent, setSortBySent] = useState('date-desc');

  const [error, setError] = useState('');
  const [view, setView] = useState('inbox');

  const loggedIn = Boolean(token);

  useEffect(() => {
    if (loggedIn) {
      loadInbox();
      loadSent();
    }
  }, [loggedIn]);

  // Auto refresh co 2 sekundy
  useEffect(() => {
    if (!loggedIn) return;

    const interval = setInterval(() => {
      if (view === 'inbox') {
        loadInbox();
      } else if (view === 'sent') {
        loadSent();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [loggedIn, view]);

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

  const sendMail = async () => {
    setError('');
    const res = await fetch(`${API}/tmail/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({ to, subject, body })
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
      // SPIERDALAJ Z TYM CHUJOSTWEM
      // setError('Fetch error');
      console.error(err);
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
        boxSizing: 'border-box',
        fontFamily: 'Arial, sans-serif',
        gap: '20px'
      }}
    >
      <div
        className="left-panel"
        style={{
          flexBasis: '30%',
          minWidth: 300,
          borderRight: '1px solid #ccc',
          paddingRight: 20,
          overflowY: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <h1>Hello, {username}</h1>
        <ComposeForm
          to={to}
          setTo={setTo}
          subject={subject}
          setSubject={setSubject}
          body={body}
          setBody={setBody}
          onSend={sendMail}
        />
        <button onClick={logout} style={{ backgroundColor: '#d9534f' }}>
          Logout
        </button>
        <div style={{ fontSize: '0.9em', color: '#888', padding: '10px 0' }}> 
          Version: {ver}
        </div>
      </div>

      <div
        className="right-panel"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            marginBottom: 15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px'
          }}
        >
          <div>
            <button disabled={view === 'inbox'} onClick={() => setView('inbox')} style={{ marginRight: 10 }}>
              Inbox
            </button>
            <button disabled={view === 'sent'} onClick={() => setView('sent')}>
              Sent
            </button>
          </div>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {view === 'inbox' && (
            <Inbox
              messages={inbox}
              onRefresh={loadInbox}
              sortBy={sortByInbox}
              setSortBy={setSortByInbox}
            />
          )}
          {view === 'sent' && (
            <Sent
              messages={sent}
              onRefresh={loadSent}
              sortBy={sortBySent}
              setSortBy={setSortBySent}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
