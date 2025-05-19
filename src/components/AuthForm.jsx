import React from "react";

function AuthForm({
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
  return (
    <div className="w-full">
      <div className="flex flex-col items-center mb-6">
        <img src="/tm.png" alt="logo" className="h-16 w-16 rounded-xl shadow mb-2" />
        <h2 className="text-3xl font-extrabold tracking-tight text-blue-300 mb-1">TMail</h2>
        <span className="text-slate-400 text-sm font-medium">
          {mode === "login" ? "Sign in to your account" : "Create a new account"}
        </span>
      </div>
      <form
        className="flex flex-col gap-5"
        onSubmit={e => {
          e.preventDefault();
          mode === "login" ? onLogin() : onRegister();
        }}
      >
        <input
          className="border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700 bg-slate-800 text-slate-100 placeholder-slate-400"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
        <input
          className="border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700 bg-slate-800 text-slate-100 placeholder-slate-400"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-700 to-sky-700 hover:from-blue-800 hover:to-sky-800 text-white rounded-lg px-4 py-2 font-semibold shadow transition border border-slate-700"
        >
          {mode === "login" ? "Sign in" : "Register"}
        </button>
        {error && <div className="text-red-400 text-center text-sm">{error}</div>}
      </form>
      <div className="mt-6 text-center text-slate-400 text-sm">
        {mode === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <button
              className="text-blue-400 hover:underline font-bold"
              onClick={() => setMode("register")}
              type="button"
            >
              Register
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              className="text-blue-400 hover:underline font-bold"
              onClick={() => setMode("login")}
              type="button"
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthForm;