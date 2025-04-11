import React, { useContext, useState } from 'react';
import { Container, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa';
import { AuthContext } from './auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    dni: '',
    password: ''
  });
  const [validated, setValidated] = useState(false);
  const { login, error: authError, loading: authLoading } = useContext(AuthContext);
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
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        await login(formData);
      } catch (err) {
        // El error ya se maneja en el AuthContext
      }
    }

    setValidated(true);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="login-card border-0 shadow" style={{ maxWidth: '450px', width: '100%' }}>
        <Card.Header className="text-center text-white bg-primary py-4">
          <img 
            src="/its-logo.png" 
            alt="ITS" 
            className="mb-2" 
            style={{ height: '40px' }}
          />
          <h4 className="mb-0">Sistema de Gestión de Exámenes</h4>
        </Card.Header>
        
        <Card.Body className="px-4 py-4">
          {authError && <Alert variant="danger" className="mb-4">{authError}</Alert>}
          
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
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

            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={authLoading}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese su contraseña.
              </Form.Control.Feedback>
            </Form.Group>

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
                  <FaSignInAlt className="me-2" /> Ingresar
                </>
              )}
            </Button>
          </Form>
          
          <div className="text-center mt-3">
            <p className="mb-0">¿No tiene una cuenta? <a href="/registro">Registrarse</a></p>
          </div>
        </Card.Body>
        
        <Card.Footer className="text-center py-3 bg-white border-0">
          Instituto Técnico Superior Puerto Esperanza
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Login;