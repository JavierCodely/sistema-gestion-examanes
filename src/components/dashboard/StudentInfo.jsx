// StudentInfo.jsx
import React from 'react';
import { Card } from 'react-bootstrap';

/**
 * Component that displays student personal information
 * Shows name, career, DNI, and academic metrics
 * 
 * @param {Object} student - Student data object
 * @param {string} student.name - Student's full name
 * @param {string} student.career - Student's degree program
 * @param {string} student.dni - Student's national ID
 * @param {number} student.promedio - Student's GPA
 * @param {number} student.asignaturasAprobadas - Number of passed courses
 * @param {number} student.cursando - Number of current courses
 */
const StudentInfo = ({ student }) => {
  return (
    <Card className="mb-4 ">
      <Card.Header className="bg-primary text-white">
        <h4>Información del Estudiante</h4>
      </Card.Header>
      <Card.Body>
        {/* Basic student information */}
        <h5>{student.name}</h5>
        <p>{student.career}</p>
        <p>DNI: {student.dni}</p>
        
        {/* Student metrics display */}
        <div className="d-flex justify-content-between mt-3 ">
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