import { createContext, useContext, useReducer, useEffect } from "react";

const StoreContext = createContext(null);

function loadLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveLS(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

const initialState = {
  cart: loadLS("viyani_cart", []),
  wishlist: loadLS("viyani_wishlist", []),
  orders: loadLS("viyani_orders", []),
  user: loadLS("viyani_user", null),
  users: loadLS("viyani_users", []),
  currentPage: "home",
  selectedProduct: null,
  activeCategory: null,
  searchQuery: "",
  toast: null,
  cartOpen: false,
  authOpen: false,
  checkoutOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, currentPage: action.payload, selectedProduct: null, activeCategory: null, searchQuery: "" };
    case "SET_PRODUCT":
      return { ...state, selectedProduct: action.payload, currentPage: "product" };
    case "SET_CATEGORY":
      return { ...state, activeCategory: action.payload, currentPage: "shop", selectedProduct: null };
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload, currentPage: "shop" };

    case "TOGGLE_CART":
      return { ...state, cartOpen: !state.cartOpen };
    case "OPEN_AUTH":
      return { ...state, authOpen: true };
    case "CLOSE_AUTH":
      return { ...state, authOpen: false };
    case "OPEN_CHECKOUT":
      return { ...state, checkoutOpen: true };
    case "CLOSE_CHECKOUT":
      return { ...state, checkoutOpen: false };

    case "ADD_TO_CART": {
      const { product, size, color, qty = 1 } = action.payload;
      const key = `${product.id}-${size}-${color}`;
      const existing = state.cart.find((i) => i.key === key);
      const cart = existing
        ? state.cart.map((i) => i.key === key ? { ...i, qty: i.qty + qty } : i)
        : [...state.cart, { key, product, size, color, qty }];
      saveLS("viyani_cart", cart);
      return { ...state, cart };
    }
    case "REMOVE_FROM_CART": {
      const cart = state.cart.filter((i) => i.key !== action.payload);
      saveLS("viyani_cart", cart);
      return { ...state, cart };
    }
    case "UPDATE_QTY": {
      const cart = state.cart.map((i) =>
        i.key === action.payload.key ? { ...i, qty: Math.max(1, action.payload.qty) } : i
      );
      saveLS("viyani_cart", cart);
      return { ...state, cart };
    }
    case "CLEAR_CART": {
      saveLS("viyani_cart", []);
      return { ...state, cart: [] };
    }

    case "TOGGLE_WISHLIST": {
      const exists = state.wishlist.find((p) => p.id === action.payload.id);
      const wishlist = exists
        ? state.wishlist.filter((p) => p.id !== action.payload.id)
        : [...state.wishlist, action.payload];
      saveLS("viyani_wishlist", wishlist);
      return { ...state, wishlist };
    }

    case "PLACE_ORDER": {
      const order = {
        id: "TWS" + Date.now(),
        date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        items: [...state.cart],
        total: state.cart.reduce((s, i) => s + i.product.price * i.qty, 0),
        address: action.payload,
        status: "Confirmed",
      };
      const orders = [order, ...state.orders];
      saveLS("viyani_orders", orders);
      saveLS("viyani_cart", []);
      return { ...state, orders, cart: [], lastOrderId: order.id };
    }

    case "LOGIN": {
      saveLS("viyani_user", action.payload);
      return { ...state, user: action.payload };
    }
    case "REGISTER": {
      const users = [...state.users, action.payload];
      saveLS("viyani_users", users);
      saveLS("viyani_user", action.payload);
      return { ...state, users, user: action.payload };
    }
    case "LOGOUT": {
      localStorage.removeItem("viyani_user");
      return { ...state, user: null };
    }

    case "SHOW_TOAST":
      return { ...state, toast: action.payload };
    case "HIDE_TOAST":
      return { ...state, toast: null };

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.toast) {
      const t = setTimeout(() => dispatch({ type: "HIDE_TOAST" }), 3000);
      return () => clearTimeout(t);
    }
  }, [state.toast]);

  const showToast = (message, type = "success") =>
    dispatch({ type: "SHOW_TOAST", payload: { message, type } });

  const cartTotal = state.cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const cartCount = state.cart.reduce((s, i) => s + i.qty, 0);

  return (
    <StoreContext.Provider value={{ state, dispatch, showToast, cartTotal, cartCount }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
