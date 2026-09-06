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
          background: rgba(17, 17, 17, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 24px 16px;
          border-radius: 16px;
          text-align: center;
          flex: 1;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
        }

        .video-wrapper {
          position: relative;
          z-index: 2;
          width: 100%;
          aspect-ratio: 4/3;
          border-radius: 16px;
          overflow: hidden;
          background: #1a1a1a;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          border: 6px solid #fff;
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

        /* --- Liquid Splash SVG Border Styles --- */
        .splash-video-container {
          position: relative;
          width: 100%;
          max-width: 720px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .liquid-splash-svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          width: 130%;  /* Much larger than video to allow splash to protrude */
          height: 140%;
          pointer-events: none;
          filter: drop-shadow(0 15px 30px rgba(0,0,0,0.15));
          animation: floatSplash 6s ease-in-out infinite;
        }

        @keyframes floatSplash {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1) rotate(0deg); 
          }
          50% { 
            transform: translate(-50%, -52%) scale(1.02) rotate(0.5deg); 
          }
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
            className="splash-video-container"
          >
            {/* LAYER 1: Liquid splash SVG (BEHIND video) */}
            <svg className="liquid-splash-svg" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
              {/* Core splash shape protruding in all directions */}
              <path fill="#FFFFFF" opacity="0.95" d="
                M500,150 
                C600,150 650,80 700,100 
                C730,110 720,180 780,200 
                C850,220 900,180 920,250 
                C940,320 850,350 880,420 
                C910,490 950,550 880,600 
                C810,650 750,580 700,650 
                C650,720 580,750 500,700 
                C420,650 350,750 280,700 
                C210,650 250,580 180,550 
                C110,520 80,580 50,500 
                C20,420 120,380 100,300 
                C80,220 150,180 200,200 
                C250,220 300,120 380,100 
                C460,80 400,150 500,150 Z"
              />

              {/* Tendrils and Flying Droplets */}
              {/* Top Left Area */}
              <path fill="#FFFFFF" opacity="0.95" d="M350,120 C300,50 250,20 220,60 C190,100 280,150 350,120 Z" />
              <circle fill="#FFFFFF" opacity="0.95" cx="200" cy="30" r="15" />
              <circle fill="#FFFFFF" opacity="0.95" cx="150" cy="80" r="8" />
              <circle fill="#FFFFFF" opacity="0.95" cx="280" cy="40" r="10" />

              {/* Top Right Area */}
              <path fill="#FFFFFF" opacity="0.95" d="M680,120 C750,40 820,30 850,80 C880,130 750,160 680,120 Z" />
              <circle fill="#FFFFFF" opacity="0.95" cx="880" cy="50" r="18" />
              <circle fill="#FFFFFF" opacity="0.95" cx="920" cy="110" r="12" />
              <circle fill="#FFFFFF" opacity="0.95" cx="800" cy="20" r="8" />

              {/* Right side Area */}
              <path fill="#FFFFFF" opacity="0.95" d="M880,300 C960,280 990,330 960,380 C930,430 860,350 880,300 Z" />
              <circle fill="#FFFFFF" opacity="0.95" cx="980" cy="280" r="14" />
              <circle fill="#FFFFFF" opacity="0.95" cx="990" cy="420" r="9" />

              {/* Bottom Right Area */}
              <path fill="#FFFFFF" opacity="0.95" d="M780,600 C860,650 880,720 820,760 C760,800 720,650 780,600 Z" />
              <circle fill="#FFFFFF" opacity="0.95" cx="890" cy="780" r="20" />
              <circle fill="#FFFFFF" opacity="0.95" cx="800" cy="810" r="12" />
              <circle fill="#FFFFFF" opacity="0.95" cx="930" cy="700" r="8" />

              {/* Bottom Left Area */}
              <path fill="#FFFFFF" opacity="0.95" d="M250,650 C180,720 120,750 80,700 C40,650 180,600 250,650 Z" />
              <circle fill="#FFFFFF" opacity="0.95" cx="60" cy="760" r="16" />
              <circle fill="#FFFFFF" opacity="0.95" cx="120" cy="800" r="10" />
              <circle fill="#FFFFFF" opacity="0.95" cx="30" cy="680" r="12" />

              {/* Left Side Area */}
              <path fill="#FFFFFF" opacity="0.95" d="M120,400 C40,380 10,430 30,480 C50,530 140,450 120,400 Z" />
              <circle fill="#FFFFFF" opacity="0.95" cx="20" cy="350" r="14" />
              <circle fill="#FFFFFF" opacity="0.95" cx="10" cy="520" r="8" />

              {/* Inner connecting drips/bridges for detail */}
              <circle fill="#FFFFFF" opacity="0.95" cx="220" cy="280" r="5" />
              <circle fill="#FFFFFF" opacity="0.95" cx="780" cy="320" r="6" />
              <circle fill="#FFFFFF" opacity="0.95" cx="750" cy="500" r="4" />
              <circle fill="#FFFFFF" opacity="0.95" cx="280" cy="550" r="7" />
            </svg>

            {/* LAYER 2: Video content (VISIBLE on top) */}
            <div className="video-wrapper">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="hero-video"
              >
                <source src="heoVid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
