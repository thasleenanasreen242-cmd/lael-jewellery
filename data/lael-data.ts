export const navigation = ["SHOP", "EDIT", "STORY", "JOURNAL", "CARE"];

const jewelryImages = [
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85",
];

export const discoverCards = [
  { id: "everyday", title: "EVERYDAY", description: "Jewellery designed for your everyday rituals.", image: jewelryImages[0] },
  { id: "timeless", title: "TIMELESS", description: "Styles that don't depend on fleeting trends.", image: jewelryImages[1] },
  { id: "anti-tarnish", title: "ANTI-TARNISH", description: "Designed with an anti-tarnish finish for lasting beauty.", image: jewelryImages[2] },
];

export const editProducts = [
  { category: "EARRINGS", name: "Rhea Drop", price: "$98", image: jewelryImages[0], accent: "gold" },
  { category: "NECKLACES", name: "Aster Chain", price: "$152", image: jewelryImages[2], accent: "cream" },
  { category: "RINGS", name: "Soleil Ring", price: "$118", image: jewelryImages[1], accent: "taupe" },
  { category: "BRACELETS", name: "Alina Cuff", price: "$136", image: jewelryImages[0], accent: "gold" },
  { category: "SETS", name: "Dune Set", price: "$224", image: jewelryImages[2], accent: "cream" },
];

export const lookCards = [
  { title: "THE MINIMALIST", image: jewelryImages[0], caption: "Quiet texture. Clean lines. Everyday shine." },
  { title: "THE STACK", image: jewelryImages[1], caption: "Layered pieces with easy movement and light." },
  { title: "THE STATEMENT", image: jewelryImages[2], caption: "A confident finish for evenings and milestones." },
];

export const masonryTiles = [
  { title: "THE EVERYDAY EDIT", image: jewelryImages[0], className: "md:col-span-1 md:row-span-2" },
  { title: "SOFT GOLDEN HOURS", image: jewelryImages[1], className: "md:col-span-2" },
  { title: "YOUR SIGNATURE PIECE", image: jewelryImages[2], className: "md:col-span-1" },
  { title: "LESS, BUT BETTER", image: jewelryImages[0], className: "md:col-span-2" },
];

export const lifestyleMoments = [
  { title: "Coffee", image: jewelryImages[0] },
  { title: "Getting ready", image: jewelryImages[1] },
  { title: "Working", image: jewelryImages[2] },
  { title: "Going out", image: jewelryImages[0] },
  { title: "Quiet evening", image: jewelryImages[1] },
  { title: "Dinner", image: jewelryImages[2] },
];

export const bestsellerProducts = [
  { name: "Mila Hoops", price: "$88", rating: 4.9, image: jewelryImages[0] },
  { name: "Aster Pendant", price: "$134", rating: 4.8, image: jewelryImages[2] },
  { name: "Etta Cuff", price: "$120", rating: 5.0, image: jewelryImages[1] },
  { name: "Iris Stack Ring", price: "$102", rating: 4.9, image: jewelryImages[0] },
  { name: "Luna Set", price: "$210", rating: 4.8, image: jewelryImages[2] },
];

export const journalArticles = [
  "How to build your everyday jewellery collection",
  "How to layer necklaces without overdoing it",
  "5 jewellery combinations for everyday outfits",
  "How to care for anti-tarnish jewellery",
  "Jewellery essentials every woman should own",
];

export const instagramImages = jewelryImages;

export const careSteps = [
  { title: "WEAR", text: "Style pieces in rotation so they move with your day and stay beautifully balanced." },
  { title: "STORE", text: "Keep each piece in a dry pouch or box to help preserve its finish and shine." },
  { title: "CARE", text: "Wipe gently after wear with a soft cloth and store away from moisture and fragrance." },
];

export const ritualMoments = ["WEAR IT.", "LIVE IN IT.", "LOVE IT.", "KEEP THE SHINE."];
