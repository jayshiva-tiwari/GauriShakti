"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, BadgeCheck, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    { name: "Ramesh Patel", loc: "Gujarat", type: "Verified Farmer", review: "Since switching to PremiumFeed, my daily milk yield increased by 3 liters per cow. Highly recommended!", prod: "Premium Dairy Feed" },
    { name: "Suresh Kumar", loc: "Punjab", type: "Verified Dealer", review: "The demand for this feed is huge. Quality is consistent and farmers keep coming back. Great margins too.", prod: "Super Yield Cattle Feed" },
    { name: "Amit Singh", loc: "Haryana", type: "Verified Farmer", review: "My calves are growing healthier and faster with the Calf Starter. Best product in the market.", prod: "Nutri Calf Starter" },
  ];

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  return (
    <section className="testimonials-section">
      <style dangerouslySetInnerHTML={{__html: `
        .testimonials-section {
          padding: 100px 5%;
          background: var(--white);
          position: relative;
          overflow: hidden;
        }
        .quote-icon {
          position: absolute;
          top: 20px;
          left: 20px;
          opacity: 0.05;
          z-index: 0;
          color: var(--dark-green);
        }
        .testimonials-title {
          font-size: 3rem;
          color: var(--dark-green);
          text-align: center;
          margin-bottom: 60px;
        }
        .testimonial-card {
          position: absolute;
          width: 100%;
          background: var(--light-cream);
          padding: 40px;
          border-radius: var(--border-radius-lg);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .testimonial-review {
          font-size: 1.5rem;
          font-style: italic;
          color: var(--dark-green);
          margin-bottom: 30px;
          line-height: 1.6;
        }
        
        @media (max-width: 768px) {
          .testimonials-section {
            padding: 60px 5%;
          }
          .quote-icon svg {
            width: 150px;
            height: 150px;
          }
          .testimonials-title {
            font-size: clamp(2rem, 6vw, 2.5rem);
            margin-bottom: 40px;
          }
          .testimonial-card {
            padding: 30px 20px;
          }
          .testimonial-review {
            font-size: 1.1rem;
          }
        }
      `}} />

      <div className="quote-icon">
        <Quote size={300} />
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <h2 className="testimonials-title">
          Trusted By Farmers Across India
        </h2>

        <div 
          style={{ position: "relative", height: "350px" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="testimonial-card"
            >
              <div style={{ display: "flex", gap: "5px", marginBottom: "20px", color: "var(--wheat-gold)" }}>
                {[1, 2, 3, 4, 5].map((star, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star fill="currentColor" size={24} />
                  </motion.div>
                ))}
              </div>

              <p className="testimonial-review">
                "{testimonials[current].review}"
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ width: "60px", height: "60px", background: "var(--agri-green)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "1.5rem", fontWeight: "bold" }}>
                  {testimonials[current].name[0]}
                </div>
                <div style={{ textAlign: "left" }}>
                  <h4 style={{ fontSize: "1.2rem", color: "var(--dark-green)", marginBottom: "5px" }}>{testimonials[current].name}</h4>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "var(--gray)", flexWrap: "wrap" }}>
                    {testimonials[current].loc} <span style={{display: 'inline-flex', alignItems: 'center', gap: '4px'}}>• <BadgeCheck size={16} color="var(--agri-green)" /> {testimonials[current].type}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                border: "none",
                background: current === i ? "var(--dark-green)" : "#ddd",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
