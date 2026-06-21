"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const handleClick = () => {
    const text = "Hello, I am interested in your cattle feed products. Please share pricing and dealership information.";
    window.open(`https://wa.me/919792399946?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    // LINK FIX: Replace onClick div with a proper link
    <a href={`https://wa.me/919792399946?text=${encodeURIComponent("Hello, I am interested in your cattle feed products. Please share pricing and dealership information.")}`} target="_blank" rel="noopener noreferrer" className="floating-whatsapp" title="WhatsApp Us">
      <MessageCircle size={32} />
    </a>
  );
}
