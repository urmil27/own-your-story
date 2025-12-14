import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  CreditCard
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Successfully Subscribed!",
      description: "Welcome to the OWN-it inner circle. Check your email for exclusive offers.",
    });
    setEmail("");
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      // If not on home page, navigate to home first
      if (location.pathname !== "/") {
        navigate("/" + href);
        return;
      }
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const footerLinks = {
    shop: [
      { name: "All Collections", href: "#collections" },
      { name: "Diamond Rings", href: "#categories" },
      { name: "Necklaces", href: "#categories" },
      { name: "Bracelets", href: "#categories" },
      { name: "Earrings", href: "#categories" },
    ],
    services: [
      { name: "Custom Design", href: "#custom" },
      { name: "Diamond Education", href: "#about" },
      { name: "Ring Sizer", href: "#" },
      { name: "Gift Cards", href: "#" },
      { name: "Financing", href: "#" },
    ],
    company: [
      { name: "Our Story", href: "#about" },
      { name: "Craftsmanship", href: "#about" },
      { name: "Sustainability", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
    ],
    support: [
      { name: "Contact Us", href: "#" },
      { name: "FAQs", href: "#" },
      { name: "Shipping & Returns", href: "#" },
      { name: "Care Guide", href: "#" },
      { name: "Warranty", href: "#" },
    ],
  };

  return (
    <footer id="about" className="bg-secondary pt-20 pb-8">
      <div className="container mx-auto px-6">
        {/* Newsletter Section */}
        <div className="glass-dark rounded-2xl p-8 md:p-12 mb-16 luxury-border">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-cream mb-3">
                Join the Inner Circle
              </h3>
              <p className="text-cream/70">
                Subscribe for exclusive offers, new arrivals, and bespoke jewelry insights.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary/50 border-cream/20 text-cream placeholder:text-cream/40 focus:border-primary"
              />
              <Button type="submit" variant="gold" className="shrink-0">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-heading font-bold text-cream tracking-wider">
                OWN<span className="text-primary">-it</span>
              </span>
            </Link>
            <p className="text-cream/60 text-sm mb-6 max-w-xs">
              Crafting timeless jewelry that tells your unique story. 
              Every piece is a masterpiece of love and artistry.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center text-cream/60 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center text-cream/60 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center text-cream/60 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center text-cream/60 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-cream font-semibold mb-4 text-sm uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="text-cream/60 text-sm hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-cream font-semibold mb-4 text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="text-cream/60 text-sm hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-cream font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="text-cream/60 text-sm hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-cream font-semibold mb-4 text-sm uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="text-cream/60 text-sm hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 py-8 border-t border-b border-cream/10">
          <a 
            href="https://maps.google.com/?q=New+York,+NY" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-cream/60 hover:text-primary transition-colors duration-300"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-sm">New York, NY</span>
          </a>
          <a href="tel:+18001234567" className="flex items-center gap-2 text-cream/60 hover:text-primary transition-colors duration-300">
            <Phone className="w-4 h-4" />
            <span className="text-sm">1-800-123-4567</span>
          </a>
          <a href="mailto:hello@ownit.com" className="flex items-center gap-2 text-cream/60 hover:text-primary transition-colors duration-300">
            <Mail className="w-4 h-4" />
            <span className="text-sm">hello@ownit.com</span>
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/40 text-sm">
            © {currentYear} OWN-it Jewelry. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button className="text-cream/40 text-sm hover:text-cream transition-colors">
              Privacy Policy
            </button>
            <button className="text-cream/40 text-sm hover:text-cream transition-colors">
              Terms of Service
            </button>
          </div>
          <div className="flex items-center gap-2 text-cream/40">
            <CreditCard className="w-5 h-5" />
            <span className="text-xs">Secure Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
