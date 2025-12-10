import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp } from "lucide-react";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const popularSearches = [
  "Diamond Engagement Rings",
  "Gold Necklaces",
  "Tennis Bracelets",
  "Pearl Earrings",
  "Custom Design",
  "Wedding Bands",
];

const SearchDialog = ({ isOpen, onClose }: SearchDialogProps) => {
  const [query, setQuery] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl bg-background border-border">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Search OWN-it</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search for jewelry, diamonds, collections..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 bg-muted/30 border-border focus:border-primary"
              autoFocus
            />
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Popular Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => setQuery(search)}
                  className="px-4 py-2 bg-muted/50 hover:bg-primary/10 hover:text-primary rounded-full text-sm transition-colors duration-300"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {query && (
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-muted-foreground text-sm">
                Showing results for "{query}"
              </p>
              <div className="mt-4 text-center py-8">
                <p className="text-muted-foreground">
                  Search functionality will be available soon
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
