
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access_token');
    if (storedAccessToken) {
      setToken(storedAccessToken);
    }
  }, []);

  const login = (access_token) => {
    localStorage.setItem('access_token', access_token);
    setToken(access_token);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('userId')
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
