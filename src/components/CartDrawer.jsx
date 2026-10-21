import { useStore } from "../context/StoreContext";
import { Bag, Close, Trash } from "./Icons";

export default function CartDrawer() {
  const { state, dispatch, cartTotal, showToast } = useStore();
  const { cart, cartOpen } = state;

  function close() { dispatch({ type: "TOGGLE_CART" }); }

  function removeItem(key) {
    dispatch({ type: "REMOVE_FROM_CART", payload: key });
    showToast("Item removed from cart", "info");
  }

  function updateQty(key, qty) {
    if (qty < 1) { removeItem(key); return; }
    dispatch({ type: "UPDATE_QTY", payload: { key, qty } });
  }

  const shipping = cartTotal >= 999 ? 0 : 99;
  const grandTotal = cartTotal + shipping;

  return (
    <div className={`cart-drawer${cartOpen ? " open" : ""}`}>
      <div className="cart-overlay" onClick={close} />
      <div className="cart-panel">
        <div className="cart-header">
          <h2>Your cart {cart.length > 0 && <span style={{ fontSize: 16, color: "var(--muted)", fontFamily: "var(--font-body)" }}>({cart.length} {cart.length === 1 ? "item" : "items"})</span>}</h2>
          <button className="close-btn" onClick={close} aria-label="Close cart"><Close size={18} /></button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="empty-icon" style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <Bag size={48} color="var(--ember)" />
            </div>
            <p>Your cart is empty</p>
            <button className="btn btn-primary" onClick={() => { close(); dispatch({ type: "SET_PAGE", payload: "shop" }); }}>
              Start shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div className="cart-item" key={item.key}>
                  <div className="cart-item-img">
                    <img src={item.product.images[0]} alt={item.product.name} />
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.product.name}</div>
                    <div className="cart-item-meta">{item.size} · {item.color}</div>
                    <div className="cart-item-qty">
                      <button className="cart-qty-btn" onClick={() => updateQty(item.key, item.qty - 1)}>−</button>
                      <span className="cart-qty-val">{item.qty}</span>
                      <button className="cart-qty-btn" onClick={() => updateQty(item.key, item.qty + 1)}>+</button>
                    </div>
                    <div className="cart-item-price">₹{(item.product.price * item.qty).toLocaleString("en-IN")}</div>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeItem(item.key)} aria-label="Remove item">
                    <Trash size={15} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--muted)" }}>
                <span>Subtotal</span><span>₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--muted)" }}>
                <span>Shipping</span>
                <span style={{ color: shipping === 0 ? "#16a34a" : "inherit", fontWeight: shipping === 0 ? 600 : 400 }}>
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="cart-note">Add ₹{(999 - cartTotal).toLocaleString("en-IN")} more for free shipping!</p>
              )}
              <div className="cart-subtotal">
                <span>Total</span>
                <span className="cart-subtotal-amount">₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
              <button className="btn btn-primary btn-full" onClick={() => { close(); dispatch({ type: "OPEN_CHECKOUT" }); }}>
                Proceed to checkout →
              </button>
              <button className="btn btn-ghost btn-full" onClick={close}>Continue shopping</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
