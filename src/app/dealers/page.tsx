"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { 
  Building2, 
  User, 
  MapPin, 
  FileText, 
  Upload, 
  CheckCircle2, 
  X, 
  AlertCircle, 
  ArrowLeft,
  Briefcase,
  Warehouse,
  Calendar,
  Phone,
  Mail
} from "lucide-react";

// ==========================================
// ⚙️ CONFIGURATION: VENDOR TEAM WHATSAPP NUMBER
// Format: CountryCode + PhoneNumber (no '+' or spaces)
// Default set to GAURiShakti Official WhatsApp
// ==========================================
const VENDOR_WHATSAPP_NUMBER = "919792399946"; // ← CONFIGURE THIS: Replace with your team's WhatsApp number (e.g., 919876543210)

interface FormData {
  firmName: string;
  companyContact: string;
  establishmentDate: string;
  natureOfFirm: string;
  annualTurnover: string;
  businessTypes: string[];
  officeAddress: string;
  city: string;
  state: string;
  contactPersonName: string;
  contactPersonNumber: string;
  email: string;
  infrastructure: string[];
  gstFile: string;
  panFile: string;
  aadhaarFile: string;
  bankFile: string;
}

export default function DealersPage() {
  const [formData, setFormData] = useState<FormData>({
    firmName: "",
    companyContact: "",
    establishmentDate: "",
    natureOfFirm: "",
    annualTurnover: "",
    businessTypes: [],
    officeAddress: "",
    city: "",
    state: "",
    contactPersonName: "",
    contactPersonNumber: "",
    email: "",
    infrastructure: [],
    gstFile: "",
    panFile: "",
    aadhaarFile: "",
    bankFile: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const businessTypeOptions = [
    "Manufacturing",
    "Distribution",
    "Wholesaling",
    "Retail",
  ];

  const infrastructureOptions = [
    "Storage Godown",
    "Distribution Vehicle",
    "Delivery Person",
  ];

  const natureOfFirmOptions = [
    "Proprietorship",
    "Partnership",
    "Private Limited",
    "Public Limited",
    "Limited Liability Partnership (LLP)",
    "Other",
  ];

  const turnoverOptions = [
    "Below ₹25 Lakhs",
    "₹25 Lakhs - ₹50 Lakhs",
    "₹50 Lakhs - ₹1 Crore",
    "₹1 Crore - ₹5 Crores",
    "Above ₹5 Crores",
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleCheckboxToggle = (
    field: "businessTypes" | "infrastructure",
    value: string
  ) => {
    setFormData((prev) => {
      const currentList = prev[field];
      const updatedList = currentList.includes(value)
        ? currentList.filter((item) => item !== value)
        : [...currentList, value];
      return { ...prev, [field]: updatedList };
    });
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleFileUpload = (
    e: ChangeEvent<HTMLInputElement>,
    field: "gstFile" | "panFile" | "aadhaarFile" | "bankFile"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file.name }));
    }
  };

  const removeFile = (
    field: "gstFile" | "panFile" | "aadhaarFile" | "bankFile"
  ) => {
    setFormData((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firmName.trim()) newErrors.firmName = "Firm Name is required";
    if (!formData.companyContact.trim()) {
      newErrors.companyContact = "Company Contact number is required";
    } else if (!/^[0-9+ -]{7,15}$/.test(formData.companyContact.trim())) {
      newErrors.companyContact = "Please enter a valid phone number";
    }

    if (!formData.establishmentDate) {
      newErrors.establishmentDate = "Establishment Date is required";
    }

    if (!formData.natureOfFirm) {
      newErrors.natureOfFirm = "Please select the Nature of Firm";
    }

    if (!formData.annualTurnover) {
      newErrors.annualTurnover = "Please select Annual Turnover";
    }

    if (formData.businessTypes.length === 0) {
      newErrors.businessTypes = "Please select at least one Type of Business";
    }

    if (!formData.officeAddress.trim()) {
      newErrors.officeAddress = "Office Address is required";
    }

    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State/Province is required";

    if (!formData.contactPersonName.trim()) {
      newErrors.contactPersonName = "Contact Person Name is required";
    }

    if (!formData.contactPersonNumber.trim()) {
      newErrors.contactPersonNumber = "Contact Person Number is required";
    } else if (!/^[0-9+ -]{7,15}$/.test(formData.contactPersonNumber.trim())) {
      newErrors.contactPersonNumber = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDocStatus = (filename: string) => {
    return filename ? `✅ (${filename})` : "❌";
  };

  const sendToWhatsApp = (e?: FormEvent) => {
    if (e) e.preventDefault();
    setHasAttemptedSubmit(true);

    const isValid = validateForm();
    if (!isValid) {
      const firstErrorField = document.querySelector(".input-error");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const businessTypeString =
      formData.businessTypes.length > 0
        ? formData.businessTypes.join(", ")
        : "None Specified";

    const infrastructureString =
      formData.infrastructure.length > 0
        ? formData.infrastructure.join(", ")
        : "None Specified";

    // Structured message template per exact requirements
    const whatsappMessage = `*Vendor Registration Form*

📋 *Company Details*
Firm Name: ${formData.firmName}
Company Contact: ${formData.companyContact}
Establishment Date: ${formData.establishmentDate}
Firm Type: ${formData.natureOfFirm}
Annual Turnover: ${formData.annualTurnover}

🏢 *Business Information*
Business Type: ${businessTypeString}
Office Address: ${formData.officeAddress}
City: ${formData.city}
State: ${formData.state}

👤 *Contact Person*
Name: ${formData.contactPersonName}
Phone: ${formData.contactPersonNumber}
Email: ${formData.email}

🏗️ *Infrastructure*
${infrastructureString}

📄 *Documents*
GST: ${formatDocStatus(formData.gstFile)}
PAN: ${formatDocStatus(formData.panFile)}
Aadhaar: ${formatDocStatus(formData.aadhaarFile)}
Bank Details: ${formatDocStatus(formData.bankFile)}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${VENDOR_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab/window
    window.open(whatsappUrl, "_blank");
  };

  return (
    <main className="dealers-page">
      <style dangerouslySetInnerHTML={{
        __html: `
        .dealers-page {
          background-color: var(--light-cream);
          min-height: 100vh;
          padding: 130px 5% 90px;
        }

        .dealer-page-header {
          max-width: 900px;
          margin: 0 auto 40px;
          text-align: center;
        }

        .back-breadcrumb {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          color: var(--dark-green);
          font-weight: 600;
          margin-bottom: 20px;
          text-decoration: none;
          transition: transform 0.2s ease;
        }
        .back-breadcrumb:hover {
          transform: translateX(-4px);
        }

        .dealer-page-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 900;
          color: var(--dark-green);
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .dealer-page-subtitle {
          font-size: 1.1rem;
          color: var(--gray);
          max-width: 680px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .registration-form-card {
          max-width: 900px;
          margin: 0 auto;
          background: var(--white);
          border-radius: 20px;
          padding: 45px;
          box-shadow: 0 15px 45px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.04);
        }

        .form-section {
          margin-bottom: 40px;
          padding-bottom: 30px;
          border-bottom: 1px solid #edf2f7;
        }
        .form-section:last-of-type {
          border-bottom: none;
          margin-bottom: 25px;
          padding-bottom: 0;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }
        .section-icon {
          color: var(--wheat-gold);
          background: rgba(212, 160, 23, 0.12);
          padding: 10px;
          border-radius: 12px;
        }
        .section-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--dark-green);
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 22px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-group.full-width {
          grid-column: span 2;
        }

        .form-label {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--dark-green);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .required-star {
          color: #ef4444;
        }

        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #fafafa;
          font-size: 1rem;
          color: #1a202c;
          transition: all 0.2s ease;
          outline: none;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: #2563eb;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }
        .form-input.input-error, .form-select.input-error, .form-textarea.input-error {
          border-color: #ef4444;
          background: #fff8f8;
        }

        .error-message {
          font-size: 0.85rem;
          color: #dc2626;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 3px;
        }

        .checkbox-group {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
          margin-top: 6px;
        }

        .checkbox-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          cursor: pointer;
          user-select: none;
          transition: all 0.2s ease;
          font-size: 0.95rem;
          font-weight: 600;
          color: #334155;
        }
        .checkbox-pill:hover {
          border-color: #cbd5e1;
          background: #f1f5f9;
        }
        .checkbox-pill.active {
          border-color: #2563eb;
          background: rgba(37, 99, 235, 0.08);
          color: #1d4ed8;
        }

        .doc-upload-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .doc-upload-card {
          border: 1.5px dashed #cbd5e1;
          border-radius: 12px;
          padding: 18px;
          background: #fafafa;
          transition: all 0.2s ease;
        }
        .doc-upload-card:hover {
          border-color: #94a3b8;
          background: #f8fafc;
        }
        .doc-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .doc-name {
          font-weight: 700;
          color: var(--dark-green);
          font-size: 0.95rem;
        }
        .doc-status-badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 20px;
        }
        .badge-uploaded {
          background: #dcfce7;
          color: #166534;
        }
        .badge-optional {
          background: #f1f5f9;
          color: #64748b;
        }

        .file-input-label {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 12px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .file-input-label:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        .attached-file-display {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 8px;
          color: #1e40af;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .attached-file-name {
          max-width: 220px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .file-remove-btn {
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
        }

        .summary-error-banner {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 25px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: #991b1b;
        }

        /* 📱 WHATSAPP BUTTON (BLUE BACKGROUND, WHITE TEXT) */
        .whatsapp-button {
          width: 100%;
          background: #2563eb;
          color: #ffffff;
          border: none;
          padding: 18px 28px;
          border-radius: 12px;
          font-size: 1.25rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.35);
          transition: all 0.25s ease;
          letter-spacing: 0.5px;
        }
        .whatsapp-button:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(37, 99, 235, 0.45);
        }
        .whatsapp-button:active {
          transform: translateY(0);
        }

        .button-helper-text {
          text-align: center;
          font-size: 0.88rem;
          color: #D4A017;
          margin-top: 14px;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .dealers-page {
            padding: 110px 4% 60px;
          }
          .registration-form-card {
            padding: 24px 18px;
          }
          .form-grid-2 {
            grid-template-columns: 1fr;
          }
          .form-group.full-width {
            grid-column: span 1;
          }
          .doc-upload-grid {
            grid-template-columns: 1fr;
          }
          .checkbox-group {
            grid-template-columns: 1fr;
          }
          .whatsapp-button {
            font-size: 1.05rem;
            padding: 16px 20px;
          }
        }
      `}} />

      {/* Page Header */}
      <div className="dealer-page-header">
        <Link href="/" className="back-breadcrumb">
          <ArrowLeft size={18} /> Back to Home
        </Link>
        <h1 className="dealer-page-title">Vendor & Dealer Registration</h1>
        <p className="dealer-page-subtitle">
          Join India&apos;s fastest-growing premium cattle feed network. Fill out the application form below to establish a dealership partnership with GAURISHAKTI.
        </p>
      </div>

      {/* Form Container */}
      <div className="registration-form-card">
        {hasAttemptedSubmit && Object.keys(errors).length > 0 && (
          <div className="summary-error-banner">
            <AlertCircle size={22} style={{ flexShrink: 0, marginTop: "2px" }} />
            <div>
              <strong style={{ display: "block", marginBottom: "4px" }}>
                Please review the required fields
              </strong>
              <span>
                Please fill in all required company, business, and contact details highlighted below before sending.
              </span>
            </div>
          </div>
        )}

        <form onSubmit={sendToWhatsApp}>
          {/* SECTION 1: Company Details */}
          <div className="form-section">
            <div className="section-header">
              <Building2 size={24} className="section-icon" />
              <h2 className="section-title">Company Details</h2>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="firmName">
                  Name of Firm <span className="required-star">*</span>
                </label>
                <input
                  id="firmName"
                  type="text"
                  name="firmName"
                  placeholder="e.g. Kisan Agro Agency"
                  value={formData.firmName}
                  onChange={handleInputChange}
                  className={`form-input ${errors.firmName ? "input-error" : ""}`}
                />
                {errors.firmName && (
                  <span className="error-message">
                    <AlertCircle size={14} /> {errors.firmName}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="companyContact">
                  Contact Number (Company) <span className="required-star">*</span>
                </label>
                <input
                  id="companyContact"
                  type="tel"
                  name="companyContact"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.companyContact}
                  onChange={handleInputChange}
                  className={`form-input ${errors.companyContact ? "input-error" : ""}`}
                />
                {errors.companyContact && (
                  <span className="error-message">
                    <AlertCircle size={14} /> {errors.companyContact}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="establishmentDate">
                  Establishment Date <span className="required-star">*</span>
                </label>
                <input
                  id="establishmentDate"
                  type="date"
                  name="establishmentDate"
                  value={formData.establishmentDate}
                  onChange={handleInputChange}
                  className={`form-input ${errors.establishmentDate ? "input-error" : ""}`}
                />
                {errors.establishmentDate && (
                  <span className="error-message">
                    <AlertCircle size={14} /> {errors.establishmentDate}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="natureOfFirm">
                  Nature of Firm <span className="required-star">*</span>
                </label>
                <select
                  id="natureOfFirm"
                  name="natureOfFirm"
                  value={formData.natureOfFirm}
                  onChange={handleInputChange}
                  className={`form-select ${errors.natureOfFirm ? "input-error" : ""}`}
                >
                  <option value="">Select Nature of Firm</option>
                  {natureOfFirmOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.natureOfFirm && (
                  <span className="error-message">
                    <AlertCircle size={14} /> {errors.natureOfFirm}
                  </span>
                )}
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="annualTurnover">
                  Annual Turnover <span className="required-star">*</span>
                </label>
                <select
                  id="annualTurnover"
                  name="annualTurnover"
                  value={formData.annualTurnover}
                  onChange={handleInputChange}
                  className={`form-select ${errors.annualTurnover ? "input-error" : ""}`}
                >
                  <option value="">Select Annual Turnover</option>
                  {turnoverOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.annualTurnover && (
                  <span className="error-message">
                    <AlertCircle size={14} /> {errors.annualTurnover}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 2: Business Information */}
          <div className="form-section">
            <div className="section-header">
              <Briefcase size={24} className="section-icon" />
              <h2 className="section-title">Business Information</h2>
            </div>

            <div className="form-group" style={{ marginBottom: "20px" }}>
              <label className="form-label">
                Type of Business <span className="required-star">*</span>
              </label>
              <div className="checkbox-group">
                {businessTypeOptions.map((type) => {
                  const isChecked = formData.businessTypes.includes(type);
                  return (
                    <div
                      key={type}
                      className={`checkbox-pill ${isChecked ? "active" : ""}`}
                      onClick={() => handleCheckboxToggle("businessTypes", type)}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        style={{ accentColor: "#2563eb", width: "18px", height: "18px" }}
                      />
                      <span>{type}</span>
                    </div>
                  );
                })}
              </div>
              {errors.businessTypes && (
                <span className="error-message">
                  <AlertCircle size={14} /> {errors.businessTypes}
                </span>
              )}
            </div>

            <div className="form-grid-2">
              <div className="form-group full-width">
                <label className="form-label" htmlFor="officeAddress">
                  Office Address <span className="required-star">*</span>
                </label>
                <textarea
                  id="officeAddress"
                  name="officeAddress"
                  rows={3}
                  placeholder="Complete street address, building, premises"
                  value={formData.officeAddress}
                  onChange={handleInputChange}
                  className={`form-textarea ${errors.officeAddress ? "input-error" : ""}`}
                />
                {errors.officeAddress && (
                  <span className="error-message">
                    <AlertCircle size={14} /> {errors.officeAddress}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="city">
                  City <span className="required-star">*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  placeholder="e.g. Gonda"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`form-input ${errors.city ? "input-error" : ""}`}
                />
                {errors.city && (
                  <span className="error-message">
                    <AlertCircle size={14} /> {errors.city}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="state">
                  State / Province <span className="required-star">*</span>
                </label>
                <input
                  id="state"
                  type="text"
                  name="state"
                  placeholder="e.g. Uttar Pradesh"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`form-input ${errors.state ? "input-error" : ""}`}
                />
                {errors.state && (
                  <span className="error-message">
                    <AlertCircle size={14} /> {errors.state}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 3: Contact Person */}
          <div className="form-section">
            <div className="section-header">
              <User size={24} className="section-icon" />
              <h2 className="section-title">Contact Person Details</h2>
            </div>

            <div className="form-grid-2">
              <div className="form-group full-width">
                <label className="form-label" htmlFor="contactPersonName">
                  Name of Contact Person <span className="required-star">*</span>
                </label>
                <input
                  id="contactPersonName"
                  type="text"
                  name="contactPersonName"
                  placeholder="e.g. Rajesh Sharma"
                  value={formData.contactPersonName}
                  onChange={handleInputChange}
                  className={`form-input ${errors.contactPersonName ? "input-error" : ""}`}
                />
                {errors.contactPersonName && (
                  <span className="error-message">
                    <AlertCircle size={14} /> {errors.contactPersonName}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contactPersonNumber">
                  Contact Person Phone Number <span className="required-star">*</span>
                </label>
                <input
                  id="contactPersonNumber"
                  type="tel"
                  name="contactPersonNumber"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.contactPersonNumber}
                  onChange={handleInputChange}
                  className={`form-input ${errors.contactPersonNumber ? "input-error" : ""}`}
                />
                {errors.contactPersonNumber && (
                  <span className="error-message">
                    <AlertCircle size={14} /> {errors.contactPersonNumber}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address <span className="required-star">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="e.g. dealer@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? "input-error" : ""}`}
                />
                {errors.email && (
                  <span className="error-message">
                    <AlertCircle size={14} /> {errors.email}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 4: Infrastructure Facilities */}
          <div className="form-section">
            <div className="section-header">
              <Warehouse size={24} className="section-icon" />
              <h2 className="section-title">Infrastructure Facilities</h2>
            </div>

            <div className="form-group">
              <label className="form-label">
                Select available infrastructure facilities:
              </label>
              <div className="checkbox-group">
                {infrastructureOptions.map((item) => {
                  const isChecked = formData.infrastructure.includes(item);
                  return (
                    <div
                      key={item}
                      className={`checkbox-pill ${isChecked ? "active" : ""}`}
                      onClick={() => handleCheckboxToggle("infrastructure", item)}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        style={{ accentColor: "#2563eb", width: "18px", height: "18px" }}
                      />
                      <span>{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION 5: Upload Documents */}
          

          {/* SUBMIT BUTTON - REPLACED WITH "📱 Send via WhatsApp" */}
          <div style={{ marginTop: "35px" }}>
            <button
              type="button"
              onClick={() => sendToWhatsApp()}
              className="whatsapp-button"
              id="whatsapp-submit-button"
            >
             SUBMIT
            </button>
            
          </div>
        </form>
      </div>
    </main>
  );
}
