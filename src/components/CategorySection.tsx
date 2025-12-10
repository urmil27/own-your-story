import { useState } from "react";
import { ArrowUpRight, Gem, Sparkles } from "lucide-react";

// Jewelry imports
import ringsImage from "@/assets/collection-rings.jpg";
import necklacesImage from "@/assets/collection-necklaces.jpg";
import braceletsImage from "@/assets/collection-bracelets.jpg";
import earringsImage from "@/assets/collection-earrings.jpg";
import chainsImage from "@/assets/jewelry-chains.jpg";
import banglesImage from "@/assets/jewelry-bangles.jpg";
import watchesImage from "@/assets/jewelry-watches.jpg";

// Diamond imports
import looseDiamondImage from "@/assets/diamond-loose.jpg";
import engagementImage from "@/assets/diamond-engagement.jpg";
import tennisImage from "@/assets/diamond-tennis.jpg";
import studsImage from "@/assets/diamond-studs.jpg";
import pendantImage from "@/assets/diamond-pendant.jpg";

const jewelryCategories = [
  { id: 1, name: "Rings", image: ringsImage, count: "120+ Designs" },
  { id: 2, name: "Necklaces", image: necklacesImage, count: "85+ Designs" },
  { id: 3, name: "Bracelets", image: braceletsImage, count: "60+ Designs" },
  { id: 4, name: "Earrings", image: earringsImage, count: "95+ Designs" },
  { id: 5, name: "Chains", image: chainsImage, count: "70+ Designs" },
  { id: 6, name: "Bangles", image: banglesImage, count: "55+ Designs" },
  { id: 7, name: "Watches", image: watchesImage, count: "40+ Designs" },
];

const diamondCategories = [
  { id: 1, name: "Loose Diamonds", image: looseDiamondImage, count: "500+ Stones" },
  { id: 2, name: "Engagement Rings", image: engagementImage, count: "200+ Designs" },
  { id: 3, name: "Tennis Bracelets", image: tennisImage, count: "45+ Designs" },
  { id: 4, name: "Diamond Studs", image: studsImage, count: "80+ Designs" },
  { id: 5, name: "Pendants", image: pendantImage, count: "65+ Designs" },
];

type TabType = "jewelry" | "diamonds";

const CategorySection = () => {
  const [activeTab, setActiveTab] = useState<TabType>("jewelry");

  const categories = activeTab === "jewelry" ? jewelryCategories : diamondCategories;

  return (
    <section id="categories" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-script text-xl mb-3">Browse By</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-cream mb-4">
            Shop Categories
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto mb-8">
            Explore our extensive collection of fine jewelry and certified diamonds, 
            each piece crafted to perfection.
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex items-center gap-2 p-1.5 bg-secondary-foreground/10 rounded-full">
            <button
              onClick={() => setActiveTab("jewelry")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === "jewelry"
                  ? "bg-primary text-secondary shadow-lg"
                  : "text-cream/70 hover:text-cream"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Jewelry
            </button>
            <button
              onClick={() => setActiveTab("diamonds")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === "diamonds"
                  ? "bg-primary text-secondary shadow-lg"
                  : "text-cream/70 hover:text-cream"
              }`}
            >
              <Gem className="w-4 h-4" />
              Diamonds
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <a
              key={category.id}
              href="#"
              className="group relative overflow-hidden rounded-2xl aspect-square hover-lift animate-fade-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
                <h3 className="text-cream text-lg md:text-xl font-heading font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-cream/60 text-sm mb-2">
                  {category.count}
                </p>
                <div className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Explore
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>

              {/* Border Effect */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/40 rounded-2xl transition-colors duration-500" />
            </a>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary/10 border border-primary/30 text-primary rounded-full font-medium hover:bg-primary hover:text-secondary transition-all duration-300 group"
          >
            View All {activeTab === "jewelry" ? "Jewelry" : "Diamonds"}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
