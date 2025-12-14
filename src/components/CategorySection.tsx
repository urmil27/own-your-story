import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Gem, Sparkles, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { cn } from "@/lib/utils";

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
  { id: 101, name: "Rings", image: ringsImage, count: "120+ Designs", price: 1500 },
  { id: 102, name: "Necklaces", image: necklacesImage, count: "85+ Designs", price: 1800 },
  { id: 103, name: "Bracelets", image: braceletsImage, count: "60+ Designs", price: 1200 },
  { id: 104, name: "Earrings", image: earringsImage, count: "95+ Designs", price: 950 },
  { id: 105, name: "Chains", image: chainsImage, count: "70+ Designs", price: 800 },
  { id: 106, name: "Bangles", image: banglesImage, count: "55+ Designs", price: 1100 },
  { id: 107, name: "Watches", image: watchesImage, count: "40+ Designs", price: 3500 },
];

const diamondCategories = [
  { id: 201, name: "Loose Diamonds", image: looseDiamondImage, count: "500+ Stones", price: 5000 },
  { id: 202, name: "Engagement Rings", image: engagementImage, count: "200+ Designs", price: 4500 },
  { id: 203, name: "Tennis Bracelets", image: tennisImage, count: "45+ Designs", price: 8000 },
  { id: 204, name: "Diamond Studs", image: studsImage, count: "80+ Designs", price: 2500 },
  { id: 205, name: "Pendants", image: pendantImage, count: "65+ Designs", price: 3000 },
];

type TabType = "jewelry" | "diamonds";

const CategorySection = () => {
  const [activeTab, setActiveTab] = useState<TabType>("jewelry");
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

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
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-2xl aspect-square hover-lift animate-fade-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist({
                  id: category.id,
                  name: category.name,
                  price: category.price,
                  image: category.image,
                  category: activeTab === "jewelry" ? "Jewelry" : "Diamonds",
                })}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background z-10"
              >
                <Heart 
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isInWishlist(category.id) 
                      ? "fill-accent text-accent" 
                      : "text-foreground hover:text-accent"
                  )} 
                />
              </button>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart({
                  id: category.id,
                  name: category.name,
                  price: category.price,
                  image: category.image,
                })}
                className="absolute top-3 left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/90 z-10"
              >
                <ShoppingBag className="w-4 h-4 text-primary-foreground" />
              </button>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
                <h3 className="text-cream text-lg md:text-xl font-heading font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-cream/60 text-sm mb-1">
                  {category.count}
                </p>
                <p className="text-primary text-sm font-semibold mb-2">
                  From ${category.price.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Explore
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>

              {/* Border Effect */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/40 rounded-2xl transition-colors duration-500" />
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            to={`/products?category=${activeTab}`}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary/10 border border-primary/30 text-primary rounded-full font-medium hover:bg-primary hover:text-secondary transition-all duration-300 group"
          >
            View All {activeTab === "jewelry" ? "Jewelry" : "Diamonds"}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
