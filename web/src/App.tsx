import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Reservation from './pages/Reservation';
import UserProfile from './pages/UserProfile';
import UserReservations from './pages/UserReservations';
import EditReservation from './pages/EditReservation';
import RestaurantDetails from './pages/RestaurantDetails';
import { AuthProvider } from './context/AuthContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ProtectedRoute from './components/ProtectedRoute';
import ConditionalRedirect from './components/ConditionalRedirect';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#795548',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <Routes>
              <Route path="/" element={<ConditionalRedirect />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route 
                path="/home" 
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reservation/:restaurantId" 
                element={
                  <ProtectedRoute>
                    <Reservation />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reservations" 
                element={
                  <ProtectedRoute>
                    <UserReservations />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/edit-reservation/:id" 
                element={
                  <ProtectedRoute>
                    <EditReservation />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/restaurant/:id" 
                element={
                  <ProtectedRoute>
                    <RestaurantDetails />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </LocalizationProvider>
    </AuthProvider>
  );
}

export default App; 