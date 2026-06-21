"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Montserrat, Inter } from "next/font/google";
import { Phone, Mail, ArrowUpRight } from "lucide-react";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700", "900"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"] });

const pins = [
  { id: "delhi", label: "Delhi Headquarters\nCentral Hub", cx: 80, cy: 80 },
  { id: "gujarat", label: "Gujarat Plant\nManufacturing", cx: 50, cy: 120 },
  { id: "ap", label: "AP Hub\nDistribution", cx: 100, cy: 170 },
];

export default function ContactPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activePin, setActivePin] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const headlineText = "LET'S CULTIVATE GROWTH TOGETHER.";

  return (
    <main className={`contact-page ${inter.className}`}>
      <style dangerouslySetInnerHTML={{
        __html: `
        .contact-page {
          background-color: var(--light-cream);
          min-height: 100vh;
          padding: 150px 5% 100px;
          position: relative;
          overflow: hidden;
        }
        
        .bg-pattern {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background-image: radial-gradient(var(--dark-green) 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.04;
          z-index: 0;
          pointer-events: none;
        }

        .contact-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: minmax(200px, auto);
          gap: 20px;
          margin-top: 60px;
        }

        .bento-card {
          background: var(--white);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.03);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* Card Placements */
        .form-card { grid-column: span 2; grid-row: span 3; background: var(--dark-green); color: var(--light-cream); }
        .phone-card { grid-column: span 1; grid-row: span 1; }
        .email-card { grid-column: span 1; grid-row: span 1; }
        .map-card { grid-column: span 2; grid-row: span 2; padding: 40px; justify-content: center; }
        .business-card { 
          grid-column: span 4; 
          grid-row: span 1; 
          background: var(--wheat-gold); 
          flex-direction: row; 
          align-items: center; 
          justify-content: space-between; 
        }

        /* Form Styles */
        .form-group {
          position: relative;
          margin-bottom: 45px;
        }
        .form-group input, .form-group textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.2);
          color: var(--white);
          padding: 10px 0;
          font-size: 1.2rem;
          outline: none;
          font-family: inherit;
        }
        .form-group textarea {
          resize: none;
          height: 100px;
        }
        .form-group .line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background: var(--wheat-gold);
          transition: width 0.4s ease;
        }
        .form-group input:focus ~ .line, .form-group textarea:focus ~ .line,
        .form-group input:valid ~ .line, .form-group textarea:valid ~ .line {
          width: 100%;
        }
        .form-group label {
          position: absolute;
          top: 10px;
          left: 0;
          color: rgba(255,255,255,0.5);
          pointer-events: none;
          transition: all 0.3s ease;
          font-size: 1.1rem;
        }
        .form-group input:focus ~ label, .form-group textarea:focus ~ label,
        .form-group input:valid ~ label, .form-group textarea:valid ~ label {
          top: -25px;
          font-size: 0.85rem;
          color: var(--wheat-gold);
        }
        .form-submit-btn {
          background: var(--wheat-gold);
          color: var(--dark-green);
          border: none;
          padding: 18px 40px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border-radius: 40px;
          margin-top: 10px;
          transition: background 0.3s ease;
        }
        .form-submit-btn:hover {
          background: #ffffffff;
        }

        /* Map Pin Styles */
        @keyframes map-pin-pulse {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .bento-grid { grid-template-columns: repeat(2, 1fr); }
          .form-card { grid-column: span 2; grid-row: auto; }
          .phone-card { grid-column: span 1; grid-row: auto; }
          .email-card { grid-column: span 1; grid-row: auto; }
          .map-card { grid-column: span 2; grid-row: auto; min-height: 350px; flex-direction: column; }
          .map-card > div:first-child { width: 100% !important; margin-bottom: 20px; }
          .map-card > div:last-child { width: 100% !important; }
          .business-card { grid-column: span 2; }
        }

        @media (max-width: 768px) {
          .contact-page { padding-top: 120px; }
          .bento-grid { grid-template-columns: 1fr; gap: 15px; }
          .form-card, .phone-card, .email-card, .map-card, .business-card {
            grid-column: span 1;
            grid-row: auto;
          }
          .bento-card { padding: 30px 20px; }
          .map-card { min-height: 250px; padding: 20px; flex-direction: column; }
          .map-card > div:first-child { width: 100% !important; text-align: center; }
          .map-card > div:last-child { width: 100% !important; height: 200px; }
          .business-card { flex-direction: column; text-align: center; gap: 25px; }
        }
      `}} />

      <motion.div
        className="bg-pattern"
        animate={{
          x: mousePos.x * 30,
          y: mousePos.y * 30,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 30 }}
      />

      <div className="contact-container">
        {/* Animated Headline */}
        <motion.div style={{ marginBottom: "20px" }}>
          <h1
            className={montserrat.className}
            style={{
              fontSize: "clamp(2.5rem, 7vw, 6.5rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              color: "var(--dark-green)",
              maxWidth: "1200px"
            }}
          >
            {headlineText.split(" ").map((word, i) => (
              <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.2em", paddingBottom: "0.1em" }}>
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                  style={{ display: "inline-block" }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "var(--gray)", maxWidth: "600px", lineHeight: 1.6 }}
        >
          Have a question about our products or want to discuss a partnership? We'd love to hear from you. Drop us a line below.
        </motion.p>

        {/* Bento Grid */}
        <div className="bento-grid">

          {/* 1. Contact Form Card */}
          <motion.div
            className="bento-card form-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className={montserrat.className} style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "50px", color: "var(--wheat-gold)" }}>Send a Message</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input type="text" required />
                <label>Your Name</label>
                <span className="line"></span>
              </div>
              <div className="form-group">
                <input type="email" required />
                <label>Email Address</label>
                <span className="line"></span>
              </div>
              <div className="form-group">
                <textarea required></textarea>
                <label>How can we help you?</label>
                <span className="line"></span>
              </div>
              <motion.button
                className="form-submit-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message <ArrowUpRight size={20} />
              </motion.button>
            </form>
          </motion.div>

          {/* 2. Phone Card */}
          <motion.div
            className="bento-card phone-card"
            whileHover="hover"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.div
              variants={{ hover: { rotate: [0, -15, 15, -15, 15, 0] } }}
              transition={{ duration: 0.5 }}
              style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(11, 61, 46, 0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--dark-green)", marginBottom: "25px" }}
            >
              <Phone size={28} />
            </motion.div>
            <h3 style={{ fontSize: "1.1rem", color: "var(--gray)", marginBottom: "8px" }}>Call Us Directly</h3>
            <a href="tel:+919792399946" style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", fontWeight: "700", color: "var(--dark-green)", textDecoration: "none" }}>+91 97923 99946</a>
          </motion.div>

          {/* 3. Email Card */}
          <motion.div
            className="bento-card email-card"
            whileHover="hover"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div
              variants={{ hover: { y: [0, -8, 0] } }}
              transition={{ duration: 0.5 }}
              style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(11, 61, 46, 0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--dark-green)", marginBottom: "25px" }}
            >
              <Mail size={28} />
            </motion.div>
            <h3 style={{ fontSize: "1.1rem", color: "var(--gray)", marginBottom: "8px" }}>Send an Email</h3>
            <a href="mailto:info@premiumfeed.com" style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)", fontWeight: "700", color: "var(--dark-green)", textDecoration: "none", wordBreak: "break-all" }}>info@premiumfeed.com</a>
          </motion.div>

          {/* 4. Map Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bento-card map-card"
            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
          >
            <div style={{ width: "50%", zIndex: 10 }}>
              <h3 className={montserrat.className} style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--dark-green)", marginBottom: "10px" }}>Our Presence</h3>
              <p style={{ color: "var(--gray)", fontSize: "1rem" }}>
                Rooted in India, stretching across the nation. Hover over the map to see our key hubs.
              </p>
            </div>

            <div style={{ width: "50%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              {/* Abstract India SVG path */}
              <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%", maxHeight: "250px", opacity: 0.1, fill: "var(--dark-green)" }}>
                <path d="M70,10 C80,5 110,15 130,20 C140,25 150,40 160,60 C170,80 180,100 170,120 C160,140 150,150 140,170 C130,190 120,210 110,230 C100,250 90,270 80,260 C70,250 60,220 50,200 C40,180 30,160 30,140 C30,120 20,100 15,80 C10,60 20,40 30,30 C40,20 50,15 70,10" />
              </svg>

              {pins.map((pin) => (
                <div key={pin.id} style={{ position: "absolute", left: `calc(${pin.cx} / 200 * 100%)`, top: `calc(${pin.cy} / 280 * 100%)` }}>
                  {/* Pulse Ring */}
                  <span style={{ position: "absolute", display: "inline-flex", height: "24px", width: "24px", borderRadius: "50%", background: "var(--wheat-gold)", opacity: 0.4, animation: "map-pin-pulse 2s infinite", marginLeft: "-12px", marginTop: "-12px" }}></span>

                  {/* Pin Center */}
                  <span
                    style={{ position: "absolute", display: "inline-flex", borderRadius: "50%", height: "12px", width: "12px", background: "var(--dark-green)", marginLeft: "-6px", marginTop: "-6px", cursor: "pointer", zIndex: 10, transition: "transform 0.2s ease", transform: activePin === pin.id ? "scale(1.5)" : "scale(1)" }}
                    onMouseEnter={() => setActivePin(pin.id)}
                    onMouseLeave={() => setActivePin(null)}
                  ></span>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {activePin === pin.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", background: "var(--dark-green)", color: "var(--light-cream)", padding: "8px 16px", borderRadius: "8px", fontSize: "0.85rem", fontWeight: "bold", whiteSpace: "nowrap", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", zIndex: 20, pointerEvents: "none" }}
                      >
                        {pin.label.split('\n').map((line, i) => (
                          <span key={i} style={{ display: "block", color: i === 0 ? "var(--wheat-gold)" : "inherit", fontSize: i === 0 ? "0.75rem" : "1rem", opacity: i === 0 ? 0.9 : 1 }}>
                            {line}
                          </span>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 5. Business Inquiries Card */}
          <motion.div
            className="bento-card business-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div>
              <h2 className={montserrat.className} style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: "800", marginBottom: "10px", textTransform: "uppercase" }}>For Dealership & Bulk Orders</h2>
              <p style={{ fontSize: "1.1rem", opacity: 0.9, fontWeight: 500 }}>Join our premium distribution network and grow with us.</p>
            </div>
            <motion.button
              className="btn-primary"
              style={{ background: "var(--dark-green)", color: "var(--wheat-gold)", border: "none", padding: "18px 40px", fontSize: "1.1rem", borderRadius: "40px" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Partner With Us
            </motion.button>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
