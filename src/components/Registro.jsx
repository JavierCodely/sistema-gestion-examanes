import React, { useContext, useState } from 'react';
import { Container, Card, Form, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { FaUserPlus } from 'react-icons/fa';
import { AuthContext } from './auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { register, error: authError, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    
    if (form.checkValidity() === false || formData.password !== formData.confirmPassword) {
      event.stopPropagation();
    } else {
      try {
        await register({
          firstName: formData.nombre,
          lastName: formData.apellido,
          dni: formData.dni,
          email: formData.email,
          password: formData.password
        });
      } catch (err) {
        // El error ya se maneja en el AuthContext
      }
    }

    setValidated(true);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 py-5">
      <Card className="registro-card border-0 shadow" style={{ maxWidth: '550px', width: '100%' }}>
        <Card.Header className="text-center text-white bg-primary py-4">
          <img 
            src="/its-logo.png" 
            alt="ITS" 
            className="mb-2" 
            style={{ height: '40px' }}
          />
          <h4 className="mb-0">Registro de Usuario</h4>
        </Card.Header>
        
        <Card.Body className="px-4 py-4">
          {authError && <Alert variant="danger" className="mb-4">{authError}</Alert>}
          
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    disabled={authLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingrese su nombre.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                    disabled={authLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingrese su apellido.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>DNI</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su DNI"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                required
                disabled={authLoading}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese su DNI.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su correo electrónico"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={authLoading}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese un correo electrónico válido.
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Cree su contraseña"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                    disabled={authLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    La contraseña debe tener al menos 6 caracteres.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirme su contraseña"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    isInvalid={validated && formData.password !== formData.confirmPassword}
                    disabled={authLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    Las contraseñas no coinciden.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 py-2 mb-3"
              disabled={authLoading}
            >
              {authLoading ? (
                <Spinner as="span" animation="border" size="sm" />
              ) : (
                <>
                  <FaUserPlus className="me-2" /> Registrarse
                </>
              )}
            </Button>
          </Form>
          
          <div className="text-center mt-3">
            <p className="mb-0">¿Ya tiene una cuenta? <a href="/login">Iniciar sesión</a></p>
          </div>
        </Card.Body>
        
        <Card.Footer className="text-center py-3 bg-white border-0">
          Instituto Técnico Superior Puerto Esperanza
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Registro;