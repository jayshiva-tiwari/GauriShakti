"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import Link from "next/link";

const products = [
  { id: 1, slug: "dairy-feed", name: "Premium Dairy Feed", category: "Dairy Feed", protein: "22%", cal: "High", isBest: true, img: "/products/Gaurishakti-Premium.png" },
  { id: 2, slug: "super-yield", name: "Super Yield Cattle Feed", category: "Cattle Feed", protein: "20%", cal: "High", isBest: false, img: "/products/Gaurishakti-Gold.png" },
  { id: 3, slug: "calf-feed", name: "Nutri Calf Starter", category: "Calf Starter", protein: "24%", cal: "Med", isBest: false, img: "/products/Gaurishakti-Calf-Starter.png" },
  { id: 4, slug: "mineral-mixture", name: "Gold Mineral Mixture", category: "Mineral Mixture", protein: "0%", cal: "Very High", isBest: true, img: "/products/Gaurishakti-silver.png" },
  { id: 5, slug: "pro-milk", name: "Pro Milk Special", category: "Dairy Feed", protein: "23%", cal: "High", isBest: false, img: "/products/Gaurishakti-Transition-Plus.png" },
  // { id: 6, slug: "supplements", name: "Pregnancy Special Nutrition", category: "Special Nutrition", protein: "18%", cal: "High", isBest: false, img: "/products/Gaurishakti-Transition-Plus.png" },
];

const categories = ["All", "Dairy Feed", "Cattle Feed", "Calf Starter", "Mineral Mixture", "Special Nutrition"];

export default function Products() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts = activeTab === "All"
    ? products
    : products.filter(p => p.category === activeTab);

  return (
    <section className="products-section">
      <style dangerouslySetInnerHTML={{
        __html: `
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
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 30px;
        }
        .products-grid .product-card {
          flex: 0 0 calc((100% - 60px) / 3);
          width: calc((100% - 60px) / 3);
          max-width: calc((100% - 60px) / 3);
          box-sizing: border-box;
        }
        
        @media (max-width: 1024px) {
          .products-grid .product-card {
            flex: 0 0 calc((100% - 30px) / 2);
            width: calc((100% - 30px) / 2);
            max-width: calc((100% - 30px) / 2);
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
            gap: 20px;
          }
          .products-grid .product-card {
            flex: 0 0 100%;
            width: 100%;
            max-width: 100%;
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

                <Link
                  href={`/products/${product.slug}`}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "space-between", padding: "16px 24px", textDecoration: "none", display: "inline-flex" }}
                >
                  View Details <ArrowRight size={20} />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
