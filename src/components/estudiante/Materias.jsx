import React, { useState, useEffect } from 'react';
import { Card, Nav, Table, Badge } from 'react-bootstrap';
import materiasService from '../../services/materiasService';

const Materias = () => {
  const [activeTab, setActiveTab] = useState('cursando');
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterias = async () => {
      setLoading(true);
      try {
        let data;
        
        switch (activeTab) {
          case 'cursando':
            data = await materiasService.getMateriasCursando();
            break;
          case 'aprobadas':
            data = await materiasService.getMateriasAprobadas();
            break;
          case 'pendientes':
            data = await materiasService.getMateriasPendientes();
            break;
          default:
            data = await materiasService.getMateriasCursando();
        }
        
        setMaterias(data);
      } catch (error) {
        console.error('Error al obtener materias:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterias();
  }, [activeTab]);

  const getEstadoColor = (estado) => {
    switch (estado.toLowerCase()) {
      case 'promoción':
        return 'success';
      case 'regular':
        return 'warning';
      case 'insuficiente':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="border-0 shadow">
      <Card.Header className="text-white bg-primary">
        <h5 className="mb-0">Mis Materias</h5>
      </Card.Header>
      <Card.Body>
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'cursando'} 
              onClick={() => setActiveTab('cursando')}
            >
              Cursando
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'aprobadas'} 
              onClick={() => setActiveTab('aprobadas')}
            >
              Aprobadas
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'pendientes'} 
              onClick={() => setActiveTab('pendientes')}
            >
              Pendientes
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover>
              <thead>
                <tr>
                  <th>Materia</th>
                  <th className="text-center">Nota Actual</th>
                  <th className="text-center">Estado</th>
                </tr>
              </thead>
              <tbody>
                {materias.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      No hay materias en esta categoría
                    </td>
                  </tr>
                ) : (
                  materias.map((materia) => (
                    <tr key={materia.id}>
                      <td>{materia.nombre}</td>
                      <td className="text-center">{materia.nota}</td>
                      <td className="text-center">
                        <Badge bg={getEstadoColor(materia.estado)}>
                          {materia.estado}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Materias;