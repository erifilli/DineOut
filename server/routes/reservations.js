const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all reservations for a restaurant (admin only, would require additional middleware)
router.get('/restaurant/:restaurantId', async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const reservations = await db.query(
      'SELECT * FROM reservations WHERE restaurant_id = ?',
      [restaurantId]
    );
    
    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    next(error);
  }
});

// Create a new reservation
router.post('/', async (req, res, next) => {
  try {
    const { restaurantId, date, time, peopleCount } = req.body;
    const userId = req.user.id; // From JWT token
    
    // Check if restaurant exists
    const restaurants = await db.query(
      'SELECT * FROM restaurants WHERE restaurant_id = ?',
      [restaurantId]
    );
    
    if (restaurants.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }
    
    // Insert reservation
    const result = await db.query(
      'INSERT INTO reservations (user_id, restaurant_id, date, time, people_count) VALUES (?, ?, ?, ?, ?)',
      [userId, restaurantId, date, time, peopleCount]
    );
    
    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      reservationId: result.insertId,
    });
  } catch (error) {
    next(error);
  }
});

// Update a reservation
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { date, time, peopleCount } = req.body;
    const userId = req.user.id; // From JWT token
    
    // Check if reservation exists and belongs to the user
    const reservations = await db.query(
      'SELECT * FROM reservations WHERE reservation_id = ? AND user_id = ?',
      [id, userId]
    );
    
    if (reservations.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found or not authorized',
      });
    }
    
    // Update reservation
    await db.query(
      'UPDATE reservations SET date = ?, time = ?, people_count = ? WHERE reservation_id = ?',
      [date, time, peopleCount, id]
    );
    
    res.status(200).json({
      success: true,
      message: 'Reservation updated successfully',
    });
  } catch (error) {
    next(error);
  }
});

// Delete a reservation
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // From JWT token
    
    // Check if reservation exists and belongs to the user
    const reservations = await db.query(
      'SELECT * FROM reservations WHERE reservation_id = ? AND user_id = ?',
      [id, userId]
    );
    
    if (reservations.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found or not authorized',
      });
    }
    
    // Delete reservation
    await db.query('DELETE FROM reservations WHERE reservation_id = ?', [id]);
    
    res.status(200).json({
      success: true,
      message: 'Reservation deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 