import React from 'react';

export default function AuthForm({
  mode,
  setMode,
  username,
  setUsername,
  password,
  setPassword,
  error,
  onLogin,
  onRegister,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    mode === 'login' ? onLogin() : onRegister();
  };

  return (
    <div>
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>

      {mode === 'login' ? (
        <p>
          Don't have an account?{' '}
          <button type="button" onClick={() => setMode('register')}>
            Register
          </button>
        </p>
      ) : (
        <p>
          Have an account?{' '}
          <button type="button" onClick={() => setMode('login')}>
            Login
          </button>
        </p>
      )}
    </div>
  );
}
