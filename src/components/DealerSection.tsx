"use client";

import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Headphones, Megaphone, Coins } from "lucide-react";

export default function DealerSection() {
  const benefits = [
    { icon: <TrendingUp size={30} />, title: "High Market Demand", desc: "Constant requirement across all seasons." },
    { icon: <ShieldCheck size={30} />, title: "Strong Brand Trust", desc: "Farmer's first choice for premium feed." },
    { icon: <Headphones size={30} />, title: "Dealer Support", desc: "24/7 priority support line for dealers." },
    { icon: <Megaphone size={30} />, title: "Marketing Assistance", desc: "Free branding materials and local ads." },
    { icon: <Coins size={30} />, title: "Attractive Margins", desc: "High profit margins and volume bonuses." },
  ];

  return (
    <section className="dealer-section">
      <style dangerouslySetInnerHTML={{__html: `
        .dealer-section {
          padding: 100px 5%;
          background: var(--light-cream);
        }
        .dealer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          gap: 60px;
          align-items: center;
        }
        .dealer-left {
          flex: 1 1 500px;
        }
        .dealer-right {
          flex: 1 1 500px;
        }
        .dealer-title {
          font-size: 3rem;
          color: var(--dark-green);
          margin-bottom: 20px;
        }
        .dealer-desc {
          font-size: 1.2rem;
          color: var(--gray);
          margin-bottom: 40px;
          line-height: 1.6;
        }
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        .benefit-card {
          background: var(--white);
          padding: 25px;
          border-radius: var(--border-radius-sm);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.02);
        }
        
        @media (max-width: 1024px) {
          .dealer-container {
            flex-direction: column;
            text-align: center;
          }
          .benefits-grid {
            text-align: left;
          }
        }
        
        @media (max-width: 768px) {
          .dealer-section {
            padding: 60px 5%;
          }
          .dealer-title {
            font-size: clamp(2rem, 6vw, 2.5rem);
          }
          .dealer-desc {
            font-size: 1rem;
          }
          .benefits-grid {
            grid-template-columns: 1fr;
          }
          .benefit-card {
            grid-column: auto !important; /* Override the span 2 */
          }
        }
      `}} />

      <div className="dealer-container">
        
        <div className="dealer-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="dealer-title">Become A Distributor Partner</h2>
            <p className="dealer-desc">
              Join the fastest-growing cattle feed network in India. We provide our dealers with everything they need to succeed, from high-quality products to comprehensive marketing support.
            </p>
            
            <button className="btn-primary btn-pulse" style={{ padding: "18px 40px", fontSize: "clamp(1rem, 2.5vw, 1.2rem)" }}>
              Become A Dealer
            </button>
          </motion.div>
        </div>

        <div className="dealer-right">
          <div className="benefits-grid">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="benefit-card"
                style={{
                  gridColumn: i === 4 ? "span 2" : "auto", // Handled in CSS for mobile
                }}
              >
                <div style={{ color: "var(--wheat-gold)", marginBottom: "15px" }}>{b.icon}</div>
                <h4 style={{ fontSize: "1.2rem", color: "var(--dark-green)", marginBottom: "10px" }}>{b.title}</h4>
                <p style={{ color: "var(--gray)", fontSize: "0.9rem", lineHeight: 1.5 }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
