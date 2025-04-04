import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

const LoadingSpinner = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando...</p>
      </div>
    </Container>
  );
};

export default LoadingSpinner;