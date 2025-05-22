# DineOut

A full-stack restaurant reservation application with a React web frontend, React Native mobile app, Node.js/Express backend, and MariaDB database.

## Project Structure

```
dineout/
├── server/              # Backend Node.js/Express server
│   ├── config/          # Database configuration
│   ├── db/              # Database schema and scripts
│   ├── middleware/      # Authentication middleware
│   ├── routes/          # API routes
│   └── server.js        # Server entry point
├── web/                 # React web frontend
│   ├── src/             # Web source code
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # React contexts
│   │   └── pages/       # Page components
│   └── public/          # Public assets
└── mobile/              # React Native mobile app
    ├── src/             # Mobile source code
    │   ├── components/  # Reusable UI components
    │   ├── context/     # React contexts
    │   ├── navigation/  # Navigation structure
    │   ├── screens/     # Screen components
    │   ├── services/    # API services
    │   └── utils/       # Utilities and helpers
    └── App.tsx          # Mobile app entry point
```

## Features

- User authentication (registration, login)
- Browse restaurants with search functionality
- View restaurant details
- Make reservations with date/time selection
- View and manage personal reservations
- User profile management

## Technology Stack

- **Frontend**: React, TypeScript, Material-UI
- **Mobile**: React Native, Expo
- **Backend**: Node.js, Express
- **Database**: MariaDB
- **Authentication**: JWT, bcrypt

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MariaDB (v10 or higher)

## Getting Started

### 1. Set up the database

```bash
# Access your MariaDB console
mysql -u root -p

# Run the schema script
source server/db/schema.sql
```

### 2. Set up the backend server

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create .env file from example
cp env.example .env

# Edit the .env file with your database credentials

# Start the server
npm run dev
```

The server will run at http://localhost:5000

### 3. Start the web frontend

```bash
# From the project root
npm install
npm start
```

The web app will be available at http://localhost:3000

### 4. Set up the mobile app

```bash
# Navigate to the mobile directory
cd mobile

# Install dependencies
npm install

# Start the Expo development server
npm start
```

Follow the instructions to run the app on your emulator or physical device.

## API Documentation

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Restaurants

- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get a specific restaurant

### Reservations

- `GET /api/users/reservations` - Get current user's reservations
- `POST /api/reservations` - Create a new reservation
- `PUT /api/reservations/:id` - Update a reservation
- `DELETE /api/reservations/:id` - Cancel a reservation

### User

- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile

## License

MIT 