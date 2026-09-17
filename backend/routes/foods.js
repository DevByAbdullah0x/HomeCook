// routes/foods.js
const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.get('/', foodController.getTodaysMenu);
router.get('/all', foodController.getAllFoods);
router.get('/:id', foodController.getFoodItem);
router.post('/', foodController.createFoodItem);
router.put('/:id', foodController.updateFoodItem);
router.delete('/:id', foodController.deleteFoodItem);

module.exports = router;