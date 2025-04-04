import axiosInstance from '../utils/axiosConfig';

// Servicio para datos del estudiante
const estudianteService = {
  // Obtener información del estudiante
  getInformacion: async () => {
    try {
      const response = await axiosInstance.get('/estudiante/info');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default estudianteService;