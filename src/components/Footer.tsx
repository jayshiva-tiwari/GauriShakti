import Link from "next/link";
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-container">
      <style dangerouslySetInnerHTML={{
        __html: `
        .footer-container {
          background-color: var(--dark-green);
          color: var(--light-cream);
          padding: 64px 24px;
          margin-top: 80px;
        }
        .footer-grid {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 48px;
        }
        .footer-brand { grid-column: span 1; }
        .footer-links { grid-column: span 1; }
        .footer-contact { grid-column: span 2; }
        
        .footer-title {
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          margin-bottom: 24px;
        }
        .footer-title span { color: var(--wheat-gold); }
        
        .footer-desc {
          font-size: 0.875rem;
          line-height: 1.6;
          opacity: 0.8;
          font-weight: 500;
        }
        
        .footer-heading {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 24px;
          color: var(--wheat-gold);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        
        .footer-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 0.875rem;
          opacity: 0.8;
          font-weight: 500;
        }
        .footer-list li a { transition: color 0.3s ease; }
        .footer-list li a:hover { color: var(--white); }
        
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .contact-icon {
          flex-shrink: 0;
          color: var(--wheat-gold);
          margin-top: 2px;
        }
        
        .footer-bottom {
          max-width: 1280px;
          margin: 64px auto 0;
          padding-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .footer-copyright {
          font-size: 0.875rem;
          opacity: 0.6;
          font-weight: 500;
        }
        
        .footer-socials {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          color: var(--wheat-gold);
        }
        .social-link {
          font-size: 0.875rem;
          font-weight: 600;
          transition: color 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .social-link:hover { color: var(--white); }
        
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-contact { grid-column: span 1; }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}} />

      <div className="footer-grid">

        {/* Brand Section */}
        <div className="footer-brand">
          <div className="footer-title">
            GAURI<span>SHAKTI</span>
          </div>
          <p className="footer-desc">
            Cultivating the finest produce with sustainable practices. From our farms to your table, freshness guaranteed.
          </p>
          <span style={{ color: "#ffffffff", marginTop: "20px", fontSize: "10px", fontWeight: "bold" }}>Made With 🧡 By Jayshiva Tiwari</span>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-list">
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/mission">Sustainability</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h4 className="footer-heading">Contact Us</h4>
          <ul className="footer-list" style={{ gap: "16px" }}>
            <li className="contact-item">
              <MapPin size={20} className="contact-icon" />
              <span>Industrial Area Phase - II,<br />Gonda, Uttar Pradesh - 271001, India</span>
            </li>
            <li className="contact-item">
              <Phone size={20} className="contact-icon" />
              <span>+91-97923 99946</span>
            </li>
            <li className="contact-item">
              <Mail size={20} className="contact-icon" />
              <span>info@gaurishakti.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">© {new Date().getFullYear()} Gauri Shakti. All rights reserved.</p>
        <div className="footer-socials">
          <a href="https://www.instagram.com/pankaj39singh9946?igsh=MWp4cnZoMGRlZ3VmYw==" target="_blank" rel="noopener noreferrer" className="social-link">Facebook</a>
          <a href="https://www.instagram.com/pankaj39singh9946?igsh=MWp4cnZoMGRlZ3VmYw==" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
          <a href="https://www.instagram.com/pankaj39singh9946?igsh=MWp4cnZoMGRlZ3VmYw==" target="_blank" rel="noopener noreferrer" className="social-link">YouTube</a>
          <a href="https://www.linkedin.com/in/pankaj-singh-50b835144?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
