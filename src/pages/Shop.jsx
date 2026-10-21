import { useState, useMemo } from "react";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/products";

const CATEGORIES = ["Kurta Sets", "Co-ord Sets", "Dupattas", "Festive Edit"];

export default function Shop() {
  const { state, dispatch } = useStore();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedCats, setSelectedCats] = useState(
    state.activeCategory ? [state.activeCategory] : []
  );
  const [maxPrice, setMaxPrice] = useState(4000);
  const [sortBy, setSortBy] = useState("featured");

  const activeCategory = state.activeCategory;
  const searchQuery = state.searchQuery;

  // Sync selected categories if activeCategory changes
  useMemo(() => {
    if (activeCategory) {
      setSelectedCats([activeCategory]);
    }
  }, [activeCategory]);

  function toggleCat(cat) {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  function clearFilters() {
    setSelectedCats([]);
    setMaxPrice(4000);
    setSortBy("featured");
    dispatch({ type: "SET_SEARCH", payload: "" });
    dispatch({ type: "SET_CATEGORY", payload: null });
  }

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCats.length > 0 && !selectedCats.includes(p.category)) {
        return false;
      }
      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }
      // Price filter
      if (p.price > maxPrice) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCats, searchQuery, maxPrice, sortBy]);

  return (
    <>
      <div className="shop-hero">
        <div className="container">
          <h1>
            {searchQuery
              ? `Search: "${searchQuery}"`
              : activeCategory
              ? activeCategory
              : "All Collections"}
          </h1>
          <p>Handcrafted festive cotton pieces designed to celebrate your aura</p>
        </div>
      </div>

      <div className="container">
        <div className="shop-layout">
          {/* Mobile backdrop */}
          {mobileFilterOpen && (
            <div
              className="backdrop show"
              onClick={() => setMobileFilterOpen(false)}
            />
          )}

          {/* Filter Sidebar */}
          <aside className={`filter-sidebar${mobileFilterOpen ? " open" : ""}`}>
            <div className="filter-header">
              <h3>Filters</h3>
              <button
                className="btn btn-text"
                style={{ fontSize: 13 }}
                onClick={clearFilters}
              >
                Reset
              </button>
            </div>

            {/* Categories */}
            <div className="filter-group">
              <h4>Category</h4>
              {CATEGORIES.map((cat) => (
                <label className="filter-check" key={cat}>
                  <input
                    type="checkbox"
                    checked={selectedCats.includes(cat)}
                    onChange={() => toggleCat(cat)}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>

            {/* Price slider */}
            <div className="filter-group">
              <h4>Max Price: ₹{maxPrice.toLocaleString("en-IN")}</h4>
              <input
                type="range"
                min="500"
                max="4000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--ember)" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: "var(--muted)",
                  marginTop: 6,
                }}
              >
                <span>₹500</span>
                <span>₹4,000</span>
              </div>
            </div>

            <button
              className="btn btn-primary filter-apply-mobile"
              onClick={() => setMobileFilterOpen(false)}
            >
              Apply Filters
            </button>
          </aside>

          {/* Main Product Area */}
          <main className="shop-main">
            <div className="shop-toolbar">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button
                  className="btn btn-outline btn-sm filter-toggle-mobile"
                  onClick={() => setMobileFilterOpen(true)}
                >
                  ⚡ Filters
                </button>
                <span className="product-count">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "style" : "styles"} found
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label
                  htmlFor="sort-select"
                  style={{ fontSize: 13, color: "var(--muted)" }}
                >
                  Sort:
                </label>
                <select
                  id="sort-select"
                  className="input"
                  style={{
                    padding: "6px 12px",
                    width: "auto",
                    fontSize: 13,
                    borderRadius: "var(--r-sm)",
                  }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Active search chip */}
            {searchQuery && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--light)",
                  padding: "6px 14px",
                  borderRadius: "var(--r-xl)",
                  marginBottom: 20,
                  fontSize: 13,
                }}
              >
                <span>
                  Query: <strong>"{searchQuery}"</strong>
                </span>
                <button
                  onClick={() => dispatch({ type: "SET_SEARCH", payload: "" })}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 14,
                    color: "var(--ember)",
                  }}
                >
                  ✕
                </button>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  background: "var(--white)",
                  borderRadius: "var(--r-lg)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div style={{ fontSize: 44, marginBottom: 12 }}>🔍</div>
                <h3
                  style={{
                    fontFamily: "var(--font-head)",
                    fontSize: 24,
                    marginBottom: 8,
                  }}
                >
                  No styles found
                </h3>
                <p style={{ color: "var(--muted)", marginBottom: 20 }}>
                  Try adjusting your filters or search terms
                </p>
                <button className="btn btn-primary" onClick={clearFilters}>
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
