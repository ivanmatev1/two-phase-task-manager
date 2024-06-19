import React, { useState, useEffect, createContext } from 'react';
import keycloak from './keycloak';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    keycloak
      .init({ onLoad: 'login-required' })
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
        setToken(keycloak.token);
      })
      .catch((error) => {
        console.error('Keycloak initialization error:', error);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
