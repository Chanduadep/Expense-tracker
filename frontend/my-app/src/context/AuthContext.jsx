import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('token') ? true : false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = (token) => {
    localStorage.setItem('token', token);
    setUser(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, setLoading, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);