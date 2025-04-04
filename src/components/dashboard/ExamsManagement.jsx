import React from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Añade esta línea
const ExamsManagement = ({ registeredExams, availableExams, onRegister }) => {
  
    const navigate = useNavigate();
  
    const handleRegisterClick = (examId, subjectId) => {
      // Navega a la página de registro de examen con el subjectId
      navigate(`/exams/register/${subjectId}`);
    };

  return (
    <div>
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
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {registeredExams.map((exam, index) => (
                <tr key={`registered-${index}`}>
                  <td>{exam.subject}</td>
                  <td>{exam.date}</td>
                  <td>{exam.type}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

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