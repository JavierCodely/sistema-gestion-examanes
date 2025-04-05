import React, { useContext, useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';//hocks
import { AuthContext } from '../auth/AuthContext';
import { studentService } from '../../services/studentService';
import StudentInfo from './StudentInfo';
import SubjectsTable from './SubjectsTable';
import WelcomeSection from './WelcomeSection';
import ExamsManagement from './ExamsManagement';
import { Container, Spinner, Alert, Tab, Tabs, Row, Col, Navbar,
  Nav,
  NavDropdown,
  Offcanvas ,
  Button  
} from 'react-bootstrap';

import { FaBars, FaHome, FaBook, FaClipboardList } from 'react-icons/fa';
import './Dashboard.css'; // Archivo CSS para estilos personalizados


const Dashboard = () => {
  const location = useLocation(); // Usa el hook useLocation
  
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('welcome');
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null); // Definimos setApiError aquí
  const [error, setError] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [registeredExams, setRegisteredExams] = useState([]);
  const [availableExams, setAvailableExams] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (location.state?.fromRegistration) {
      setActiveTab('exams');
      // Limpia el estado para no afectar futuras navegaciones
      navigate('.', { state: null, replace: true });
    }
  

    const fetchData = async () => {
      try {
        setLoading(true);
        setApiError(null); //esto hay que eliminar luego xd
        const [info, subjects, exams] = await Promise.all([
            studentService.getStudentInfo(),
            studentService.getCurrentSubjects(),
            studentService.getAvailableExams()
          ]);
          
          setStudentData(info);
          setSubjects(subjects);
          setAvailableExams(exams.available);
          setRegisteredExams(exams.registered);
          setUpcomingExams(exams.upcoming);
          
        } catch (err) {
          setApiError(err.message);
          console.error('Error fetching data:', err);
        } finally {
          setLoading(false);
        }
    
      };

      fetchData();
    }, [location.state, navigate]);
  
    // ... resto del componente ...
  
        // Obtener información del estudiante
        //const info = await studentService.getStudentInfo();
        
        //setStudentData(info);
        
        // Obtener materias en curso
        //const currentSubjects = await studentService.getCurrentSubjects();
        //setSubjects(currentSubjects);
        
        // Obtener exámenes disponibles
        //const exams = await studentService.getAvailableExams();
        //setAvailableExams(exams.available);
        //setRegisteredExams(exams.registered);
        //setUpcomingExams(exams.upcoming);
        
      //} catch (err) {
        //setError(err.message);
      //} finally {
        //setLoading(false);
      //}
    //};

    //fetchData();
  //}, [user, navigate]);
    //};
  const handleRegisterExam = async (examId) => {
    try {
      await studentService.registerForExam(examId);
      // Actualizar la lista de exámenes después de registrarse
      const exams = await studentService.getAvailableExams();
      setAvailableExams(exams.available);
      setRegisteredExams(exams.registered);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading && !studentData) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    setShowOffcanvas(false); // Cierra el offcanvas al seleccionar
  };
  return (
    <Container fluid className="dashboard-container px-0">
    <Row className="g-0">
      <Col>
        {/* Navbar Mobile */}
        <Navbar expand="lg" className="mobile-navbar d-lg-none">
          <Container fluid>
            <Button 
              variant="link" 
              onClick={() => setShowOffcanvas(true)}
              className="navbar-toggler-custom"
            >
              <FaBars size={24} />
            </Button>
            <Navbar.Brand className="ms-2">Menú</Navbar.Brand>
            
            <Navbar.Offcanvas
              show={showOffcanvas}
              onHide={() => setShowOffcanvas(false)}
              placement="start"
              className="custom-offcanvas"
            >
              <Offcanvas.Header closeButton closeVariant="white">
                <Offcanvas.Title>
                  <div className="user-info">
                    {studentData && (
                      <>
                        <h5>{studentData.name}</h5>
                        <p className="text-muted">{studentData.career}</p>
                      </>
                    )}
                  </div>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="flex-column">
                  <Nav.Link 
                    active={activeTab === 'welcome'}
                    onClick={() => handleSelectTab('welcome')}
                    className="nav-link-custom"
                  >
                    <FaHome className="me-2" /> Inicio
                  </Nav.Link>
                  <Nav.Link 
                    active={activeTab === 'subjects'}
                    onClick={() => handleSelectTab('subjects')}
                    className="nav-link-custom"
                  >
                    <FaBook className="me-2" /> Mis Materias
                  </Nav.Link>
                  <Nav.Link 
                    active={activeTab === 'exams'}
                    onClick={() => handleSelectTab('exams')}
                    className="nav-link-custom"
                  >
                    <FaClipboardList className="me-2" /> Exámenes
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>

        {/* Contenido principal */}
        <div className="content-wrapper">
          {studentData && <StudentInfo student={studentData} className="student-info-card" />}
          
          {/* Tabs para desktop */}
          <div className="desktop-tabs d-none d-lg-block">
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="custom-tabs mb-4"
            >
              <Tab 
                eventKey="welcome" 
                title={
                  <span>
                    <FaHome className="me-1" /> Inicio
                  </span>
                }
                className="tab-content"
              >
                <WelcomeSection upcomingExams={upcomingExams} />
              </Tab>
              <Tab 
                eventKey="subjects" 
                title={
                  <span>
                    <FaBook className="me-1" /> Mis Materias
                  </span>
                }
                className="tab-content"
              >
                <SubjectsTable subjects={subjects} />
              </Tab>
              <Tab 
                eventKey="exams" 
                title={
                  <span>
                    <FaClipboardList className="me-1" /> Exámenes
                  </span>
                }
                className="tab-content"
              >
                <ExamsManagement 
                  registeredExams={registeredExams}
                  availableExams={availableExams}
                  onRegister={handleRegisterExam}
                />
              </Tab>
            </Tabs>
          </div>

          {/* Contenido para móviles */}
          <div className="mobile-content d-lg-none">
            {activeTab === 'welcome' && <WelcomeSection upcomingExams={upcomingExams} />}
            {activeTab === 'subjects' && <SubjectsTable subjects={subjects} />}
            {activeTab === 'exams' && (
              <ExamsManagement 
                registeredExams={registeredExams}
                availableExams={availableExams}
                onRegister={handleRegisterExam}
              />
            )}
          </div>
        </div>
      </Col>
    </Row>
  </Container>
  );
};

export default Dashboard;