import { ArrowUpRight } from "lucide-react";
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
    startingPrice: "$2,500",
  },
  {
    id: 2,
    name: "Necklaces",
    description: "Graceful designs that captivate",
    image: necklacesImage,
    startingPrice: "$1,800",
  },
  {
    id: 3,
    name: "Bracelets",
    description: "Delicate beauty for your wrist",
    image: braceletsImage,
    startingPrice: "$1,200",
  },
  {
    id: 4,
    name: "Earrings",
    description: "Sparkle with every turn",
    image: earringsImage,
    startingPrice: "$950",
  },
];

const FeaturedCollections = () => {
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
            <a
              key={collection.id}
              href="#"
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
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    Explore Collection
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
            </a>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <a
            href="#"
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
