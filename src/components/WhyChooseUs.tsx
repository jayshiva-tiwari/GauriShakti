"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.floor(end * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function WhyChooseUs() {
  const features = [
    { title: "Scientifically Balanced Nutrition", desc: "Our formulas are created by top veterinary experts to provide exact nutritional requirements for maximum yield.", icon: "🧪" },
    { title: "Better Milk Production", desc: "Farmers report an average increase of 15-20% in daily milk production within the first month of use.", icon: "🐄" },
    { title: "Stronger Immunity", desc: "Enriched with essential vitamins and minerals that boost cattle immunity against common diseases.", icon: "🌾" },
    { title: "Consistent Quality Control", desc: "Every batch is tested in our state-of-the-art laboratory before it reaches your farm.", icon: "🚚" },
  ];

  return (
    <section className="why-choose-us-section">
      <style dangerouslySetInnerHTML={{__html: `
        .why-choose-us-section {
          padding: 100px 5%;
          background: var(--white);
          overflow: hidden;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          text-align: center;
          margin-bottom: 100px;
        }
        .feature-row {
          display: flex;
          align-items: center;
          gap: 50px;
        }
        .feature-row.even { flex-direction: row; }
        .feature-row.odd { flex-direction: row-reverse; }
        .feature-icon-wrapper {
          flex: 1 1 40%;
          background: var(--light-cream);
          border-radius: var(--border-radius-lg);
          padding: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 5rem;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.05);
        }
        .feature-text-wrapper {
          flex: 1 1 60%;
        }
        .feature-title {
          font-size: 2rem;
          color: var(--dark-green);
          margin-bottom: 20px;
        }
        .feature-desc {
          font-size: 1.2rem;
          color: var(--gray);
          line-height: 1.6;
        }
        
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .why-choose-us-section {
            padding: 60px 5%;
          }
          .stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 60px;
          }
          .feature-row.even, .feature-row.odd {
            flex-direction: column;
            gap: 30px;
            text-align: center;
          }
          .feature-icon-wrapper {
            padding: 40px;
            font-size: 4rem;
            width: 100%;
          }
          .feature-title {
            font-size: 1.5rem;
          }
          .feature-desc {
            font-size: 1rem;
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Counters */}
        <div className="stats-grid">
          {[
            { end: 10000, suffix: "+", label: "Farmers Served" },
            { end: 25, suffix: "+", label: "Years Experience" },
            { end: 1, suffix: "M+", label: "Bags Sold" },
            { end: 500, suffix: "+", label: "Dealers" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: "var(--light-cream)",
                padding: "30px",
                borderRadius: "var(--border-radius-lg)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
              }}
            >
              <h3 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--wheat-gold)", marginBottom: "10px" }}>
                <Counter end={stat.end} suffix={stat.suffix} />
              </h3>
              <p style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", fontWeight: 600, color: "var(--dark-green)" }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Alternate Rows */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--dark-green)" }}
          >
            Why Farmers Choose Our Feed
          </motion.h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`feature-row ${i % 2 === 0 ? 'even' : 'odd'}`}
            >
              <div className="feature-icon-wrapper">
                <motion.div
                  initial={{ rotate: 0 }}
                  whileInView={{ rotate: 360 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  {feature.icon}
                </motion.div>
              </div>
              <div className="feature-text-wrapper">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
