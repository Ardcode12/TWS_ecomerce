import { StoreProvider, useStore } from "./context/StoreContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import AuthModal from "./components/AuthModal";
import CheckoutModal from "./components/CheckoutModal";
import Toast from "./components/Toast";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import About from "./pages/About";

function AppContent() {
  const { state } = useStore();

  function renderPage() {
    switch (state.currentPage) {
      case "shop":
        return <Shop />;
      case "product":
        return <ProductDetail />;
      case "wishlist":
        return <Wishlist />;
      case "orders":
        return <Orders />;
      case "about":
        return <About />;
      case "home":
      default:
        return <Home />;
    }
  }

  return (
    <div className="app-root" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main className="main-content" style={{ flex: 1 }}>
        {renderPage()}
      </main>
      <Footer />
      <CartDrawer />
      <AuthModal />
      <CheckoutModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
