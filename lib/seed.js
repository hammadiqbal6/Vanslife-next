/**
 * Seed data for the self-contained VanLife demo.
 * Passwords are plain here and hashed on first store load.
 */
export const DEMO_PASSWORD = "password123";

export const seedUsers = [
  {
    id: 1,
    firstName: "Bob",
    lastName: "Host",
    email: "bob@example.com",
    password: DEMO_PASSWORD,
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Traveler",
    email: "jane@example.com",
    password: DEMO_PASSWORD,
  },
];

export const seedVans = [
  {
    id: 1,
    name: "Modest Explorer",
    price: 60,
    description:
      "The Modest Explorer is a van designed to get you out of the house and into nature. This beauty is equipped with solar panels, a composting toilet, a water tank and kitchenette. The idea is that you can pack up your home and escape for a weekend or even longer!",
    image: "/images/vans/modest-explorer.png",
    type: "simple",
    userId: 1,
  },
  {
    id: 2,
    name: "Beach Bum",
    price: 80,
    description:
      "Beach Bum is a van inspired by surfers and travelers. It was created to be a portable home away from home, but with some cool amenities in it like a comfy sleeping area, a small kitchenette, and a cozy space to hang out.",
    image: "/images/vans/beach-bum.png",
    type: "rugged",
    userId: 1,
  },
  {
    id: 3,
    name: "Reliable Red",
    price: 100,
    description:
      "Reliable Red is a van that was made for travelers. It has a cozy interior with two sofas, a dining area, a kitchenette, and a sleeping area. You can also put up solar panels on the roof for electricity.",
    image: "/images/vans/reliable-red.png",
    type: "luxury",
    userId: 1,
  },
  {
    id: 4,
    name: "Dreamfinder",
    price: 65,
    description:
      "Dreamfinder is the perfect van to travel in and experience. With a ceiling height of 2.1m, you can stand up in this van and there is plenty of room for a bed and a kitchenette. It also has a built-in solar panel for electricity.",
    image: "/images/vans/dreamfinder.png",
    type: "simple",
    userId: 2,
  },
  {
    id: 5,
    name: "The Cruiser",
    price: 120,
    description:
      "The Cruiser is a van for those who love to travel in comfort and luxury. With its many windows and spacious interior, you can soak up the outdoors while being cozy inside. It includes a kitchenette, sleeping area, and storage.",
    image: "/images/vans/the-cruiser.png",
    type: "luxury",
    userId: 2,
  },
  {
    id: 6,
    name: "Green Wonder",
    price: 70,
    description:
      "With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who love the outdoors and want to travel lighter. It features solar panels and a composting toilet.",
    image: "/images/vans/green-wonder.png",
    type: "rugged",
    userId: 2,
  },
];
