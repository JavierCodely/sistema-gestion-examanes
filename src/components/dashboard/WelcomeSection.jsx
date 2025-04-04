import React from 'react';
import { Card, ListGroup, Table } from 'react-bootstrap';

const WelcomeSection = ({ upcomingExams }) => {
  return (
    <Card className="mb-4">
      <Card.Header className="bg-primary text-white">
        <h4>Bienvenido</h4>
      </Card.Header>
      <Card.Body>
        <p>
          Bienvenido al sistema de gestión de notas universitarias. Desde aquí podrás:
        </p>
        <ListGroup variant="flush" className="mb-4">
          <ListGroup.Item>Ver tus materias y su estado</ListGroup.Item>
          <ListGroup.Item>Consultar tus notas</ListGroup.Item>
          <ListGroup.Item>Inscribirte a exámenes</ListGroup.Item>
          <ListGroup.Item>Ver fechas de exámenes pendientes</ListGroup.Item>
        </ListGroup>

        <h5 className="mb-3">Próximos exámenes disponibles:</h5>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Materia</th>
              <th>Fecha</th>
              <th>Horario</th>
              <th>Aula</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {upcomingExams.map((exam, index) => (
              <tr key={index}>
                <td>{exam.subject}</td>
                <td>{exam.date}</td>
                <td>{exam.time}</td>
                <td>{exam.classroom}</td>
                <td>{exam.type}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default WelcomeSection;