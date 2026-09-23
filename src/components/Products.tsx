"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const products = [
  { id: 1, slug: "dairy-feed", name: "Premium Dairy Feed", category: "Dairy Feed", protein: "22%", cal: "High", isBest: true, img: "/products/Gaurishakti-Premium.png" },
  { id: 2, slug: "super-yield", name: "Super Yield Cattle Feed", category: "Cattle Feed", protein: "20%", cal: "High", isBest: false, img: "/products/Gaurishakti-Gold.png" },
  { id: 3, slug: "calf-feed", name: "Nutri Calf Starter", category: "Calf Starter", protein: "24%", cal: "Med", isBest: false, img: "/products/Gaurishakti-Calf-Starter.png" },
  { id: 4, slug: "mineral-mixture", name: "Gold Mineral Mixture", category: "Mineral Mixture", protein: "0%", cal: "Very High", isBest: true, img: "/products/Gaurishakti-silver.png" },
  { id: 5, slug: "pro-milk", name: "Pro Milk Special", category: "Dairy Feed", protein: "23%", cal: "High", isBest: false, img: "/products/Gaurishakti-Transition-Plus.png" },
];

const categories = ["All", "Dairy Feed", "Cattle Feed", "Calf Starter", "Mineral Mixture"];

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
          padding: 80px max(16px, env(safe-area-inset-left));
          background: #F8F8F8;
        }
        .products-title {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 700;
          color: var(--primary-green);
          margin-bottom: 32px;
          text-align: center;
        }
        .products-tabs {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .product-tab-btn {
          min-height: 48px;
          padding: 10px 20px;
          border-radius: 24px;
          border: 1px solid #E5E5E5;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          background: #FFFFFF;
          color: #666666;
        }
        .product-tab-btn.active {
          background: var(--primary-green);
          color: #FFFFFF;
          border-color: var(--primary-green);
          box-shadow: 0 4px 12px rgba(27, 94, 63, 0.2);
        }
        .products-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 24px;
        }
        .products-grid .product-card-item {
          flex: 0 0 calc((100% - 48px) / 3);
          width: calc((100% - 48px) / 3);
          max-width: calc((100% - 48px) / 3);
          box-sizing: border-box;
          background: #FFFFFF;
          border: 1px solid #E5E5E5;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .products-grid .product-card-item:hover {
          transform: translateY(-4px);
          border-color: var(--accent-gold);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
        }
        .product-img-box {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          border-radius: 12px;
          background: #F8F8F8;
          overflow: hidden;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .product-tag-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: var(--accent-gold);
          color: #1B1B1B;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 20px;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .product-card-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--primary-green);
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .product-card-desc {
          font-size: 14px;
          color: #666666;
          line-height: 1.5;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .spec-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
          flex-grow: 1;
        }
        .spec-tag {
          font-size: 12px;
          font-weight: 600;
          color: var(--primary-green);
          background: rgba(27, 94, 63, 0.06);
          border: 1px solid rgba(27, 94, 63, 0.2);
          border-radius: 8px;
          padding: 4px 10px;
        }
        .btn-view-details {
          min-height: 48px;
          height: 48px;
          background: var(--accent-gold);
          color: #1B1B1B;
          font-size: 15px;
          font-weight: 600;
          border-radius: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .btn-view-details:hover {
          background: var(--gold-hover);
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(212, 175, 55, 0.3);
        }
        
        @media (max-width: 1024px) {
          .products-grid .product-card-item {
            flex: 0 0 calc((100% - 24px) / 2);
            width: calc((100% - 24px) / 2);
            max-width: calc((100% - 24px) / 2);
          }
        }
        
        @media (max-width: 768px) {
          .products-section {
            padding: 48px 16px;
          }
          .products-grid .product-card-item {
            flex: 0 0 100%;
            width: 100%;
            max-width: 100%;
            padding: 16px;
          }
        }
      `}} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="products-title"
        >
          Our Premium Cattle Feed Products
        </motion.h2>

        {/* Categories Tabs */}
        <div className="products-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`product-tab-btn ${activeTab === cat ? "active" : ""}`}
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="product-card-item"
              >
                {product.isBest && (
                  <div className="product-tag-badge">
                    <Flame size={13} /> Best Seller
                  </div>
                )}

                <div className="product-img-box">
                  <Image 
                    src={product.img} 
                    alt={product.name} 
                    width={400} 
                    height={300} 
                    style={{ objectFit: "contain", maxHeight: "100%", width: "auto" }}
                  />
                </div>

                <h3 className="product-card-title">
                  {product.name}
                </h3>

                <p className="product-card-desc">
                  Scientifically balanced formula to maximize milk yield, cattle health, and nutritional vitality.
                </p>

                <div className="spec-tags">
                  <span className="spec-tag">Protein {product.protein}</span>
                  <span className="spec-tag">Calcium {product.cal}</span>
                  <span className="spec-tag">Vet Approved</span>
                </div>

                <Link
                  href={`/products/${product.slug}`}
                  className="btn-view-details"
                >
                  <span>View Details</span>
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
