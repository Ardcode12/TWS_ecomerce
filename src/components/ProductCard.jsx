import { useStore } from "../context/StoreContext";

export default function ProductCard({ product }) {
  const { state, dispatch, showToast } = useStore();
  const isWished = state.wishlist.some(p => p.id === product.id);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  function handleWishlist(e) {
    e.stopPropagation();
    dispatch({ type: "TOGGLE_WISHLIST", payload: product });
    showToast(isWished ? "Removed from wishlist" : "Added to wishlist 💛", isWished ? "info" : "success");
  }

  function handleQuickAdd(e) {
    e.stopPropagation();
    dispatch({ type: "ADD_TO_CART", payload: { product, size: product.sizes[0], color: product.colors[0] } });
    dispatch({ type: "TOGGLE_CART" });
    showToast(`${product.name} added to cart! 🛍️`);
  }

  function handleView() {
    dispatch({ type: "SET_PRODUCT", payload: product });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const badgeColor = { "Best seller": "badge-ember", "New": "badge-solar", "Sale": "badge-sherbet", "Festive": "badge-ember", "Premium": "badge-solar" };

  return (
    <div className="product-card" onClick={handleView} role="button" tabIndex={0}
      onKeyDown={e => e.key === "Enter" && handleView()}>
      <div className="product-card-img-wrap">
        <img src={product.images[0]} alt={product.name} className="product-card-img" loading="lazy" />
        {product.badge && (
          <span className={`product-card-badge badge ${badgeColor[product.badge] || "badge-ember"}`}>
            {product.badge}
          </span>
        )}
        <button className={`product-card-wishlist${isWished ? " active" : ""}`} onClick={handleWishlist} aria-label="Wishlist">
          {isWished ? "💛" : "🤍"}
        </button>
        <div className="product-card-quick" onClick={handleQuickAdd}>
          + Quick add to cart
        </div>
      </div>
      <div className="product-card-body">
        <span className="product-card-cat">{product.category}</span>
        <h3 className="product-card-name">{product.name}</h3>
        <div className="product-card-rating">
          <span className="stars-sm">{"★".repeat(Math.floor(product.rating))}</span>
          <span>{product.rating} ({product.reviews})</span>
        </div>
        <div className="product-card-price">
          <span className="price-current">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="price-original">₹{product.originalPrice.toLocaleString("en-IN")}</span>
          <span className="price-saving">{discount}% off</span>
        </div>
      </div>
    </div>
  );
}
