// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: {
    type: Array,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  deliveryTime: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);