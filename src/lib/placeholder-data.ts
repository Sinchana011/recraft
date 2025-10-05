// This is our single source of truth for item data.

export interface ItemData {
  id: number;
  title: string;
  creator: string;
  category: string;
  imageUrl: string;
  city: string;
  coords: [number, number];
}

export const items: ItemData[] = [
  // Original Items
  {
    id: 1,
    title: "Hand-painted Saree Scraps",
    creator: "by PriyaM",
    category: "Textiles",
    imageUrl: "/images/sareescrap.jpeg.webp",
    city: "Mumbai, Maharashtra",
    coords: [19.076, 72.8777],
  },
  {
    id: 2,
    title: "Old Clay Pots (Terracotta)",
    creator: "by RajanK",
    category: "Ceramics",
    imageUrl: "/images/claypots.jpeg",
    city: "Delhi, NCR",
    coords: [28.7041, 77.1025],
  },
  {
    id: 4,
    title: "Jute Sacks & Fabric Scraps",
    creator: "by CraftsOfCalcutta",
    category: "Textiles",
    imageUrl: "/images/jutesacks.jpeg",
    city: "Kolkata, West Bengal",
    coords: [22.5726, 88.3639],
  },
  {
    id: 5,
    title: "Vintage Glass Soda Bottles",
    creator: "by ChennaiCollects",
    category: "Glass",
    imageUrl: "/images/sodabottles.jpeg.webp",
    city: "Chennai, Tamil Nadu",
    coords: [13.0827, 80.2707],
  },

  // Bengaluru Items
  {
    id: 3,
    title: "E-Waste Components for Projects",
    creator: "by TechieAnu",
    category: "Electronics",
    imageUrl: "/images/ewaste.jpeg",
    city: "Bengaluru, Karnataka",
    coords: [12.9716, 77.5946],
  },
  {
    id: 6,
    title: "Scrap Wood from Furniture Shop",
    creator: "by WoodyBLR",
    category: "Wood",
    imageUrl: "/images/wood.jpeg",
    city: "Jayanagar, Bengaluru",
    coords: [12.9293, 77.5825],
  },
  {
    id: 7,
    title: "Used Circuit Boards & Wires",
    creator: "by ElectroHub",
    category: "Electronics",
    imageUrl: "/images/pcb.jpeg",
    city: "Koramangala, Bengaluru",
    coords: [12.9352, 77.6245],
  },
  {
    id: 8,
    title: "Off-cut Silk Fabric Pieces",
    creator: "by SilkWeavers",
    category: "Textiles",
    imageUrl: "/images/silk.jpeg",
    city: "Indiranagar, Bengaluru",
    coords: [12.9784, 77.6408],
  },
  {
    id: 9,
    title: "Empty Glass Jars (Set of 20)",
    creator: "by JarStore",
    category: "Glass",
    imageUrl: "/images/glassjar.jpeg",
    city: "Whitefield, Bengaluru",
    coords: [12.9698, 77.7499],
  },
  {
    id: 10,
    title: "Discarded Ceramic Tiles",
    creator: "by TileArt",
    category: "Ceramics",
    imageUrl: "/images/ceramictiles.jpeg",
    city: "HSR Layout, Bengaluru",
    coords: [12.9121, 77.6446],
  },
];
