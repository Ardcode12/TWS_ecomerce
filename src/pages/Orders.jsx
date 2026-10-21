import { useStore } from "../context/StoreContext";
import { Box, CheckCircle } from "../components/Icons";

export default function Orders() {
  const { state, dispatch } = useStore();
  const { orders } = state;

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 80, minHeight: "65vh" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 700 }}>
          My Orders
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 15, marginTop: 4 }}>
          Track and view your festive wear orders
        </p>
      </div>

      {orders.length === 0 ? (
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
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <Box size={54} color="var(--ember)" />
          </div>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: 28, marginBottom: 10 }}>
            No orders placed yet
          </h2>
          <p style={{ color: "var(--mid)", lineHeight: 1.6, marginBottom: 24, fontSize: 15 }}>
            When you complete an order, you will see its tracking status, item breakdown, and delivery details right here.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => dispatch({ type: "SET_PAGE", payload: "shop" })}
          >
            Start shopping →
          </button>
        </div>
      ) : (
        <div style={{ maxWidth: 840 }}>
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-card-header">
                <div>
                  <div className="order-id">Order #{order.id}</div>
                  <div className="order-date">Placed on {order.date}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span className="order-status">● {order.status}</span>
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div className="order-item" key={idx}>
                    <div className="order-item-img">
                      <img src={item.product.images[0]} alt={item.product.name} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="order-item-name">{item.product.name}</div>
                      <div className="order-item-meta">
                        Size: {item.size} &nbsp;|&nbsp; Color: {item.color} &nbsp;|&nbsp; Qty: {item.qty}
                      </div>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>
                      ₹{(item.product.price * item.qty).toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>

              {order.address && (
                <div
                  style={{
                    background: "var(--light)",
                    padding: "14px 18px",
                    borderRadius: "var(--r-md)",
                    marginBottom: 16,
                    fontSize: 13,
                    color: "var(--mid)",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <div>
                    <strong>Delivering to:</strong> {order.address.name} ({order.address.phone})
                    <br />
                    {order.address.address}, {order.address.city} - {order.address.pin}
                  </div>
                  <div>
                    <strong>Payment:</strong> {order.address.payment?.toUpperCase() || "UPI / Prepaid"}
                  </div>
                </div>
              )}

              <div className="order-total">
                <span>Total Amount Paid</span>
                <span>₹{(order.total + (order.total >= 999 ? 0 : 99)).toLocaleString("en-IN")}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
