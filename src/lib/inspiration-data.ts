// Data source for all our inspiration blog posts

export interface InspirationPost {
  id: number;
  title: string;
  author: string;
  materials: string;
  imageUrl: string;
  story: string;
}

export const inspirationPosts: InspirationPost[] = [
  {
    id: 1,
    title: "My Journey: Turning Old Denim into a Stylish Tote Bag",
    author: "ArtisanAisha",
    materials: "Old Jeans",
    imageUrl: "/images/denimtotes.jpeg",
    story:
      "It all started with a pile of old jeans I couldn't bear to throw away. The fabric was still so strong and full of character! I decided to challenge myself to create something both beautiful and useful. After a few sketches, I settled on a sturdy tote bag design. The process was a joy – cutting the different shades of denim, piecing them together like a puzzle, and adding a strong strap from an old belt. It’s now my go-to bag for groceries and errands, and it always gets compliments. It's amazing to think this was once considered 'waste'!",
  },
  {
    id: 2,
    title: "Illuminating Ideas: Crafting Lamps from Used Bottles",
    author: "CreativeChris",
    materials: "Glass Bottles",
    imageUrl: "/images/bottles1.jpeg",
    story:
      "I've always been fascinated by how light plays with glass. Instead of sending my collection of interesting bottles to the recycling bin, I wanted to give them a second life. I learned basic wiring online, sourced some low-heat LED kits, and started experimenting. The most challenging part was cleanly drilling a hole for the cord, but with patience, I got the hang of it. Each bottle has a unique color and shape, casting a different, beautiful glow. They're now scattered around my home, creating a wonderful, warm ambiance.",
  },
  {
    id: 3,
    title: "The Art of Tech: Creating Sculptures from E-Waste",
    author: "TechieTom",
    materials: "Circuit Boards",
    imageUrl: "/images/ewaste.jpeg",
    story:
      "As a software engineer, I see so much old hardware get discarded. The intricate patterns on motherboards and circuit boards are like tiny, forgotten cities. I started collecting them and arranging them into mosaics and small sculptures. It’s a meditative process, finding the right shapes and colors to fit together. This particular piece is a tribute to the complexity of modern technology. It reminds me that even when something is 'obsolete,' the beauty of its design can live on.",
  },
  {
    id: 4,
    title: "From Pallet to Parlor: My First Coffee Table Build",
    author: "DIY-Danielle",
    materials: "Scrap Wood",
    imageUrl: "/images/wood.jpeg",
    story:
      "I wanted a rustic coffee table but didn't want to pay a fortune. I found a discarded shipping pallet behind a local store (I asked for permission first!). Taking it apart was tough work, but it yielded some surprisingly beautiful wood planks. I spent a weekend sanding them down, treating them, and assembling them into a simple, sturdy design. The imperfections and old markings are what give it character. It’s the centerpiece of my living room, and I’m so proud that I built it myself from something that was destined for the landfill.",
  },
];
