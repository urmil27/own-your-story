import { useState, useEffect } from "react";
import { Menu, X, Search, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import AccountDropdown from "@/components/AccountDropdown";
import SearchDialog from "@/components/SearchDialog";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Collections", href: "#collections" },
    { name: "Categories", href: "#categories" },
    { name: "Custom Design", href: "#custom" },
    { name: "About", href: "#about" },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-secondary/95 backdrop-blur-lg shadow-lg py-3"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group">
              <span className="text-2xl md:text-3xl font-heading font-bold text-cream tracking-wider">
                OWN<span className="text-primary">-it</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-cream/90 hover:text-primary font-medium text-sm tracking-wide transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-cream/90 hover:text-primary transition-colors duration-300 hidden md:block"
              >
                <Search className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsWishlistOpen(true)}
                className="text-cream/90 hover:text-primary transition-colors duration-300 hidden md:block relative"
              >
                <Heart className={cn("w-5 h-5", wishlistCount > 0 && "fill-accent text-accent")} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="text-cream/90 hover:text-primary transition-colors duration-300 relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <AccountDropdown />

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-cream/90 hover:text-primary transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          <div
            className={cn(
              "lg:hidden fixed inset-x-0 top-[72px] bg-secondary/98 backdrop-blur-xl transition-all duration-500 overflow-hidden",
              isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <ul className="flex flex-col py-6 px-6 gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-cream text-lg font-medium tracking-wide hover:text-primary transition-colors duration-300 block py-2 w-full text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
              <li className="flex gap-4 pt-4 border-t border-cream/10">
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsWishlistOpen(true);
                  }}
                  className="flex items-center gap-2 text-cream hover:text-primary transition-colors"
                >
                  <Heart className={cn("w-5 h-5", wishlistCount > 0 && "fill-accent text-accent")} />
                  Wishlist ({wishlistCount})
                </button>
              </li>
              <li className="pt-2">
                <Button variant="gold" className="w-full" onClick={() => handleNavClick("#custom")}>
                  Book Consultation
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
