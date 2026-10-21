import { useStore } from "../context/StoreContext";
import { Check } from "../components/Icons";

export default function About() {
  const { dispatch } = useStore();

  return (
    <>
      <div className="about-hero">
        <div className="container">
          <h1>Our Story</h1>
          <p className="about-sub">Where ancient craft meets contemporary celebration</p>
        </div>
      </div>

      <div className="container about-content">
        <div className="about-grid">
          <div className="about-text">
            <h2>Wear your cotton aura</h2>
            <p>
              TWS Store was born from a singular, heartfelt vision: that festive clothing should never compromise on comfort. 
              We believe celebrating life's vibrant moments should feel as effortless and breathable as pure cotton itself.
            </p>
            <p>
              Every kurta set, co-ord ensemble, and dupatta in our collection is thoughtfully designed with the warmth of Indian festivities in mind — rich saffron shades, grounding ember tones, delicate handblock prints, and meticulous zari embroidery.
            </p>
            <ul className="about-list">
              <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ color: "var(--ember)", marginTop: 2 }}><Check size={16} /></span>
                <span><strong>100% Breathable Cotton:</strong> Sourced ethically and woven for skin-friendly comfort.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ color: "var(--ember)", marginTop: 2 }}><Check size={16} /></span>
                <span><strong>Artisanal Block Prints:</strong> Hand-crafted by hereditary artisans across Rajasthan &amp; Gujarat.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ color: "var(--ember)", marginTop: 2 }}><Check size={16} /></span>
                <span><strong>Conscious Fashion:</strong> Made in small, intentional batches to prevent textile waste.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ color: "var(--ember)", marginTop: 2 }}><Check size={16} /></span>
                <span><strong>Inclusive Fit:</strong> Flattering cuts from XS through XXL made to flatter every silhouette.</span>
              </li>
            </ul>
            <div style={{ marginTop: 28 }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  dispatch({ type: "SET_PAGE", payload: "shop" });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Explore our festive edit →
              </button>
            </div>
          </div>

          <div className="about-image">
            <img
              src="/images/item-2.jpg"
              alt="Artisan crafting cotton festive garments"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
