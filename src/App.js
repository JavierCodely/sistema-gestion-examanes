// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { PublicRoute } from './components/auth/PublicRoute';
import Login from './components/Login';
import Registro from './components/Registro';
import Dashboard from './components/dashboard/Dashboard';
import ExamRegistration from './components/exam-registration/ExamRegistration';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/dashboard/exams" element={
            <PrivateRoute>
              <Dashboard initialTab="exams" />
            </PrivateRoute>
          } />
          <Route path="/exams/register/:subjectId" element={
            <PrivateRoute>
              <ExamRegistration />
            </PrivateRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/registro" element={
            <PublicRoute>
              <Registro />
            </PublicRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;