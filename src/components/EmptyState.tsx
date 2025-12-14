import { Link } from "react-router-dom";
import { Search, ShoppingBag, Heart, PackageX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateType = "search" | "cart" | "wishlist" | "products" | "error";

interface EmptyStateProps {
  type: EmptyStateType;
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

const icons = {
  search: Search,
  cart: ShoppingBag,
  wishlist: Heart,
  products: PackageX,
  error: PackageX
};

const defaults = {
  search: {
    title: "No results found",
    description: "Try adjusting your search or filters to find what you're looking for.",
    actionLabel: "Browse All Products",
    actionHref: "/products?category=jewelry"
  },
  cart: {
    title: "Your cart is empty",
    description: "Add some beautiful pieces to get started.",
    actionLabel: "Start Shopping",
    actionHref: "/products?category=jewelry"
  },
  wishlist: {
    title: "Your wishlist is empty",
    description: "Save your favorite pieces for later.",
    actionLabel: "Explore Collections",
    actionHref: "/products?category=jewelry"
  },
  products: {
    title: "No products found",
    description: "We couldn't find any products matching your criteria.",
    actionLabel: "Browse All Products",
    actionHref: "/products?category=jewelry"
  },
  error: {
    title: "Something went wrong",
    description: "We encountered an error. Please try again.",
    actionLabel: "Go Home",
    actionHref: "/"
  }
};

const EmptyState = ({
  type,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className
}: EmptyStateProps) => {
  const Icon = icons[type];
  const defaultConfig = defaults[type];

  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6 text-center", className)}>
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
        {title || defaultConfig.title}
      </h3>
      <p className="text-muted-foreground max-w-md mb-6">
        {description || defaultConfig.description}
      </p>
      {onAction ? (
        <Button variant="gold" onClick={onAction}>
          {actionLabel || defaultConfig.actionLabel}
        </Button>
      ) : (
        <Link to={actionHref || defaultConfig.actionHref}>
          <Button variant="gold">
            {actionLabel || defaultConfig.actionLabel}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
