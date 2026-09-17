// models/FoodItem.js
const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  price: Number,
  serves: Number,
  available: [String] // Array of days
});

module.exports = mongoose.model('FoodItem', foodItemSchema);