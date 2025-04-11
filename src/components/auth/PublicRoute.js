// src/components/auth/PublicRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return !user ? children : <Navigate to="/dashboard" />;
};