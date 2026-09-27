/**
 * =========================================================================
 * ⚙️ GAURISHAKTI OFFICIAL WHATSAPP CONFIGURATION
 * =========================================================================
 * Single source of truth for the official customer consultation WhatsApp number.
 * 
 * Format: Country code without '+' followed by 10-digit number.
 * Default: "919792399946" (GAURiShakti Official Business Number)
 * 
 * To change the WhatsApp number:
 * 1. Either edit the default value below: "919792399946"
 * 2. Or set the NEXT_PUBLIC_GAURISHAKTI_WHATSAPP environment variable in .env.local
 * =========================================================================
 */
export const GAURISHAKTI_WHATSAPP_NUMBER = 
  process.env.NEXT_PUBLIC_GAURISHAKTI_WHATSAPP || "919792399946";
