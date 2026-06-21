# Gauri Shakti - Premium Cattle Feed Platform

![Gauri Shakti Logo](/public/mainlogo.svg) <!-- Assuming a logo path, replace if necessary -->


Gauri Shakti is a premium, high-performance agriculture and cattle feed platform built for the modern Indian dairy industry. Designed with an "Awwwards-winning" aesthetic, the platform blends scientific credibility with a high-end, SaaS-grade user interface, providing farmers, dealers, and distributors with a seamless digital experience.

## 🌟 Key Features

- **Premium Design Aesthetic:** Ultra-minimal, high-contrast UI utilizing a curated color palette (Forest Green, Wheat Gold, Light Cream) and sophisticated glassmorphism effects.
- **Dynamic Bento-Grid Layouts:** Highly responsive, asymmetrical product and contact pages powered by fluid CSS grid architectures.
- **Smooth Animations:** 60fps micro-interactions, scroll-triggered fade-ups, and pulsing map pins built with Framer Motion and custom CSS animations.
- **Performant Video Backgrounds:** Immersive hero sections with optimized, auto-playing background video loops.
- **Smooth Scrolling:** Integrated with Lenis for a buttery-smooth scrolling experience across all viewports.
- **Mobile-First Navigation:** A fully responsive, glassmorphism-backed mobile menu that adapts its styling intelligently based on the active page routing.
- **WhatsApp Sales Funnel:** Persistent floating WhatsApp integration for immediate dealer and customer inquiries.

## 🛠️ Technology Stack

- **Framework:** [Next.js 14+ (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** Custom Vanilla CSS (modular) + Global CSS variables (moving away from Tailwind dependencies for custom precision)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & CSS Keyframes
- **Icons:** [Lucide React](https://lucide.dev/)
- **Backend & Storage (Planned/Integrating):** Supabase (Auth/DB), Cloudinary (Media), Email APIs (Resend/Nodemailer)

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
```

Set up your environment variables by creating a `.env.local` file at the root of the project. You will need keys for Supabase, Cloudinary, and any email service providers.

Then, run the development server:

```bash
npm run dev
```

Open [https://gauri-shakti.vercel.app/](https://gauri-shakti.vercel.app/) with your browser to see the result.

## 📁 Project Structure

- `/src/app`: Contains the Next.js App Router pages (`/`, `/about`, `/contact`, `/products`, etc.).
- `/src/components`: Reusable UI components (`Navbar.tsx`, `Footer.tsx`, `Hero.tsx`, etc.).
- `/src/app/globals.css`: The source of truth for the brand's design system, typography, color tokens, and global utilities (`.btn-primary`, glassmorphism classes, animations).
- `/public`: Static assets, images, and videos used across the site.

## 📞 Contact & Support

**Gauri Shakti**  
Industrial Area Phase - II,  
Gonda, Uttar Pradesh - 271001, India  

- **Phone:** +91-97923 99946
- **Email:** info@gaurishakti.com
- **Website:** [www.gaurishakti.com](#) *(Placeholder)*
