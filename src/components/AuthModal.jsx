import { useState } from "react";
import { useStore } from "../context/StoreContext";

export default function AuthModal() {
  const { state, dispatch, showToast } = useStore();
  const [tab, setTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [regData, setRegData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  if (!state.authOpen) return null;

  function close() { dispatch({ type: "CLOSE_AUTH" }); setError(""); }

  function handleLogin(e) {
    e.preventDefault();
    setError("");
    const found = state.users.find(u => u.email === loginData.email && u.password === loginData.password);
    if (!found) { setError("Invalid email or password. Try registering first."); return; }
    dispatch({ type: "LOGIN", payload: found });
    close();
    showToast(`Welcome back, ${found.name}! 🎉`);
  }

  function handleRegister(e) {
    e.preventDefault();
    setError("");
    if (state.users.find(u => u.email === regData.email)) {
      setError("This email is already registered. Please sign in."); return;
    }
    dispatch({ type: "REGISTER", payload: regData });
    close();
    showToast(`Welcome to TWS Store, ${regData.name}! 🌟`);
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="modal-box">
        <button className="modal-close" onClick={close}>✕</button>
        <div className="auth-tabs">
          <button className={`auth-tab${tab === "login" ? " active" : ""}`} onClick={() => { setTab("login"); setError(""); }}>Sign in</button>
          <button className={`auth-tab${tab === "register" ? " active" : ""}`} onClick={() => { setTab("register"); setError(""); }}>Create account</button>
        </div>

        {tab === "login" ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <h2 className="auth-title">Welcome back</h2>
            {error && <p style={{ color: "#c0392b", fontSize: 13, background: "#fff0f0", padding: "10px 14px", borderRadius: 8 }}>{error}</p>}
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="input" placeholder="you@email.com" required
                value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="input" placeholder="••••••••" required
                value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-primary btn-full">Sign in</button>
            <p className="auth-switch">Don't have an account? <button type="button" className="btn-link" onClick={() => setTab("register")}>Create one</button></p>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegister}>
            <h2 className="auth-title">Join Viyani</h2>
            {error && <p style={{ color: "#c0392b", fontSize: 13, background: "#fff0f0", padding: "10px 14px", borderRadius: 8 }}>{error}</p>}
            <div className="form-group">
              <label>Full name</label>
              <input type="text" className="input" placeholder="Your name" required
                value={regData.name} onChange={e => setRegData({ ...regData, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="input" placeholder="you@email.com" required
                value={regData.email} onChange={e => setRegData({ ...regData, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="input" placeholder="Min 6 characters" required minLength={6}
                value={regData.password} onChange={e => setRegData({ ...regData, password: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-primary btn-full">Create account</button>
            <p className="auth-switch">Already have an account? <button type="button" className="btn-link" onClick={() => setTab("login")}>Sign in</button></p>
          </form>
        )}
      </div>
    </div>
  );
}
