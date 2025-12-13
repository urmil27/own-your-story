import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingBag, Star, Truck, Shield, RotateCcw, Award, Minus, Plus, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getProductById, products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(Number(id));
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedMetal, setSelectedMetal] = useState("");
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Product not found</h1>
          <Link to="/products?category=jewelry">
            <Button variant="gold">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.subcategory === product.subcategory && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      variant: selectedSize ? `Size: ${selectedSize}` : undefined
    });
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      variant: selectedSize ? `Size: ${selectedSize}` : undefined
    });
    navigate("/checkout");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Product link has been copied to clipboard."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to={`/products?category=${product.category}`} className="hover:text-primary transition-colors capitalize">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          {/* Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted border-2 border-transparent hover:border-primary transition-colors cursor-pointer">
                    <img
                      src={product.image}
                      alt={`${product.name} view ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex items-center gap-2">
                {product.tags?.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full capitalize">
                    {tag}
                  </span>
                ))}
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-5 h-5",
                          i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-foreground font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-end gap-3">
                <span className="text-4xl font-heading font-bold text-foreground">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                    <span className="px-2 py-1 bg-accent text-accent-foreground text-sm font-medium rounded">
                      Save ${(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              {/* Options */}
              <div className="space-y-4 pt-4 border-t border-border">
                {/* Size Selector */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ring Size
                  </label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10].map(size => (
                        <SelectItem key={size} value={size.toString()}>
                          Size {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Metal Selector */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Metal Type
                  </label>
                  <div className="flex gap-3">
                    {["White Gold", "Yellow Gold", "Rose Gold", "Platinum"].map(metal => (
                      <button
                        key={metal}
                        onClick={() => setSelectedMetal(metal)}
                        className={cn(
                          "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                          selectedMetal === metal
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/50"
                        )}
                      >
                        {metal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:border-primary transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium text-foreground">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:border-primary transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button
                  variant="gold"
                  size="lg"
                  className="flex-1 h-14"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 h-14 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => toggleWishlist({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    category: product.category
                  })}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors",
                    isInWishlist(product.id) ? "text-accent" : "text-muted-foreground hover:text-accent"
                  )}
                >
                  <Heart className={cn("w-5 h-5", isInWishlist(product.id) && "fill-current")} />
                  {isInWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">On orders over $500</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Lifetime Warranty</p>
                    <p className="text-xs text-muted-foreground">Free repairs forever</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">30-Day Returns</p>
                    <p className="text-xs text-muted-foreground">Hassle-free returns</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Certified Authentic</p>
                    <p className="text-xs text-muted-foreground">GIA certified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="details" className="mb-16">
            <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0">
              <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                Details
              </TabsTrigger>
              <TabsTrigger value="specifications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="care" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                Care Guide
              </TabsTrigger>
              <TabsTrigger value="shipping" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                Shipping
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-6">
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>{product.description}</p>
                <p className="mt-4">
                  Each piece in our collection is meticulously crafted by our master jewelers, 
                  ensuring the highest quality and attention to detail. Our commitment to excellence 
                  means that every diamond is ethically sourced and every metal is of the purest quality.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="care" className="pt-6">
              <div className="space-y-4 text-muted-foreground">
                <p>To maintain the beauty of your jewelry:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Store in a soft pouch or jewelry box</li>
                  <li>Clean regularly with a soft cloth</li>
                  <li>Avoid contact with chemicals and perfumes</li>
                  <li>Remove before swimming or showering</li>
                  <li>Have professionally cleaned annually</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="pt-6">
              <div className="space-y-4 text-muted-foreground">
                <p>We offer free standard shipping on all orders over $500.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Standard Shipping: 5-7 business days</li>
                  <li>Express Shipping: 2-3 business days (+$25)</li>
                  <li>Overnight Shipping: Next business day (+$50)</li>
                </ul>
                <p className="mt-4">All orders are fully insured and require a signature upon delivery.</p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-8">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-lg font-bold text-primary mt-1">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
