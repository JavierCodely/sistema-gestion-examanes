import axiosInstance from '../utils/axiosConfig';

// Servicio para gestión de materias
const materiasService = {
  // Obtener todas las materias del estudiante
  getMaterias: async () => {
    try {
      const response = await axiosInstance.get('/materias');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Obtener materias cursando actualmente
  getMateriasCursando: async () => {
    try {
      const response = await axiosInstance.get('/materias/cursando');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Obtener materias aprobadas
  getMateriasAprobadas: async () => {
    try {
      const response = await axiosInstance.get('/materias/aprobadas');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Obtener materias pendientes
  getMateriasPendientes: async () => {
    try {
      const response = await axiosInstance.get('/materias/pendientes');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default materiasService;