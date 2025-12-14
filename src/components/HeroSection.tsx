import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-jewelry.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (href: string) => {
    if (location.pathname !== "/") {
      navigate("/" + href);
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury diamond jewelry displayed on dark velvet background"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-secondary/30" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-subtle" aria-hidden="true" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-subtle delay-500" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-3xl">
          {/* Tagline */}
          <p className="text-primary font-script text-2xl md:text-3xl mb-4 opacity-0 animate-fade-up">
            Luxury Redefined
          </p>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-cream leading-tight mb-6 opacity-0 animate-fade-up delay-100">
            Your Story,
            <br />
            <span className="text-gradient-gold">Our Craft</span>
          </h1>

          {/* Subtitle */}
          <p className="text-cream/80 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl opacity-0 animate-fade-up delay-200">
            Every masterpiece begins with a vision. Create your bespoke jewelry 
            piece with certified diamonds and timeless craftsmanship.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up delay-300">
            <Button 
              variant="gold" 
              size="xl" 
              className="group cursor-pointer"
              onClick={() => scrollToSection("#custom")}
            >
              Design Your Piece
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link to="/products?category=jewelry">
              <Button 
                variant="hero-outline" 
                size="xl" 
                className="group w-full sm:w-auto cursor-pointer"
              >
                <Play className="w-4 h-4" />
                Explore Collections
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-8 mt-16 opacity-0 animate-fade-up delay-400">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full border border-primary/50 flex items-center justify-center">
                <span className="text-primary text-sm" aria-hidden="true">✦</span>
              </div>
              <span className="text-cream/70 text-sm">Certified Diamonds</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full border border-primary/50 flex items-center justify-center">
                <span className="text-primary text-sm" aria-hidden="true">∞</span>
              </div>
              <span className="text-cream/70 text-sm">Lifetime Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full border border-primary/50 flex items-center justify-center">
                <span className="text-primary text-sm" aria-hidden="true">♡</span>
              </div>
              <span className="text-cream/70 text-sm">Ethically Sourced</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={() => scrollToSection("#collections")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in delay-500 hover:opacity-80 transition-opacity cursor-pointer"
        aria-label="Scroll to collections"
      >
        <span className="text-cream/50 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" aria-hidden="true" />
      </button>
    </section>
  );
};

export default HeroSection;
