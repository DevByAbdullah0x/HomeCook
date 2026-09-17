const FoodItem = require('../models/FoodItem');

// Get today's menu
exports.getTodaysMenu = async (req, res) => {
  try {
    const day = req.query.day || new Date().toLocaleDateString('en-US', { weekday: 'long' });
    
    const foodItems = await FoodItem.find({ 
      available: day 
    });
    
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all food items
exports.getAllFoods = async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single food item
exports.getFoodItem = async (req, res) => {
  try {
    const foodItem = await FoodItem.findOne({ id: parseInt(req.params.id) });
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.json(foodItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new food item
exports.createFoodItem = async (req, res) => {
  try {
    console.log('Received food item data:', req.body);

    // Validate required fields
    const { name, image, price, serves, available } = req.body;
    if (!name || !image || !price || !serves || !available) {
      return res.status(400).json({ 
        message: 'Missing required fields. Please provide name, image, price, serves, and available days.' 
      });
    }

    // Validate data types
    if (typeof price !== 'number' || typeof serves !== 'number') {
      return res.status(400).json({ 
        message: 'Price and serves must be numbers.' 
      });
    }

    if (!Array.isArray(available)) {
      return res.status(400).json({ 
        message: 'Available days must be an array.' 
      });
    }

    const lastItem = await FoodItem.findOne().sort({ id: -1 });
    const newId = lastItem ? lastItem.id + 1 : 1;
    
    const foodItem = new FoodItem({
      ...req.body,
      id: newId
    });
    
    console.log('Creating new food item:', foodItem);
    const savedItem = await foodItem.save();
    console.log('Food item saved successfully:', savedItem);
    
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error creating food item:', error);
    res.status(400).json({ 
      message: error.message || 'Error creating food item' 
    });
  }
};

// Update food item
exports.updateFoodItem = async (req, res) => {
  try {
    const foodItem = await FoodItem.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true }
    );
    
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    
    res.json(foodItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete food item
exports.deleteFoodItem = async (req, res) => {
  try {
    const foodItem = await FoodItem.findOneAndDelete({ id: parseInt(req.params.id) });
    
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    
    res.json({ message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};