import React from 'react';
import { Table, Card } from 'react-bootstrap';

const SubjectsTable = ({ subjects }) => {
  const getStatusBadge = (status) => {
    const variants = {
      'Promoción': 'success',
      'Regular': 'warning',
      'Insuficiente': 'danger'
    };
    return <span className={`badge bg-${variants[status]}`}>{status}</span>;
  };

  return (
    <Card className="mb-4">
      <Card.Header className="bg-primary text-white">
        <h4>Mis Materias</h4>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive className='mt-3'>
          <thead>
            <tr>
              <th>Cursando</th>
              <th>Nota Actual</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={index}>
                <td>{subject.name}</td>
                <td>{subject.grade}</td>
                <td>{getStatusBadge(subject.status)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default SubjectsTable;