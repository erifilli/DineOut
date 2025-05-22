import React, { createContext, useState, useEffect, ReactNode } from 'react';

// User interface
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

// Auth context interface
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Create the auth context with default values
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const expirationTime = localStorage.getItem('expirationTime');
    
    if (storedUser && expirationTime) {
      // Check if the token is still valid
      const now = new Date().getTime();
      if (now < parseInt(expirationTime)) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } else {
        // Token has expired, clean up
        localStorage.removeItem('user');
        localStorage.removeItem('expirationTime');
      }
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user based on email
      const mockUser: User = {
        id: 1,
        firstName: email.split('@')[0],
        lastName: 'User',
        email: email
      };
      
      // Set expiration time (24 hours from now)
      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('expirationTime', expirationTime.toString());
      
      // Update state
      setUser(mockUser);
      setIsAuthenticated(true);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Register function
  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return success
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    // Remove from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('expirationTime');
    
    // Update state
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext); 