import { useState, useRef, useEffect } from "react";
import { useStore } from "../context/StoreContext";

export default function Header() {
  const { state, dispatch, cartCount, showToast } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  const wishCount = state.wishlist.length;
  const { user } = state;

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function navigate(page) {
    dispatch({ type: "SET_PAGE", payload: page });
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navigateCat(cat) {
    dispatch({ type: "SET_CATEGORY", payload: cat });
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSearch(e) {
    e.preventDefault();
    if (searchVal.trim()) {
      dispatch({ type: "SET_SEARCH", payload: searchVal.trim() });
      setSearchOpen(false);
      setSearchVal("");
    }
  }

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    setUserMenuOpen(false);
    showToast("Signed out. See you soon! 👋", "info");
  }

  return (
    <>
      <header className="header">
        <div className="header-top">
          <span className="header-marquee-text">
            🎉 Festive Sale – Up to 40% off on select styles &nbsp;|&nbsp; Free shipping on orders above ₹999 &nbsp;|&nbsp; New cotton aura collection just dropped!
          </span>
        </div>
        <nav className="navbar">
          <button className="nav-hamburger" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
            <span /><span /><span />
          </button>

          <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); navigate("home"); }}>
            <span className="brand-logo-main">TWS</span>
            <span className="brand-logo-sub">Store</span>
          </a>

          <ul className="nav-links">
            {["home","shop","about"].map(p => (
              <li key={p}>
                <a href="#" className={`nav-link${state.currentPage === p ? " active" : ""}`}
                  onClick={(e) => { e.preventDefault(); navigate(p); }}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </a>
              </li>
            ))}
            <li className="nav-dropdown">
              <a href="#" className="nav-link">Collections ▾</a>
              <ul className="dropdown-menu">
                {["Kurta Sets","Co-ord Sets","Dupattas","Festive Edit"].map(c => (
                  <li key={c}><a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); navigateCat(c); }}>{c}</a></li>
                ))}
              </ul>
            </li>
          </ul>

          <div className="nav-actions">
            <button className="nav-icon-btn" onClick={() => setSearchOpen(v => !v)} aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
            <button className="nav-icon-btn" onClick={() => navigate("wishlist")} aria-label="Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              {wishCount > 0 && <span className="nav-badge">{wishCount}</span>}
            </button>
            <button className="nav-icon-btn" onClick={() => dispatch({ type: "TOGGLE_CART" })} aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
            </button>
            <div style={{ position: "relative" }} ref={userMenuRef}>
              <button className="nav-icon-btn" onClick={() => user ? setUserMenuOpen(v => !v) : dispatch({ type: "OPEN_AUTH" })} aria-label="Account">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={user ? "var(--ember)" : "currentColor"} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </button>
              {userMenuOpen && user && (
                <div className="user-menu-dropdown">
                  <div className="user-menu-header">
                    <div className="user-menu-name">{user.name}</div>
                    <div className="user-menu-email">{user.email}</div>
                  </div>
                  <button className="user-menu-item" onClick={() => { navigate("orders"); setUserMenuOpen(false); }}>📦 My Orders</button>
                  <button className="user-menu-item" onClick={() => { navigate("wishlist"); setUserMenuOpen(false); }}>💛 Wishlist</button>
                  <div className="user-menu-divider" />
                  <button className="user-menu-item danger" onClick={handleLogout}>🚪 Sign out</button>
                </div>
              )}
            </div>
          </div>
        </nav>

        <div className={`search-bar${searchOpen ? " open" : ""}`}>
          <form onSubmit={handleSearch} style={{ display: "flex", flex: 1, gap: 12 }}>
            <input ref={searchRef} type="search" className="search-input" value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              placeholder="Search kurtas, co-ords, festive cotton wear…" />
            <button type="submit" className="btn btn-primary btn-sm">Search</button>
          </form>
          <button className="search-close" onClick={() => setSearchOpen(false)}>✕</button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {drawerOpen && <div className="backdrop show" onClick={() => setDrawerOpen(false)} />}
      <div className={`mobile-drawer${drawerOpen ? " open" : ""}`}>
        <button className="drawer-close" onClick={() => setDrawerOpen(false)}>✕</button>
        <a href="#" className="brand-logo" style={{ marginBottom: 36, display: "block" }}
          onClick={(e) => { e.preventDefault(); navigate("home"); }}>
          <span className="brand-logo-main">TWS Store</span>
        </a>
        <ul className="drawer-links">
          {["home","shop","about"].map(p => (
            <li key={p}><a href="#" className="drawer-link" onClick={(e) => { e.preventDefault(); navigate(p); }}>
              {p.charAt(0).toUpperCase() + p.slice(1)}</a></li>
          ))}
          {["Kurta Sets","Co-ord Sets","Dupattas","Festive Edit"].map(c => (
            <li key={c}><a href="#" className="drawer-link" onClick={(e) => { e.preventDefault(); navigateCat(c); }}>{c}</a></li>
          ))}
        </ul>
        <div className="drawer-auth">
          {user ? (
            <>
              <p style={{ fontWeight: 700, color: "var(--ember)", marginBottom: 12 }}>Hi, {user.name}!</p>
              <button className="btn btn-ghost btn-full" style={{ marginBottom: 8 }} onClick={() => { navigate("orders"); }}>My Orders</button>
              <button className="btn btn-outline btn-full" onClick={handleLogout}>Sign out</button>
            </>
          ) : (
            <button className="btn btn-primary btn-full" onClick={() => { dispatch({ type: "OPEN_AUTH" }); setDrawerOpen(false); }}>
              Sign in / Register
            </button>
          )}
        </div>
      </div>
    </>
  );
}
