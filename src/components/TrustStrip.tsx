"use client";

import React, { useEffect, useRef } from "react";
import { Award, ShieldCheck, Stethoscope, Truck } from "lucide-react";
import gsap from "gsap";

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

  // ==================== REFS ====================
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  // Animation physics state refs (avoid React re-render overhead in the 60/120fps loop)
  const mouseXRef = useRef<number>(0);
  const isHoveringRef = useRef<boolean>(false);
  const velocityRef = useRef<number>(-0.6); // Default gentle auto-scroll leftward
  const currentXRef = useRef<number>(0);
  const singleSetWidthRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // Create 6 identical sets to ensure infinite buffer across any screen size (up to 4K displays)
  const repeatedPillars = [
    ...trustPillars,
    ...trustPillars,
    ...trustPillars,
    ...trustPillars,
    ...trustPillars,
    ...trustPillars,
  ];

  // ==================== MOUSE & TOUCH TRACKING ====================
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const inY = e.clientY >= rect.top && e.clientY <= rect.bottom;
      const inX = e.clientX >= rect.left && e.clientX <= rect.right;

      if (inY && inX) {
        isHoveringRef.current = true;
        // Normalize: -1.0 (far left) to 0.0 (center) to +1.0 (far right)
        const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseXRef.current = Math.max(-1, Math.min(1, normalizedX));
      } else {
        isHoveringRef.current = false;
      }
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      mouseXRef.current = 0;
    };

    // Touch support for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const rect = section.getBoundingClientRect();
      const touch = e.touches[0];
      const inY = touch.clientY >= rect.top && touch.clientY <= rect.bottom;

      if (inY) {
        isHoveringRef.current = true;
        const normalizedX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouseXRef.current = Math.max(-1, Math.min(1, normalizedX));
      }
    };

    const handleTouchEnd = () => {
      isHoveringRef.current = false;
      mouseXRef.current = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    section.addEventListener("mouseleave", handleMouseLeave);
    section.addEventListener("touchmove", handleTouchMove, { passive: true });
    section.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
      section.removeEventListener("touchmove", handleTouchMove);
      section.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // ==================== INFINITE LOOP PHYSICS ====================
  useEffect(() => {
    const cardsContainer = cardsGridRef.current;
    if (!cardsContainer) return;

    // Accurately measure single set width from DOM elements
    const calculateDimensions = () => {
      if (!cardsContainer || cardsContainer.children.length < 5) return;
      const card0 = cardsContainer.children[0] as HTMLElement;
      const card4 = cardsContainer.children[4] as HTMLElement;
      if (card0 && card4) {
        const measuredWidth = card4.offsetLeft - card0.offsetLeft;
        if (measuredWidth > 0) {
          singleSetWidthRef.current = measuredWidth;
          // Initialize position safely in the middle of our buffer (-2 * W)
          if (currentXRef.current === 0) {
            currentXRef.current = -measuredWidth * 2;
          }
        }
      }
    };

    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);

    const MAX_VELOCITY = 6.5; // Responsive edge speed
    const IDLE_VELOCITY = -0.65; // Gentle constant auto-scroll when idle
    const DEAD_ZONE = 0.08; // Center dead-zone for comfortable pause

    const updateMarquee = () => {
      const W = singleSetWidthRef.current;

      if (W > 0) {
        let targetVelocity: number;

        if (isHoveringRef.current) {
          const normX = mouseXRef.current;
          if (Math.abs(normX) < DEAD_ZONE) {
            // Near center -> slow down to pause
            targetVelocity = 0;
          } else {
            // Left side (normX < 0) -> scroll left (negative velocity)
            // Right side (normX > 0) -> scroll right (positive velocity)
            // Quadratic ramp for buttery smooth edge acceleration
            const sign = Math.sign(normX);
            const intensity = Math.pow(Math.abs(normX), 1.25);
            targetVelocity = sign * intensity * MAX_VELOCITY;
          }
          // Smoothly lerp towards target velocity
          velocityRef.current += (targetVelocity - velocityRef.current) * 0.12;
        } else {
          // Mouse left -> coast gently back to idle drift
          targetVelocity = IDLE_VELOCITY;
          velocityRef.current += (targetVelocity - velocityRef.current) * 0.04;
        }

        // Apply velocity to current horizontal position
        currentXRef.current += velocityRef.current;

        // Infinite modulo wrap: seamlessly reset by 1 set (W) with zero visual change
        if (currentXRef.current < -W * 3) {
          currentXRef.current += W;
        } else if (currentXRef.current > -W * 2) {
          currentXRef.current -= W;
        }

        // Use GSAP for high performance GPU-accelerated subpixel positioning
        gsap.set(cardsContainer, {
          x: currentXRef.current,
          force3D: true,
          overwrite: "auto",
        });
      }

      animationFrameRef.current = requestAnimationFrame(updateMarquee);
    };

    animationFrameRef.current = requestAnimationFrame(updateMarquee);

    return () => {
      window.removeEventListener("resize", calculateDimensions);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="trust-cert-section"
      aria-label="Trust & Certifications"
    >
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
          cursor: ew-resize;
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

        /* Lateral gradient fades for smooth card enter/exit */
        .trust-fade-edge-left,
        .trust-fade-edge-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 70px;
          z-index: 5;
          pointer-events: none;
        }

        .trust-fade-edge-left {
          left: 0;
          background: linear-gradient(to right, #0F3322 25%, rgba(15, 51, 34, 0));
        }

        .trust-fade-edge-right {
          right: 0;
          background: linear-gradient(to left, #0F3322 25%, rgba(15, 51, 34, 0));
        }

        .trust-marquee-wrapper {
          width: 100%;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%);
        }

        .trust-cards-grid {
          display: flex;
          gap: 18px;
          will-change: transform;
          transform: translateZ(0);
          width: max-content;
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
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
          cursor: ew-resize;
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
          .trust-cards-grid {
            gap: 12px;
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

      {/* Subtle edge fades */}
      <div className="trust-fade-edge-left" aria-hidden="true" />
      <div className="trust-fade-edge-right" aria-hidden="true" />

      {/* Marquee viewport */}
      <div className="trust-marquee-wrapper" data-lenis-prevent="true">
        <div ref={cardsGridRef} className="trust-cards-grid">
          {repeatedPillars.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="trust-card">
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
    </section>
  );
}
