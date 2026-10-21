import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/products";
import { Leaf, Sparkles, Truck, RotateCcw, Star } from "../components/Icons";
import { useState } from "react";

const CATS = [
  { label: "Kurta Sets", img: "/images/item-1.jpg" },
  { label: "Co-ord Sets", img: "/images/item-2.jpg" },
  { label: "Dupattas", img: "/images/item-5.jpg" },
  { label: "Festive Edit", img: "/images/item-3.jpg" },
];

export default function Home() {
  const { dispatch, showToast } = useStore();
  const featured = PRODUCTS.filter(p => p.featured);
  const [email, setEmail] = useState("");

  const nav = (page) => { dispatch({ type: "SET_PAGE", payload: page }); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const cat = (c) => { dispatch({ type: "SET_CATEGORY", payload: c }); window.scrollTo({ top: 0, behavior: "smooth" }); };

  function handleNewsletter(e) {
    e.preventDefault();
    showToast("You are subscribed to the newsletter!");
    setEmail("");
  }

  const uspItems = [
    { icon: <Leaf size={28} color="var(--ember)" />, title: "100% Pure Cotton", desc: "Every piece is crafted in breathable, skin-kind cotton." },
    { icon: <Sparkles size={28} color="var(--ember)" />, title: "Festive Aura", desc: "Designs made for celebrations — big and small." },
    { icon: <Truck size={28} color="var(--ember)" />, title: "Free Shipping", desc: "On all orders above ₹999 across India." },
    { icon: <RotateCcw size={28} color="var(--ember)" />, title: "Easy Returns", desc: "7-day hassle-free return policy on all styles." },
  ];

  return (
    <>
      {/* Hero */}
      <div className="hero">
        <div className="hero-media">
          <img src="/images/item-1.jpg" alt="Festive cotton kurtas" className="hero-img" />
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
            {uspItems.map(({ icon, title, desc }) => (
              <div className="usp-item" key={title}>
                <div className="usp-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  {icon}
                </div>
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
                <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} filled={true} />
                  ))}
                </div>
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
