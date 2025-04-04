import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth-helper';

const ProtectedRoute = ({ children }) => {
  const auth = isAuthenticated();
  
  if (!auth) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/login" />;
  }
  
  // Renderizar el componente hijo si está autenticado
  return children;
};

export default ProtectedRoute;