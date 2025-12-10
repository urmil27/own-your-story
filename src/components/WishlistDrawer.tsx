import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Heart, Trash2, ShoppingBag } from "lucide-react";

const WishlistDrawer = () => {
  const { wishlistItems, isWishlistOpen, setIsWishlistOpen, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item: typeof wishlistItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    removeFromWishlist(item.id);
  };

  return (
    <Sheet open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
      <SheetContent className="w-full sm:max-w-lg bg-background border-l border-border">
        <SheetHeader>
          <SheetTitle className="font-heading text-2xl flex items-center gap-2">
            <Heart className="w-6 h-6 text-accent fill-accent" />
            Your Wishlist
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-120px)] mt-6">
          {wishlistItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <Heart className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-lg">Your wishlist is empty</p>
              <p className="text-muted-foreground/70 text-sm mt-1">Save your favorite pieces for later</p>
              <Button variant="gold" className="mt-6" onClick={() => setIsWishlistOpen(false)}>
                Explore Collections
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-muted/30 rounded-xl border border-border/50"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-heading font-semibold text-foreground">{item.name}</h4>
                      {item.category && (
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      )}
                      <p className="text-primary font-semibold mt-1">
                        ${item.price.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          variant="gold"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleMoveToCart(item)}
                        >
                          <ShoppingBag className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 mt-4">
                <p className="text-sm text-muted-foreground text-center mb-4">
                  {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsWishlistOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default WishlistDrawer;
