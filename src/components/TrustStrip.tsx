export default function TrustStrip() {
  const badges = [
    "ISO Certified",
    "GMP Certified",
    "Veterinary Approved",
    "High Protein Formula",
    "Quality Tested",
    "Fast Delivery",
    "Trusted Nationwide",
  ];

  return (
    <div style={{ background: "var(--white)", paddingBottom: "40px" }}>
      <div className="ticker-wrap">
        <div className="ticker">
          {[...badges, ...badges, ...badges].map((badge, i) => (
            <div key={i} className="ticker-item">
              <span>✓</span> {badge}
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .trust-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 1280px;
          margin: 0 auto;
          padding: 40px 20px 0;
        }
        @media (max-width: 1024px) {
          .trust-grid {
            grid-template-columns: repeat(2, 1fr);
            padding: 40px 28px 0;
          }
        }
        @media (max-width: 768px) {
          .trust-grid {
            grid-template-columns: repeat(2, 1fr);
            padding: 40px 16px 0;
            gap: 16px;
          }
          .trust-item-text {
            font-size: 14px !important;
          }
          .trust-item-icon {
            font-size: 1.2rem !important;
          }
        }
      `}} />

      <div className="trust-grid">
        {[
          { icon: "🏅", text: "ISO Certified" },
          { icon: "🏅", text: "1 Million+ Bags Sold" },
          { icon: "🏅", text: "Nationwide Distribution" },
        ].map((item, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "var(--dark-green)",
            fontWeight: 600,
          }}>
            <span className="trust-item-icon" style={{ fontSize: "1.5rem" }}>{item.icon}</span>
            <span className="trust-item-text" style={{ fontSize: "1.1rem" }}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
