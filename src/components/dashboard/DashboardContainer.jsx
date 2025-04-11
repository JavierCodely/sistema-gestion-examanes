// DashboardContainer.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { studentService } from '../../services/studentService';
import { Container, Spinner, Alert, Row, Col } from 'react-bootstrap';
import DashboardNavbar from './DashboardNavbar';
import DashboardContent from './DashboardContent';

/**
 * Main container component for the student dashboard
 * Handles authentication, data fetching, and layout structure
 */
const DashboardContainer = () => {
  // Router hooks for navigation and location state
  const location = useLocation();
  const navigate = useNavigate();
  
  // Auth context for user authentication
  const { user } = useContext(AuthContext);
  
  // Component state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('welcome');
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  
  // Student data state
  const [studentData, setStudentData] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [registeredExams, setRegisteredExams] = useState([]);
  const [availableExams, setAvailableExams] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);

  // Effect for authentication check and data loading
  useEffect(() => {
    // Redirect to login if no user is authenticated
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Handle navigation from registration page
    if (location.state?.fromRegistration) {
      setActiveTab('exams');
      // Clear state to avoid affecting future navigations
      navigate('.', { state: null, replace: true });
    }

    // Fetch all student data from API
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch data in parallel for better performance
        const [info, subjects, exams] = await Promise.all([
          studentService.getStudentInfo(),
          studentService.getCurrentSubjects(),
          studentService.getAvailableExams()
        ]);
        
        // Update state with fetched data
        setStudentData(info);
        setSubjects(subjects);
        setAvailableExams(exams.available);
        setRegisteredExams(exams.registered);
        setUpcomingExams(exams.upcoming);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate, location.state]);

  // Handler for exam registration
  const handleRegisterExam = async (examId) => {
    try {
      await studentService.registerForExam(examId);
      // Update exams list after registration
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

  // Show loading spinner while data is being fetched
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

  return (
    <Container fluid className="dashboard-container px-0">
      <Row className="g-0">
        <Col>
          {/* Mobile and desktop navigation */}
          <DashboardNavbar 
            studentData={studentData}
            activeTab={activeTab}
            showOffcanvas={showOffcanvas}
            setShowOffcanvas={setShowOffcanvas}
            handleSelectTab={handleSelectTab}
          />

          {/* Main content area */}
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