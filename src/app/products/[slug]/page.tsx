import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS, Product } from "@/data/products";
import ProductDetail from "@/components/ProductDetail";

export async function generateStaticParams() {
  return Object.keys(PRODUCTS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | GAURiShakti Cattle Feed",
    };
  }

  return {
    title: `${product.name} - ${product.tagline} | GAURiShakti Cattle Feed`,
    description: product.description,
    openGraph: {
      title: `${product.name} | GAURiShakti Cattle Feed`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Retrieve related products
  const relatedProducts = (product.relatedIds || [])
    .map((id) => PRODUCTS[id])
    .filter((p): p is Product => Boolean(p));

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
