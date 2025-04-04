import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from './common/LoadingSpinner';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  
  // Mostrar un spinner mientras se verifica la autenticación
  if (loading) {
    return <LoadingSpinner />;
  }
  
  // Redireccionar al login si no está autenticado
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  
  // Renderizar los componentes hijos si está autenticado
  return <Outlet />;
};

export default ProtectedRoute;