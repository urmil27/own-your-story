import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, ArrowRight, Star, X } from "lucide-react";
import { searchProducts, Product } from "@/data/products";
import { useDebounce } from "@/hooks/useDebounce";
import LoadingSpinner from "@/components/LoadingSpinner";
import EmptyState from "@/components/EmptyState";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const popularSearches = [
  "Diamond Engagement Rings",
  "Gold Necklaces",
  "Tennis Bracelets",
  "Pearl Earrings",
  "Wedding Bands",
  "Platinum Rings",
];

const SearchDialog = ({ isOpen, onClose }: SearchDialogProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      setIsSearching(true);
      // Simulate a slight delay for better UX
      const timer = setTimeout(() => {
        const searchResults = searchProducts(debouncedQuery);
        setResults(searchResults.slice(0, 6));
        setIsSearching(false);
        setHasSearched(true);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setHasSearched(false);
    }
  }, [debouncedQuery]);

  // Reset state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setHasSearched(false);
    }
  }, [isOpen]);

  const handleSearch = useCallback((searchTerm: string) => {
    onClose();
    navigate(`/products?q=${encodeURIComponent(searchTerm)}`);
  }, [navigate, onClose]);

  const handleProductClick = useCallback((productId: number) => {
    onClose();
    navigate(`/product/${productId}`);
  }, [navigate, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.length >= 2) {
      handleSearch(query);
    }
    if (e.key === "Escape") {
      onClose();
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl bg-background border-border">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Search OWN-it</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search for jewelry, diamonds, collections..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-10 h-12 bg-muted/30 border-border focus:border-primary"
              autoFocus
              aria-label="Search products"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Loading State */}
          {isSearching && (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="md" />
            </div>
          )}

          {/* Results */}
          {!isSearching && results.length > 0 && (
            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-3">
                Found {results.length} results for "{debouncedQuery}"
              </p>
              <div className="space-y-2">
                {results.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors text-left cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground line-clamp-1">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-primary font-semibold">
                          ${product.price.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Star className="w-3 h-3 fill-primary text-primary" />
                          {product.rating}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
              <button
                onClick={() => handleSearch(debouncedQuery)}
                className="w-full mt-4 py-3 text-center text-primary font-medium hover:underline cursor-pointer"
              >
                View all results for "{debouncedQuery}"
              </button>
            </div>
          )}

          {/* No Results */}
          {!isSearching && hasSearched && results.length === 0 && (
            <div className="mt-6">
              <EmptyState
                type="search"
                title="No results found"
                description={`We couldn't find any products matching "${debouncedQuery}". Try a different search term.`}
                actionLabel="Browse All"
                onAction={() => {
                  onClose();
                  navigate("/products?category=jewelry");
                }}
              />
            </div>
          )}

          {/* Popular Searches - Only show when not searching */}
          {!isSearching && !hasSearched && (
            <div className="mt-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Popular Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => handleSearch(search)}
                    className="px-4 py-2 bg-muted/50 hover:bg-primary/10 hover:text-primary rounded-full text-sm transition-colors duration-300 cursor-pointer"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
