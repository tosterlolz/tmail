import React, { useState } from "react";
import { login, register } from "../utils/api";
import { generateAvatar } from "../utils/avatar";

export default function AuthForm({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setErr("");
    setSuccess("");
    setLoading(true);
    try {
      if (mode === "login") {
        const { token } = await login(username, password);
        onAuth({ username, token });
      } else {
        const avatarUrl = avatar || generateAvatar(username);
        await register(username, password, avatarUrl);
        setSuccess("Registration successful! You can log in now.");
        setMode("login");
        setUsername("");
        setPassword("");
        setAvatar("");
      }
    } catch (e) {
      const msg = e?.message || e?.status || "Login failed";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1520] via-[#21101c] to-[#471726] min-h-screen flex items-center justify-center">
      <form
        className="backdrop-blur-xl bg-glassdark border border-glasslight p-10 rounded-3xl shadow-glass w-full max-w-sm flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-white text-center tracking-tight drop-shadow mb-2 [text-shadow:0_2px_16px_#ff1e4b22]">
          {mode === "login" ? "Sign In" : "Register"}
        </h2>
        <input
          className="px-4 py-2 rounded-lg bg-glasslight border border-transparent focus:border-primary text-white placeholder:text-zinc-400 transition-all focus:shadow-accent disabled:opacity-60"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username#tag"
          autoFocus
          disabled={loading}
        />
        <input
          className="px-4 py-2 rounded-lg bg-glasslight border border-transparent focus:border-primary text-white placeholder:text-zinc-400 focus:shadow-accent disabled:opacity-60"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          disabled={loading}
        />
        {mode === "register" && (
          <input
            className="px-4 py-2 rounded-lg bg-glasslight border border-transparent focus:border-primary text-white placeholder:text-zinc-400 focus:shadow-accent disabled:opacity-60"
            value={avatar}
            onChange={e => setAvatar(e.target.value)}
            placeholder="Avatar URL (optional)"
            disabled={loading}
          />
        )}
        <button
          className="py-2 rounded-xl bg-primary shadow-accent hover:bg-red-700 hover:shadow-lg transition text-white font-bold text-lg disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading
            ? (mode === "login" ? "Signing in..." : "Registering...")
            : (mode === "login" ? "Login" : "Register")}
        </button>
        <div
          className="text-primary cursor-pointer text-sm text-center"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setErr("");
            setSuccess("");
            setUsername("");
            setPassword("");
            setAvatar("");
          }}
        >
          {mode === "login"
            ? "Need an account? Register"
            : "Already have an account? Login"}
        </div>
        {err && (
          <div className="text-red-400 text-center text-sm">{err}</div>
        )}
        {success && (
          <div className="text-green-400 text-center text-sm">{success}</div>
        )}
      </form>
    </div>
  );
}