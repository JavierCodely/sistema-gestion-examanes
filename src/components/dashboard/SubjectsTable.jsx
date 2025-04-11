// SubjectsTable.jsx
import React from 'react';
import { Table, Card } from 'react-bootstrap';

/**
 * Component that displays the student's current subjects
 * Shows subject name, current grade, and status with colored badges
 * 
 * @param {Array} subjects - Array of subject objects
 * @param {string} subjects[].name - Subject name
 * @param {number} subjects[].grade - Current grade
 * @param {string} subjects[].status - Subject status (Promoción, Regular, or Insuficiente)
 */
const SubjectsTable = ({ subjects }) => {
  /**
   * Creates a colored badge based on the subject status
   * 
   * @param {string} status - The status of the subject
   * @returns {JSX.Element} - Styled badge element
   */
  const getStatusBadge = (status) => {
    const variants = {
      'Promoción': 'success',  // Green for promotion
      'Regular': 'warning',    // Yellow for regular
      'Insuficiente': 'danger' // Red for insufficient
    };
    return <span className={`badge bg-${variants[status]}`}>{status}</span>;
  };

  
   // Agrupar materias por grado usando un objeto
   const groupedSubjects = subjects.reduce((acc, subject) => {
    const grade = subject.gradeLevel || 'Sin grado'; // Si no viene definido
    if (!acc[grade]) {
      acc[grade] = [];
    }
    acc[grade].push(subject);
    return acc;
  }, {});

  return (
    <Card className="mb-4">
    <Card.Header className="bg-primary text-white">
      <h4>Mis Materias</h4>
    </Card.Header>
    <Card.Body>
      {/* Recorremos cada grupo de materias por grado */}
      {Object.keys(groupedSubjects).sort().map((gradeKey, idx) => (
        <div key={idx} className="mb-4">
          {/* Título del grado */}
          <h5 className="mb-3"><strong>{gradeKey}° Grado</strong></h5>

          {/* Tabla de materias del grado */}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Cursando</th>
                <th>Nota Actual</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {groupedSubjects[gradeKey].map((subject, i) => (
                <tr key={i}>
                  <td>{subject.name}</td>
                  <td>{subject.grade}</td>
                  <td>{getStatusBadge(subject.status)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
    </Card.Body>
  </Card>
);
};
export default SubjectsTable;