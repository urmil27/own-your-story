import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowLeft, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <SEO 
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Return to OWN-it to explore our luxury jewelry collections."
      />
      
      <div className="max-w-lg text-center">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2 mb-8">
          <Gem className="w-10 h-10 text-primary" />
          <span className="text-3xl font-heading font-bold text-foreground">
            OWN<span className="text-primary">-it</span>
          </span>
        </Link>

        {/* 404 Display */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-heading font-bold text-muted/30 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Search className="w-12 h-12 text-primary" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track to find your perfect piece.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="gold" size="lg" className="w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link to="/products?category=jewelry">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Search className="w-4 h-4 mr-2" />
              Browse Products
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Popular destinations:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/products?category=jewelry&subcategory=rings" 
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Rings
            </Link>
            <Link 
              to="/products?category=jewelry&subcategory=necklaces" 
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Necklaces
            </Link>
            <Link 
              to="/products?category=diamonds&subcategory=engagement-rings" 
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Engagement Rings
            </Link>
            <Link 
              to="/products?category=diamonds" 
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Diamonds
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
