import axiosInstance from '../utils/axiosConfig';

// Servicio para gestión de exámenes
const examenesService = {
  // Obtener exámenes disponibles
  getExamenesDisponibles: async () => {
    try {
      const response = await axiosInstance.get('/examenes/disponibles');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Obtener exámenes inscritos
  getExamenesInscritos: async () => {
    try {
      const response = await axiosInstance.get('/examenes/inscritos');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Inscribirse a un examen
  inscribirseExamen: async (examenId, mesaId) => {
    try {
      const response = await axiosInstance.post('/examenes/inscribirse', { examenId, mesaId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Obtener mesas disponibles para un examen
  getMesasExamen: async (examenId) => {
    try {
      const response = await axiosInstance.get(`/examenes/${examenId}/mesas`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default examenesService;