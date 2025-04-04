import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { FaGoogle, FaSignInAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    dni: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Aquí iría la lógica de autenticación
      console.log('Datos enviados:', formData);
    }

    setValidated(true);
  };

  const handleGoogleLogin = () => {
    // Aquí iría la implementación de autenticación con Google
    console.log('Iniciando sesión con Google');
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
          <h4 className="mb-0">Sistema de Gestión Examenes</h4>
        </Card.Header>
        
        <Card.Body className="px-4 py-4">
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
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese su contraseña.
              </Form.Control.Feedback>
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 py-2 mb-3"
            >
              <FaSignInAlt className="me-2" /> Ingresar
            </Button>
            {
              /*
              
              <div className="text-center mb-3">o</div>
              
              //<Button
                variant="outline-danger"
                className="w-100 py-2 d-flex align-items-center justify-content-center"
                onClick={handleGoogleLogin}
              >
                <FaGoogle className="me-2" /> Continuar con Google
              //</Button>*/
            }
          </Form>
          <div className="text-center mt-3">
            <p className="mb-0">¿No tiene una cuenta? <a href="/registro">Registrarse</a></p>
          </div>
        </Card.Body>
        
        <Card.Footer className="text-center py-3 bg-white border-0">
          Instituto Tecnico Superior Puerto Esperanza
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Login;