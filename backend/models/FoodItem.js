// models/FoodItem.js
const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  imageUrl: String,
  price: Number,
  serves: Number,
  available: [String] // Array of days
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Sync image and imageUrl before saving
foodItemSchema.pre('save', function(next) {
  if (this.imageUrl && !this.image) {
    this.image = this.imageUrl;
  } else if (this.image && !this.imageUrl) {
    this.imageUrl = this.image;
  }
  next();
});

module.exports = mongoose.model('FoodItem', foodItemSchema);