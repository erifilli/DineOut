const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all restaurants
router.get('/', async (req, res, next) => {
  try {
    const { name, location } = req.query;
    let query = 'SELECT * FROM restaurants';
    let params = [];
    
    // Add search filters if provided
    if (name || location) {
      query += ' WHERE';
      
      if (name) {
        query += ' name LIKE ?';
        params.push(`%${name}%`);
      }
      
      if (name && location) {
        query += ' AND';
      }
      
      if (location) {
        query += ' location LIKE ?';
        params.push(`%${location}%`);
      }
    }
    
    const restaurants = await db.query(query, params);
    
    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });
  } catch (error) {
    next(error);
  }
});

// Get single restaurant
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurants = await db.query('SELECT * FROM restaurants WHERE restaurant_id = ?', [id]);
    
    if (restaurants.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: restaurants[0],
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 