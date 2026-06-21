"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Montserrat, Inter } from "next/font/google";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, Leaf, Shield, Beaker } from "lucide-react";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700", "900"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .about-page-container {
          background-color: var(--light-cream);
          color: var(--dark-green);
          min-height: 100vh;
          padding-top: 120px;
          overflow-x: hidden;
        }
        
        /* Hero / Story Section */
        .story-section {
          position: relative;
          min-height: 90vh;
          display: flex;
          padding: 5%;
          gap: 5%;
          align-items: center;
          max-width: 1600px;
          margin: 0 auto;
        }
        .story-left {
          flex: 0 0 35%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .story-right {
          flex: 0 0 65%;
          display: flex;
          flex-direction: column;
          gap: 60px;
          justify-content: center;
        }
        
        .story-title {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          white-space: nowrap;
          text-align: center;
        }
        
        .story-image-wrapper {
          position: relative;
          width: 100%;
          height: 85vh;
          overflow: hidden;
          border-radius: 2px;
        }
        
        /* Values Grid */
        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        @media (max-width: 1024px) {
          .story-left { flex: 0 0 45%; }
          .story-right { flex: 0 0 55%; }
          .values-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .story-section {
            flex-direction: column;
            padding: 100px 5% 50px;
            gap: 40px;
          }
          .story-left {
            flex: 1;
            width: 100%;
            order: 1;
            writing-mode: horizontal-tb;
            transform: none;
            text-align: center;
          }
          .story-right {
            flex: 1;
            width: 100%;
            order: 2;
          }
          .story-image-wrapper {
            height: auto;
            aspect-ratio: 4/3;
          }
          .values-grid {
            grid-template-columns: 1fr;
          }
          
          /* Typography scaling for mobile */
          .story-title {
            font-size: clamp(2.5rem, 8vw, 4rem) !important;
            writing-mode: horizontal-tb !important;
            transform: none !important;
            white-space: normal !important;
            text-align: left !important;
          }
        }
      `}} />

      <main className={`${inter.className} about-page-container`}>
        {/* HERO SECTION */}
        <section ref={containerRef} className="story-section">
          {/* Left: Vertical Headline */}
          <div className="story-left">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`${montserrat.className} story-title`}
              style={{
                fontSize: "clamp(2rem, 7vh, 6rem)",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                lineHeight: 0.9,
                color: "var(--dark-green)",
                margin: 0,
              }}
            >
              Vision. Precision. Passion.
            </motion.h1>
          </div>

          {/* Center/Right: Text & Parallax Image */}
          <div className="story-right">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ maxWidth: "600px", paddingLeft: "5%" }}
            >
              <h2
                className={montserrat.className}
                style={{
                  fontSize: "clamp(24px, 4vw, 48px)",
                  fontWeight: 700,
                  color: "var(--dark-green)",
                  marginBottom: "24px",
                }}
              >
                Redefining Agricultural Nutrition
              </h2>
              <p
                style={{
                  fontSize: "clamp(14px, 1.5vw, 16px)",
                  lineHeight: 1.8,
                  color: "var(--gray)",
                  fontWeight: 300,
                }}
              >
                PremiumFeed was born out of a relentless pursuit of excellence.
                Our vision goes beyond standard cattle feed; we engineer scientifically
                backed nutritional solutions that empower farmers, maximize yield,
                and respect the ecosystem. Innovation isn't just a buzzword for us—it's
                the very DNA of everything we create.
              </p>
            </motion.div>

            <motion.div className="story-image-wrapper">
              <motion.div
                style={{
                  width: "100%",
                  height: "130%", // Extra height for parallax
                  y: yParallax,
                  position: "absolute",
                  top: "-15%",
                  left: 0,
                }}
              >
                <Image
                  src="/WhatsApp Image 2026-06-19 at 10.01.29 PM.jpeg"
                  alt="PremiumFeed Visionary Leader"
                  fill
                  style={{
                    objectFit: "cover",
                    filter: "grayscale(20%) contrast(1.1)",
                  }}
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* BENTO GRID SHOWCASE */}
        <section
          style={{
            maxWidth: "1400px",
            margin: "120px auto",
            padding: "0 5%",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            style={{
              marginBottom: "80px",
              textAlign: "center",
            }}
          >
            <h2
              className={montserrat.className}
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 900,
                color: "var(--dark-green)",
                textTransform: "uppercase",
              }}
            >
              Meet The Architect
            </h2>
            <div style={{ width: "60px", height: "4px", backgroundColor: "var(--wheat-gold)", margin: "20px auto 0" }} />
          </motion.div>

          <div className="values-grid">
            {/* Main Portrait Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover="hover"
              style={{
                position: "relative",
                borderRadius: "4px",
                overflow: "hidden",
                backgroundColor: "var(--dark-green)",
                minHeight: "400px"
              }}
            >
              <motion.div
                variants={{
                  hover: { filter: "grayscale(0%)", scale: 1.05 },
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  filter: "grayscale(100%)",
                  transition: "filter 0.5s ease, transform 0.8s ease",
                }}
              >
                <Image
                  src="/WhatsApp Image 2026-06-19 at 10.01.29 PM (1).jpeg"
                  alt="Expert Portrait"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
              {/* Subtle Overlay & Text */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "40px",
                  background: "linear-gradient(to top, rgba(11, 61, 46, 0.9) 0%, transparent 100%)",
                  color: "var(--white)",
                }}
              >
                <h3 className={montserrat.className} style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, marginBottom: "8px" }}>
                  Dr. P. SINGH
                </h3>
                <p style={{ color: "var(--wheat-gold)", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", fontSize: "clamp(0.75rem, 1.5vw, 0.9rem)" }}>
                  Chief Innovator & Founder
                </p>
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5, borderColor: "var(--wheat-gold)" }}
              style={{
                backgroundColor: "var(--white)",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                border: "1px solid rgba(11, 61, 46, 0.1)",
                borderRadius: "4px",
                transition: "all 0.3s ease",
                minHeight: "400px"
              }}
            >
              <span
                className={montserrat.className}
                style={{
                  fontSize: "clamp(3rem, 6vw, 4.5rem)",
                  fontWeight: 900,
                  color: "var(--dark-green)",
                  lineHeight: 1,
                }}
              >
                50<span style={{ color: "var(--wheat-gold)" }}>+</span>
              </span>
              <p style={{ color: "var(--gray)", marginTop: "10px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.85rem" }}>
                Years of Combined Expertise
              </p>
            </motion.div>

            {/* Values: Sustainability */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                backgroundColor: "var(--dark-green)",
                color: "var(--white)",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderRadius: "4px",
                position: "relative",
                overflow: "hidden",
                minHeight: "400px"
              }}
            >
              <Leaf size={32} color="var(--wheat-gold)" style={{ marginBottom: "20px" }} />
              <h4 className={montserrat.className} style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "10px" }}>
                Sustainability
              </h4>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                Eco-conscious formulations for a greener tomorrow.
              </p>
            </motion.div>

            {/* Values: Research */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                backgroundColor: "var(--light-cream)",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                border: "1px solid rgba(11, 61, 46, 0.1)",
                borderRadius: "4px",
                gridColumn: "1 / -1" // Span full width on all grids
              }}
            >
              <div style={{ flex: 1 }}>
                <Beaker size={40} color="var(--dark-green)" style={{ marginBottom: "24px" }} />
                <h4 className={montserrat.className} style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--dark-green)", marginBottom: "16px" }}>
                  Scientific Rigor
                </h4>
                <p style={{ color: "var(--gray)", fontSize: "1rem", lineHeight: 1.6 }}>
                  Every gram of our feed is backed by extensive laboratory testing and field trials to guarantee absolute nutritional superiority and rapid absorption.
                </p>
              </div>

              {/* Minimal Circular Graph Graphic */}
              <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "30px" }}>
                <svg width="60" height="60" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="rgba(11, 61, 46, 0.1)"
                    strokeWidth="3"
                  />
                  <motion.path
                    initial={{ strokeDasharray: "0, 100" }}
                    whileInView={{ strokeDasharray: "85, 100" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="var(--wheat-gold)"
                    strokeWidth="3"
                  />
                </svg>
                <span style={{ fontWeight: 600, color: "var(--dark-green)" }}>85% Yield Boost</span>
              </div>
            </motion.div>

            {/* Values: Integrity */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                backgroundColor: "var(--dark-green)",
                color: "var(--white)",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: "4px",
                position: "relative",
                gridColumn: "1 / -1" // Span full width
              }}
            >
              <div>
                <Shield size={32} color="var(--wheat-gold)" style={{ marginBottom: "20px" }} />
                <h4 className={montserrat.className} style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>
                  Unwavering Integrity
                </h4>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  We believe in total transparency. No hidden fillers, no shortcuts. Just pure, unadulterated nutrition tailored for peak livestock performance.
                </p>
              </div>

              <motion.div
                whileHover={{ x: 10 }}
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--wheat-gold)", cursor: "pointer", fontWeight: 500, fontSize: "0.9rem", marginTop: "30px" }}
              >
                Our Promise <ArrowRight size={16} />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
