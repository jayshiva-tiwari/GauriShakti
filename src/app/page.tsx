import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Products from "@/components/Products";
import WhyChooseUs from "@/components/WhyChooseUs";
import MilkYieldCalculator from "@/components/MilkYieldCalculator";
import EnquiryCart from "@/components/EnquiryCart";
import Testimonials from "@/components/Testimonials";
import DealerSection from "@/components/DealerSection";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <Products />
      <WhyChooseUs />
      <MilkYieldCalculator />
      <EnquiryCart />
      <Testimonials />
      <DealerSection />
      <FinalCTA />
    </main>
  );
}
