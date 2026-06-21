"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function MilkYieldCalculator() {
  const [cows, setCows] = useState<number>(10);
  const [yieldPerCow, setYieldPerCow] = useState<number>(15);

  const estimatedGain = 3; // 3 Litres per day extra
  const currentTotal = cows * yieldPerCow;
  const newTotal = cows * (yieldPerCow + estimatedGain);

  return (
    <section className="calculator-section">
      <style dangerouslySetInnerHTML={{__html: `
        .calculator-section {
          padding: 100px 5%;
          background: var(--light-cream);
        }
        .calc-container {
          background: var(--dark-green);
          border-radius: var(--border-radius-lg);
          padding: 50px;
          color: var(--white);
          box-shadow: 0 20px 40px rgba(11, 61, 46, 0.2);
          max-width: 1000px;
          margin: 0 auto;
        }
        .calc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 50px;
        }
        @media (max-width: 768px) {
          .calculator-section {
            padding: 60px 5%;
          }
          .calc-container {
            padding: 30px 20px;
          }
          .calc-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }
      `}} />
      <div className="calc-container">
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)", color: "var(--wheat-gold)", marginBottom: "15px" }}>Interactive Milk Yield Calculator</h2>
          <p style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", opacity: 0.9 }}>See how much more you could earn with our premium feed.</p>
        </div>

        <div className="calc-grid">
          {/* Inputs */}
          <div>
            <div style={{ marginBottom: "25px" }}>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: 600 }}>Number of Cows</label>
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={cows} 
                onChange={(e) => setCows(parseInt(e.target.value))}
                style={{ width: "100%", accentColor: "var(--wheat-gold)" }}
              />
              <div style={{ textAlign: "right", fontSize: "1.2rem", fontWeight: "bold", marginTop: "5px", color: "var(--wheat-gold)" }}>{cows} Cows</div>
            </div>

            <div style={{ marginBottom: "25px" }}>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: 600 }}>Current Daily Milk per Cow (Litres)</label>
              <input 
                type="range" 
                min="5" 
                max="40" 
                value={yieldPerCow} 
                onChange={(e) => setYieldPerCow(parseInt(e.target.value))}
                style={{ width: "100%", accentColor: "var(--wheat-gold)" }}
              />
              <div style={{ textAlign: "right", fontSize: "1.2rem", fontWeight: "bold", marginTop: "5px", color: "var(--wheat-gold)" }}>{yieldPerCow} L/Day</div>
            </div>
          </div>

          {/* Outputs */}
          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "var(--border-radius-sm)", padding: "30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "20px" }}>
              <span>Current Total Production:</span>
              <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{currentTotal} L/Day</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", color: "var(--wheat-gold)" }}>
              <span>Estimated New Production:</span>
              <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{newTotal} L/Day</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px", background: "var(--wheat-gold)", color: "var(--dark-green)", padding: "10px 15px", borderRadius: "10px", fontWeight: "bold" }}>
              <span>Potential Gain:</span>
              <span>+{cows * estimatedGain} L/Day</span>
            </div>

            <button className="btn-primary" style={{ width: "100%", padding: "15px" }}>
              Get Expert Feed Recommendation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
