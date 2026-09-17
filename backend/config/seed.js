const FoodItem = require('../models/FoodItem');

const initialFoodItems = [
  {
    id: 1,
    name: "Chicken Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=60",
    price: 350,
    serves: 2,
    available: ['Monday', 'Wednesday', 'Friday', 'Sunday']
  },
  {
    id: 2,
    name: "Vegetable Pulao",
    image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=800&auto=format&fit=crop&q=60",
    price: 250,
    serves: 2,
    available: ['Tuesday', 'Thursday', 'Saturday', 'Friday']
  },
  {
    id: 3,
    name: "Butter Chicken",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=60",
    price: 400,
    serves: 3,
    available: ['Monday', 'Wednesday', 'Friday', 'Sunday', 'Saturday']
  },
  {
    id: 4,
    name: "Dal Makhani",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=60",
    price: 200,
    serves: 2,
    available: ['Tuesday', 'Thursday', 'Saturday', 'Friday']
  },
  {
    id: 5,
    name: "Paneer Tikka Masala",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&auto=format&fit=crop&q=60",
    price: 300,
    serves: 2,
    available: ['Monday', 'Wednesday', 'Friday', 'Sunday']
  },
  {
    id: 6,
    name: "Mutton Korma",
    image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=800&auto=format&fit=crop&q=60",
    price: 500,
    serves: 3,
    available: ['Tuesday', 'Thursday', 'Saturday', 'Friday']
  }
];

const seedData = async () => {
  try {
    const count = await FoodItem.countDocuments();
    if (count === 0) {
      await FoodItem.insertMany(initialFoodItems);
      console.log('Database seeded with initial food items.');
    }
  } catch (error) {
    console.error('Error seeding data:', error.message);
  }
};

module.exports = seedData;

