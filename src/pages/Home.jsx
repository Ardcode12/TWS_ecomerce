import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/products";
import { useState } from "react";

const CATS = [
  { label: "Kurta Sets", img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80" },
  { label: "Co-ord Sets", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80" },
  { label: "Dupattas", img: "https://images.unsplash.com/photo-1606744824163-985d376605ef?w=600&q=80" },
  { label: "Festive Edit", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80" },
];

export default function Home() {
  const { dispatch, showToast } = useStore();
  const featured = PRODUCTS.filter(p => p.featured);
  const [email, setEmail] = useState("");

  const nav = (page) => { dispatch({ type: "SET_PAGE", payload: page }); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const cat = (c) => { dispatch({ type: "SET_CATEGORY", payload: c }); window.scrollTo({ top: 0, behavior: "smooth" }); };

  function handleNewsletter(e) {
    e.preventDefault();
    showToast("You're subscribed! Welcome to the aura club 🌟");
    setEmail("");
  }

  return (
    <>
      {/* Hero */}
      <div className="hero">
        <div className="hero-media">
          <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1400&q=80" alt="Festive cotton kurtas" className="hero-img" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <p className="hero-eyebrow">New festive collection · 2026</p>
          <h1 className="hero-heading">Wear your<br /><em>cotton aura</em></h1>
          <p className="hero-sub">Handcrafted festive wear that moves with you — breathable, beautiful, and made to be named.</p>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={() => nav("shop")}>Shop the collection</button>
            <button className="btn btn-outline-white" onClick={() => cat("Festive Edit")}>Festive best</button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Shop by category</h2>
          <div className="category-grid">
            {CATS.map(c => (
              <div className="category-card" key={c.label} onClick={() => cat(c.label)} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && cat(c.label)}>
                <img src={c.img} alt={c.label} />
                <div className="category-label">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Best sellers</h2>
            <button className="btn btn-text" onClick={() => nav("shop")}>View all →</button>
          </div>
          <div className="product-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* USP */}
      <section className="usp-banner">
        <div className="container">
          <div className="usp-grid">
            {[["🌿","100% Cotton","Every piece is crafted in breathable, skin-kind cotton."],
              ["✨","Festive aura","Designs made for celebrations — big and small."],
              ["🚚","Free shipping","On all orders above ₹999 across India."],
              ["↩️","Easy returns","7-day hassle-free return on all styles."]].map(([icon, title, desc]) => (
              <div className="usp-item" key={title}>
                <div className="usp-icon">{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">What you're saying</h2>
          <div className="testimonial-grid">
            {[["The cotton co-ord set is the best thing I've bought this festive season. Soft, beautiful, and the fit is perfect.", "Priya M., Mumbai"],
              ["I named it my 'aura kurta'. Gets me compliments every time. The embroidery is exquisite!", "Roshni K., Bangalore"],
              ["Finally a brand that gets festive cotton right. Fast delivery and the packaging was gorgeous too.", "Anjali R., Delhi"]].map(([text, author]) => (
              <div className="testimonial-card" key={author}>
                <div className="stars">★★★★★</div>
                <p>"{text}"</p>
                <span>— {author}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container newsletter-inner">
          <h2>Be the first to know</h2>
          <p>New drops, festive best picks, and aura-defining styles — straight to your inbox.</p>
          <form className="newsletter-form" onSubmit={handleNewsletter}>
            <input type="email" className="input" placeholder="Your email address" required value={email} onChange={e => setEmail(e.target.value)} />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
