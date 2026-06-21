"use client";

import { motion } from "framer-motion";
import { ArrowDown, CheckCircle } from "lucide-react";

export default function Hero() {
  const headline = "Premium Nutrition For Higher Milk Production".split(" ");

  const stats = [
    { value: "25+", label: "Years Experience" },
    { value: "50,000+", label: "Farmers Trust Us" },
    { value: "100+", label: "Distributors" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 100px 5% 50px;
        }
        .hero-container {
          max-width: 1280px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 1;
          margin: 0 auto;
        }
        .hero-left {
          width: 60%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .hero-right {
          width: 40%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hero-headline {
          font-size: clamp(40px, 5vw, 72px);
          line-height: 1.1;
          color: var(--white);
          margin-bottom: 24px;
          display: flex;
          flex-wrap: wrap;
          gap: 0.25em;
        }
        .hero-subtext {
          font-size: 18px;
          color: #e0e0e0;
          max-width: 600px;
          line-height: 1.6;
          margin-bottom: 40px;
        }
        .hero-buttons {
          display: flex;
          gap: 16px;
        }
        .hero-buttons button {
          padding: 16px 32px;
          font-size: 1.1rem;
        }
        .hero-stats {
          display: flex;
          gap: 20px;
          margin-top: 40px;
        }
        .hero-gradient-mobile {
          display: none;
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to bottom, #0B3D2E, #111111);
          z-index: -1;
        }

        @media (max-width: 1024px) {
          .hero-left { width: 50%; }
          .hero-right { width: 50%; }
          .hero-headline { font-size: clamp(32px, 4vw, 52px); }
          .hero-subtext { font-size: 16px; }
          .hero-stats { gap: 12px; }
        }

        @media (max-width: 768px) {
          .hero-section { padding-top: 100px; }
          .hero-container { flex-direction: column; }
          .hero-left { width: 100%; }
          .hero-right { display: none; }
          .hero-headline { font-size: clamp(28px, 7vw, 40px); line-height: 1.15; }
          .hero-subtext { font-size: 15px; }
          .hero-buttons { flex-direction: column; align-items: center; width: 100%; }
          .hero-buttons button { width: 100%; max-width: 320px; margin: 0 auto; }
          .hero-stats { 
            display: grid !important; 
            grid-template-columns: repeat(2, 1fr) !important; 
            grid-template-rows: repeat(2, 1fr);
            gap: 16px; 
            width: 100%;
          }
          .hero-video-bg { display: none !important; }
          .hero-gradient-mobile { display: block; }
        }
      `}} />

      <section className="hero-section">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video-bg"
        >
          <source src="/herovid.mp4" type="video/mp4" />
        </video>

        {/* Mobile static gradient placeholder */}
        <div className="hero-gradient-mobile"></div>

        {/* Dark Overlay on top of the video */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 0,
        }} />

        {/* Background Image with Dark Gradient Overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -2,
        }} />
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(0, 0, 0, 0))",
          zIndex: -1,
        }} />

        <div className="hero-container">
          <div className="hero-left">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(4px)",
                padding: "8px 16px",
                borderRadius: "30px",
                color: "var(--wheat-gold)",
                fontWeight: 600,
                border: "1px solid rgba(212, 160, 23, 0.3)",
                width: "fit-content"
              }}
            >
              <CheckCircle size={16} />
              Trusted By Farmers
            </motion.div>

            {/* Headline Reveal */}
            <h1 className="hero-headline">
              {headline.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hero-subtext"
            >
              Scientifically formulated cattle feed trusted by thousands of farmers to improve milk yield, cattle health, and farm profitability.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="hero-buttons"
            >
              <button className="btn-primary">
                Get Price List
              </button>
              <button className="btn-secondary" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                Talk To Nutrition Expert
              </button>
            </motion.div>

            {/* Stats Glassmorphism Cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="hero-stats"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(212, 160, 23, 0.2)" }}
                  className="glass"
                  style={{
                    padding: "24px",
                    borderRadius: "var(--border-radius-sm)",
                    textAlign: "center",
                    flex: 1
                  }}
                >
                  <h3 style={{ color: "var(--wheat-gold)", fontSize: "clamp(24px, 3vw, 2.5rem)", marginBottom: "8px" }}>
                    {stat.value}
                  </h3>
                  <p style={{ color: "var(--white)", fontWeight: 500, fontSize: "clamp(12px, 1.5vw, 16px)" }}>{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="hero-right">
            {/* Visual/Video placeholder for desktop right pane if needed. We leave empty to show background video. */}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            position: "absolute",
            bottom: "5px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "var(--white)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            opacity: 0.7
          }}
        >
          <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "2px" }}>Scroll</span>
          <ArrowDown size={20} />
        </motion.div>
      </section>
    </>
  );
}
