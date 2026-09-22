export interface NutritionFact {
  nutrient: string;
  value: string;
}

export interface ProductBenefit {
  title: string;
  desc: string;
}

export interface ProductFeature {
  title: string;
  desc: string;
  icon: "FlaskConical" | "ShieldCheck" | "Award" | "CheckCircle2" | "Sparkles" | "Leaf" | "HeartPulse";
}

export interface ProductSpecs {
  packaging: string;
  shelfLife: string;
  storage: string;
  delivery: string;
}

export interface ProductFAQ {
  q: string;
  a: string;
}

export interface Product {
  id: string; // URL slug
  name: string;
  tagline: string;
  category: string;
  image: string;
  description: string;
  protein: number;
  proteinLabel: string;
  energy: "High" | "Medium" | "Max" | "Optimal";
  keyMineral: string;
  quickBadges: string[];
  whyChooseHeading: string;
  aboutParagraph: string;
  benefits: ProductBenefit[];
  nutritionFacts: NutritionFact[];
  features: ProductFeature[];
  specs: ProductSpecs;
  faq: ProductFAQ[];
  brochureUrl: string;
  relatedIds: string[];
}

export const PRODUCTS: Record<string, Product> = {
  "dairy-feed": {
    id: "dairy-feed",
    name: "Premium Dairy Feed",
    tagline: "Maximize Milk Yield & Butterfat Content",
    category: "Yield Optimizer",
    image: "/products/Gaurishakti-Premium.png",
    description: "Scientifically balanced formula to maximize milk yield and ensure complete nutrition for high-producing dairy cattle.",
    protein: 22,
    proteinLabel: "22% Crude Protein",
    energy: "High",
    keyMineral: "Calcium: Max (1.2%)",
    quickBadges: ["Protein: 22%", "Energy: High", "ISO Certified"],
    whyChooseHeading: "Why Choose Premium Dairy Feed?",
    aboutParagraph: "GAURiShakti Premium Dairy Feed is an advanced pellet concentrate engineered specifically for high-yielding crossbred cows and buffaloes. Formulated by veterinary nutritionists, it sustains peak lactation cycles without causing negative energy balance or body condition loss. Steam-conditioned pelleting ensures superior rumen microbial fermentation and optimal digestion of roughages.",
    benefits: [
      { title: "High Bypass Protein", desc: "Optimizes nitrogen efficiency for higher daily milk output" },
      { title: "Increased Fat & SNF", desc: "Naturally enhances milk butterfat percentage and total solids" },
      { title: "Metabolic Liver Protection", desc: "Fortified with choline and biotin to prevent fatty liver syndrome" },
      { title: "Veterinary Approved", desc: "Clinically tested and proven on thousands of commercial dairy farms" },
    ],
    nutritionFacts: [
      { nutrient: "Crude Protein (Min)", value: "22.0%" },
      { nutrient: "Crude Fat (Min)", value: "4.5%" },
      { nutrient: "Crude Fiber (Max)", value: "8.0%" },
      { nutrient: "Calcium (Min)", value: "1.20%" },
      { nutrient: "Phosphorus (Min)", value: "0.65%" },
      { nutrient: "Vitamin A", value: "12,500 IU/kg" },
      { nutrient: "Vitamin D3", value: "2,500 IU/kg" },
    ],
    features: [
      {
        title: "Scientifically Formulated",
        desc: "Optimal amino acid balance and rumen bypass energy for persistent peak lactation.",
        icon: "FlaskConical",
      },
      {
        title: "Tested & Certified",
        desc: "Strictly tested for aflatoxins and certified under ISO 9001 and GMP manufacturing protocols.",
        icon: "ShieldCheck",
      },
      {
        title: "Farmer Trusted",
        desc: "Over 1 Million+ bags supplied to leading progressive dairy producers across India.",
        icon: "Award",
      },
    ],
    specs: {
      packaging: "50kg Heavy-Duty Moisture-Proof Poly Woven Bags",
      shelfLife: "6 Months from Date of Packaging",
      storage: "Store in a clean, dry, well-ventilated space elevated on wooden pallets",
      delivery: "Nationwide Pan-India Dispatch within 24-48 Business Hours",
    },
    faq: [
      {
        q: "What is this product best for?",
        a: "It is specifically formulated for high-yielding lactating cows and buffaloes giving 10+ liters of milk daily to sustain peak yield and enhance fat and SNF percentages.",
      },
      {
        q: "How often should I use it?",
        a: "Feed 400g to 500g of GAURiShakti Premium Dairy Feed per liter of milk produced, plus 1.0kg to 1.5kg for maternal body maintenance, divided into morning and evening rations.",
      },
      {
        q: "What's the shelf life?",
        a: "The shelf life is 6 months from the date of manufacture when stored in cool, well-ventilated, dry conditions elevated off the floor.",
      },
      {
        q: "Can I mix with other feeds?",
        a: "Yes, you can blend it with green fodder, silage, dry straw, or conventional grains. Transition gradually over 5-7 days for optimal rumen adaptation.",
      },
      {
        q: "Where can I buy?",
        a: "You can purchase directly through our authorized dealer network nationwide or submit a bulk/dealership inquiry through this page for direct farm supply.",
      },
    ],
    brochureUrl: "/brochures/gaurishakti-product-catalog.pdf",
    relatedIds: ["super-yield", "calf-feed", "mineral-mixture"],
  },

  "calf-feed": {
    id: "calf-feed",
    name: "Nutri Calf Starter",
    tagline: "Accelerated Growth & Early Weaning",
    category: "Early Development",
    image: "/products/Gaurishakti-Calf-Starter.png",
    description: "Accelerated growth and immune support for healthy, robust calves with superior digestive development.",
    protein: 24,
    proteinLabel: "24% Digestible Protein",
    energy: "High",
    keyMineral: "Zinc & Copper: Active",
    quickBadges: ["Protein: 24%", "Energy: High", "GMP Certified"],
    whyChooseHeading: "Why Choose Nutri Calf Starter?",
    aboutParagraph: "GAURiShakti Nutri Calf Starter is engineered to accelerate early rumen papillae growth and ensure smooth weaning from 14 days of age. Packed with easily digestible milk proteins, prebiotics, and essential trace minerals, it drastically reduces calf mortality while establishing superior skeletal and muscle foundation for future high-yield lactation.",
    benefits: [
      { title: "Rapid Rumen Development", desc: "Stimulates early papillae growth for lifelong nutrient absorption efficiency" },
      { title: "Strong Immune Shield", desc: "Fortified with Vitamin E, zinc chelate, and prebiotics to prevent scours" },
      { title: "Early Weaning Advantage", desc: "Reduces milk feeding expenses while accelerating daily live weight gain" },
      { title: "Vet Recommended", desc: "Approved by pediatric livestock veterinarians for maximum survivability" },
    ],
    nutritionFacts: [
      { nutrient: "Crude Protein (Min)", value: "24.0%" },
      { nutrient: "Crude Fat (Min)", value: "5.0%" },
      { nutrient: "Crude Fiber (Max)", value: "6.5%" },
      { nutrient: "Calcium (Min)", value: "1.40%" },
      { nutrient: "Phosphorus (Min)", value: "0.80%" },
      { nutrient: "Vitamin A", value: "15,000 IU/kg" },
      { nutrient: "Vitamin D3", value: "3,000 IU/kg" },
    ],
    features: [
      {
        title: "Scientifically Formulated",
        desc: "Micro-pellet texture tailored for delicate calf mouths with high palatability and zero waste.",
        icon: "FlaskConical",
      },
      {
        title: "Tested & Certified",
        desc: "Manufactured in a dedicated pathogen-free facility adhering to strict GMP sanitary protocols.",
        icon: "ShieldCheck",
      },
      {
        title: "Farmer Trusted",
        desc: "Chosen by elite dairy breeding stations and calf rearing centers nationwide.",
        icon: "Award",
      },
    ],
    specs: {
      packaging: "25kg & 50kg Moisture-Resistant Bags",
      shelfLife: "6 Months from Date of Packaging",
      storage: "Keep in a cool, dry place away from vermin and direct moisture",
      delivery: "Nationwide Pan-India Dispatch within 24-48 Hours",
    },
    faq: [
      {
        q: "What is this product best for?",
        a: "It is formulated for calves from day 14 up to 3 months of age to promote rumen growth, increase body weight, and facilitate early weaning.",
      },
      {
        q: "How often should I use it?",
        a: "Start with a handful (50g to 100g) daily at 2 weeks of age, gradually increasing up to 1.0kg to 1.5kg per day by the time the calf is 12 weeks old.",
      },
      {
        q: "What's the shelf life?",
        a: "6 months from the date of manufacture when stored in clean, cool, and dry storage.",
      },
      {
        q: "Can I mix with other feeds?",
        a: "Calf starter should be fed fresh in clean troughs alongside clean drinking water. Supplement with small quantities of high-quality green lucerne/berseem after 4 weeks.",
      },
      {
        q: "Where can I buy?",
        a: "Available through all GAURiShakti authorized dealerships or by direct inquiry on this page.",
      },
    ],
    brochureUrl: "/brochures/gaurishakti-product-catalog.pdf",
    relatedIds: ["dairy-feed", "mineral-mixture", "super-yield"],
  },

  "mineral-mixture": {
    id: "mineral-mixture",
    name: "Gold Mineral Mix",
    tagline: "Complete Chelated Trace Mineral & Vitamin Profile",
    category: "Essential Nutrients",
    image: "/products/Gaurishakti-silver.png",
    description: "Complete trace mineral profile with organic chelates to prevent deficiencies and improve reproductive efficiency.",
    protein: 0,
    proteinLabel: "100% Mineral Fortified",
    energy: "Max",
    keyMineral: "Calcium & Phosphorus: Max",
    quickBadges: ["Minerals: Chelated", "Energy: Max", "ISO Certified"],
    whyChooseHeading: "Why Choose Gold Mineral Mix?",
    aboutParagraph: "GAURiShakti Gold Mineral Mix delivers a highly bioavailable blend of essential macro and micro minerals specifically formulated for Indian cattle diets. It eliminates silent heat, drastically reduces repeat breeding, prevents pica, and strengthens hooves and udder tissues against infectious conditions like mastitis.",
    benefits: [
      { title: "Higher Conception Rate", desc: "Shortens dry periods and resolves repeat breeding issues naturally" },
      { title: "Chelated Trace Minerals", desc: "3x higher absorption rate compared to standard inorganic mineral salts" },
      { title: "Udder & Hoof Toughness", desc: "Fortified with zinc and biotin to build resilient hoof keratin and teat health" },
      { title: "Zero Salt Filler", desc: "High purity formula free from excessive bulk salt and unnecessary fillers" },
    ],
    nutritionFacts: [
      { nutrient: "Calcium (Min)", value: "25.0%" },
      { nutrient: "Phosphorus (Min)", value: "12.5%" },
      { nutrient: "Magnesium (Min)", value: "6.0%" },
      { nutrient: "Zinc (Organic Chelated)", value: "9,600 mg/kg" },
      { nutrient: "Copper (Organic Chelated)", value: "1,200 mg/kg" },
      { nutrient: "Vitamin A", value: "700,000 IU/kg" },
      { nutrient: "Vitamin D3", value: "140,000 IU/kg" },
    ],
    features: [
      {
        title: "Scientifically Formulated",
        desc: "Precise calcium-to-phosphorus 2:1 ratio paired with organic glycinate chelated micronutrients.",
        icon: "FlaskConical",
      },
      {
        title: "Tested & Certified",
        desc: "Heavy-metal free, laboratory tested for lead and arsenic under ISO 9001 standards.",
        icon: "ShieldCheck",
      },
      {
        title: "Farmer Trusted",
        desc: "Over 500,000 successful dairy farmers trust Gold Mineral Mix for fertility management.",
        icon: "Award",
      },
    ],
    specs: {
      packaging: "1kg, 5kg, 10kg & 25kg Airtight Buckets & Packs",
      shelfLife: "12 Months from Date of Packaging",
      storage: "Store in a dry place sealed tightly to prevent atmospheric moisture uptake",
      delivery: "Nationwide Pan-India Dispatch within 24-48 Hours",
    },
    faq: [
      {
        q: "What is this product best for?",
        a: "It is essential for daily preventative maintenance in all cows and buffaloes to boost conception rates, maintain strong immunity, and prevent mineral deficiency disorders.",
      },
      {
        q: "How often should I use it?",
        a: "Feed 50g daily for milking cows/buffaloes, and 30g daily for non-milking heifers and calves, thoroughly mixed into the daily grain or concentrate feed.",
      },
      {
        q: "What's the shelf life?",
        a: "12 months when kept in its original sealed packaging in a cool, dry place.",
      },
      {
        q: "Can I mix with other feeds?",
        a: "Yes! Simply sprinkle and mix with daily cattle feed, mash, crushed grains, or wet feed mixture.",
      },
      {
        q: "Where can I buy?",
        a: "Order through our local dealers, agricultural retail partners, or by inquiring on this website.",
      },
    ],
    brochureUrl: "/brochures/gaurishakti-product-catalog.pdf",
    relatedIds: ["dairy-feed", "super-yield", "supplements"],
  },

  "supplements": {
    id: "supplements",
    name: "Pregnancy Special Nutrition",
    tagline: "Targeted Transition Care for Safe Calving",
    category: "Specialized Care",
    image: "/products/Gaurishakti-Transition-Plus.png",
    description: "Targeted transition nutrition for the critical 60-day dry and pre-calving period to prevent metabolic disorders and ensure safe delivery.",
    protein: 18,
    proteinLabel: "18% Targeted Protein",
    energy: "Optimal",
    keyMineral: "Anionic Salts: Balanced",
    quickBadges: ["Transition Care", "Zero Milk Fever", "Vet Approved"],
    whyChooseHeading: "Why Choose Pregnancy Special Nutrition?",
    aboutParagraph: "The transition period (3 weeks before calving to 3 weeks post-calving) defines the entire subsequent lactation. GAURiShakti Pregnancy Special Nutrition delivers controlled DCAD (Dietary Cation-Anion Difference), protected fats, and high-potency antioxidants to prevent hypocalcemia (milk fever), retained placenta (ROP), and ketosis while delivering vigorous, lively newborn calves.",
    benefits: [
      { title: "Prevents Milk Fever", desc: "Negative DCAD profile primes maternal calcium mobilization mechanisms" },
      { title: "Smooth Calving & Placenta Drop", desc: "Drastically lowers risk of dystocia and retained placenta" },
      { title: "Lively, Healthy Calves", desc: "Ensures optimal fetal birth weight and enriched colostrum quality" },
      { title: "Rapid Post-Calving Recovery", desc: "Minimizes post-calving energy dips and ketosis vulnerability" },
    ],
    nutritionFacts: [
      { nutrient: "Crude Protein (Min)", value: "18.0%" },
      { nutrient: "Crude Fat (Min)", value: "5.5%" },
      { nutrient: "Crude Fiber (Max)", value: "7.5%" },
      { nutrient: "Calcium (Min)", value: "0.85%" },
      { nutrient: "Phosphorus (Min)", value: "0.55%" },
      { nutrient: "Vitamin A", value: "20,000 IU/kg" },
      { nutrient: "Vitamin D3", value: "4,000 IU/kg" },
    ],
    features: [
      {
        title: "Scientifically Formulated",
        desc: "Advanced anionic salt technology carefully buffered for high palatability and liver protection.",
        icon: "FlaskConical",
      },
      {
        title: "Tested & Certified",
        desc: "Batch tested for mineral precision and verified by clinical veterinary dairy trials.",
        icon: "ShieldCheck",
      },
      {
        title: "Farmer Trusted",
        desc: "Recommended by leading progressive cattle farms across major Indian dairy belts.",
        icon: "Award",
      },
    ],
    specs: {
      packaging: "25kg & 50kg Multi-wall Moisture-Barrier Bags",
      shelfLife: "6 Months from Date of Packaging",
      storage: "Keep in a cool, shaded, dry location away from water and pest exposure",
      delivery: "Nationwide Pan-India Dispatch within 24-48 Hours",
    },
    faq: [
      {
        q: "What is this product best for?",
        a: "It is specifically formulated for pregnant cows and buffaloes during the final 30 to 45 days of gestation through the first 15 days after calving.",
      },
      {
        q: "How often should I use it?",
        a: "Feed 2kg to 3kg daily during the last month of pregnancy, accompanied by adequate dry roughage and clean water.",
      },
      {
        q: "What's the shelf life?",
        a: "6 months from the date of manufacture when stored in cool, dry conditions.",
      },
      {
        q: "Can I mix with other feeds?",
        a: "Do not feed high-calcium green legumes (like berseem) during the pre-calving anionic phase; pair with dry straw or wheat bhusa for optimal DCAD action.",
      },
      {
        q: "Where can I buy?",
        a: "Contact your local GAURiShakti authorized supplier or submit an inquiry right here for rapid delivery.",
      },
    ],
    brochureUrl: "/brochures/gaurishakti-product-catalog.pdf",
    relatedIds: ["dairy-feed", "mineral-mixture", "super-yield"],
  },

  "super-yield": {
    id: "super-yield",
    name: "Super Yield Cattle Feed",
    tagline: "Consistent Daily Energy & Digestion Booster",
    category: "Cattle Feed",
    image: "/products/Gaurishakti-Gold.png",
    description: "Balanced daily concentrate for commercial milking herds providing consistent energy, high palatability, and strong lactation persistence.",
    protein: 20,
    proteinLabel: "20% Balanced Protein",
    energy: "High",
    keyMineral: "Calcium: High (1.1%)",
    quickBadges: ["Protein: 20%", "Energy: High", "ISO Certified"],
    whyChooseHeading: "Why Choose Super Yield Cattle Feed?",
    aboutParagraph: "GAURiShakti Super Yield Cattle Feed provides an economical yet potent nutrition source for commercial dairy herds. Balanced for optimal starch breakdown, it fuels constant milk production without causing rumen acidosis, helping dairy farmers maximize daily milk profits.",
    benefits: [
      { title: "Stable Milk Production", desc: "Maintains high milk flow throughout the entire lactation cycle" },
      { title: "Active Rumen Buffering", desc: "Prevents subacute rumen acidosis (SARA) during high concentrate feeding" },
      { title: "Cost-Effective Feeding", desc: "Maximum milk return per rupee invested in animal nutrition" },
      { title: "High Palatability", desc: "Aromatically conditioned pellets that cattle consume eagerly with zero refusal" },
    ],
    nutritionFacts: [
      { nutrient: "Crude Protein (Min)", value: "20.0%" },
      { nutrient: "Crude Fat (Min)", value: "4.0%" },
      { nutrient: "Crude Fiber (Max)", value: "9.0%" },
      { nutrient: "Calcium (Min)", value: "1.10%" },
      { nutrient: "Phosphorus (Min)", value: "0.60%" },
      { nutrient: "Vitamin A", value: "10,000 IU/kg" },
      { nutrient: "Vitamin D3", value: "2,000 IU/kg" },
    ],
    features: [
      {
        title: "Scientifically Formulated",
        desc: "Engineered with balanced digestible fibers and steam-cooked cereals for maximum energy release.",
        icon: "FlaskConical",
      },
      {
        title: "Tested & Certified",
        desc: "Certified under ISO 9001 quality management with zero pesticide or fungal contamination.",
        icon: "ShieldCheck",
      },
      {
        title: "Farmer Trusted",
        desc: "The backbone of commercial milk production for over 150,000 satisfied dairy farmers.",
        icon: "Award",
      },
    ],
    specs: {
      packaging: "50kg Heavy-Duty Woven Bags",
      shelfLife: "6 Months from Date of Packaging",
      storage: "Store on elevated wooden pallets in a cool, well-ventilated dry warehouse",
      delivery: "Nationwide Pan-India Dispatch within 24-48 Hours",
    },
    faq: [
      {
        q: "What is this product best for?",
        a: "Ideal for daily herd feeding of cows and buffaloes yielding up to 15 liters of milk per day.",
      },
      {
        q: "How often should I use it?",
        a: "Feed 400g per liter of milk output plus 1.2kg maintenance allowance split across morning and evening.",
      },
      {
        q: "What's the shelf life?",
        a: "6 months from the date of packaging when stored dry and sealed.",
      },
      {
        q: "Can I mix with other feeds?",
        a: "Yes, works seamlessly with green fodder, silage, and straw rations.",
      },
      {
        q: "Where can I buy?",
        a: "Order through authorized dealers or request direct delivery through this website.",
      },
    ],
    brochureUrl: "/brochures/gaurishakti-product-catalog.pdf",
    relatedIds: ["dairy-feed", "mineral-mixture", "calf-feed"],
  },

  "pro-milk": {
    id: "pro-milk",
    name: "Pro Milk Special",
    tagline: "High-Performance Booster for Elite Milkers",
    category: "Dairy Feed",
    image: "/products/Gaurishakti-Transition-Plus.png",
    description: "Fortified with bypass fats, live yeast cultures, and organic trace minerals for crossbred cattle giving 20+ liters daily.",
    protein: 23,
    proteinLabel: "23% Premium Protein",
    energy: "High",
    keyMineral: "Calcium: Max (1.3%)",
    quickBadges: ["Protein: 23%", "Energy: High", "ISO Certified"],
    whyChooseHeading: "Why Choose Pro Milk Special?",
    aboutParagraph: "GAURiShakti Pro Milk Special is the flagship performance concentrate designed for high-yielding Holstein Friesian (HF), Jersey crosses, and Murrah buffaloes producing over 20 liters daily. Packed with protected bypass fats and live probiotics, it supports heavy lactation while sustaining strong fertility.",
    benefits: [
      { title: "Protected Bypass Fats", desc: "Delivers dense non-heating calories directly into the small intestine" },
      { title: "Live Yeast Culture", desc: "Stabilizes rumen pH and promotes fiber-digesting beneficial bacteria" },
      { title: "Peak Yield Extension", desc: "Flattens the lactation curve for prolonged high daily production" },
      { title: "Body Weight Retention", desc: "Prevents excessive postpartum thinning in high-producing cows" },
    ],
    nutritionFacts: [
      { nutrient: "Crude Protein (Min)", value: "23.0%" },
      { nutrient: "Crude Fat (Min)", value: "5.5%" },
      { nutrient: "Crude Fiber (Max)", value: "7.0%" },
      { nutrient: "Calcium (Min)", value: "1.30%" },
      { nutrient: "Phosphorus (Min)", value: "0.75%" },
      { nutrient: "Vitamin A", value: "16,000 IU/kg" },
      { nutrient: "Vitamin D3", value: "3,200 IU/kg" },
    ],
    features: [
      {
        title: "Scientifically Formulated",
        desc: "State-of-the-art extrusion technology that encapsulates sensitive vitamins and amino acids.",
        icon: "FlaskConical",
      },
      {
        title: "Tested & Certified",
        desc: "Rigorous NIR and wet-chemistry verification for exact protein and amino acid profiles.",
        icon: "ShieldCheck",
      },
      {
        title: "Farmer Trusted",
        desc: "Awarded as the #1 high-yield feed formula by progressive dairy associations.",
        icon: "Award",
      },
    ],
    specs: {
      packaging: "50kg Premium Laminated Bags",
      shelfLife: "6 Months from Date of Packaging",
      storage: "Dry, cool warehouse elevated on pallets away from direct walls",
      delivery: "Nationwide Pan-India Dispatch within 24-48 Hours",
    },
    faq: [
      {
        q: "What is this product best for?",
        a: "Specifically engineered for high-producing cattle yielding 18-35+ liters daily to prevent metabolic stress and maintain fat percentage.",
      },
      {
        q: "How often should I use it?",
        a: "Feed 450g per liter of milk output with 1.5kg body maintenance allowance, split into 2-3 feedings per day.",
      },
      {
        q: "What's the shelf life?",
        a: "6 months from the date of manufacture.",
      },
      {
        q: "Can I mix with other feeds?",
        a: "Yes, pair with top quality silage, green maize, and ad-libitum clean water.",
      },
      {
        q: "Where can I buy?",
        a: "Order through our distributor network or submit an inquiry here for direct farm dispatch.",
      },
    ],
    brochureUrl: "/brochures/gaurishakti-product-catalog.pdf",
    relatedIds: ["dairy-feed", "mineral-mixture", "super-yield"],
  },
};

export const PRODUCT_LIST = Object.values(PRODUCTS);

export function getProductBySlug(slug: string): Product | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();
  
  if (PRODUCTS[normalized]) {
    return PRODUCTS[normalized];
  }
  
  // Aliases
  if (normalized === "premium-dairy-feed") return PRODUCTS["dairy-feed"];
  if (normalized === "nutri-calf-starter" || normalized === "calf-starter") return PRODUCTS["calf-feed"];
  if (normalized === "gold-mineral-mixture" || normalized === "gold-mineral-mix" || normalized === "mineral") return PRODUCTS["mineral-mixture"];
  if (normalized === "pregnancy-special" || normalized === "transition-plus" || normalized === "special-nutrition") return PRODUCTS["supplements"];
  if (normalized === "cattle-feed" || normalized === "gold") return PRODUCTS["super-yield"];
  if (normalized === "pro-milk-special") return PRODUCTS["pro-milk"];
  
  return undefined;
}
