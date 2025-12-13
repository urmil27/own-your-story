import ringsImage from "@/assets/collection-rings.jpg";
import necklacesImage from "@/assets/collection-necklaces.jpg";
import braceletsImage from "@/assets/collection-bracelets.jpg";
import earringsImage from "@/assets/collection-earrings.jpg";
import chainsImage from "@/assets/jewelry-chains.jpg";
import banglesImage from "@/assets/jewelry-bangles.jpg";
import watchesImage from "@/assets/jewelry-watches.jpg";
import looseDiamondImage from "@/assets/diamond-loose.jpg";
import engagementImage from "@/assets/diamond-engagement.jpg";
import tennisImage from "@/assets/diamond-tennis.jpg";
import studsImage from "@/assets/diamond-studs.jpg";
import pendantImage from "@/assets/diamond-pendant.jpg";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  subcategory: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  specifications?: {
    metal?: string;
    weight?: string;
    stone?: string;
    purity?: string;
    carat?: string;
  };
  tags?: string[];
}

export const products: Product[] = [
  // Rings
  {
    id: 1,
    name: "Eternal Love Diamond Ring",
    description: "A stunning solitaire diamond ring featuring a brilliant-cut center stone set in 18K white gold. Perfect for engagements or special occasions.",
    price: 4500,
    originalPrice: 5200,
    image: ringsImage,
    category: "jewelry",
    subcategory: "rings",
    rating: 4.9,
    reviews: 124,
    inStock: true,
    specifications: {
      metal: "18K White Gold",
      weight: "3.5g",
      stone: "Diamond",
      purity: "750",
      carat: "0.75ct"
    },
    tags: ["bestseller", "engagement"]
  },
  {
    id: 2,
    name: "Rose Gold Infinity Band",
    description: "Elegant rose gold band with infinity symbol design, adorned with micro-pavé diamonds.",
    price: 2800,
    image: ringsImage,
    category: "jewelry",
    subcategory: "rings",
    rating: 4.7,
    reviews: 89,
    inStock: true,
    specifications: {
      metal: "18K Rose Gold",
      weight: "2.8g",
      stone: "Diamonds",
      purity: "750",
      carat: "0.35ct"
    },
    tags: ["trending"]
  },
  {
    id: 3,
    name: "Vintage Sapphire Halo Ring",
    description: "Vintage-inspired ring featuring a blue sapphire surrounded by brilliant diamonds.",
    price: 5800,
    image: ringsImage,
    category: "jewelry",
    subcategory: "rings",
    rating: 4.8,
    reviews: 56,
    inStock: true,
    specifications: {
      metal: "Platinum",
      weight: "4.2g",
      stone: "Sapphire & Diamonds",
      carat: "1.2ct sapphire"
    },
    tags: ["premium"]
  },
  // Necklaces
  {
    id: 4,
    name: "Diamond Pendant Necklace",
    description: "Delicate pendant necklace featuring a pear-shaped diamond suspended on a fine gold chain.",
    price: 3200,
    originalPrice: 3800,
    image: necklacesImage,
    category: "jewelry",
    subcategory: "necklaces",
    rating: 4.8,
    reviews: 156,
    inStock: true,
    specifications: {
      metal: "18K Yellow Gold",
      weight: "5.2g",
      stone: "Diamond",
      carat: "0.5ct"
    },
    tags: ["bestseller"]
  },
  {
    id: 5,
    name: "Layered Pearl Chain",
    description: "Sophisticated layered necklace combining freshwater pearls with delicate gold chains.",
    price: 1850,
    image: necklacesImage,
    category: "jewelry",
    subcategory: "necklaces",
    rating: 4.6,
    reviews: 72,
    inStock: true,
    specifications: {
      metal: "14K Yellow Gold",
      weight: "8.5g",
      stone: "Freshwater Pearls"
    },
    tags: ["new"]
  },
  // Bracelets
  {
    id: 6,
    name: "Diamond Tennis Bracelet",
    description: "Classic tennis bracelet featuring a continuous line of brilliant-cut diamonds set in platinum.",
    price: 8500,
    image: braceletsImage,
    category: "jewelry",
    subcategory: "bracelets",
    rating: 4.9,
    reviews: 203,
    inStock: true,
    specifications: {
      metal: "Platinum",
      weight: "12g",
      stone: "Diamonds",
      carat: "3.5ct total"
    },
    tags: ["bestseller", "premium"]
  },
  {
    id: 7,
    name: "Gold Link Bracelet",
    description: "Bold gold link bracelet with a polished finish, perfect for everyday luxury.",
    price: 2400,
    image: braceletsImage,
    category: "jewelry",
    subcategory: "bracelets",
    rating: 4.5,
    reviews: 98,
    inStock: true,
    specifications: {
      metal: "18K Yellow Gold",
      weight: "15g",
      purity: "750"
    },
    tags: ["trending"]
  },
  // Earrings
  {
    id: 8,
    name: "Diamond Drop Earrings",
    description: "Elegant drop earrings featuring marquise-cut diamonds with brilliant sparkle.",
    price: 3600,
    originalPrice: 4200,
    image: earringsImage,
    category: "jewelry",
    subcategory: "earrings",
    rating: 4.8,
    reviews: 134,
    inStock: true,
    specifications: {
      metal: "18K White Gold",
      weight: "4.8g",
      stone: "Diamonds",
      carat: "1.2ct total"
    },
    tags: ["bestseller"]
  },
  {
    id: 9,
    name: "Pearl Stud Earrings",
    description: "Classic South Sea pearl studs set in white gold with secure backs.",
    price: 1250,
    image: earringsImage,
    category: "jewelry",
    subcategory: "earrings",
    rating: 4.7,
    reviews: 189,
    inStock: true,
    specifications: {
      metal: "14K White Gold",
      stone: "South Sea Pearls",
      weight: "3.2g"
    },
    tags: ["classic"]
  },
  // Chains
  {
    id: 10,
    name: "Cuban Link Chain",
    description: "Bold Cuban link chain crafted from solid gold with a high-polish finish.",
    price: 4800,
    image: chainsImage,
    category: "jewelry",
    subcategory: "chains",
    rating: 4.6,
    reviews: 87,
    inStock: true,
    specifications: {
      metal: "18K Yellow Gold",
      weight: "45g",
      purity: "750"
    },
    tags: ["trending"]
  },
  // Bangles
  {
    id: 11,
    name: "Diamond Bangle",
    description: "Sleek oval bangle encrusted with channel-set diamonds for everyday elegance.",
    price: 5200,
    image: banglesImage,
    category: "jewelry",
    subcategory: "bangles",
    rating: 4.8,
    reviews: 76,
    inStock: true,
    specifications: {
      metal: "18K White Gold",
      weight: "18g",
      stone: "Diamonds",
      carat: "1.8ct total"
    },
    tags: ["premium"]
  },
  // Watches
  {
    id: 12,
    name: "Diamond Bezel Watch",
    description: "Luxury timepiece featuring a diamond-set bezel and mother-of-pearl dial.",
    price: 12500,
    image: watchesImage,
    category: "jewelry",
    subcategory: "watches",
    rating: 4.9,
    reviews: 45,
    inStock: true,
    specifications: {
      metal: "18K Rose Gold",
      weight: "85g",
      stone: "Diamonds"
    },
    tags: ["premium", "luxury"]
  },
  // Diamonds
  {
    id: 13,
    name: "Round Brilliant Diamond",
    description: "GIA certified round brilliant cut diamond with exceptional clarity and fire.",
    price: 15000,
    image: looseDiamondImage,
    category: "diamonds",
    subcategory: "loose-diamonds",
    rating: 5.0,
    reviews: 28,
    inStock: true,
    specifications: {
      carat: "1.5ct",
      stone: "Diamond - D Color, VVS1"
    },
    tags: ["certified", "premium"]
  },
  {
    id: 14,
    name: "Cushion Cut Diamond",
    description: "Beautiful cushion cut diamond with excellent proportions and brilliance.",
    price: 12000,
    image: looseDiamondImage,
    category: "diamonds",
    subcategory: "loose-diamonds",
    rating: 4.9,
    reviews: 34,
    inStock: true,
    specifications: {
      carat: "1.2ct",
      stone: "Diamond - E Color, VS1"
    },
    tags: ["certified"]
  },
  {
    id: 15,
    name: "Classic Solitaire Engagement Ring",
    description: "Timeless solitaire engagement ring with a round brilliant center diamond.",
    price: 6500,
    originalPrice: 7500,
    image: engagementImage,
    category: "diamonds",
    subcategory: "engagement-rings",
    rating: 4.9,
    reviews: 312,
    inStock: true,
    specifications: {
      metal: "Platinum",
      carat: "1.0ct",
      stone: "Diamond - F Color, VS2"
    },
    tags: ["bestseller", "engagement"]
  },
  {
    id: 16,
    name: "Three Stone Engagement Ring",
    description: "Elegant three stone ring symbolizing past, present, and future.",
    price: 8200,
    image: engagementImage,
    category: "diamonds",
    subcategory: "engagement-rings",
    rating: 4.8,
    reviews: 178,
    inStock: true,
    specifications: {
      metal: "18K White Gold",
      carat: "1.5ct total",
      stone: "Diamonds - G Color, VS1"
    },
    tags: ["premium", "engagement"]
  },
  {
    id: 17,
    name: "Classic Tennis Bracelet",
    description: "Stunning diamond tennis bracelet with perfectly matched round brilliants.",
    price: 9500,
    image: tennisImage,
    category: "diamonds",
    subcategory: "tennis-bracelets",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    specifications: {
      metal: "Platinum",
      carat: "5.0ct total",
      stone: "Diamonds"
    },
    tags: ["bestseller", "premium"]
  },
  {
    id: 18,
    name: "Diamond Stud Earrings",
    description: "Classic diamond studs with secure screw-back settings.",
    price: 4200,
    originalPrice: 4800,
    image: studsImage,
    category: "diamonds",
    subcategory: "diamond-studs",
    rating: 4.8,
    reviews: 245,
    inStock: true,
    specifications: {
      metal: "14K White Gold",
      carat: "1.0ct total",
      stone: "Diamonds - G Color, SI1"
    },
    tags: ["bestseller"]
  },
  {
    id: 19,
    name: "Diamond Solitaire Pendant",
    description: "Elegant solitaire pendant featuring a brilliant-cut diamond on a fine chain.",
    price: 3800,
    image: pendantImage,
    category: "diamonds",
    subcategory: "pendants",
    rating: 4.7,
    reviews: 132,
    inStock: true,
    specifications: {
      metal: "18K White Gold",
      carat: "0.75ct",
      stone: "Diamond - H Color, VS2"
    },
    tags: ["classic"]
  },
  {
    id: 20,
    name: "Heart Diamond Pendant",
    description: "Romantic heart-shaped diamond pendant perfect for special occasions.",
    price: 4500,
    image: pendantImage,
    category: "diamonds",
    subcategory: "pendants",
    rating: 4.8,
    reviews: 98,
    inStock: true,
    specifications: {
      metal: "18K Rose Gold",
      carat: "0.85ct",
      stone: "Diamond - F Color, VS1"
    },
    tags: ["romantic", "gift"]
  }
];

export const categories = {
  jewelry: [
    { id: "rings", name: "Rings", count: 120 },
    { id: "necklaces", name: "Necklaces", count: 85 },
    { id: "bracelets", name: "Bracelets", count: 60 },
    { id: "earrings", name: "Earrings", count: 95 },
    { id: "chains", name: "Chains", count: 70 },
    { id: "bangles", name: "Bangles", count: 55 },
    { id: "watches", name: "Watches", count: 40 },
  ],
  diamonds: [
    { id: "loose-diamonds", name: "Loose Diamonds", count: 500 },
    { id: "engagement-rings", name: "Engagement Rings", count: 200 },
    { id: "tennis-bracelets", name: "Tennis Bracelets", count: 45 },
    { id: "diamond-studs", name: "Diamond Studs", count: 80 },
    { id: "pendants", name: "Pendants", count: 65 },
  ]
};

export const getProductsByCategory = (category: string, subcategory?: string) => {
  return products.filter(p => {
    if (subcategory) {
      return p.category === category && p.subcategory === subcategory;
    }
    return p.category === category;
  });
};

export const getProductById = (id: number) => {
  return products.find(p => p.id === id);
};

export const searchProducts = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.subcategory.toLowerCase().includes(lowerQuery) ||
    p.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};
