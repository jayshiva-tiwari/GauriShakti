"use client";

import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="cta-section">
      <style dangerouslySetInnerHTML={{__html: `
        .cta-section {
          padding: 80px 5%;
          background: var(--light-cream);
        }
        .cta-container {
          max-width: 1200px;
          margin: 0 auto;
          background: linear-gradient(135deg, var(--dark-green) 0%, var(--agri-green) 100%);
          border-radius: var(--border-radius-lg);
          padding: 80px 5%;
          text-align: center;
          color: var(--white);
          box-shadow: 0 20px 50px rgba(11, 61, 46, 0.3);
          position: relative;
          overflow: hidden;
        }
        .cta-heading {
          font-size: 56px;
          margin-bottom: 20px;
          color: var(--wheat-gold);
          line-height: 1.1;
        }
        .cta-subtext {
          font-size: 1.2rem;
          margin-bottom: 40px;
          opacity: 0.9;
          line-height: 1.6;
        }
        .cta-button {
          padding: 20px 40px;
          font-size: 1.3rem;
          background: var(--white);
          color: var(--dark-green);
          display: inline-flex;
        }
        .cta-buttons-wrapper {
          display: flex;
          justify-content: center;
          gap: 16px;
        }
        
        @media (max-width: 1024px) {
          .cta-heading { font-size: 44px; }
        }
        
        @media (max-width: 768px) {
          .cta-heading { font-size: 32px; line-height: 1.2; }
          .cta-subtext { font-size: 15px; }
          .cta-button {
            width: 100%;
            max-width: 320px;
            font-size: 1.1rem;
            padding: 16px 20px;
            margin: 0 auto;
          }
          .cta-buttons-wrapper {
            flex-direction: column;
            align-items: center;
          }
        }
      `}} />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="cta-container"
      >
        {/* Decorative background elements */}
        <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "absolute", bottom: "-50px", left: "-50px", width: "150px", height: "150px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto" }}>
          <h2 className="cta-heading">
            Want Higher Milk Yield This Season?
          </h2>
          <p className="cta-subtext">
            Talk to our cattle nutrition experts and discover the right feed for your farm. We guarantee noticeable results within the first month.
          </p>
          
          <div className="cta-buttons-wrapper">
            <button className="btn-primary btn-pulse cta-button">
              <PhoneCall size={24} style={{ marginRight: "8px" }} /> Get Free Consultation
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
