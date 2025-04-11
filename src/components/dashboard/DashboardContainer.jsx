// DashboardContainer.jsx
import React, { useContext, useEffect, useState } from 'react';
// useNavigate y useLocation son hooks para navegación y ubicación actual en la app
import { useNavigate, useLocation } from 'react-router-dom';

// Importamos el contexto de autenticación, para saber si el usuario está logueado

import { AuthContext } from '../auth/AuthContext';

// Importamos funciones para obtener datos del estudiante desde la AP
import { studentService } from '../../services/studentService';
import { Container, Spinner, Alert, Row, Col } from 'react-bootstrap';
import DashboardNavbar from './DashboardNavbar';
import DashboardContent from './DashboardContent';

/**
 * Main container component for the student dashboard
 * Handles authentication, data fetching, and layout structure
 */
const DashboardContainer = () => {
 // Hook para saber desde qué ruta llegó el usuario
  const location = useLocation();
  const navigate = useNavigate();// Hook para redireccionar
  
 
  const { user } = useContext(AuthContext);// Obtenemos el usuario y logout desde el contexto
  
  // Component state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados locales que controlan qué pestaña está activa, si estamos cargando, y los datos del estudiante
  const [activeTab, setActiveTab] = useState('welcome');

  const [showOffcanvas, setShowOffcanvas] = useState(false);// Para mostrar/ocultar el menú en móviles
  
  // Importamos componentes que se mostrarán dentro del dashboard
  const [studentData, setStudentData] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [registeredExams, setRegisteredExams] = useState([]);
  const [availableExams, setAvailableExams] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);











  // Lógica de carga de datos y redirecciones
  useEffect(() => {
    // Si no hay usuario logueado, redirigimos al login
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Si venimos de la página de registro a examen, cambiamos a la pestaña de exámenes
    if (location.state?.fromRegistration) {
      setActiveTab('exams');

            // Limpiamos el estado de navegación para no volver a cambiar de pestaña automáticamente

      navigate('.', { state: null, replace: true });
    }









    // Función que obtiene todos los datos del estudiante desde el backend
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Pedimos todos los datos en paralelo (mejor performance)
        const [info, subjects, exams] = await Promise.all([
          studentService.getStudentInfo(),
          studentService.getCurrentSubjects(),
          studentService.getAvailableExams()
        ]);
        
         // Guardamos los datos obtenidos
        setStudentData(info);
        setSubjects(subjects);
        setAvailableExams(exams.available);
        setRegisteredExams(exams.registered);
        setUpcomingExams(exams.upcoming);
      } catch (err) {// Si hay error, lo guardamos y mostramos
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);// Dejamos de mostrar el spinner
      }
    };

    fetchData(); // Ejecutamos la función al cargar
  }, [user, navigate, location.state]);






  // Función para inscribirse a un examen
  const handleRegisterExam = async (examId) => {
    try {
      await studentService.registerForExam(examId);
      // Actualizamos la lista de exámenes después de registrarnos
      const exams = await studentService.getAvailableExams();
      setAvailableExams(exams.available);
      setRegisteredExams(exams.registered);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle tab selection and close mobile menu
  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    setShowOffcanvas(false);
  };



  // Mostrar un spinner si aún estamos cargando los datos
  if (loading && !studentData) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  // Show error message if data fetching failed
  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }





  // RENDER DE LA APP
  return (
    <Container fluid className="container dashboard-container px-0">
      <Row className="g-0">
        <Col>
          {/* movil y laptos  */}
          <DashboardNavbar 
            studentData={studentData}
            activeTab={activeTab}
            showOffcanvas={showOffcanvas}
            setShowOffcanvas={setShowOffcanvas}
            handleSelectTab={handleSelectTab}
          />

          {/* main*/}
          <DashboardContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            studentData={studentData}
            subjects={subjects}
            registeredExams={registeredExams}
            availableExams={availableExams}
            upcomingExams={upcomingExams}
            onRegisterExam={handleRegisterExam}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardContainer;