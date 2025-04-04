// src/services/authService.js
import api from './api';
import { API_URL, USE_MOCK_DATA } from '../config';

export const authService = {
    async login(credentials) {
      if (USE_MOCK_DATA) {
        // Simular respuesta del backend
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay de red
        return { 
          token: 'mock-jwt-token', 
          user: { 
            id: 1, 
            name: 'Lisandro Recalde',
            dni: credentials.dni
          } 
        };
      }
      
      try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
      }
    },

//export const authService = {
  //async login(credentials) {
    //try {
      //const response = await api.post('/auth/login', credentials);
      //return response.data;
    //} catch (error) {
      //throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    //}
  //},

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al registrarse');
    }
  },

  async verifyToken(token) {
    try {
      const response = await api.get('/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }
};