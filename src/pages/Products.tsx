import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Grid3X3, LayoutGrid, SlidersHorizontal, Star, Heart, ShoppingBag } from "lucide-react";
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
import SEO from "@/components/SEO";
import EmptyState from "@/components/EmptyState";

const ITEMS_PER_PAGE = 12;

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "jewelry";
  const subcategoryParam = searchParams.get("subcategory");
  const searchQuery = searchParams.get("q") || "";
  
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [sortBy, setSortBy] = useState("featured");
  const [gridCols, setGridCols] = useState(4);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const filteredProducts = useMemo(() => {
    let result = searchQuery 
      ? products.filter(p => 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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
      case "popular":
        result = [...result].sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return result;
  }, [categoryParam, subcategoryParam, searchQuery, priceRange, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleItems);
  const hasMoreProducts = visibleItems < filteredProducts.length;

  const loadMore = () => {
    setVisibleItems(prev => Math.min(prev + ITEMS_PER_PAGE, filteredProducts.length));
  };

  const categoryList = categoryParam === "diamonds" ? categories.diamonds : categories.jewelry;
  const pageTitle = searchQuery 
    ? `Search Results for "${searchQuery}"` 
    : subcategoryParam 
      ? categoryList.find(c => c.id === subcategoryParam)?.name || categoryParam
      : categoryParam === "diamonds" ? "Diamonds" : "Jewelry";

  const pageDescription = searchQuery
    ? `Found ${filteredProducts.length} products matching "${searchQuery}"`
    : `Browse our ${pageTitle.toLowerCase()} collection. ${filteredProducts.length} products available.`;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Categories</h3>
        <div className="space-y-2">
          <Link
            to={`/products?category=${categoryParam}`}
            className={cn(
              "block py-2 px-3 rounded-lg transition-colors cursor-pointer",
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
                "block py-2 px-3 rounded-lg transition-colors cursor-pointer",
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
              "flex-1 py-2 text-center rounded-lg border transition-colors cursor-pointer",
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
              "flex-1 py-2 text-center rounded-lg border transition-colors cursor-pointer",
              categoryParam === "diamonds" 
                ? "bg-primary text-primary-foreground border-primary" 
                : "border-border text-muted-foreground hover:border-primary"
            )}
          >
            Diamonds
          </Link>
        </div>
      </div>

      {/* Quick Filters */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Quick Filters</h3>
        <div className="flex flex-wrap gap-2">
          {["bestseller", "new", "premium", "trending"].map(tag => (
            <Link
              key={tag}
              to={`/products?category=${categoryParam}&q=${tag}`}
              className="px-3 py-1 text-sm border border-border rounded-full hover:border-primary hover:text-primary transition-colors capitalize cursor-pointer"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={pageTitle}
        description={pageDescription}
      />
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary transition-colors cursor-pointer">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to={`/products?category=${categoryParam}`} className="hover:text-primary transition-colors capitalize cursor-pointer">
              {categoryParam}
            </Link>
            {subcategoryParam && (
              <>
                <span aria-hidden="true">/</span>
                <span className="text-foreground" aria-current="page">
                  {categoryList.find(c => c.id === subcategoryParam)?.name}
                </span>
              </>
            )}
          </nav>

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
                    {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden cursor-pointer">
                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-background">
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
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
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
                        "p-2 rounded transition-colors cursor-pointer",
                        gridCols === 3 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                      aria-label="3 column grid"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setGridCols(4)}
                      className={cn(
                        "p-2 rounded transition-colors cursor-pointer",
                        gridCols === 4 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                      aria-label="4 column grid"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {displayedProducts.length > 0 ? (
                <>
                  <div className={cn(
                    "grid gap-6",
                    gridCols === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  )}>
                    {displayedProducts.map((product) => (
                      <article
                        key={product.id}
                        className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover-lift"
                      >
                        {/* Image - Entire card clickable */}
                        <Link 
                          to={`/product/${product.id}`} 
                          className="block aspect-square overflow-hidden"
                          aria-label={`View ${product.name}`}
                        >
                          <img
                            src={product.image}
                            alt={`${product.name} - ${product.category}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                        </Link>

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

                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                              category: product.category
                            });
                          }}
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

                        {/* Content */}
                        <div className="p-4">
                          <Link to={`/product/${product.id}`}>
                            <h3 className="font-heading font-semibold text-foreground mb-1 line-clamp-1 hover:text-primary transition-colors cursor-pointer">
                              {product.name}
                            </h3>
                          </Link>
                          
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="w-4 h-4 fill-primary text-primary" aria-hidden="true" />
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
                              onClick={(e) => {
                                e.preventDefault();
                                addToCart({
                                  id: product.id,
                                  name: product.name,
                                  price: product.price,
                                  image: product.image
                                });
                              }}
                              className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors cursor-pointer"
                              aria-label={`Add ${product.name} to cart`}
                            >
                              <ShoppingBag className="w-4 h-4 text-primary-foreground" />
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Load More Button */}
                  {hasMoreProducts && (
                    <div className="text-center mt-12">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        onClick={loadMore}
                        className="cursor-pointer"
                      >
                        Load More Products
                        <span className="ml-2 text-muted-foreground">
                          ({filteredProducts.length - visibleItems} remaining)
                        </span>
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <EmptyState
                  type="products"
                  title="No products found"
                  description={searchQuery 
                    ? `No products match "${searchQuery}". Try adjusting your search or filters.`
                    : "No products match your current filters. Try adjusting the price range or category."
                  }
                />
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
