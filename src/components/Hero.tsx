"use client";

import { motion } from "framer-motion";
import { ArrowDown, CheckCircle } from "lucide-react";

export default function Hero() {
  const headline = "Premium Nutrition For Higher Milk Production".split(" ");

  const stats = [
    { value: "100%", label: "Quality Assured" },
    { value: "1000+", label: "Farmers Trust Us" },
    { value: "100+", label: "Distributors" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .hero-section {
          display: flex;
          min-height: 100vh;
          width: 100%;
          flex-direction: row;
        }
        
        .hero-left {
          flex: 0 0 60%;
          background-color: #FFFFFF;
          padding: 160px 60px 100px 5vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }

        .hero-right {
          flex: 0 0 40%;
          background-color: #FFFFFF;
          padding: 160px 5vw 100px 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        @media (min-width: 1280px) {
          .hero-left { padding-left: calc(50vw - 640px + 20px); }
          .hero-right { padding-right: calc(50vw - 640px + 20px); }
        }

        .hero-headline {
          font-size: clamp(36px, 4.2vw, 64px);
          line-height: 1.15;
          color: var(--dark-green);
          margin-bottom: 24px;
          display: flex;
          flex-wrap: wrap;
          gap: 0.25em;
          font-weight: 800;
        }

        .hero-subtext {
          font-size: 18px;
          color: #4B5563;
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
          border-radius: var(--border-radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-gold {
          background-color: var(--wheat-gold);
          color: var(--dark-green);
          border: none;
        }
        .btn-gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(212, 160, 23, 0.3);
        }

        .btn-outline {
          background-color: transparent;
          color: var(--dark-green);
          border: 2px solid var(--dark-green);
        }
        .btn-outline:hover {
          background-color: var(--dark-green);
          color: #FFFFFF;
          transform: translateY(-2px);
        }

        .hero-stats {
          display: flex;
          gap: 16px;
          margin-top: 60px;
        }

        .stat-card {
          background: #111111;
          padding: 24px 16px;
          border-radius: 12px;
          text-align: center;
          flex: 1;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .video-box-container {
          width: 100%;
          max-width: 600px;
          background: #2a2a2a;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
          position: relative;
        }

        .video-wrapper {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 8px;
          overflow: hidden;
          background: #000;
          position: relative;
        }

        .hero-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 5vw;
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--dark-green);
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        @media (min-width: 1280px) {
          .scroll-indicator { left: calc(50vw - 640px + 20px); }
        }

        @media (max-width: 1199px) and (min-width: 768px) {
          .hero-left { flex: 0 0 50%; padding: 140px 40px 80px 5vw; }
          .hero-right { flex: 0 0 50%; padding: 140px 5vw 80px 40px; }
          .hero-stats { flex-wrap: wrap; }
          .stat-card { flex: 0 0 calc(50% - 8px); }
          .hero-headline { font-size: clamp(32px, 3.8vw, 48px); }
        }

        @media (max-width: 767px) {
          .hero-section { flex-direction: column; }
          .hero-left { flex: none; width: 100%; padding: 120px 5vw 60px; }
          .hero-right { flex: none; width: 100%; padding: 60px 5vw; }
          .hero-headline { font-size: clamp(32px, 8vw, 42px); }
          .hero-buttons { flex-direction: column; }
          .hero-buttons button { width: 100%; }
          .hero-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .stat-card { padding: 16px 12px; }
          .scroll-indicator { display: none; }
          .video-box-container { max-width: 100%; padding: 12px; }
        }
      `}} />

      <section className="hero-section">
        {/* LEFT SIDE - Content */}
        <div className="hero-left">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(212, 160, 23, 0.1)",
              padding: "8px 16px",
              borderRadius: "30px",
              color: "var(--wheat-gold)",
              fontWeight: 700,
              border: "1px solid rgba(212, 160, 23, 0.3)",
              width: "fit-content",
              marginBottom: "24px"
            }}
          >
            <CheckCircle size={16} />
            Trusted By Farmers
          </motion.div>

          {/* Headline */}
          <h1 className="hero-headline">
            {headline.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="hero-subtext"
          >
            Scientifically formulated cattle feed trusted by thousands of farmers to improve milk yield, cattle health, and farm profitability.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="hero-buttons"
          >
            <button className="btn-gold">
              Get Price List
            </button>
            <button className="btn-outline">
              Talk To Nutrition Expert
            </button>
          </motion.div>

          {/* Stats Boxes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="hero-stats"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                className="stat-card"
              >
                <h3 style={{ color: "var(--wheat-gold)", fontSize: "clamp(20px, 2.5vw, 28px)", marginBottom: "4px", fontWeight: 700 }}>
                  {stat.value}
                </h3>
                <p style={{ color: "#E0E0E0", fontWeight: 400, fontSize: "clamp(12px, 1.2vw, 14px)", lineHeight: 1.3 }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="scroll-indicator"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowDown size={20} />
            </motion.div>
            <span>Scroll</span>
          </motion.div>
        </div>

        {/* RIGHT SIDE - Video Box */}
        <div className="hero-right">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="video-box-container"
          >
            <div className="video-wrapper">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="hero-video"
              >
                <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
