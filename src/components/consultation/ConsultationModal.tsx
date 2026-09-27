"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Send, 
  Phone, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown
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
  const scrollableBodyRef = useRef<HTMLDivElement>(null);
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

    // Save previous overflow state
    const prevOverflow = document.body.style.overflow;
    const prevTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    // Pause Lenis smooth scroll so it does not intercept modal scroll
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.stop();
    }

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
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouchAction;
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
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
      newErrors.cattleCount = "Please enter the number of cattle.";
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
      // Scroll to the first error if needed
      if (scrollableBodyRef.current) {
        scrollableBodyRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    setIsSubmitting(true);

    // Build the professional WhatsApp message
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

    // Provide a brief UI transition before triggering WhatsApp
    setTimeout(() => {
      try {
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      } catch {
        // Fallback handled on success screen if popup blocker interferes
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
          data-lenis-prevent="true"
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
              z-index: 99999;
              background: rgba(15, 23, 42, 0.65);
              backdrop-filter: blur(4px);
              -webkit-backdrop-filter: blur(4px);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 16px;
              overflow-y: auto;
              -webkit-overflow-scrolling: touch;
              overscroll-behavior: contain;
            }

            .consultation-modal-box {
              background: #FFFFFF;
              width: 100%;
              max-width: 580px;
              max-height: min(90vh, 760px);
              max-height: min(90dvh, 760px);
              border-radius: 12px;
              border: 1px solid #E2E8F0;
              box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(0, 0, 0, 0.05);
              display: flex;
              flex-direction: column;
              position: relative;
              overflow: hidden;
              margin: auto;
            }

            /* Classic forest and gold accent bar */
            .consultation-modal-box::before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 4px;
              background: linear-gradient(90deg, #164E33 0%, #1B5E3F 75%, #D4AF37 100%);
              z-index: 10;
            }

            .consultation-modal-header {
              padding: 22px 28px 18px;
              background: #FFFFFF;
              border-bottom: 1px solid #F1F5F9;
              position: relative;
              flex-shrink: 0;
            }

            .consultation-close-btn {
              position: absolute;
              top: 18px;
              right: 18px;
              width: 32px;
              height: 32px;
              border-radius: 6px;
              background: transparent;
              border: 1px solid transparent;
              color: #64748B;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.15s ease;
            }

            .consultation-close-btn:hover {
              background: #F1F5F9;
              color: #0F172A;
              border-color: #E2E8F0;
            }

            .consultation-modal-title {
              font-family: 'Outfit', sans-serif;
              font-size: 22px;
              font-weight: 600;
              color: #0F172A;
              margin: 0 0 4px;
              line-height: 1.3;
              letter-spacing: -0.01em;
            }

            .consultation-modal-subtitle {
              font-size: 13.5px;
              color: #64748B;
              margin: 0;
              line-height: 1.5;
            }

            /* Scrollable body with strict flex child scroll boundaries */
            .consultation-modal-body {
              padding: 24px 28px;
              overflow-y: auto !important;
              overflow-x: hidden;
              flex: 1 1 auto;
              min-height: 0;
              -webkit-overflow-scrolling: touch;
              overscroll-behavior: contain;
              touch-action: pan-y;
            }

            /* Sleek classic scrollbar */
            .consultation-modal-body::-webkit-scrollbar {
              width: 6px;
            }
            .consultation-modal-body::-webkit-scrollbar-track {
              background: #F8FAFC;
            }
            .consultation-modal-body::-webkit-scrollbar-thumb {
              background: #CBD5E1;
              border-radius: 3px;
            }
            .consultation-modal-body::-webkit-scrollbar-thumb:hover {
              background: #94A3B8;
            }

            .consultation-form-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 16px;
              margin-bottom: 16px;
            }

            .consultation-form-group {
              margin-bottom: 16px;
            }

            .consultation-form-grid .consultation-form-group {
              margin-bottom: 0;
            }

            .consultation-label {
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 13px;
              font-weight: 600;
              color: #1E293B;
              margin-bottom: 6px;
              letter-spacing: 0.01em;
            }

            .consultation-label-required {
              color: #DC2626;
              margin-left: 2px;
            }

            .consultation-input-wrapper {
              position: relative;
              display: flex;
              align-items: center;
            }

            .consultation-input-prefix {
              position: absolute;
              left: 12px;
              font-size: 13.5px;
              font-weight: 600;
              color: #164E33;
              display: flex;
              align-items: center;
              gap: 4px;
              pointer-events: none;
              border-right: 1px solid #E2E8F0;
              padding-right: 8px;
            }

            .consultation-input {
              width: 100%;
              height: 44px;
              padding: 10px 14px;
              font-size: 14.5px;
              border-radius: 8px;
              border: 1px solid #CBD5E1;
              background: #F8FAFC;
              color: #0F172A;
              font-family: inherit;
              transition: all 0.15s ease;
              box-sizing: border-box;
            }

            .consultation-input.has-prefix {
              padding-left: 64px;
            }

            .consultation-input:focus {
              outline: none;
              background: #FFFFFF;
              border-color: #164E33;
              box-shadow: 0 0 0 3px rgba(22, 78, 51, 0.12);
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
              margin-top: 4px;
              font-weight: 500;
              line-height: 1.4;
            }

            .consultation-select-wrapper {
              position: relative;
            }

            .consultation-select {
              width: 100%;
              height: 44px;
              padding: 10px 36px 10px 14px;
              font-size: 14.5px;
              border-radius: 8px;
              border: 1px solid #CBD5E1;
              background: #F8FAFC;
              color: #0F172A;
              font-family: inherit;
              cursor: pointer;
              appearance: none;
              -webkit-appearance: none;
              transition: all 0.15s ease;
              box-sizing: border-box;
            }

            .consultation-select:focus {
              outline: none;
              background: #FFFFFF;
              border-color: #164E33;
              box-shadow: 0 0 0 3px rgba(22, 78, 51, 0.12);
            }

            .consultation-select.has-error {
              border-color: #EF4444;
              background-color: #FEF2F2;
            }

            .consultation-select-icon {
              position: absolute;
              right: 12px;
              top: 50%;
              transform: translateY(-50%);
              pointer-events: none;
              color: #64748B;
            }

            .consultation-textarea {
              width: 100%;
              padding: 10px 14px;
              font-size: 14.5px;
              border-radius: 8px;
              border: 1px solid #CBD5E1;
              background: #F8FAFC;
              color: #0F172A;
              font-family: inherit;
              resize: vertical;
              transition: all 0.15s ease;
              box-sizing: border-box;
            }

            .consultation-textarea:focus {
              outline: none;
              background: #FFFFFF;
              border-color: #164E33;
              box-shadow: 0 0 0 3px rgba(22, 78, 51, 0.12);
            }

            .consultation-textarea.has-error {
              border-color: #EF4444;
              background-color: #FEF2F2;
            }

            .consultation-submit-btn {
              width: 100%;
              height: 48px;
              background: #164E33;
              color: #FFFFFF;
              border: 1px solid #0F3824;
              border-radius: 8px;
              font-size: 15px;
              font-weight: 600;
              font-family: inherit;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              cursor: pointer;
              transition: all 0.15s ease;
              margin-top: 8px;
              box-shadow: 0 2px 6px rgba(22, 78, 51, 0.2);
            }

            .consultation-submit-btn:hover:not(:disabled) {
              background: #0F3824;
              box-shadow: 0 4px 12px rgba(22, 78, 51, 0.3);
            }

            .consultation-submit-btn:active:not(:disabled) {
              transform: translateY(1px);
            }

            .consultation-submit-btn:disabled {
              opacity: 0.65;
              cursor: not-allowed;
            }

            /* Success State */
            .consultation-success-card {
              text-align: center;
              padding: 32px 16px 20px;
            }

            .consultation-success-icon {
              width: 56px;
              height: 56px;
              background: #ECFDF5;
              color: #059669;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 16px;
              border: 1px solid #A7F3D0;
            }

            .consultation-success-title {
              font-size: 20px;
              font-weight: 600;
              color: #0F172A;
              margin-bottom: 8px;
              font-family: 'Outfit', sans-serif;
            }

            .consultation-success-desc {
              font-size: 14px;
              color: #475569;
              line-height: 1.6;
              max-width: 420px;
              margin: 0 auto 20px;
            }

            .consultation-whatsapp-link {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              background: #25D366;
              color: #FFFFFF;
              font-weight: 600;
              padding: 10px 20px;
              border-radius: 8px;
              text-decoration: none;
              font-size: 14px;
              margin-bottom: 20px;
              transition: all 0.15s ease;
            }

            .consultation-whatsapp-link:hover {
              background: #1EBE5D;
            }

            .consultation-close-modal-btn {
              background: #F1F5F9;
              color: #475569;
              border: 1px solid #E2E8F0;
              padding: 9px 24px;
              border-radius: 8px;
              font-size: 13.5px;
              font-weight: 500;
              cursor: pointer;
              transition: all 0.15s ease;
            }

            .consultation-close-modal-btn:hover {
              background: #E2E8F0;
              color: #0F172A;
            }

            @media (max-width: 640px) {
              .consultation-modal-overlay {
                padding: 10px;
              }
              .consultation-form-grid {
                grid-template-columns: 1fr;
                gap: 16px;
              }
              .consultation-modal-header {
                padding: 18px 20px 14px;
              }
              .consultation-modal-title {
                font-size: 19px;
              }
              .consultation-modal-body {
                padding: 18px 20px 20px;
              }
              .consultation-submit-btn {
                height: 46px;
                font-size: 14.5px;
              }
            }
          `}} />

          <motion.div
            ref={modalContentRef}
            data-lenis-prevent="true"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="consultation-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Minimal Classic Header */}
            <div className="consultation-modal-header">
              <button 
                type="button" 
                onClick={handleModalClose}
                className="consultation-close-btn"
                aria-label="Close consultation modal"
              >
                <X size={18} />
              </button>

              <h3 id="consultation-modal-title" className="consultation-modal-title">
                Get Free Consultation
              </h3>
              <p className="consultation-modal-subtitle">
                Talk to our cattle nutrition experts and get guidance tailored to your farm.
              </p>
            </div>

            {/* Scrollable Form Body */}
            <div 
              ref={scrollableBodyRef}
              className="consultation-modal-body"
              data-lenis-prevent="true"
              onWheel={(e) => {
                e.stopPropagation();
              }}
              onTouchMove={(e) => {
                e.stopPropagation();
              }}
            >
              {isSubmittedSuccess ? (
                /* Success Confirmation State */
                <div className="consultation-success-card">
                  <div className="consultation-success-icon">
                    <CheckCircle2 size={32} />
                  </div>
                  
                  <h4 className="consultation-success-title">
                    WhatsApp Opened Successfully
                  </h4>
                  
                  <p className="consultation-success-desc">
                    WhatsApp has been opened with your consultation details.<br />
                    Please review the message and tap <strong>Send</strong> to connect with our cattle feed specialist.
                  </p>

                  {lastGeneratedUrl && (
                    <div>
                      <a 
                        href={lastGeneratedUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="consultation-whatsapp-link"
                      >
                        <ExternalLink size={15} /> Didn&apos;t open? Tap to open WhatsApp
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
                /* Classic Minimalist Consultation Form */
                <form onSubmit={handleSubmit} noValidate>
                  {/* Row 1: Name and Mobile */}
                  <div className="consultation-form-grid">
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
                          <Phone size={13} /> +91
                        </div>
                        <input
                          id="consultation-mobile"
                          type="tel"
                          inputMode="numeric"
                          placeholder="Enter 10-digit mobile"
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
                  </div>

                  {/* Row 2: Location and Number of Cattle */}
                  <div className="consultation-form-grid">
                    {/* Field 3: Location */}
                    <div className="consultation-form-group">
                      <label htmlFor="consultation-location" className="consultation-label">
                        <span>Your Location <span className="consultation-label-required">*</span></span>
                      </label>
                      <div className="consultation-input-wrapper">
                        <input
                          id="consultation-location"
                          type="text"
                          placeholder="City / District / State"
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
                          placeholder="Enter number of cattle"
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
                  </div>

                  {/* Field 5: Consultation Requirement */}
                  <div className="consultation-form-group">
                    <label htmlFor="consultation-requirement" className="consultation-label">
                      <span>How can we help you? <span className="consultation-label-required">*</span></span>
                    </label>
                    <div className="consultation-select-wrapper">
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
                      <ChevronDown size={16} className="consultation-select-icon" />
                    </div>
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
                        placeholder="Briefly describe your requirement"
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
                          style={{ display: "inline-block", width: 16, height: 16, border: "2px solid #FFFFFF", borderTopColor: "transparent", borderRadius: "50%" }}
                        />
                        Opening WhatsApp...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Get Free Consultation
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
