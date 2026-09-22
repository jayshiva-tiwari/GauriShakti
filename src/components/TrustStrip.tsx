"use client";

import React from "react";
import { Award, ShieldCheck, Stethoscope, Truck } from "lucide-react";

export default function TrustStrip() {
  const trustPillars = [
    {
      icon: Award,
      title: "1 Million+ Bags Sold",
      subtitle: "Trusted Nationwide",
      badge: "Industry Proven",
    },
    {
      icon: ShieldCheck,
      title: "ISO & GMP Certified",
      subtitle: "100% Quality Tested",
      badge: "Govt. Standards",
    },
    {
      icon: Stethoscope,
      title: "Veterinary Approved",
      subtitle: "High Protein Formula",
      badge: "Clinical Grade",
    },
    {
      icon: Truck,
      title: "Nationwide Distribution",
      subtitle: "Fast Reliable Delivery",
      badge: "Pan-India",
    },
  ];

  return (
    <section className="trust-cert-section" aria-label="Trust & Certifications">
      <style dangerouslySetInnerHTML={{
        __html: `
        .trust-cert-section {
          width: 100%;
          background: linear-gradient(135deg, #0F3322 0%, #1B5E3F 50%, #0F3322 100%);
          border-top: 1px solid rgba(212, 175, 55, 0.28);
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          position: relative;
          overflow: hidden;
          padding: 16px 4%;
          min-height: 96px;
          display: flex;
          align-items: center;
        }

        /* Subtle luxury background radial accent */
        .trust-cert-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 100%;
          background: radial-gradient(ellipse at top, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .trust-cert-container {
          max-width: 1320px;
          margin: 0 auto;
          width: 100%;
        }

        .trust-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .trust-card {
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 12px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
          position: relative;
        }

        .trust-card:hover {
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.075);
          border-color: rgba(212, 175, 55, 0.55);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28), 0 0 18px rgba(212, 175, 55, 0.12);
        }

        .trust-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(212, 175, 55, 0.12);
          border: 1px solid rgba(212, 175, 55, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #D4AF37;
          flex-shrink: 0;
          transition: all 0.28s ease;
        }

        .trust-card:hover .trust-icon-box {
          transform: scale(1.08);
          background: rgba(212, 175, 55, 0.2);
          border-color: #D4AF37;
          color: #F8E7A2;
        }

        .trust-text-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .trust-card-title {
          font-size: 0.96rem;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.3;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .trust-card-subtitle {
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.76);
          display: flex;
          align-items: center;
          gap: 6px;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .trust-gold-dot {
          color: #D4AF37;
          font-size: 0.65rem;
          display: inline-block;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1120px) {
          .trust-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
          .trust-cert-section {
            padding: 18px 4%;
          }
        }

        @media (max-width: 680px) {
          .trust-cert-section {
            padding: 14px 16px;
          }
          .trust-cards-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 12px;
            padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .trust-cards-grid::-webkit-scrollbar {
            display: none;
          }
          .trust-card {
            min-width: 250px;
            flex-shrink: 0;
            scroll-snap-align: start;
            padding: 12px 14px;
          }
          .trust-icon-box {
            width: 40px;
            height: 40px;
          }
          .trust-card-title {
            font-size: 0.92rem;
          }
          .trust-card-subtitle {
            font-size: 0.78rem;
          }
        }
      `}} />

      <div className="trust-cert-container">
        <div className="trust-cards-grid">
          {trustPillars.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="trust-card">
                <div className="trust-icon-box">
                  <IconComponent size={22} strokeWidth={1.8} />
                </div>
                <div className="trust-text-content">
                  <h3 className="trust-card-title">{item.title}</h3>
                  <p className="trust-card-subtitle">
                    <span className="trust-gold-dot">◆</span>
                    <span>{item.subtitle}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
