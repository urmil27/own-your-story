import { ArrowUpRight, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { cn } from "@/lib/utils";
import ringsImage from "@/assets/collection-rings.jpg";
import necklacesImage from "@/assets/collection-necklaces.jpg";
import braceletsImage from "@/assets/collection-bracelets.jpg";
import earringsImage from "@/assets/collection-earrings.jpg";

const collections = [
  {
    id: 1,
    name: "Diamond Rings",
    description: "Timeless elegance for every moment",
    image: ringsImage,
    price: 2500,
    startingPrice: "$2,500",
    category: "Rings",
  },
  {
    id: 2,
    name: "Necklaces",
    description: "Graceful designs that captivate",
    image: necklacesImage,
    price: 1800,
    startingPrice: "$1,800",
    category: "Necklaces",
  },
  {
    id: 3,
    name: "Bracelets",
    description: "Delicate beauty for your wrist",
    image: braceletsImage,
    price: 1200,
    startingPrice: "$1,200",
    category: "Bracelets",
  },
  {
    id: 4,
    name: "Earrings",
    description: "Sparkle with every turn",
    image: earringsImage,
    price: 950,
    startingPrice: "$950",
    category: "Earrings",
  },
];

const FeaturedCollections = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <section id="collections" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-script text-xl mb-3">Curated Excellence</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Featured Collections
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handcrafted collections, each piece designed to become 
            a cherished part of your story.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className="group relative overflow-hidden rounded-2xl hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist({
                  id: collection.id,
                  name: collection.name,
                  price: collection.price,
                  image: collection.image,
                  category: collection.category,
                })}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background z-10"
              >
                <Heart 
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isInWishlist(collection.id) 
                      ? "fill-accent text-accent" 
                      : "text-foreground hover:text-accent"
                  )} 
                />
              </button>

              {/* Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="glass-dark rounded-xl p-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-primary text-sm font-medium mb-1">
                    From {collection.startingPrice}
                  </p>
                  <h3 className="text-cream text-xl font-heading font-semibold mb-1">
                    {collection.name}
                  </h3>
                  <p className="text-cream/70 text-sm mb-3">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <a href={`/products?category=jewelry&subcategory=${collection.category.toLowerCase()}`} className="flex items-center gap-2 text-primary text-sm font-medium hover:underline">
                      Explore Collection
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                    <button
                      onClick={() => addToCart({
                        id: collection.id,
                        name: collection.name,
                        price: collection.price,
                        image: collection.image,
                      })}
                      className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4 text-primary-foreground" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Always Visible Title */}
              <div className="absolute bottom-6 left-6 group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-cream text-xl font-heading font-semibold">
                  {collection.name}
                </h3>
                <p className="text-primary text-sm">
                  From {collection.startingPrice}
                </p>
              </div>

              {/* Decorative Border */}
              <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 rounded-2xl transition-colors duration-500" />
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <a
            href="#categories"
            className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors duration-300 group"
          >
            View All Collections
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
