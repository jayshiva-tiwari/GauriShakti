"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Send, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink
} from "lucide-react";
import { GAURISHAKTI_WHATSAPP_NUMBER } from "@/config/whatsapp";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  fullName: string;
  mobileNumber: string;
  location: string;
  cattleCount: string;
  requirement: string;
  otherDetails: string;
  additionalMessage: string;
}

interface FormErrors {
  fullName?: string;
  mobileNumber?: string;
  location?: string;
  cattleCount?: string;
  requirement?: string;
  otherDetails?: string;
}

const REQUIREMENT_OPTIONS = [
  "Improve milk yield",
  "Choose the right cattle feed",
  "Improve cattle nutrition",
  "Feed-related guidance",
  "Dealer / Distributor enquiry",
  "Other"
];

const INITIAL_FORM: FormState = {
  fullName: "",
  mobileNumber: "",
  location: "",
  cattleCount: "",
  requirement: "",
  otherDetails: "",
  additionalMessage: ""
};

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [lastGeneratedUrl, setLastGeneratedUrl] = useState("");
  
  const modalContentRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const handleModalClose = useCallback(() => {
    onClose();
    // Reset state after animation completes
    setTimeout(() => {
      setFormData(INITIAL_FORM);
      setErrors({});
      setIsSubmittedSuccess(false);
      setIsSubmitting(false);
      setLastGeneratedUrl("");
    }, 250);
  }, [onClose]);

  // Lock body scroll and set up Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    // Save previous overflow
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus first input on open
    const timer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 150);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleModalClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, handleModalClose]);

  const handleInputChange = (field: keyof FormState, value: string) => {
    // If mobile number, only allow numeric digits up to 10
    if (field === "mobileNumber") {
      const numeric = value.replace(/\D/g, "").slice(0, 10);
      setFormData(prev => ({ ...prev, [field]: numeric }));
    } else if (field === "cattleCount") {
      // Only positive integers
      const numeric = value.replace(/\D/g, "").slice(0, 6);
      setFormData(prev => ({ ...prev, [field]: numeric }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }

    // Clear error for this field as soon as user types/modifies
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field as keyof FormErrors];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your name.";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters.";
    }

    // 2. Mobile Number (10 digits, Indian mobile format starting with 6-9)
    const cleanMobile = formData.mobileNumber.trim();
    if (!cleanMobile) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number.";
    } else if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      newErrors.mobileNumber = "Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).";
    }

    // 3. Location
    if (!formData.location.trim()) {
      newErrors.location = "Please enter your location.";
    } else if (formData.location.trim().length < 2) {
      newErrors.location = "Please enter city, district, or state.";
    }

    // 4. Number of Cattle
    const cattleNum = parseInt(formData.cattleCount, 10);
    if (!formData.cattleCount.trim() || isNaN(cattleNum) || cattleNum <= 0) {
      newErrors.cattleCount = "Please enter the number of cattle (at least 1).";
    }

    // 5. Requirement
    if (!formData.requirement) {
      newErrors.requirement = "Please select how we can help you.";
    } else if (formData.requirement === "Other" && !formData.otherDetails.trim()) {
      newErrors.otherDetails = "Please briefly describe your requirement.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Build the clean WhatsApp message
    const requirementText = formData.requirement === "Other"
      ? `Other\n\n*Additional Details:*\n${formData.otherDetails.trim()}`
      : formData.requirement;

    const additionalMessageSection = formData.additionalMessage.trim()
      ? `\n*Additional Notes:*\n${formData.additionalMessage.trim()}\n`
      : "";

    const message = [
      "Hello Gaurishakti Team 👋",
      "",
      "I would like to get a free cattle nutrition consultation.",
      "",
      "*Customer Details*",
      `Name: ${formData.fullName.trim()}`,
      `Mobile: ${formData.mobileNumber.trim()}`,
      `Location: ${formData.location.trim()}`,
      `Number of Cattle: ${formData.cattleCount.trim()}`,
      "",
      "*Requirement*",
      requirementText,
      additionalMessageSection,
      "I found Gaurishakti through your website."
    ].filter(line => line !== undefined).join("\n");

    const whatsappUrl = `https://wa.me/${GAURISHAKTI_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setLastGeneratedUrl(whatsappUrl);

    // Give a brief realistic UI transition so the user sees "Opening WhatsApp..."
    setTimeout(() => {
      try {
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      } catch {
        // Fallback handled in success screen if popup blocked
      }
      setIsSubmitting(false);
      setIsSubmittedSuccess(true);
    }, 450);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="consultation-modal-overlay" 
          onClick={handleModalClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="consultation-modal-title"
        >
          <style dangerouslySetInnerHTML={{
            __html: `
            .consultation-modal-overlay {
              position: fixed;
              inset: 0;
              z-index: 9999;
              background: rgba(10, 38, 25, 0.75);
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 16px;
              overflow-y: auto;
              overscroll-behavior: contain;
            }

            .consultation-modal-box {
              background: #FFFFFF;
              width: 100%;
              max-width: 540px;
              border-radius: 20px;
              box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(212, 175, 55, 0.2);
              position: relative;
              overflow: hidden;
              margin: auto;
              display: flex;
              flex-direction: column;
              max-height: 92vh;
            }

            .consultation-modal-header {
              padding: 24px 28px 20px;
              background: linear-gradient(135deg, #0F3322 0%, #1B5E3F 100%);
              color: #FFFFFF;
              position: relative;
              border-bottom: 2px solid #D4AF37;
            }

            .consultation-close-btn {
              position: absolute;
              top: 18px;
              right: 18px;
              width: 36px;
              height: 36px;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.12);
              border: 1px solid rgba(255, 255, 255, 0.2);
              color: #FFFFFF;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.2s ease;
            }

            .consultation-close-btn:hover {
              background: rgba(212, 175, 55, 0.9);
              color: #1B1B1B;
              transform: rotate(90deg);
            }

            .consultation-badge {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              background: rgba(212, 175, 55, 0.18);
              border: 1px solid #D4AF37;
              color: #D4AF37;
              padding: 4px 10px;
              border-radius: 20px;
              font-size: 11px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 8px;
            }

            .consultation-modal-title {
              font-family: 'Outfit', sans-serif;
              font-size: 24px;
              font-weight: 700;
              color: #FFFFFF;
              margin: 0 0 6px;
              line-height: 1.25;
            }

            .consultation-modal-subtitle {
              font-size: 13px;
              color: #E2E8F0;
              margin: 0;
              line-height: 1.5;
            }

            .consultation-modal-body {
              padding: 24px 28px;
              overflow-y: auto;
              -webkit-overflow-scrolling: touch;
            }

            .consultation-form-group {
              margin-bottom: 18px;
            }

            .consultation-label {
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 13px;
              font-weight: 600;
              color: #1B1B1B;
              margin-bottom: 6px;
            }

            .consultation-label-required {
              color: #EF4444;
              margin-left: 3px;
            }

            .consultation-input-wrapper {
              position: relative;
              display: flex;
              align-items: center;
            }

            .consultation-input-prefix {
              position: absolute;
              left: 14px;
              font-size: 14px;
              font-weight: 700;
              color: #1B5E3F;
              display: flex;
              align-items: center;
              gap: 4px;
              pointer-events: none;
              border-right: 1px solid #E5E5E5;
              padding-right: 10px;
            }

            .consultation-input {
              width: 100%;
              min-height: 48px;
              padding: 12px 14px;
              font-size: 15px;
              border-radius: 12px;
              border: 1.5px solid #E5E5E5;
              background: #FFFFFF;
              color: #1B1B1B;
              font-family: inherit;
              transition: all 0.2s ease;
              box-sizing: border-box;
            }

            .consultation-input.has-prefix {
              padding-left: 64px;
            }

            .consultation-input:focus {
              outline: none;
              border-color: #D4AF37;
              box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.18);
            }

            .consultation-input.has-error {
              border-color: #EF4444;
              background-color: #FEF2F2;
            }

            .consultation-input.has-error:focus {
              box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
            }

            .consultation-error-msg {
              font-size: 12px;
              color: #DC2626;
              margin-top: 5px;
              display: flex;
              align-items: center;
              gap: 4px;
              font-weight: 500;
            }

            .consultation-select {
              width: 100%;
              min-height: 48px;
              padding: 12px 14px;
              font-size: 15px;
              border-radius: 12px;
              border: 1.5px solid #E5E5E5;
              background: #FFFFFF;
              color: #1B1B1B;
              font-family: inherit;
              cursor: pointer;
              transition: all 0.2s ease;
            }

            .consultation-select:focus {
              outline: none;
              border-color: #D4AF37;
              box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.18);
            }

            .consultation-select.has-error {
              border-color: #EF4444;
              background-color: #FEF2F2;
            }

            .consultation-textarea {
              width: 100%;
              min-height: 80px;
              padding: 12px 14px;
              font-size: 15px;
              border-radius: 12px;
              border: 1.5px solid #E5E5E5;
              background: #FFFFFF;
              color: #1B1B1B;
              font-family: inherit;
              resize: vertical;
              transition: all 0.2s ease;
              box-sizing: border-box;
            }

            .consultation-textarea:focus {
              outline: none;
              border-color: #D4AF37;
              box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.18);
            }

            .consultation-textarea.has-error {
              border-color: #EF4444;
              background-color: #FEF2F2;
            }

            .consultation-submit-btn {
              width: 100%;
              min-height: 54px;
              background: #D4AF37;
              color: #1B1B1B;
              border: none;
              border-radius: 27px;
              font-size: 16px;
              font-weight: 700;
              font-family: 'Outfit', sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 6px 18px rgba(212, 175, 55, 0.35);
              margin-top: 10px;
            }

            .consultation-submit-btn:hover:not(:disabled) {
              background: #C49D2A;
              transform: translateY(-2px);
              box-shadow: 0 10px 24px rgba(212, 175, 55, 0.45);
            }

            .consultation-submit-btn:active:not(:disabled) {
              transform: translateY(0);
            }

            .consultation-submit-btn:disabled {
              opacity: 0.7;
              cursor: not-allowed;
            }

            .consultation-privacy-note {
              text-align: center;
              font-size: 11px;
              color: #64748B;
              margin-top: 12px;
              line-height: 1.4;
            }

            /* Success State */
            .consultation-success-card {
              text-align: center;
              padding: 36px 20px 24px;
            }

            .consultation-success-icon {
              width: 72px;
              height: 72px;
              background: #DCFCE7;
              color: #15803D;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 20px;
              border: 3px solid #BBF7D0;
            }

            .consultation-success-title {
              font-size: 24px;
              font-weight: 700;
              color: #0F3322;
              margin-bottom: 12px;
              font-family: 'Outfit', sans-serif;
            }

            .consultation-success-desc {
              font-size: 14px;
              color: #334155;
              line-height: 1.6;
              max-width: 420px;
              margin: 0 auto 24px;
            }

            .consultation-whatsapp-pill {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              background: #25D366;
              color: #FFFFFF;
              font-weight: 600;
              padding: 12px 22px;
              border-radius: 24px;
              text-decoration: none;
              font-size: 14px;
              margin-bottom: 20px;
              transition: all 0.2s ease;
              box-shadow: 0 4px 15px rgba(37, 211, 102, 0.35);
            }

            .consultation-whatsapp-pill:hover {
              background: #20BA5A;
              transform: translateY(-2px);
            }

            .consultation-close-modal-btn {
              background: #F1F5F9;
              color: #334155;
              border: 1px solid #CBD5E1;
              padding: 10px 28px;
              border-radius: 20px;
              font-size: 14px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
            }

            .consultation-close-modal-btn:hover {
              background: #E2E8F0;
              color: #0F172A;
            }

            @media (max-width: 640px) {
              .consultation-modal-overlay {
                padding: 12px;
              }
              .consultation-modal-header {
                padding: 20px 20px 16px;
              }
              .consultation-modal-title {
                font-size: 20px;
              }
              .consultation-modal-body {
                padding: 20px;
              }
              .consultation-submit-btn {
                min-height: 50px;
                font-size: 15px;
              }
            }
          `}} />

          <motion.div
            ref={modalContentRef}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="consultation-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="consultation-modal-header">
              <button 
                type="button" 
                onClick={handleModalClose}
                className="consultation-close-btn"
                aria-label="Close consultation modal"
              >
                <X size={20} />
              </button>

              <div className="consultation-badge">
                <Sparkles size={12} />
                Free Nutrition Guidance
              </div>

              <h3 id="consultation-modal-title" className="consultation-modal-title">
                Get Free Consultation
              </h3>
              <p className="consultation-modal-subtitle">
                Talk to our cattle nutrition experts and get guidance tailored to your farm.
              </p>
            </div>

            {/* Modal Content */}
            <div className="consultation-modal-body">
              {isSubmittedSuccess ? (
                /* Success Confirmation State */
                <div className="consultation-success-card">
                  <div className="consultation-success-icon">
                    <CheckCircle2 size={40} />
                  </div>
                  
                  <h4 className="consultation-success-title">
                    You&apos;re almost done! 🎉
                  </h4>
                  
                  <p className="consultation-success-desc">
                    WhatsApp has been opened with your consultation details.<br />
                    <strong>Please review the message and tap Send to contact our team.</strong>
                  </p>

                  {lastGeneratedUrl && (
                    <div>
                      <a 
                        href={lastGeneratedUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="consultation-whatsapp-pill"
                      >
                        <ExternalLink size={16} /> Didn&apos;t open? Tap to open WhatsApp
                      </a>
                    </div>
                  )}

                  <div>
                    <button
                      type="button"
                      onClick={handleModalClose}
                      className="consultation-close-modal-btn"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                /* Consultation Form */
                <form onSubmit={handleSubmit} noValidate>
                  {/* Field 1: Full Name */}
                  <div className="consultation-form-group">
                    <label htmlFor="consultation-fullname" className="consultation-label">
                      <span>Full Name <span className="consultation-label-required">*</span></span>
                    </label>
                    <div className="consultation-input-wrapper">
                      <input
                        ref={firstInputRef}
                        id="consultation-fullname"
                        type="text"
                        placeholder="Enter your name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className={`consultation-input ${errors.fullName ? "has-error" : ""}`}
                        autoComplete="name"
                      />
                    </div>
                    {errors.fullName && (
                      <div className="consultation-error-msg">
                        {errors.fullName}
                      </div>
                    )}
                  </div>

                  {/* Field 2: Mobile Number */}
                  <div className="consultation-form-group">
                    <label htmlFor="consultation-mobile" className="consultation-label">
                      <span>Mobile Number <span className="consultation-label-required">*</span></span>
                      <span style={{ fontSize: "11px", color: "#64748B", fontWeight: 400 }}>10 digits</span>
                    </label>
                    <div className="consultation-input-wrapper">
                      <div className="consultation-input-prefix">
                        <Phone size={14} /> +91
                      </div>
                      <input
                        id="consultation-mobile"
                        type="tel"
                        inputMode="numeric"
                        placeholder="Enter 10-digit mobile number"
                        value={formData.mobileNumber}
                        onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                        className={`consultation-input has-prefix ${errors.mobileNumber ? "has-error" : ""}`}
                        autoComplete="tel-national"
                      />
                    </div>
                    {errors.mobileNumber && (
                      <div className="consultation-error-msg">
                        {errors.mobileNumber}
                      </div>
                    )}
                  </div>

                  {/* Field 3: Location */}
                  <div className="consultation-form-group">
                    <label htmlFor="consultation-location" className="consultation-label">
                      <span>Your Location <span className="consultation-label-required">*</span></span>
                    </label>
                    <div className="consultation-input-wrapper">
                      <input
                        id="consultation-location"
                        type="text"
                        placeholder="City / District / State (e.g. Mehsana, Gujarat)"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className={`consultation-input ${errors.location ? "has-error" : ""}`}
                        autoComplete="address-level2"
                      />
                    </div>
                    {errors.location && (
                      <div className="consultation-error-msg">
                        {errors.location}
                      </div>
                    )}
                  </div>

                  {/* Field 4: Number of Cattle */}
                  <div className="consultation-form-group">
                    <label htmlFor="consultation-cattle" className="consultation-label">
                      <span>Number of Cattle <span className="consultation-label-required">*</span></span>
                    </label>
                    <div className="consultation-input-wrapper">
                      <input
                        id="consultation-cattle"
                        type="number"
                        min="1"
                        step="1"
                        placeholder="Enter number of cattle (e.g. 15)"
                        value={formData.cattleCount}
                        onChange={(e) => handleInputChange("cattleCount", e.target.value)}
                        className={`consultation-input ${errors.cattleCount ? "has-error" : ""}`}
                      />
                    </div>
                    {errors.cattleCount && (
                      <div className="consultation-error-msg">
                        {errors.cattleCount}
                      </div>
                    )}
                  </div>

                  {/* Field 5: Consultation Requirement */}
                  <div className="consultation-form-group">
                    <label htmlFor="consultation-requirement" className="consultation-label">
                      <span>How can we help you? <span className="consultation-label-required">*</span></span>
                    </label>
                    <select
                      id="consultation-requirement"
                      value={formData.requirement}
                      onChange={(e) => handleInputChange("requirement", e.target.value)}
                      className={`consultation-select ${errors.requirement ? "has-error" : ""}`}
                    >
                      <option value="" disabled>-- Select Requirement --</option>
                      {REQUIREMENT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.requirement && (
                      <div className="consultation-error-msg">
                        {errors.requirement}
                      </div>
                    )}
                  </div>

                  {/* Conditional Field: Other Details */}
                  {formData.requirement === "Other" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="consultation-form-group"
                    >
                      <label htmlFor="consultation-other" className="consultation-label">
                        <span>Tell us more <span className="consultation-label-required">*</span></span>
                      </label>
                      <textarea
                        id="consultation-other"
                        placeholder="Briefly describe your requirement..."
                        rows={3}
                        value={formData.otherDetails}
                        onChange={(e) => handleInputChange("otherDetails", e.target.value)}
                        className={`consultation-textarea ${errors.otherDetails ? "has-error" : ""}`}
                      />
                      {errors.otherDetails && (
                        <div className="consultation-error-msg">
                          {errors.otherDetails}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Field 6: Additional Message (Optional) */}
                  <div className="consultation-form-group">
                    <label htmlFor="consultation-message" className="consultation-label">
                      <span>Additional Message <span style={{ fontWeight: 400, color: "#64748B", fontSize: "11px" }}>(Optional)</span></span>
                    </label>
                    <textarea
                      id="consultation-message"
                      placeholder="Tell us anything else about your requirement..."
                      rows={2}
                      value={formData.additionalMessage}
                      onChange={(e) => handleInputChange("additionalMessage", e.target.value)}
                      className="consultation-textarea"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="consultation-submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          style={{ display: "inline-block", width: 18, height: 18, border: "2px solid #1B1B1B", borderTopColor: "transparent", borderRadius: "50%" }}
                        />
                        Opening WhatsApp...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Get Free Consultation
                      </>
                    )}
                  </button>

                  <p className="consultation-privacy-note">
                    🔒 Your details are used strictly to compose your WhatsApp message. No data is stored on our servers.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
