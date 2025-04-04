// src/services/studentService.js
import api from './api';
import { mockExams, mockStudentInfo, mockSubjects } from './mockData';
import { USE_MOCK_DATA } from '../config'; // Importación añadida

export const studentService = {
  async getStudentInfo() {
    try {
      if (USE_MOCK_DATA) {
        return mockStudentInfo;
      }
      const response = await api.get('/students/info');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener información del estudiante');
    }
  },

  async getCurrentSubjects() {
    try {
      if (USE_MOCK_DATA) {
        return mockSubjects;
      }
      const response = await api.get('/students/subjects/current');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener materias en curso');
    }
  },

  async getAvailableExams() {
    try {
      if (USE_MOCK_DATA) {
        return mockExams;
      }
      const response = await api.get('/exams/available');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener exámenes disponibles');
    }
  },

  async registerForExam(examId) {
    try {
      if (USE_MOCK_DATA) {
        console.log(`Inscripción a examen ${examId} simulada`);
        return { success: true, examId };
      }
      const response = await api.post(`/exams/register/${examId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al inscribirse al examen');
    }
  },

  async getExamDetails(subjectId) {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const subject = mockExams.available.find(e => e.subjectId === subjectId);
        
        if (!subject) {
          throw new Error('Materia no encontrada');
        }

        return {
          subject: subject.subject,
          examDates: [
            { 
              id: 101, 
              type: "Mesa 1", 
              date: subject.date1, 
              time: subject.time, 
              classroom: subject.aula
            },
            { 
              id: 102, 
              type: "Mesa 2", 
              date: subject.date2, 
              time: subject.time, 
              classroom: subject.aula 
            }
          ]
        };
      }

      const response = await api.get(`/exams/details/${subjectId}`);
      return response.data;
      
    } catch (error) {
      throw new Error(error.response?.data?.message || 
                     error.message || 
                     'Error al obtener detalles del examen');
    }
  }
};