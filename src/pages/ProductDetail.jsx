import { useState } from "react";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/products";
import { Star, Bag, Heart, HeartFilled, Truck, Clock, RotateCcw } from "../components/Icons";

export default function ProductDetail() {
  const { state, dispatch, showToast } = useStore();
  const product = state.selectedProduct || PRODUCTS[0];

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "Standard");
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("desc");

  const isWished = state.wishlist.some((p) => p.id === product.id);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  function handleAddToCart() {
    dispatch({
      type: "ADD_TO_CART",
      payload: { product, size: selectedSize, color: selectedColor, qty },
    });
    dispatch({ type: "TOGGLE_CART" });
    showToast(`Added ${qty} × ${product.name} (${selectedSize}) to cart`);
  }

  function handleBuyNow() {
    dispatch({
      type: "ADD_TO_CART",
      payload: { product, size: selectedSize, color: selectedColor, qty },
    });
    dispatch({ type: "OPEN_CHECKOUT" });
  }

  function toggleWishlist() {
    dispatch({ type: "TOGGLE_WISHLIST", payload: product });
    showToast(
      isWished ? "Removed from wishlist" : "Added to wishlist",
      isWished ? "info" : "success"
    );
  }

  return (
    <div className="container" style={{ paddingTop: 20, paddingBottom: 60 }}>
      {/* Back button */}
      <button
        className="btn btn-text"
        style={{ marginBottom: 20, display: "inline-flex", alignItems: "center", gap: 6 }}
        onClick={() => {
          dispatch({ type: "SET_PAGE", payload: "shop" });
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        ← Back to all styles
      </button>

      {/* Main layout */}
      <div className="product-detail-layout" style={{ background: "var(--white)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-sm)" }}>
        {/* Gallery */}
        <div className="pd-gallery">
          <div className="pd-main-img">
            <img
              src={product.images[activeImg] || product.images[0]}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          {product.images.length > 1 && (
            <div className="pd-thumbs">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`pd-thumb${activeImg === idx ? " active" : ""}`}
                  onClick={() => setActiveImg(idx)}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="pd-info">
          <div className="pd-breadcrumb">
            <button onClick={() => dispatch({ type: "SET_PAGE", payload: "home" })}>Home</button> /{" "}
            <button onClick={() => dispatch({ type: "SET_PAGE", payload: "shop" })}>Shop</button> /{" "}
            <span>{product.category}</span>
          </div>

          <span className="pd-category">{product.category}</span>
          <h1 className="pd-name">{product.name}</h1>

          <div className="pd-rating">
            <div style={{ display: "inline-flex", gap: 3, alignItems: "center" }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} filled={i < Math.floor(product.rating)} />
              ))}
            </div>
            <span>{product.rating}</span>
            <span>·</span>
            <span>{product.reviews} customer reviews</span>
          </div>

          <div className="pd-price-row">
            <span className="pd-price">₹{product.price.toLocaleString("en-IN")}</span>
            <span className="pd-original">₹{product.originalPrice.toLocaleString("en-IN")}</span>
            <span className="pd-saving">{discount}% OFF</span>
          </div>

          <p className="pd-description">{product.description}</p>

          {/* Size Selector */}
          <div>
            <div className="pd-label">Select Size</div>
            <div className="size-grid">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  className={`size-btn${selectedSize === s ? " selected" : ""}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div>
            <div className="pd-label">Color: <strong>{selectedColor}</strong></div>
            <div className="color-grid">
              {product.colors.map((c) => (
                <button
                  key={c}
                  className={`color-btn${selectedColor === c ? " selected" : ""}`}
                  onClick={() => setSelectedColor(c)}
                >
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor:
                        c.toLowerCase().includes("saffron") ? "#e8521a" :
                        c.toLowerCase().includes("ivory") ? "#f4eee3" :
                        c.toLowerCase().includes("rust") ? "#8a6516" :
                        c.toLowerCase().includes("ember") ? "#d04010" :
                        c.toLowerCase().includes("blush") ? "#e29578" :
                        c.toLowerCase().includes("solar") ? "#f4a261" :
                        c.toLowerCase().includes("terracotta") ? "#b55333" :
                        c.toLowerCase().includes("haldi") || c.toLowerCase().includes("gold") ? "#e9c46a" :
                        "var(--ember)",
                      display: "inline-block",
                      border: "1px solid rgba(0,0,0,0.15)",
                    }}
                  />
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <div className="pd-label">Quantity</div>
            <div className="qty-row">
              <div className="qty-ctrl">
                <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <input
                  type="text"
                  className="qty-val"
                  value={qty}
                  readOnly
                />
                <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>In stock · Ready to ship</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pd-actions" style={{ marginTop: 12 }}>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                className="btn btn-primary"
                style={{ flex: 1, padding: "14px 24px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                onClick={handleAddToCart}
              >
                <Bag size={18} color="#ffffff" /> Add to Cart
              </button>
              <button
                className={`btn btn-outline`}
                style={{ padding: "14px 20px", display: "inline-flex", alignItems: "center", gap: 6 }}
                onClick={toggleWishlist}
                title="Wishlist"
              >
                {isWished ? (
                  <>
                    <HeartFilled size={18} color="#e8521a" /> Saved
                  </>
                ) : (
                  <>
                    <Heart size={18} /> Wishlist
                  </>
                )}
              </button>
            </div>
            <button
              className="btn btn-full"
              style={{
                background: "var(--dark)",
                color: "var(--white)",
                padding: "14px 24px",
                borderRadius: "var(--r-md)",
                fontWeight: 600,
              }}
              onClick={handleBuyNow}
            >
              Buy it now
            </button>
          </div>

          {/* Information Tabs */}
          <div style={{ marginTop: 24, borderTop: "1px solid var(--border)", paddingTop: 20 }}>
            <div style={{ display: "flex", gap: 16, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
              {[
                { id: "desc", label: "Details" },
                { id: "fabric", label: "Fabric & Care" },
                { id: "shipping", label: "Delivery & Returns" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: activeTab === t.id ? 700 : 500,
                    color: activeTab === t.id ? "var(--ember)" : "var(--muted)",
                    borderBottom: activeTab === t.id ? "2px solid var(--ember)" : "2px solid transparent",
                    paddingBottom: 8,
                    marginBottom: -11,
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div style={{ paddingTop: 16, fontSize: 14, color: "var(--mid)", lineHeight: 1.7 }}>
              {activeTab === "desc" && (
                <div>
                  <p>{product.description}</p>
                  <ul style={{ marginTop: 10, paddingLeft: 20 }}>
                    <li>Handcrafted by master artisans</li>
                    <li>Breathable, skin-friendly silhouette</li>
                    <li>Perfect for festive occasions, gatherings, and ceremonies</li>
                  </ul>
                </div>
              )}
              {activeTab === "fabric" && (
                <div>
                  <p><strong>Fabric:</strong> {product.fabric}</p>
                  <p><strong>Wash Care:</strong> {product.care}</p>
                  <p style={{ marginTop: 8 }}>
                    We recommend gentle care to keep colors vibrant and the cotton weave soft for years to come.
                  </p>
                </div>
              )}
              {activeTab === "shipping" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Truck size={17} color="var(--ember)" />
                    <span><strong>Free Shipping:</strong> On orders over ₹999 anywhere across India.</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Clock size={17} color="var(--ember)" />
                    <span><strong>Estimated Delivery:</strong> 3–5 business days.</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <RotateCcw size={17} color="var(--ember)" />
                    <span><strong>Easy Returns:</strong> 7-day hassle-free exchange & return policy.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div style={{ marginTop: 60 }}>
          <h2 className="section-title" style={{ textAlign: "left", marginBottom: 24 }}>
            You may also love
          </h2>
          <div className="product-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
