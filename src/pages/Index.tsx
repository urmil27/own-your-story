import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedCollections from "@/components/FeaturedCollections";
import CategorySection from "@/components/CategorySection";
import CustomDesignSection from "@/components/CustomDesignSection";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  const location = useLocation();

  // Handle hash navigation from other pages
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <main className="min-h-screen">
      <SEO 
        title="OWN-it | Luxury Custom Jewelry & Diamonds"
        description="Create your bespoke jewelry piece with OWN-it. Certified diamonds, lifetime warranty, and expert craftsmanship for rings, necklaces, and custom designs."
      />
      <Navbar />
      <HeroSection />
      <FeaturedCollections />
      <CategorySection />
      <CustomDesignSection />
      <TrustSection />
      <Footer />
    </main>
  );
};

export default Index;
