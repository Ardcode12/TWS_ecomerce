import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const { state, dispatch, showToast } = useStore();
  const { wishlist } = state;

  function clearAll() {
    wishlist.forEach((p) => {
      dispatch({ type: "TOGGLE_WISHLIST", payload: p });
    });
    showToast("Wishlist cleared", "info");
  }

  function addAllToCart() {
    wishlist.forEach((p) => {
      dispatch({
        type: "ADD_TO_CART",
        payload: { product: p, size: p.sizes[0], color: p.colors[0], qty: 1 },
      });
    });
    dispatch({ type: "TOGGLE_CART" });
    showToast(`Added ${wishlist.length} styles to your cart! 🛍️`);
  }

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 80, minHeight: "65vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 700 }}>
            My Wishlist
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 15, marginTop: 4 }}>
            {wishlist.length} {wishlist.length === 1 ? "saved piece" : "saved pieces"} to complete your aura
          </p>
        </div>

        {wishlist.length > 0 && (
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn btn-outline btn-sm" onClick={clearAll}>
              Clear all
            </button>
            <button className="btn btn-primary btn-sm" onClick={addAllToCart}>
              Move all to cart 🛍️
            </button>
          </div>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
            background: "var(--white)",
            borderRadius: "var(--r-xl)",
            boxShadow: "var(--shadow-sm)",
            maxWidth: 540,
            margin: "0 auto",
          }}
        >
          <div style={{ fontSize: 56, marginBottom: 16 }}>💛</div>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: 28, marginBottom: 10 }}>
            Your wishlist is empty
          </h2>
          <p style={{ color: "var(--mid)", lineHeight: 1.6, marginBottom: 24, fontSize: 15 }}>
            See something you love in our collection? Click the heart icon to save it here for later.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => dispatch({ type: "SET_PAGE", payload: "shop" })}
          >
            Explore collections →
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {wishlist.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
