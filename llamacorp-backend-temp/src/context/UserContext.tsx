import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface UserContextType {
  token: string | null;
  user: any | null;
  login: (token: string, userData: any) => void;
  logout: () => void;
  updateUser: (userData: any) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Initialize token outside component safely for SSR
const isBrowser = typeof window !== 'undefined';
const initialToken = isBrowser ? localStorage.getItem('userToken') : null;

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(initialToken);
  const [user, setUser] = useState<any | null>(() => {
    if (isBrowser) {
      return JSON.parse(localStorage.getItem('userProfile') || 'null');
    }
    return null;
  });

  const login = (newToken: string, userData: any) => {
    if (isBrowser) {
      localStorage.setItem('userToken', newToken);
      localStorage.setItem('userProfile', JSON.stringify(userData));
    }
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    if (isBrowser) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userProfile');
    }
    setToken(null);
    setUser(null);
  };

  const updateUser = (userData: any) => {
    setUser((prev: any) => {
      const updatedUser = { ...prev, ...userData };
      if (isBrowser) {
        localStorage.setItem('userProfile', JSON.stringify(updatedUser));
      }
      return updatedUser;
    });
  };

  return (
    <UserContext.Provider value={{ token, user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
