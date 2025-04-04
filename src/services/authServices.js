import axiosInstance from '../utils/axiosConfig';

// Servicio para autenticación
const authService = {
  // Iniciar sesión
  login: async (dni, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', { dni, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Registrar un nuevo usuario
  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Verificar el token actual
  verifyToken: async () => {
    try {
      const response = await axiosInstance.get('/auth/verify');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default authService;