import React from 'react';
import { Card } from 'react-bootstrap';

const StudentInfo = ({ student }) => {
  return (
    
    <Card className="mb-4">
    <Card.Header className="bg-primary text-white">
      <h4>Información del Estudiante</h4>
    </Card.Header>
    <Card.Body>
      <h5>{student.name}</h5>
      <p>{student.career}</p>
      <p>DNI: {student.dni}</p>
      
      <div className="d-flex justify-content-between mt-3">
        <div className="text-center">
          <h3>{student.promedio}</h3>
          <p>Promedio</p>
        </div>
        <div className="text-center">
          <h3>{student.asignaturasAprobadas}</h3>
          <p>Aprobadas</p>
        </div>
        <div className="text-center">
          <h3>{student.cursando}</h3>
          <p>Cursando</p>
        </div>
      </div>
    </Card.Body>
  </Card>
  );
};

export default StudentInfo;