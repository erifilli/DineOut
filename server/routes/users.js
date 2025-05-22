const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get current user profile
router.get('/profile', async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const users = await db.query('SELECT user_id, first_name, last_name, email FROM users WHERE user_id = ?', [userId]);
    
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        id: users[0].user_id,
        firstName: users[0].first_name,
        lastName: users[0].last_name,
        email: users[0].email,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Get user's reservations
router.get('/reservations', async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const reservations = await db.query(
      `SELECT r.reservation_id, r.date, r.time, r.people_count, 
              res.restaurant_id, res.name as restaurant_name, res.location
       FROM reservations r
       JOIN restaurants res ON r.restaurant_id = res.restaurant_id
       WHERE r.user_id = ?
       ORDER BY r.date DESC, r.time DESC`,
      [userId]
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

// Update user profile
router.put('/profile', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, email } = req.body;
    
    // Check if email already exists
    if (email) {
      const existingUser = await db.query('SELECT * FROM users WHERE email = ? AND user_id != ?', [email, userId]);
      
      if (existingUser.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use',
        });
      }
    }
    
    // Update user profile
    await db.query(
      'UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE user_id = ?',
      [firstName, lastName, email, userId]
    );
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 