"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import styles from "./ProductsPage.module.css";

const products = [
  {
    id: "dairy-feed",
    title: "Premium Dairy Feed",
    category: "Yield Optimizer",
    desc: "Scientifically balanced formula to maximize milk yield and ensure complete nutrition for high-producing dairy cattle.",
    img: "https://images.unsplash.com/photo-1594771804886-a933bb2d609b?auto=format&fit=crop&q=80&w=1400",
    specs: [
      { label: "Protein", value: "22%" },
      { label: "Energy", value: "High" },
    ],
    className: `${styles.bentoCard} ${styles.cardDairy}`,
    isLight: false,
  },
  {
    id: "calf-feed",
    title: "Nutri Calf Starter",
    category: "Early Development",
    desc: "Accelerated growth and immune support for healthy, robust calves.",
    img: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&q=80&w=2000",
    specs: [
      { label: "Protein", value: "24%" },
    ],
    className: `${styles.bentoCard} ${styles.cardCalf}`,
    isLight: false,
  },
  {
    id: "mineral-mixture",
    title: "Gold Mineral Mix",
    category: "Essential Nutrients",
    desc: "Complete trace mineral profile to prevent deficiencies.",
    img: "", // Light card doesn't need background img
    specs: [
      { label: "Calcium", value: "Max" },
    ],
    className: `${styles.bentoCard} ${styles.cardMineral} ${styles.lightCard}`,
    isLight: true,
  },
  {
    id: "supplements",
    title: "Pregnancy Special Nutrition",
    category: "Specialized Care",
    desc: "Targeted nutrition for the critical transition period.",
    img: "https://i.pinimg.com/1200x/28/be/bd/28bebdac7b674d1a057ca4b9551e9575.jpg",
    specs: [
      { label: "Vitamins", value: "A, D3, E" },
    ],
    className: `${styles.bentoCard} ${styles.cardSupplements}`,
    isLight: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8
    },
  },
};

export default function ProductsPage() {
  return (
    <main className={styles.pageContainer}>
      <div className={styles.heroSection}>
        <motion.h1
          className={styles.heroHeadline}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          Performance Nutrition.<br />Engineered For Yield.
        </motion.h1>
        <motion.p
          className={styles.heroSubline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
        >
          Discover our scientifically formulated catalog designed to optimize health, increase productivity, and maximize your farm's profitability.
        </motion.p>
      </div>

      <motion.div
        className={styles.bentoGrid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={itemVariants} className={product.className}>
            <Link href={`/products/${product.id}`} style={{ display: 'contents' }}>
              {!product.isLight && (
                <>
                  <div
                    className={styles.cardBg}
                    style={{ backgroundImage: `url(${product.img})` }}
                  />
                  <div className={styles.cardOverlay} />
                </>
              )}

              <div className={styles.cardContent}>
                <span className={styles.cardCategory}>{product.category}</span>
                <h2 className={styles.cardTitle}>{product.title}</h2>
                <p className={styles.cardDesc}>{product.desc}</p>

                <div className={styles.specsList}>
                  {product.specs.map((spec, i) => (
                    <div key={i} className={styles.specItem}>
                      <span>{spec.label}:</span> {spec.value}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.arrowIcon}>
                <ArrowUpRight size={24} strokeWidth={2.5} />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
