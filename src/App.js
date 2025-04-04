import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Registro from './components/auth/Registro';
import Dashboard from './components/dashboard/Dashboard';
import Materias from './components/dashboard/Materias';
import Examenes from './components/dashboard/Examenes';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        
        {/* Rutas protegidas */}
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/materias" element={
          <ProtectedRoute>
            <Materias />
          </ProtectedRoute>
        } />
        <Route path="/examenes" element={
          <ProtectedRoute>
            <Examenes />
          </ProtectedRoute>
        } />
        
        {/* Redirigir a login por defecto */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;