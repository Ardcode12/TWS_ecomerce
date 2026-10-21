import { useStore } from "../context/StoreContext";
import { Instagram, Facebook, Pinterest } from "./Icons";

export default function Footer() {
  const { dispatch } = useStore();
  const nav = (page) => { dispatch({ type: "SET_PAGE", payload: page }); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const cat = (c) => { dispatch({ type: "SET_CATEGORY", payload: c }); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="brand-logo-main">TWS Store</span>
          <p>Premium cotton festive wear — crafted to name your aura.</p>
          <div className="social-links">
            <a href="#" aria-label="Instagram" className="social-link"><Instagram size={17} /></a>
            <a href="#" aria-label="Facebook" className="social-link"><Facebook size={17} /></a>
            <a href="#" aria-label="Pinterest" className="social-link"><Pinterest size={17} /></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          {["Kurta Sets","Co-ord Sets","Dupattas","Festive Edit"].map(c => (
            <a href="#" key={c} className="footer-link" onClick={(e) => { e.preventDefault(); cat(c); }}>{c}</a>
          ))}
        </div>
        <div className="footer-col">
          <h4>Help</h4>
          <a href="#" className="footer-link">Shipping &amp; Returns</a>
          <a href="#" className="footer-link">Size guide</a>
          <a href="#" className="footer-link">Track your order</a>
          <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); nav("about"); }}>About TWS Store</a>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <p className="footer-text">hello@twsstore.in</p>
          <p className="footer-text">+91 98765 43210</p>
          <p className="footer-text">Mon–Sat · 10am–6pm IST</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 TWS Store. All rights reserved.</p>
        <p>Crafted in India</p>
      </div>
    </footer>
  );
}
