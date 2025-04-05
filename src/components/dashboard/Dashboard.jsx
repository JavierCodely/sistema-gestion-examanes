import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { studentService } from '../../services/studentService';
import StudentInfo from './StudentInfo';
import SubjectsTable from './SubjectsTable';
import WelcomeSection from './WelcomeSection';
import ExamsManagement from './ExamsManagement';
import { Container, Spinner, Alert, Tab, Tabs, Row, Col  } from 'react-bootstrap';

const Dashboard = () => {
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

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
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
    }, [user, navigate]);
  
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

  return (
    <Container className="mt-4">
      <Row>
      <Col>
        {studentData && <StudentInfo student={studentData} />}
        
        <div className="mt-4">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
          >
            <Tab eventKey="welcome" title="Inicio">
              <WelcomeSection upcomingExams={upcomingExams} />
            </Tab>
            <Tab eventKey="subjects" title="Mis Materias">
              <SubjectsTable subjects={subjects} />
            </Tab>
            <Tab eventKey="exams" title="Exámenes">
              <ExamsManagement 
                registeredExams={registeredExams}
                availableExams={availableExams}
                onRegister={handleRegisterExam}
              />
            </Tab>
          </Tabs>
        </div>
      </Col>
    </Row>
    </Container>
  );
};

export default Dashboard;