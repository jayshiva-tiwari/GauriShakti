"use client";

import { useState } from "react";
import { ShoppingCart, Send } from "lucide-react";

export default function EnquiryCart() {
  const [cart, setCart] = useState<{ id: number, name: string, qty: number }[]>([]);
  const [productSelect, setProductSelect] = useState("Premium Dairy Feed");
  const [qtySelect, setQtySelect] = useState(10);

  // SECURITY FIX: Input validation added for quantity
  const addToCart = () => {
    const qty = parseInt(qtySelect as any);
    if (isNaN(qty) || qty < 1 || qty > 1000) {
      alert("Please enter a valid quantity between 1 and 1000.");
      return;
    }
    setCart([...cart, { id: Date.now(), name: productSelect, qty: qty }]);
  };

  const submitEnquiry = () => {
    const items = cart.map(c => `${c.qty} bags of ${c.name}`).join(", ");
    const text = `Hello, I want to enquire about: ${items}. Please share pricing.`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section style={{ padding: "80px 5%", background: "var(--white)" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "40px", background: "var(--light-cream)", borderRadius: "var(--border-radius-lg)", padding: "40px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
        
        <div style={{ flex: "1 1 400px" }}>
          <h2 style={{ fontSize: "2.5rem", color: "var(--dark-green)", marginBottom: "20px" }}>Create Enquiry</h2>
          <p style={{ color: "var(--gray)", marginBottom: "30px" }}>Select products and quantities to get a custom quote via WhatsApp.</p>
          
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "10px", fontWeight: 600 }}>Select Product</label>
            <select value={productSelect} onChange={(e) => setProductSelect(e.target.value)}>
              <option>Premium Dairy Feed</option>
              <option>Super Yield Cattle Feed</option>
              <option>Nutri Calf Starter</option>
              <option>Gold Mineral Mixture</option>
            </select>
          </div>
          
          <div style={{ marginBottom: "30px" }}>
            <label style={{ display: "block", marginBottom: "10px", fontWeight: 600 }}>Quantity (Bags)</label>
            <input type="number" min="1" value={qtySelect} onChange={(e) => setQtySelect(parseInt(e.target.value) || 1)} />
          </div>
          
          <button onClick={addToCart} className="btn-secondary" style={{ width: "100%" }}>
            Add To Enquiry List
          </button>
        </div>

        <div style={{ flex: "1 1 400px", background: "var(--white)", padding: "30px", borderRadius: "var(--border-radius-sm)", border: "1px solid #eee" }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--dark-green)", marginBottom: "20px" }}>
            <ShoppingCart /> Enquiry Cart ({cart.length})
          </h3>
          
          {cart.length === 0 ? (
            <p style={{ color: "var(--gray)", fontStyle: "italic" }}>Your cart is empty.</p>
          ) : (
            <>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: "30px" }}>
                {cart.map(item => (
                  <li key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #eee" }}>
                    <span style={{ fontWeight: 500 }}>{item.name}</span>
                    <span style={{ color: "var(--agri-green)", fontWeight: "bold" }}>{item.qty} Bags</span>
                  </li>
                ))}
              </ul>
              
              <button onClick={submitEnquiry} className="btn-primary" style={{ width: "100%", padding: "15px" }}>
                <Send size={18} /> Send Enquiry via WhatsApp
              </button>
            </>
          )}
        </div>

      </div>
    </section>
  );
}
