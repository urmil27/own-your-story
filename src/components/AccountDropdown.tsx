import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogIn, UserPlus, Package, Heart, Settings, LogOut, MapPin } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";

interface AccountDropdownProps {
  isAuthenticated?: boolean;
  userName?: string;
}

const AccountDropdown = ({ isAuthenticated = false, userName }: AccountDropdownProps) => {
  const { setIsWishlistOpen } = useWishlist();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-cream/90 hover:text-primary transition-colors duration-300 hidden md:block">
          <User className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-background border-border">
        {isAuthenticated ? (
          <>
            <DropdownMenuLabel className="font-heading">
              Welcome, {userName || "Guest"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Package className="w-4 h-4 mr-2" />
              My Orders
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => setIsWishlistOpen(true)}>
              <Heart className="w-4 h-4 mr-2" />
              Wishlist
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <MapPin className="w-4 h-4 mr-2" />
              Addresses
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel className="font-heading">Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/auth">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/auth">
                <UserPlus className="w-4 h-4 mr-2" />
                Create Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-muted-foreground">
              <Package className="w-4 h-4 mr-2" />
              Track Order (Guest)
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
