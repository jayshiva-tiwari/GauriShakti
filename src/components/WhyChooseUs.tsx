"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FlaskConical, CircleCheckBig, ShieldCheck, Beef } from "lucide-react";

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
    { title: "Scientifically Balanced Nutrition", desc: "Our formulas are created by top veterinary experts to provide exact nutritional requirements for maximum yield.", icon: <FlaskConical size={80} color="var(--wheat-gold)" strokeWidth={1.5} /> },
    { title: "Better Milk Production", desc: "Farmers report an average increase of 15-20% in daily milk production within the first month of use.", icon: <Beef size={80} color="var(--wheat-gold)" strokeWidth={1.5} /> },
    { title: "Stronger Immunity", desc: "Enriched with essential vitamins and minerals that boost cattle immunity against common diseases.", icon: <ShieldCheck size={80} color="var(--wheat-gold)" strokeWidth={1.5} /> },
    { title: "Consistent Quality Control", desc: "Every batch is tested in our state-of-the-art laboratory before it reaches your farm.", icon: <CircleCheckBig size={80} color="var(--wheat-gold)" strokeWidth={1.5} /> },
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
          gap: 20px;
          text-align: center;
          margin-bottom: 80px;
        }
        .stat-counter-card {
          background: linear-gradient(135deg, #0F3322 0%, #174C32 50%, #0F3322 100%);
          padding: 28px 16px;
          border-radius: var(--radius-card);
          border: 1px solid rgba(212, 175, 55, 0.28);
          box-shadow: 0 10px 28px rgba(15, 51, 34, 0.22), inset 0 1px 0 rgba(212, 175, 55, 0.35);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .stat-counter-card:hover {
          transform: translateY(-4px);
          border-color: rgba(212, 175, 55, 0.65);
          box-shadow: 0 14px 34px rgba(15, 51, 34, 0.35), 0 0 20px rgba(212, 175, 55, 0.22);
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
          box-shadow: inset 0 0 20px rgba(0,0,0,0.05);
        }
        
        .feature-icon-wrapper svg {
          filter: drop-shadow(0 10px 15px rgba(212, 160, 23, 0.2));
          transition: transform 0.4s ease;
        }
        
        .feature-row:hover .feature-icon-wrapper svg {
          transform: scale(1.1) translateY(-5px);
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
            { end: 500, suffix: "+", label: "Authorized Dealers" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="stat-counter-card"
            >
              <h3 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "var(--accent-gold)", fontWeight: 800, marginBottom: "8px", letterSpacing: "-0.02em" }}>
                <Counter end={stat.end} suffix={stat.suffix} />
              </h3>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF", margin: 0, letterSpacing: "0.01em" }}>{stat.label}</p>
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
