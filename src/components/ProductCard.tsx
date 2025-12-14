import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { cn } from "@/lib/utils";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };

  return (
    <article
      className={cn(
        "group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover-lift cursor-pointer",
        className
      )}
    >
      {/* Clickable Card Link */}
      <Link 
        to={`/product/${product.id}`} 
        className="block"
        aria-label={`View ${product.name} details`}
      >
        {/* Image */}
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={`${product.name} - ${product.description.slice(0, 50)}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.originalPrice && (
            <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded">
              Sale
            </span>
          )}
          {product.tags?.includes("bestseller") && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
              Bestseller
            </span>
          )}
          {product.tags?.includes("new") && (
            <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded">
              New
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-heading font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-primary text-primary" aria-hidden="true" />
            <span className="text-sm text-foreground">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background z-20 cursor-pointer"
        aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={cn(
            "w-4 h-4 transition-colors",
            isInWishlist(product.id)
              ? "fill-accent text-accent"
              : "text-foreground hover:text-accent"
          )}
        />
      </button>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors z-20 cursor-pointer"
        aria-label={`Add ${product.name} to cart`}
      >
        <ShoppingBag className="w-4 h-4 text-primary-foreground" />
      </button>
    </article>
  );
};

export default ProductCard;
