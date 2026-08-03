import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AdminContextType {
  token: string | null;
  login: (token: string, user: any) => void;
  logout: () => void;
  isAdmin: boolean;
  user: any | null;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Initialize token outside component safely for SSR
const isBrowser = typeof window !== 'undefined';
const initialToken = isBrowser ? localStorage.getItem('adminToken') : null;

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(initialToken);
  const [user, setUser] = useState<any | null>(() => {
    if (isBrowser) {
      return JSON.parse(localStorage.getItem('adminUser') || 'null');
    }
    return null;
  });

  const login = (newToken: string, userData: any) => {
    if (isBrowser) {
      localStorage.setItem('adminToken', newToken);
      localStorage.setItem('adminUser', JSON.stringify(userData));
    }
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    if (isBrowser) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
    }
    setToken(null);
    setUser(null);
  };

  return (
    <AdminContext.Provider value={{ token, login, logout, isAdmin: !!token && user?.role === 'admin', user }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
