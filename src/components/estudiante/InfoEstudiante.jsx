import React, { useEffect, useState, useContext } from 'react';
import { Card } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import estudianteService from '../../services/estudianteService';

const InfoEstudiante = () => {
  const [infoEstudiante, setInfoEstudiante] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchInfoEstudiante = async () => {
      try {
        const data = await estudianteService.getInformacion();
        setInfoEstudiante(data);
      } catch (error) {
        console.error('Error al obtener información del estudiante:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfoEstudiante();
  }, []);

  if (loading) {
    return (
      <Card className="border-0 shadow h-100">
        <Card.Header className="text-white bg-primary">
          <h5 className="mb-0">Información del Estudiante</h5>
        </Card.Header>
        <Card.Body className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow h-100">
      <Card.Header className="text-white bg-primary">
        <h5 className="mb-0">Información del Estudiante</h5>
      </Card.Header>
      <Card.Body className="text-center">
        <div className="mb-3">
          <img 
            src={infoEstudiante?.foto || "/default-avatar.png"} 
            alt="Foto de perfil" 
            className="rounded-circle" 
            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          />
        </div>
        
        <h4>{infoEstudiante?.nombre} {infoEstudiante?.apellido}</h4>
        <p className="text-muted">{infoEstudiante?.carrera}</p>
        
        <p className="mb-1"><strong>DNI:</strong> {infoEstudiante?.dni}</p>
        
        <div className="d-flex justify-content-around mt-4">
          <div className="text-center">
            <h5>{infoEstudiante?.promedio || '0.0'}</h5>
            <small className="text-muted">Promedio</small>
          </div>
          <div className="text-center">
            <h5>{infoEstudiante?.materiasAprobadas || '0'}</h5>
            <small className="text-muted">Aprobadas</small>
          </div>
          <div className="text-center">
            <h5>{infoEstudiante?.materiasCursando || '0'}</h5>
            <small className="text-muted">Cursando</small>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default InfoEstudiante;