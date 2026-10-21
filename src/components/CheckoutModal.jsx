import { useState } from "react";
import { useStore } from "../context/StoreContext";

export default function CheckoutModal() {
  const { state, dispatch, cartTotal, showToast } = useStore();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "", pin: "", state: "", payment: "upi" });
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  if (!state.checkoutOpen && !success) return null;

  const shipping = cartTotal >= 999 ? 0 : 99;
  const grandTotal = cartTotal + shipping;

  function close() {
    dispatch({ type: "CLOSE_CHECKOUT" });
    setSuccess(false);
    setOrderId("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "PLACE_ORDER", payload: form });
    const id = "TWS" + Date.now();
    setOrderId(state.lastOrderId || id);
    setSuccess(true);
    showToast("Order placed successfully! 🎉");
  }

  if (success) {
    return (
      <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && close()}>
        <div className="modal-box modal-box-sm success-box">
          <div className="success-icon">🎉</div>
          <h2>Order placed!</h2>
          <p>Your festive pieces are on their way to you.</p>
          <p className="order-id-text">Order ID: {state.orders[0]?.id || orderId}</p>
          <button className="btn btn-primary btn-full" style={{ marginTop: 8 }} onClick={() => { close(); dispatch({ type: "SET_PAGE", payload: "orders" }); }}>
            View my orders
          </button>
          <button className="btn btn-ghost btn-full" onClick={() => { close(); dispatch({ type: "SET_PAGE", payload: "shop" }); }}>
            Continue shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="modal-box modal-box-lg">
        <button className="modal-close" onClick={close}>✕</button>
        <h2 className="auth-title">Checkout</h2>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h3>Delivery details</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Full name</label>
                <input className="input" required placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input className="input" required type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input className="input" required type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea className="input input-textarea" required placeholder="House/flat, street, locality" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input className="input" required placeholder="City" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input className="input" required placeholder="6-digit pin" maxLength={6} value={form.pin} onChange={e => setForm({...form, pin: e.target.value})} />
              </div>
            </div>
            <div className="form-group">
              <label>State</label>
              <select className="select-input" required value={form.state} onChange={e => setForm({...form, state: e.target.value})}>
                <option value="">Select state</option>
                {["Maharashtra","Karnataka","Delhi","Tamil Nadu","Rajasthan","Gujarat","West Bengal","Telangana","Other"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <h3 style={{ marginTop: 28 }}>Payment method</h3>
            <div className="payment-options">
              {[{v:"upi",l:"📱 UPI / GPay / PhonePe"},{v:"card",l:"💳 Debit / Credit Card"},{v:"cod",l:"💵 Cash on Delivery"}].map(opt => (
                <label className="payment-opt" key={opt.v}>
                  <input type="radio" name="payment" value={opt.v} checked={form.payment === opt.v}
                    onChange={() => setForm({...form, payment: opt.v})} />
                  {opt.l}
                </label>
              ))}
            </div>
            <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: 24 }}>
              Place order · ₹{grandTotal.toLocaleString("en-IN")}
            </button>
          </form>

          <div className="checkout-summary">
            <h3>Order summary</h3>
            {state.cart.map(item => (
              <div className="chk-item" key={item.key}>
                <div className="chk-item-img"><img src={item.product.images[0]} alt={item.product.name} /></div>
                <div className="chk-item-info">
                  <div className="chk-item-name">{item.product.name}</div>
                  <div className="chk-item-meta">{item.size} · {item.color} · Qty: {item.qty}</div>
                </div>
                <div className="chk-item-price">₹{(item.product.price * item.qty).toLocaleString("en-IN")}</div>
              </div>
            ))}
            <div className="chk-totals">
              <div className="chk-row"><span>Subtotal</span><span>₹{cartTotal.toLocaleString("en-IN")}</span></div>
              <div className="chk-row"><span>Shipping</span><span style={{ color: shipping === 0 ? "green" : "inherit" }}>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
              <div className="chk-row total"><span>Total</span><span>₹{grandTotal.toLocaleString("en-IN")}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
