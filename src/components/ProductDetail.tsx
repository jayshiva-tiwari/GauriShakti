"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  CheckCircle2, 
  MessageCircle, 
  Phone, 
  ShieldCheck, 
  Award, 
  FlaskConical, 
  ChevronDown, 
  Package, 
  Clock, 
  Warehouse, 
  Truck, 
  Download, 
  X, 
  ArrowRight, 
  Sparkles
} from "lucide-react";
import { Product } from "@/data/products";
import TrustStrip from "@/components/TrustStrip";

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: "",
    phone: "",
    location: "",
    quantity: "50 Bags (Trial Order)",
    message: ""
  });

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const whatsappLink = `https://wa.me/919792399946?text=${encodeURIComponent(
    `Hello GAURiShakti team, I am interested in purchasing ${product.name}. Please share pricing, availability, and dealership terms.`
  )}`;

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New Dealer Price Inquiry - GAURiShakti*\n\n*Product:* ${product.name}\n*Name/Firm:* ${modalForm.name || "N/A"}\n*Phone:* ${modalForm.phone || "N/A"}\n*Location:* ${modalForm.location || "N/A"}\n*Estimated Quantity:* ${modalForm.quantity}\n*Notes:* ${modalForm.message || "None"}`;
    window.open(`https://wa.me/919792399946?text=${encodeURIComponent(text)}`, "_blank");
    setIsModalOpen(false);
  };

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case "FlaskConical":
        return <FlaskConical size={26} strokeWidth={2} />;
      case "ShieldCheck":
        return <ShieldCheck size={26} strokeWidth={2} />;
      case "Award":
      default:
        return <Award size={26} strokeWidth={2} />;
    }
  };

  return (
    <div className="product-page-root">
      <style dangerouslySetInnerHTML={{
        __html: `
        .product-page-root {
          width: 100%;
          min-height: 100vh;
          background-color: var(--light-cream, #FAF8F5);
          color: var(--dark-green, #153D2A);
          font-family: inherit;
          overflow-x: hidden;
          padding-bottom: 70px;
        }

        /* 1. HERO SECTION */
        .pd-hero-section {
          width: 100%;
          background: linear-gradient(180deg, #FFFFFF 0%, #F5F2EB 100%);
          border-bottom: 1px solid rgba(21, 61, 42, 0.08);
          padding: 50px 5% 70px;
        }

        .pd-hero-container {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 50px;
          align-items: center;
        }

        .pd-image-wrapper {
          position: relative;
          background: #FFFFFF;
          border-radius: 24px;
          border: 1px solid rgba(212, 175, 55, 0.25);
          box-shadow: 0 20px 45px rgba(21, 61, 42, 0.08), 0 1px 3px rgba(0,0,0,0.05);
          padding: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 480px;
          overflow: hidden;
        }

        .pd-image-wrapper::before {
          content: "";
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
          z-index: 1;
        }

        .pd-main-img {
          position: relative;
          z-index: 2;
          max-height: 440px;
          width: auto;
          max-width: 100%;
          object-fit: contain;
          filter: drop-shadow(0 15px 25px rgba(21, 61, 42, 0.15));
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pd-image-wrapper:hover .pd-main-img {
          transform: scale(1.03) translateY(-4px);
        }

        .pd-info-card {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .pd-category-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #D4AF37;
        }

        .pd-product-name {
          font-size: clamp(2.2rem, 3.8vw, 3.2rem);
          font-weight: 800;
          color: #153D2A;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .pd-tagline {
          font-size: 1.25rem;
          font-weight: 600;
          color: #D4AF37;
          line-height: 1.4;
        }

        .pd-badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 4px;
        }

        .pd-spec-badge {
          background: #E8F5E9;
          color: #1F7A4D;
          border: 1px solid rgba(31, 122, 77, 0.25);
          font-size: 0.85rem;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .pd-hero-desc {
          font-size: 1.05rem;
          line-height: 1.65;
          color: #4A5568;
          max-width: 620px;
        }

        .pd-hero-cta-group {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 12px;
        }

        .pd-btn-whatsapp {
          background-color: #25D366;
          color: #FFFFFF;
          padding: 14px 26px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.98rem;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
          transition: all 0.25s ease;
        }

        .pd-btn-whatsapp:hover {
          background-color: #1EBE5D;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(37, 211, 102, 0.4);
        }

        .pd-btn-dealer {
          background-color: #D4AF37;
          color: #153D2A;
          padding: 14px 26px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.98rem;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.25s ease;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.25);
        }

        .pd-btn-dealer:hover {
          background-color: #C29D2D;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(212, 175, 55, 0.35);
        }

        .pd-btn-brochure {
          background-color: transparent;
          color: #153D2A;
          border: 1.5px solid rgba(21, 61, 42, 0.3);
          padding: 13px 22px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .pd-btn-brochure:hover {
          background-color: rgba(21, 61, 42, 0.05);
          border-color: #153D2A;
          transform: translateY(-2px);
        }

        /* 2. QUICK STATS */
        .pd-stats-section {
          width: 100%;
          background: #EBF5F0;
          border-top: 1px solid rgba(31, 122, 77, 0.15);
          border-bottom: 1px solid rgba(31, 122, 77, 0.15);
          padding: 36px 5%;
        }

        .pd-stats-grid {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .pd-stat-box {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 4px 18px rgba(21, 61, 42, 0.04);
          border: 1px solid rgba(31, 122, 77, 0.12);
          transition: transform 0.25s ease;
        }

        .pd-stat-box:hover {
          transform: translateY(-3px);
          border-color: #D4AF37;
        }

        .pd-stat-label {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 700;
          color: #4A5568;
          margin-bottom: 8px;
        }

        .pd-stat-val-gold {
          font-size: clamp(2rem, 3.2vw, 2.8rem);
          font-weight: 800;
          color: #D4AF37;
          line-height: 1;
        }

        .pd-stat-badge-energy {
          display: inline-block;
          background: linear-gradient(135deg, #1B5E3F 0%, #153D2A 100%);
          color: #FFFFFF;
          font-size: 1.25rem;
          font-weight: 700;
          padding: 6px 22px;
          border-radius: 24px;
          margin-top: 4px;
        }

        .pd-stat-val-mineral {
          font-size: 1.35rem;
          font-weight: 700;
          color: #153D2A;
          margin-top: 4px;
        }

        .pd-stat-subtext {
          font-size: 0.82rem;
          color: #718096;
          margin-top: 6px;
        }

        /* 3. ABOUT THIS PRODUCT & BENEFITS */
        .pd-about-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 65px 5%;
        }

        .pd-section-heading {
          font-size: clamp(1.8rem, 2.8vw, 2.4rem);
          font-weight: 800;
          color: #153D2A;
          letter-spacing: -0.01em;
          margin-bottom: 16px;
        }

        .pd-about-prose {
          font-size: 1.12rem;
          line-height: 1.75;
          color: #2D3748;
          max-width: 980px;
          margin-bottom: 40px;
        }

        .pd-benefits-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .pd-benefit-card {
          background: #FFFFFF;
          border-radius: 14px;
          padding: 20px 24px;
          border: 1px solid rgba(21, 61, 42, 0.08);
          display: flex;
          align-items: flex-start;
          gap: 16px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
          transition: transform 0.25s ease, border-color 0.25s ease;
        }

        .pd-benefit-card:hover {
          transform: translateY(-2px);
          border-color: #D4AF37;
        }

        .pd-benefit-icon {
          color: #1F7A4D;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .pd-benefit-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #153D2A;
          margin-bottom: 4px;
        }

        .pd-benefit-desc {
          font-size: 0.92rem;
          color: #4A5568;
          line-height: 1.5;
        }

        /* 4. NUTRITION FACTS TABLE */
        .pd-nutrition-section {
          background: #FFFFFF;
          border-top: 1px solid rgba(21, 61, 42, 0.08);
          border-bottom: 1px solid rgba(21, 61, 42, 0.08);
          padding: 65px 5%;
        }

        .pd-nutrition-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .pd-nutrition-table-wrap {
          border: 1px solid rgba(21, 61, 42, 0.15);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(21, 61, 42, 0.04);
        }

        .pd-nutrition-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .pd-nutrition-table th {
          background: #153D2A;
          color: #FFFFFF;
          padding: 16px 24px;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .pd-nutrition-table td {
          padding: 14px 24px;
          font-size: 0.98rem;
          border-bottom: 1px solid rgba(21, 61, 42, 0.07);
          color: #2D3748;
        }

        .pd-nutrition-table tr:nth-child(even) {
          background-color: #FAF8F5;
        }

        .pd-nutrition-table tr:last-child td {
          border-bottom: none;
        }

        .pd-nutrition-note {
          margin-top: 16px;
          font-size: 0.88rem;
          color: #1F7A4D;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* 5. PRODUCT FEATURES CARDS */
        .pd-features-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 65px 5%;
        }

        .pd-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 26px;
          margin-top: 30px;
        }

        .pd-feature-card {
          background: #FFFFFF;
          border: 1px solid rgba(212, 175, 55, 0.25);
          border-radius: 18px;
          padding: 32px 26px;
          box-shadow: 0 8px 25px rgba(21, 61, 42, 0.05);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .pd-feature-card:hover {
          transform: translateY(-6px);
          border-color: #D4AF37;
          box-shadow: 0 16px 35px rgba(21, 61, 42, 0.1), 0 0 20px rgba(212, 175, 55, 0.15);
        }

        .pd-feature-icon-box {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          background: rgba(212, 175, 55, 0.12);
          border: 1px solid rgba(212, 175, 55, 0.35);
          color: #D4AF37;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .pd-feature-card:hover .pd-feature-icon-box {
          background: #D4AF37;
          color: #153D2A;
          transform: scale(1.06);
        }

        .pd-feature-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #153D2A;
        }

        .pd-feature-desc {
          font-size: 0.95rem;
          color: #4A5568;
          line-height: 1.55;
        }

        /* 6. SPECIFICATIONS BOX */
        .pd-specs-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 5% 65px;
        }

        .pd-specs-box {
          background: linear-gradient(135deg, #103322 0%, #1B5E3F 50%, #103322 100%);
          color: #FFFFFF;
          border-radius: 20px;
          padding: 40px;
          border: 1px solid rgba(212, 175, 55, 0.3);
          box-shadow: 0 16px 40px rgba(0,0,0,0.18);
        }

        .pd-specs-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #D4AF37;
          margin-bottom: 26px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pd-specs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .pd-spec-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .pd-spec-item-icon {
          color: #D4AF37;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .pd-spec-item-label {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 3px;
        }

        .pd-spec-item-value {
          font-size: 1.05rem;
          font-weight: 600;
          color: #FFFFFF;
          line-height: 1.4;
        }

        /* 7. TRUST SECTION */
        .pd-trust-container {
          width: 100%;
          margin: 20px 0 50px;
        }

        /* 9. FAQ SECTION */
        .pd-faq-section {
          max-width: 1000px;
          margin: 0 auto;
          padding: 60px 5%;
        }

        .pd-faq-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 30px;
        }

        .pd-faq-item {
          background: #FFFFFF;
          border: 1px solid rgba(21, 61, 42, 0.12);
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.25s ease;
        }

        .pd-faq-item.open {
          border-color: #D4AF37;
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.1);
        }

        .pd-faq-btn {
          width: 100%;
          padding: 20px 24px;
          background: none;
          border: none;
          text-align: left;
          font-size: 1.08rem;
          font-weight: 700;
          color: #153D2A;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .pd-faq-btn:hover {
          background-color: #FAF8F5;
        }

        .pd-faq-icon {
          color: #D4AF37;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          flex-shrink: 0;
        }

        .pd-faq-item.open .pd-faq-icon {
          transform: rotate(180deg);
        }

        .pd-faq-content {
          padding: 0 24px 22px;
          font-size: 0.98rem;
          line-height: 1.65;
          color: #4A5568;
        }

        /* 10. RELATED PRODUCTS */
        .pd-related-section {
          max-width: 1240px;
          margin: 0 auto;
          padding: 60px 5% 80px;
        }

        .pd-related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 36px;
        }

        .pd-related-card {
          background: #FFFFFF;
          border: 1px solid rgba(21, 61, 42, 0.1);
          border-radius: 20px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(21, 61, 42, 0.05);
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          text-decoration: none;
          color: inherit;
        }

        .pd-related-card:hover {
          transform: translateY(-6px);
          border-color: #D4AF37;
          box-shadow: 0 18px 40px rgba(21, 61, 42, 0.12);
        }

        .pd-related-img-box {
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          padding: 10px;
        }

        .pd-related-img {
          max-height: 100%;
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 8px 16px rgba(21, 61, 42, 0.12));
          transition: transform 0.3s ease;
        }

        .pd-related-card:hover .pd-related-img {
          transform: scale(1.05);
        }

        .pd-related-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #153D2A;
          margin-bottom: 8px;
        }

        .pd-related-desc {
          font-size: 0.92rem;
          color: #718096;
          line-height: 1.5;
          margin-bottom: 20px;
          flex-grow: 1;
        }

        .pd-related-pills {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }

        .pd-pill {
          background: #FAF8F5;
          border: 1px solid rgba(21, 61, 42, 0.1);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 12px;
          color: #1F7A4D;
        }

        .pd-related-link-btn {
          width: 100%;
          background: #153D2A;
          color: #FFFFFF;
          padding: 12px;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .pd-related-card:hover .pd-related-link-btn {
          background-color: #D4AF37;
          color: #153D2A;
        }

        /* 8. STICKY MOBILE CTA BAR (Fixed on Mobile only) */
        .pd-sticky-mobile-bar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #FFFFFF;
          padding: 10px 16px;
          box-shadow: 0 -6px 20px rgba(0, 0, 0, 0.12);
          border-top: 1px solid rgba(21, 61, 42, 0.1);
          z-index: 999;
          gap: 10px;
          align-items: center;
        }

        .pd-mobile-btn-whatsapp {
          flex: 1.2;
          background: #25D366;
          color: #FFFFFF;
          font-size: 0.92rem;
          font-weight: 700;
          padding: 13px 12px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          text-decoration: none;
          min-height: 48px;
        }

        .pd-mobile-btn-dealer {
          flex: 1;
          background: #D4AF37;
          color: #153D2A;
          font-size: 0.92rem;
          font-weight: 700;
          padding: 13px 12px;
          border-radius: 12px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          cursor: pointer;
          min-height: 48px;
        }

        .pd-mobile-btn-pdf {
          width: 48px;
          height: 48px;
          background: #FAF8F5;
          border: 1px solid rgba(21, 61, 42, 0.15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #153D2A;
          flex-shrink: 0;
          text-decoration: none;
        }

        /* DEALER PRICE MODAL */
        .pd-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 30, 22, 0.65);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
        }

        .pd-modal-card {
          background: #FFFFFF;
          border-radius: 24px;
          max-width: 520px;
          width: 100%;
          padding: 34px;
          position: relative;
          box-shadow: 0 25px 60px rgba(0,0,0,0.3);
          border: 1px solid rgba(212, 175, 55, 0.3);
          animation: pdFadeIn 0.25s ease-out;
        }

        @keyframes pdFadeIn {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .pd-modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #F5F2EB;
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #153D2A;
          transition: all 0.2s ease;
        }

        .pd-modal-close:hover {
          background: #E8F5E9;
          transform: rotate(90deg);
        }

        .pd-modal-title {
          font-size: 1.55rem;
          font-weight: 800;
          color: #153D2A;
          margin-bottom: 6px;
        }

        .pd-modal-subtitle {
          font-size: 0.95rem;
          color: #6B7280;
          margin-bottom: 22px;
        }

        .pd-modal-form-group {
          margin-bottom: 16px;
        }

        .pd-modal-label {
          display: block;
          font-size: 0.88rem;
          font-weight: 700;
          color: #2D3748;
          margin-bottom: 6px;
        }

        .pd-modal-input, .pd-modal-select {
          width: 100%;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid rgba(21, 61, 42, 0.2);
          font-size: 0.95rem;
          color: #153D2A;
          background: #FAF8F5;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .pd-modal-input:focus, .pd-modal-select:focus {
          border-color: #D4AF37;
          background: #FFFFFF;
        }

        .pd-modal-submit-btn {
          width: 100%;
          background: #D4AF37;
          color: #153D2A;
          font-size: 1rem;
          font-weight: 700;
          padding: 14px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background-color 0.2s ease;
          margin-top: 10px;
        }

        .pd-modal-submit-btn:hover {
          background: #C29D2D;
        }

        .pd-modal-dealer-link {
          display: block;
          text-align: center;
          margin-top: 14px;
          font-size: 0.9rem;
          color: #1F7A4D;
          font-weight: 600;
          text-decoration: underline;
        }

        /* RESPONSIVE DESIGN */
        @media (max-width: 1024px) {
          .pd-hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .pd-image-wrapper {
            min-height: 380px;
          }
          .pd-main-img {
            max-height: 350px;
          }
          .pd-features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .pd-related-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .pd-hero-section {
            padding: 30px 4% 50px;
          }
          .pd-image-wrapper {
            min-height: 300px;
            padding: 20px;
          }
          .pd-main-img {
            max-height: 280px;
          }
          .pd-stats-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .pd-benefits-grid {
            grid-template-columns: 1fr;
          }
          .pd-features-grid {
            grid-template-columns: 1fr;
          }
          .pd-specs-grid {
            grid-template-columns: 1fr;
          }
          .pd-specs-box {
            padding: 26px 20px;
          }
          .pd-related-grid {
            grid-template-columns: 1fr;
          }
          .pd-hero-cta-group {
            display: none; /* Replaced by sticky mobile bar */
          }
          .pd-sticky-mobile-bar {
            display: flex;
          }
          .product-page-root {
            padding-bottom: 90px;
          }
        }
      `}} />

      {/* 1. HERO SECTION */}
      <section className="pd-hero-section" aria-label="Product Overview">
        <div className="pd-hero-container">
          {/* Left: Product Image */}
          <div className="pd-image-wrapper">
            <Image 
              src={product.image} 
              alt={product.name} 
              width={500}
              height={440}
              className="pd-main-img"
              priority
              style={{ objectFit: "contain", maxHeight: "440px", width: "auto" }}
            />
          </div>

          {/* Right: Product Info Card */}
          <div className="pd-info-card">
            <div className="pd-category-tag">
              <Sparkles size={16} />
              <span>{product.category}</span>
            </div>

            <h1 className="pd-product-name">{product.name}</h1>
            <p className="pd-tagline">{product.tagline}</p>

            {/* 3 Quick Spec Badges */}
            <div className="pd-badge-row">
              {product.quickBadges.map((badge, idx) => (
                <span key={idx} className="pd-spec-badge">
                  <CheckCircle2 size={14} />
                  <span>{badge}</span>
                </span>
              ))}
            </div>

            {/* Short 2-line Description */}
            <p className="pd-hero-desc">
              {product.description}
            </p>

            {/* Desktop CTA Action Buttons */}
            <div className="pd-hero-cta-group">
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="pd-btn-whatsapp"
                title="Connect on WhatsApp"
              >
                <Phone size={18} />
                <span>WhatsApp Us</span>
              </a>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="pd-btn-dealer"
                title="Request Dealer Pricing"
              >
                <span>Get Dealer Price</span>
                <ArrowRight size={18} />
              </button>

              <a 
                href={product.brochureUrl} 
                download="Gaurishakti-Product-Brochure.pdf"
                className="pd-btn-brochure"
                title="Download Official PDF Brochure"
              >
                <Download size={18} />
                <span>Brochure</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK STATS (3 Columns, Light Green Background) */}
      <section className="pd-stats-section" aria-label="Key Nutritional Stats">
        <div className="pd-stats-grid">
          {/* Left: Protein % */}
          <div className="pd-stat-box">
            <span className="pd-stat-label">Crude Protein Content</span>
            <div className="pd-stat-val-gold">
              {product.protein > 0 ? `${product.protein}%` : "Pure Minerals"}
            </div>
            <span className="pd-stat-subtext">{product.proteinLabel}</span>
          </div>

          {/* Center: Energy Level */}
          <div className="pd-stat-box">
            <span className="pd-stat-label">Energy Classification</span>
            <div className="pd-stat-badge-energy">
              {product.energy}
            </div>
            <span className="pd-stat-subtext">Optimized Rumen Bypass Energy</span>
          </div>

          {/* Right: Key Mineral */}
          <div className="pd-stat-box">
            <span className="pd-stat-label">Primary Mineral Profile</span>
            <div className="pd-stat-val-mineral">
              {product.keyMineral}
            </div>
            <span className="pd-stat-subtext">Bioavailable Chelated Form</span>
          </div>
        </div>
      </section>

      {/* 3. ABOUT THIS PRODUCT (Prose & Benefits) */}
      <section className="pd-about-section" aria-label="About Product">
        <h2 className="pd-section-heading">{product.whyChooseHeading}</h2>
        <p className="pd-about-prose">
          {product.aboutParagraph}
        </p>

        {/* 4 Benefit Bullets with Icons */}
        <div className="pd-benefits-grid">
          {product.benefits.map((benefit, idx) => (
            <div key={idx} className="pd-benefit-card">
              <CheckCircle2 size={24} className="pd-benefit-icon" />
              <div>
                <h3 className="pd-benefit-title">{benefit.title}</h3>
                <p className="pd-benefit-desc">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FULL NUTRITION FACTS TABLE */}
      <section className="pd-nutrition-section" aria-label="Nutritional Specifications">
        <div className="pd-nutrition-container">
          <h2 className="pd-section-heading" style={{ marginBottom: "24px" }}>
            Guaranteed Nutrition Facts
          </h2>
          <div className="pd-nutrition-table-wrap">
            <table className="pd-nutrition-table">
              <thead>
                <tr>
                  <th>Nutrient Parameter</th>
                  <th>Guaranteed Value</th>
                </tr>
              </thead>
              <tbody>
                {product.nutritionFacts.map((row, idx) => (
                  <tr key={idx}>
                    <td><strong>{row.nutrient}</strong></td>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pd-nutrition-note">
            <ShieldCheck size={18} />
            <span>Meets all statutory requirements & certified under BIS cattle feed standards.</span>
          </div>
        </div>
      </section>

      {/* 5. PRODUCT FEATURES CARDS (3 Cards in a Row, Hover Lift) */}
      <section className="pd-features-section" aria-label="Key Product Features">
        <h2 className="pd-section-heading">Formulation Standard</h2>
        <div className="pd-features-grid">
          {product.features.map((feature, idx) => (
            <div key={idx} className="pd-feature-card">
              <div className="pd-feature-icon-box">
                {getFeatureIcon(feature.icon)}
              </div>
              <h3 className="pd-feature-title">{feature.title}</h3>
              <p className="pd-feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SPECIFICATIONS BOX (Dark Green, White Text) */}
      <section className="pd-specs-section" aria-label="Product Specifications">
        <div className="pd-specs-box">
          <h3 className="pd-specs-title">
            <Package size={26} />
            <span>Product Specifications & Logistics</span>
          </h3>
          <div className="pd-specs-grid">
            <div className="pd-spec-item">
              <Package size={22} className="pd-spec-item-icon" />
              <div>
                <div className="pd-spec-item-label">Packaging Available</div>
                <div className="pd-spec-item-value">{product.specs.packaging}</div>
              </div>
            </div>

            <div className="pd-spec-item">
              <Clock size={22} className="pd-spec-item-icon" />
              <div>
                <div className="pd-spec-item-label">Shelf Life</div>
                <div className="pd-spec-item-value">{product.specs.shelfLife}</div>
              </div>
            </div>

            <div className="pd-spec-item">
              <Warehouse size={22} className="pd-spec-item-icon" />
              <div>
                <div className="pd-spec-item-label">Storage Conditions</div>
                <div className="pd-spec-item-value">{product.specs.storage}</div>
              </div>
            </div>

            <div className="pd-spec-item">
              <Truck size={22} className="pd-spec-item-icon" />
              <div>
                <div className="pd-spec-item-label">Delivery Scope</div>
                <div className="pd-spec-item-value">{product.specs.delivery}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TRUST & CERTIFICATION SECTION (Reused Redesigned TrustStrip) */}
      <div className="pd-trust-container">
        <TrustStrip />
      </div>

      {/* 9. FAQ SECTION (Collapsible Accordion) */}
      <section className="pd-faq-section" aria-label="Frequently Asked Questions">
        <h2 className="pd-section-heading" style={{ textAlign: "center" }}>
          Frequently Asked Questions
        </h2>
        <p style={{ textAlign: "center", color: "#718096", marginTop: "6px" }}>
          Clear answers regarding dosage, mixing, and commercial supply.
        </p>

        <div className="pd-faq-list">
          {product.faq.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className={`pd-faq-item ${isOpen ? "open" : ""}`}>
                <button 
                  onClick={() => toggleFaq(idx)} 
                  className="pd-faq-btn"
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <ChevronDown size={20} className="pd-faq-icon" />
                </button>
                {isOpen && (
                  <div className="pd-faq-content">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. RELATED PRODUCTS SECTION (Cards in Carousel / Grid) */}
      {relatedProducts.length > 0 && (
        <section className="pd-related-section" aria-label="Related Products">
          <h2 className="pd-section-heading">You Might Also Like</h2>
          <p style={{ color: "#718096", marginTop: "4px" }}>
            Explore complementary cattle nutrition and yield enhancement solutions.
          </p>

          <div className="pd-related-grid">
            {relatedProducts.map((relProduct) => (
              <Link 
                key={relProduct.id} 
                href={`/products/${relProduct.id}`}
                className="pd-related-card"
              >
                <div className="pd-related-img-box">
                  <Image 
                    src={relProduct.image} 
                    alt={relProduct.name} 
                    width={320}
                    height={220}
                    className="pd-related-img"
                    style={{ objectFit: "contain", maxHeight: "100%", width: "auto" }}
                  />
                </div>
                <div className="pd-category-tag" style={{ fontSize: "0.75rem", marginBottom: "6px" }}>
                  {relProduct.category}
                </div>
                <h3 className="pd-related-title">{relProduct.name}</h3>
                <p className="pd-related-desc">{relProduct.description}</p>
                <div className="pd-related-pills">
                  <span className="pd-pill">
                    {relProduct.protein > 0 ? `Protein ${relProduct.protein}%` : "Mineral Rich"}
                  </span>
                  <span className="pd-pill">{relProduct.energy} Energy</span>
                </div>
                <div className="pd-related-link-btn">
                  <span>View Details</span>
                  <ArrowRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 8. STICKY MOBILE CTA BAR (Fixed on Mobile Only) */}
      <div className="pd-sticky-mobile-bar">
        <a 
          href={whatsappLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="pd-mobile-btn-whatsapp"
        >
          <Phone size={18} />
          <span>WhatsApp</span>
        </a>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="pd-mobile-btn-dealer"
        >
          <span>Dealer Price</span>
        </button>

        <a 
          href={product.brochureUrl} 
          download="Gaurishakti-Brochure.pdf"
          className="pd-mobile-btn-pdf"
          title="Download Brochure"
        >
          <Download size={20} />
        </a>
      </div>

      {/* DEALER PRICE MODAL */}
      {isModalOpen && (
        <div className="pd-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="pd-modal-card" onClick={(e) => e.stopPropagation()}>
            <button 
              className="pd-modal-close" 
              onClick={() => setIsModalOpen(false)}
              aria-label="Close Modal"
            >
              <X size={20} />
            </button>

            <h3 className="pd-modal-title">Get Dealer Pricing</h3>
            <p className="pd-modal-subtitle">
              Inquiring for <strong>{product.name}</strong>. Share your contact details for instant wholesale price slabs.
            </p>

            <form onSubmit={handleModalSubmit}>
              <div className="pd-modal-form-group">
                <label className="pd-modal-label">Your Name / Firm Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Ramesh Patel / Kisan Agro Center"
                  className="pd-modal-input"
                  value={modalForm.name}
                  onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                />
              </div>

              <div className="pd-modal-form-group">
                <label className="pd-modal-label">WhatsApp / Phone Number</label>
                <input 
                  type="tel" 
                  required
                  placeholder="e.g. 9876543210"
                  className="pd-modal-input"
                  value={modalForm.phone}
                  onChange={(e) => setModalForm({ ...modalForm, phone: e.target.value })}
                />
              </div>

              <div className="pd-modal-form-group">
                <label className="pd-modal-label">City & State</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Varanasi, Uttar Pradesh"
                  className="pd-modal-input"
                  value={modalForm.location}
                  onChange={(e) => setModalForm({ ...modalForm, location: e.target.value })}
                />
              </div>

              <div className="pd-modal-form-group">
                <label className="pd-modal-label">Estimated Monthly Requirement</label>
                <select 
                  className="pd-modal-select"
                  value={modalForm.quantity}
                  onChange={(e) => setModalForm({ ...modalForm, quantity: e.target.value })}
                >
                  <option value="50 Bags (Trial Order)">50 Bags (Trial Order)</option>
                  <option value="100 - 250 Bags">100 - 250 Bags / Month</option>
                  <option value="500+ Bags (Wholesale)">500+ Bags (Wholesale Distributor)</option>
                  <option value="Full Truck Load (10-15 Tonnes)">Full Truck Load (10-15 Tonnes)</option>
                </select>
              </div>

              <button type="submit" className="pd-modal-submit-btn">
                <MessageCircle size={18} />
                <span>Submit & Chat on WhatsApp</span>
              </button>

              <Link 
                href="/dealers" 
                className="pd-modal-dealer-link"
                onClick={() => setIsModalOpen(false)}
              >
                Or apply for full Authorized Dealership →
              </Link>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
