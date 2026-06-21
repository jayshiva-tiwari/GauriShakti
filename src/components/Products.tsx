"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";

const products = [
  { id: 1, name: "Premium Dairy Feed", category: "Dairy Feed", protein: "22%", cal: "High", isBest: true, img: "https://i.pinimg.com/736x/46/c7/4f/46c74fa1d4a0924b35ee2fa44716bbe5.jpg" },
  { id: 2, name: "Super Yield Cattle Feed", category: "Cattle Feed", protein: "20%", cal: "High", isBest: false, img: "https://i.pinimg.com/1200x/af/1f/c2/af1fc2784822e9455c6cbd6b60d29b62.jpg" },
  { id: 3, name: "Nutri Calf Starter", category: "Calf Starter", protein: "24%", cal: "Med", isBest: false, img: "https://i.pinimg.com/736x/c0/08/48/c008480cdbd1ea10dd3479d57b9cd818.jpg" },
  { id: 4, name: "Gold Mineral Mixture", category: "Mineral Mixture", protein: "0%", cal: "Very High", isBest: true, img: "https://i.pinimg.com/736x/93/46/5d/93465d7bc09ed8c2484cded4e168c6f1.jpg" },
  { id: 5, name: "Pro Milk Special", category: "Dairy Feed", protein: "23%", cal: "High", isBest: false, img: "https://i.pinimg.com/1200x/24/07/90/240790a1218c57ead5050653a6a9b4ca.jpg" },
  { id: 6, name: "Pregnancy Special Nutrition", category: "Special Nutrition", protein: "18%", cal: "High", isBest: false, img: "https://i.pinimg.com/736x/f0/ff/0a/f0ff0a36f58b2fdb870314694754eb5c.jpg" },
];

const categories = ["All", "Dairy Feed", "Cattle Feed", "Calf Starter", "Mineral Mixture", "Special Nutrition"];

export default function Products() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts = activeTab === "All"
    ? products
    : products.filter(p => p.category === activeTab);

  return (
    <section className="products-section">
      <style dangerouslySetInnerHTML={{__html: `
        .products-section {
          padding: 80px 5%;
          background: var(--light-cream);
          min-height: 800px;
        }
        .products-title {
          font-size: 3rem;
          color: var(--dark-green);
          margin-bottom: 40px;
        }
        .products-tabs {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 50px;
        }
        .product-tab-btn {
          padding: 10px 24px;
          border-radius: 30px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        
        @media (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .products-section {
            padding: 60px 5%;
          }
          .products-title {
            font-size: clamp(2rem, 6vw, 2.5rem);
          }
          .products-tabs {
            gap: 8px;
            margin-bottom: 30px;
          }
          .product-tab-btn {
            padding: 8px 16px;
            font-size: 0.9rem;
          }
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="products-title"
        >
          Our Premium Feed Products
        </motion.h2>

        {/* Tabs */}
        <div className="products-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className="product-tab-btn"
              style={{
                background: activeTab === cat ? "var(--dark-green)" : "transparent",
                color: activeTab === cat ? "var(--wheat-gold)" : "var(--gray)",
                boxShadow: activeTab === cat ? "0 4px 15px rgba(11, 61, 46, 0.2)" : "none"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div layout className="products-grid">
          <AnimatePresence>
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="product-card"
                style={{ textAlign: "left", display: "flex", flexDirection: "column" }}
              >
                {product.isBest && (
                  <div className="badge">
                    <Flame size={14} style={{ display: "inline", marginBottom: "-2px" }} /> Best Seller
                  </div>
                )}

                <div className="product-image-container">
                  <img src={product.img} alt={product.name} className="product-image" />
                </div>

                <h3 style={{ fontSize: "1.5rem", color: "var(--dark-green)", marginBottom: "10px" }}>
                  {product.name}
                </h3>

                <p style={{ color: "var(--gray)", marginBottom: "20px", lineHeight: 1.5 }}>
                  Scientifically balanced formula to maximize yield and ensure complete nutrition.
                </p>

                <div style={{ marginBottom: "20px", flexGrow: 1 }}>
                  <span className="nutrition-pill">Protein {product.protein}</span>
                  <span className="nutrition-pill">Calcium {product.cal}</span>
                  <span className="nutrition-pill">Vitamin Rich</span>
                  <span className="nutrition-pill">Digestive Boost</span>
                </div>

                <button
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "space-between", padding: "16px 24px" }}
                >
                  View Details <ArrowRight size={20} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
