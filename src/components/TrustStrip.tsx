"use client";

import React from "react";
import { Award, ShieldCheck, Stethoscope, Truck } from "lucide-react";

export default function TrustStrip() {
  const trustPillars = [
    {
      icon: Award,
      title: "1 Million+ Bags Sold",
      subtitle: "Trusted Nationwide",
    },
    {
      icon: ShieldCheck,
      title: "ISO & GMP Certified",
      subtitle: "100% Quality Tested",
    },
    {
      icon: Stethoscope,
      title: "Veterinary Approved",
      subtitle: "High Protein Formula",
    },
    {
      icon: Truck,
      title: "Nationwide Distribution",
      subtitle: "Fast Reliable Delivery",
    },
  ];

  // Repeat items inside each group so each group is wide enough for large displays
  const repeatedPillars = [...trustPillars, ...trustPillars];

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
          padding: 16px 0;
          min-height: 94px;
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
          width: 70%;
          height: 100%;
          background: radial-gradient(ellipse at top, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Edge fade masks for seamless enter/exit */
        .trust-fade-edge-left,
        .trust-fade-edge-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 5;
          pointer-events: none;
        }

        .trust-fade-edge-left {
          left: 0;
          background: linear-gradient(to right, #0F3322 20%, rgba(15, 51, 34, 0));
        }

        .trust-fade-edge-right {
          right: 0;
          background: linear-gradient(to left, #0F3322 20%, rgba(15, 51, 34, 0));
        }

        .trust-marquee-wrapper {
          width: 100%;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
        }

        .trust-marquee-track {
          display: flex;
          width: max-content;
          animation: trustInfinityMarquee 32s linear infinite;
          will-change: transform;
        }

        /* Pause on hover so user can easily read or inspect */
        .trust-marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes trustInfinityMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .trust-marquee-group {
          display: flex;
          align-items: center;
          gap: 18px;
          padding-right: 18px; /* Ensures exact distance matching the gap */
          flex-shrink: 0;
        }

        .trust-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(212, 175, 55, 0.22);
          border-radius: 12px;
          padding: 13px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
          flex-shrink: 0;
          user-select: none;
        }

        .trust-card:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(212, 175, 55, 0.55);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.28), 0 0 16px rgba(212, 175, 55, 0.15);
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
          transition: all 0.25s ease;
        }

        .trust-card:hover .trust-icon-box {
          transform: scale(1.06);
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
          font-size: 0.95rem;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.25;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }

        .trust-card-subtitle {
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.78);
          display: flex;
          align-items: center;
          gap: 6px;
          line-height: 1.25;
          white-space: nowrap;
        }

        .trust-gold-dot {
          color: #D4AF37;
          font-size: 0.65rem;
          display: inline-block;
        }

        @media (max-width: 768px) {
          .trust-cert-section {
            padding: 12px 0;
            min-height: 84px;
          }
          .trust-marquee-track {
            animation-duration: 25s;
          }
          .trust-marquee-group {
            gap: 12px;
            padding-right: 12px;
          }
          .trust-card {
            padding: 10px 14px;
            gap: 12px;
          }
          .trust-icon-box {
            width: 38px;
            height: 38px;
            border-radius: 8px;
          }
          .trust-card-title {
            font-size: 0.88rem;
          }
          .trust-card-subtitle {
            font-size: 0.76rem;
          }
          .trust-fade-edge-left,
          .trust-fade-edge-right {
            width: 36px;
          }
        }
      `}} />

      {/* Visual edge fades */}
      <div className="trust-fade-edge-left" aria-hidden="true" />
      <div className="trust-fade-edge-right" aria-hidden="true" />

      {/* Infinite Marquee Container */}
      <div className="trust-marquee-wrapper" data-lenis-prevent="true">
        <div className="trust-marquee-track">
          {/* Primary Group */}
          <div className="trust-marquee-group">
            {repeatedPillars.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={`group1-${index}`} className="trust-card">
                  <div className="trust-icon-box">
                    <IconComponent size={22} strokeWidth={1.8} />
                  </div>
                  <div className="trust-text-content">
                    <span className="trust-card-title">{item.title}</span>
                    <span className="trust-card-subtitle">
                      <span className="trust-gold-dot">◆</span>
                      <span>{item.subtitle}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clone Group for seamless infinite looping */}
          <div className="trust-marquee-group" aria-hidden="true">
            {repeatedPillars.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={`group2-${index}`} className="trust-card">
                  <div className="trust-icon-box">
                    <IconComponent size={22} strokeWidth={1.8} />
                  </div>
                  <div className="trust-text-content">
                    <span className="trust-card-title">{item.title}</span>
                    <span className="trust-card-subtitle">
                      <span className="trust-gold-dot">◆</span>
                      <span>{item.subtitle}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
