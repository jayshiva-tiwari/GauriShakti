"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";

interface DealerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DealerModal({ isOpen, onClose }: DealerModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    
    // Indian mobile number validation (10 digits)
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit Indian mobile number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.city.trim()) newErrors.city = "City / Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/dealer-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setIsSuccess(true);
      
      // Auto-open WhatsApp after a short delay
      setTimeout(() => {
        const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
        const whatsappMsg = `New Dealer Inquiry:
Name: ${formData.name}
Phone: ${formData.phone}
City: ${formData.city}
Message: ${formData.message}`;
        
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`, "_blank", "noopener,noreferrer");
      }, 1500);

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <style dangerouslySetInnerHTML={{__html: `
            .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              background: rgba(0,0,0,0.5);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 1000;
              padding: 20px;
              backdrop-filter: blur(4px);
            }
            .modal-content {
              background: var(--light-cream, #FBF8F1);
              padding: 40px;
              border-radius: var(--border-radius-lg, 16px);
              width: 100%;
              max-width: 500px;
              position: relative;
              box-shadow: 0 20px 40px rgba(0,0,0,0.1);
              max-height: 90vh;
              overflow-y: auto;
            }
            .modal-close {
              position: absolute;
              top: 20px;
              right: 20px;
              background: none;
              border: none;
              cursor: pointer;
              color: var(--gray, #666);
              transition: color 0.3s ease;
            }
            .modal-close:hover {
              color: var(--dark-green, #1B4332);
            }
            .modal-title {
              color: var(--dark-green, #1B4332);
              font-size: 2rem;
              margin-bottom: 20px;
            }
            .form-group {
              margin-bottom: 20px;
            }
            .form-label {
              display: block;
              margin-bottom: 8px;
              color: var(--dark-green, #1B4332);
              font-weight: 500;
              font-size: 0.95rem;
            }
            .form-input, .form-textarea {
              width: 100%;
              padding: 12px 16px;
              border: 1px solid rgba(0,0,0,0.1);
              border-radius: 8px;
              background: var(--white, #fff);
              font-family: inherit;
              outline: none;
              transition: border-color 0.3s ease;
              font-size: 1rem;
            }
            .form-input:focus, .form-textarea:focus {
              border-color: var(--wheat-gold, #D4A017);
            }
            .form-textarea {
              resize: vertical;
              min-height: 100px;
            }
            .form-error {
              color: #e53e3e;
              font-size: 0.85rem;
              margin-top: 5px;
            }
            .modal-btn {
              width: 100%;
              padding: 16px;
              border-radius: 8px;
              background: var(--wheat-gold, #D4A017);
              color: var(--dark-green, #1B4332);
              font-weight: 600;
              font-size: 1.1rem;
              border: none;
              cursor: pointer;
              transition: opacity 0.3s ease;
            }
            .modal-btn:hover {
              opacity: 0.9;
            }
            .modal-btn:disabled {
              opacity: 0.7;
              cursor: not-allowed;
            }
            .success-state {
              text-align: center;
              padding: 40px 20px;
            }
            .success-icon {
              color: #48bb78;
              margin: 0 auto 20px;
            }
            .success-title {
              color: var(--dark-green, #1B4332);
              font-size: 1.5rem;
              margin-bottom: 10px;
            }
          `}} />
          
          <motion.div 
            className="modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose}>
              <X size={24} />
            </button>

            {isSuccess ? (
              <div className="success-state">
                <CheckCircle size={64} className="success-icon" />
                <h3 className="success-title">Thank you, we'll contact you soon!</h3>
                <p style={{ color: "var(--gray, #666)" }}>Opening WhatsApp to complete your inquiry...</p>
              </div>
            ) : (
              <>
                <h2 className="modal-title">Become A Dealer</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      disabled={isSubmitting}
                    />
                    {errors.name && <div className="form-error">{errors.name}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input 
                      type="tel" 
                      className="form-input"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      disabled={isSubmitting}
                    />
                    {errors.phone && <div className="form-error">{errors.phone}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      disabled={isSubmitting}
                    />
                    {errors.email && <div className="form-error">{errors.email}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">City / Location *</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      disabled={isSubmitting}
                    />
                    {errors.city && <div className="form-error">{errors.city}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message / Additional Info (Optional)</label>
                    <textarea 
                      className="form-textarea"
                      placeholder="Current business, quantity interested in, etc."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      disabled={isSubmitting}
                    ></textarea>
                  </div>

                  <button type="submit" className="modal-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
