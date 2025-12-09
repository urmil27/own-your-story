import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedCollections from "@/components/FeaturedCollections";
import CustomDesignSection from "@/components/CustomDesignSection";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedCollections />
      <CustomDesignSection />
      <TrustSection />
      <Footer />
    </main>
  );
};

export default Index;
