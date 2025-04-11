// src/services/authService.js
import api from './api';
import { API_URL, USE_MOCK_DATA } from '../config';
import { mockStudentInfo } from './mockData'; //esto solamente el dato de prueba luego eliminar con el mockData
export const authService = {
  async login(credentials) {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simula delay de red

      // Verificación directa con el objeto (sin .find())
      if (credentials.dni !== mockStudentInfo.dni || 
          credentials.password !== mockStudentInfo.password) {
        throw new Error('DNI o contraseña incorrectos');
      }

      return { 
        token: 'mock-jwt-token',
        user: {
          id: 1,
          name: mockStudentInfo.name,
          dni: mockStudentInfo.dni,
          career: mockStudentInfo.career // Opcional: añade más datos si necesitas
        }
      };
    }

    // Código real para producción
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  },

// ... (resto de métodos permanecen igual)

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