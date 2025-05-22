-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS dineout;
USE dineout;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

-- Restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
  restaurant_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name (name),
  INDEX idx_location (location)
);

-- Reservations table
CREATE TABLE IF NOT EXISTS reservations (
  reservation_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  people_count INT NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_restaurant_id (restaurant_id),
  INDEX idx_date (date)
);

-- Insert sample restaurants
INSERT INTO restaurants (name, location, description, image_url) VALUES
('Italian Delights', 'Kolonaki, Athens', 'Authentic Italian cuisine in a cozy setting', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1374&auto=format&fit=crop'),
('Sushi Paradise', 'Glyfada, Athens', 'Fresh and delicious Japanese dishes', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1470&auto=format&fit=crop'),
('Burger Haven', 'Monastiraki, Athens', 'Gourmet burgers and craft beers', 'https://images.unsplash.com/photo-1457460866886-40ef8d4b42a0?q=80&w=1470&auto=format&fit=crop'),
('Spice Garden', 'Psiri, Athens', 'Flavorful Indian cuisine', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop'),
('Mediterranean Oasis', 'Vouliagmeni, Athens', 'Healthy Mediterranean dishes', 'https://images.unsplash.com/photo-1600891964092-304a2480248f?q=80&w=1470&auto=format&fit=crop'); 