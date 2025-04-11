// ExamsManagement.jsx
import React from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/**
 * Component for managing exam registration
 * Shows registered exams and available exams for registration
 * 
 * @param {Array} registeredExams - Array of already registered exam objects
 * @param {Array} availableExams - Array of available exam objects
 * @param {Function} onRegister - Function to handle exam registration
 */
const ExamsManagement = ({ registeredExams, availableExams, onRegister }) => {
  const navigate = useNavigate();
  
  /**
   * Handles click on register button
   * Navigates to registration page with subject ID
   * 
   * @param {string|number} examId - The ID of the exam
   * @param {string|number} subjectId - The ID of the subject
   */
  const handleRegisterClick = (examId, subjectId) => {
    // Navigate to the exam registration page for the specific subject
    navigate(`/exams/register/${subjectId}`);
  };

  return (
    <div>
      {/* Registered exams section */}
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h4>Exámenes Inscriptos</h4>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Materia</th>
                <th>Fecha</th>
                <th>Mesa</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {registeredExams.map((exam, index) => (
                <tr key={`registered-${index}`}>
                  <td>{exam.subject}</td>
                  <td>{exam.date}</td>
                  <td>{exam.mesa}</td>
                  <td>{exam.type}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Available exams section */}
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h4>Exámenes Disponibles</h4>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Materia</th>
                <th>Mesa 1</th>
                <th>Mesa 2</th>
                <th>Tipo</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {availableExams.map((exam, index) => (
                <tr key={`available-${index}`}>
                  <td>{exam.subject}</td>
                  <td>{exam.date1}</td>
                  <td>{exam.date2}</td>
                  <td>{exam.type}</td>
                  <td>
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => handleRegisterClick(exam.id, exam.subjectId)}
                    >
                      Inscribirse
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ExamsManagement;