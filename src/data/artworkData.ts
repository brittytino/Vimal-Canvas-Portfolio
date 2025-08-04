export interface Artwork {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;
  deliveryTime: string;
}

export const artworkData: Artwork[] = [
  {
    id: "family-portrait-premium",
    title: "Family Portrait",
    category: "Family",
    price: 1500,
    image: "src/assets/family-portrait-1.jpg",
    description: "Beautiful family portrait capturing love and togetherness. Perfect for your living room.",
    deliveryTime: "7-10 days"
  },
  {
    id: "baby-portrait-classic",
    title: "Baby Portrait",
    category: "Baby",
    price: 800,
    image: "src/assets/baby-portrait-1.jpg",
    description: "Adorable baby portrait preserving those precious early moments forever.",
    deliveryTime: "5-7 days"
  },
  {
    id: "couple-portrait-romantic",
    title: "Couple Portrait",
    category: "Couple",
    price: 1000,
    image: "src/assets/couple-portrait-1.jpg",
    description: "Romantic couple portrait celebrating your love story in pencil art.",
    deliveryTime: "7-10 days"
  },
  {
    id: "single-portrait-professional",
    title: "Single Portrait",
    category: "Single",
    price: 500,
    image: "src/assets/single-portrait-1.jpg",
    description: "Professional single portrait perfect for gifting or personal collection.",
    deliveryTime: "5-7 days"
  },
  {
    id: "wall-painting-nature",
    title: "Wall Painting",
    category: "Wall Art",
    price: 800,
    image: "src/assets/wall-art-1.jpg",
    description: "Beautiful wall painting to transform your space with artistic nature themes.",
    deliveryTime: "10-15 days"
  },
  {
    id: "color-pencil-landscape",
    title: "Color Pencil Artwork",
    category: "Color Art",
    price: 700,
    image: "src/assets/wall-art-1.jpg",
    description: "Vibrant color pencil artwork bringing landscapes to life.",
    deliveryTime: "7-10 days"
  }
];

export const categories = [
  "All",
  "Family",
  "Baby", 
  "Couple",
  "Single",
  "Wall Art",
  "Color Art"
];

// Sample testimonials
export const testimonials = [
  {
    name: "Priya Kumar",
    review: "Vimal captured our family perfectly! The attention to detail is incredible.",
    rating: 5,
    location: "Chennai"
  },
  {
    name: "Rajesh Sharma",
    review: "Amazing wall painting for our home. Exceeded all expectations!",
    rating: 5,
    location: "Coimbatore"
  },
  {
    name: "Meera Patel",
    review: "Beautiful baby portrait. Vimal truly has a gift for capturing emotions.",
    rating: 5,
    location: "Madurai"
  }
];