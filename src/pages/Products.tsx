import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Filter, Grid3X3, LayoutGrid, Heart, ShoppingBag, SlidersHorizontal, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { products, categories, getProductsByCategory } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "jewelry";
  const subcategoryParam = searchParams.get("subcategory");
  const searchQuery = searchParams.get("q") || "";
  
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [sortBy, setSortBy] = useState("featured");
  const [gridCols, setGridCols] = useState(4);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const filteredProducts = useMemo(() => {
    let result = searchQuery 
      ? products.filter(p => 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : getProductsByCategory(categoryParam, subcategoryParam || undefined);

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = [...result].sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [categoryParam, subcategoryParam, searchQuery, priceRange, sortBy]);

  const categoryList = categoryParam === "diamonds" ? categories.diamonds : categories.jewelry;
  const pageTitle = searchQuery 
    ? `Search Results for "${searchQuery}"` 
    : subcategoryParam 
      ? categoryList.find(c => c.id === subcategoryParam)?.name || categoryParam
      : categoryParam === "diamonds" ? "Diamonds" : "Jewelry";

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Categories</h3>
        <div className="space-y-2">
          <Link
            to={`/products?category=${categoryParam}`}
            className={cn(
              "block py-2 px-3 rounded-lg transition-colors",
              !subcategoryParam ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
            )}
          >
            All {categoryParam === "diamonds" ? "Diamonds" : "Jewelry"}
          </Link>
          {categoryList.map(cat => (
            <Link
              key={cat.id}
              to={`/products?category=${categoryParam}&subcategory=${cat.id}`}
              className={cn(
                "block py-2 px-3 rounded-lg transition-colors",
                subcategoryParam === cat.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
              )}
            >
              {cat.name} ({cat.count})
            </Link>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={20000}
          step={100}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0].toLocaleString()}</span>
          <span>${priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Category Switch */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Browse</h3>
        <div className="flex gap-2">
          <Link
            to="/products?category=jewelry"
            className={cn(
              "flex-1 py-2 text-center rounded-lg border transition-colors",
              categoryParam === "jewelry" 
                ? "bg-primary text-primary-foreground border-primary" 
                : "border-border text-muted-foreground hover:border-primary"
            )}
          >
            Jewelry
          </Link>
          <Link
            to="/products?category=diamonds"
            className={cn(
              "flex-1 py-2 text-center rounded-lg border transition-colors",
              categoryParam === "diamonds" 
                ? "bg-primary text-primary-foreground border-primary" 
                : "border-border text-muted-foreground hover:border-primary"
            )}
          >
            Diamonds
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to={`/products?category=${categoryParam}`} className="hover:text-primary transition-colors capitalize">
              {categoryParam}
            </Link>
            {subcategoryParam && (
              <>
                <span>/</span>
                <span className="text-foreground">
                  {categoryList.find(c => c.id === subcategoryParam)?.name}
                </span>
              </>
            )}
          </div>

          <div className="flex gap-8">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <FilterContent />
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                    {pageTitle}
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {filteredProducts.length} products found
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden">
                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterContent />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Top Rated</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Grid Toggle */}
                  <div className="hidden md:flex items-center gap-1 border border-border rounded-lg p-1">
                    <button
                      onClick={() => setGridCols(3)}
                      className={cn(
                        "p-2 rounded transition-colors",
                        gridCols === 3 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setGridCols(4)}
                      className={cn(
                        "p-2 rounded transition-colors",
                        gridCols === 4 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className={cn(
                  "grid gap-6",
                  gridCols === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                )}>
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover-lift"
                    >
                      {/* Image */}
                      <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </Link>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
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
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={() => toggleWishlist({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          category: product.category
                        })}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background"
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

                      {/* Content */}
                      <div className="p-4">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-heading font-semibold text-foreground mb-1 line-clamp-1 hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span className="text-sm text-foreground">{product.rating}</span>
                          <span className="text-sm text-muted-foreground">({product.reviews})</span>
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
                          <button
                            onClick={() => addToCart({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image
                            })}
                            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
                          >
                            <ShoppingBag className="w-4 h-4 text-primary-foreground" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground mb-4">No products found</p>
                  <Link to="/products?category=jewelry">
                    <Button variant="gold">Browse All Products</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
