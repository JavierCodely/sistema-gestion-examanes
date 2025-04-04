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
      <ul className="mb-4 ps-3">
        <li>Ver tus materias y su estado</li>
        <li>Consultar tus notas</li>
        <li>Inscribirte a exámenes</li>
        <li>Ver fechas de exámenes pendientes</li>
      </ul>

      <h5 className="mb-3"><strong>Próximos exámenes disponibles:</strong></h5>
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