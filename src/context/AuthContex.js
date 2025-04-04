import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Verificar si hay un usuario guardado al cargar la aplicación
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  
  // Función de login
  const login = (userData, token) => {
    // Guardar el token en localStorage
    localStorage.setItem('token', token);
    // Guardar los datos del usuario en localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);
  };
  
  // Función de logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };
  
  // Verificar si el token es válido
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };
  
  // Obtener el token
  const getToken = () => {
    return localStorage.getItem('token');
  };
  
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        isAuthenticated,
        getToken,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};