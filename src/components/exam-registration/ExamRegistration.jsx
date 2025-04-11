// src/components/exam-registration/ExamRegistration.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { studentService } from '../../services/studentService';
import { Container, Card, Table, Button, Spinner, Alert, Form } from 'react-bootstrap';
import './ExamRegistration.css';
const ExamRegistration = () => {
  const { subjectId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subject, setSubject] = useState(null);
  const [examDates, setExamDates] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        // Aquí deberías implementar un servicio para obtener los detalles de la materia y las mesas de examen
        // Esto es un ejemplo, ajusta según tu API
        const response = await studentService.getExamDetails(subjectId);
        setSubject(response.subject);
        setExamDates(response.examDates);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate, subjectId]);

  const handleSelectExam = (examId) => {
    setSelectedExam(examId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedExam) {
      setError('Debes seleccionar una mesa de examen');
      return;
    }

    try {
      setLoading(true);
      await studentService.registerForExam(selectedExam);
      navigate('/dashboard/exams', { state: { success: 'Inscripción exitosa' } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !subject) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h4>Seleccionar Mesa de Examen</h4>
        </Card.Header>
        <Card.Body>
          <h5 className="mb-4 materiaExamen">Materia: {subject || "Cargando..."}</h5>
          
          <Form onSubmit={handleSubmit}>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Mesa</th>
                  <th>Fecha</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                  {examDates.map((exam) => (
                  <tr key={exam.id}>
                    <td>{exam.type}</td>
                    <td>{exam.date}</td>
                    <td>
                      <Button
                        variant={selectedExam === exam.id ? 'success' : 'outline-secondary'}
                        onClick={() => handleSelectExam(exam.id)}
                        className="selection-button"
                      >
                        {selectedExam === exam.id ? '✓ Seleccionado' : 'Seleccionar'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            
            <div className="d-flex justify-content-between mt-4">
              <Button 
                variant="secondary" 
                onClick={() => navigate('/dashboard', { 
                  state: { fromRegistration: true } 
                })}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={!selectedExam || loading}
              >
                {loading ? 'Procesando...' : 'Confirmar Inscripción'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ExamRegistration;