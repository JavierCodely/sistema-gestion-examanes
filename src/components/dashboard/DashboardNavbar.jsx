// DashboardNavbar.jsx
import React from 'react';
import { Navbar, Container, Button, Nav, Offcanvas } from 'react-bootstrap';
import { FaBars, FaHome, FaBook, FaClipboardList } from 'react-icons/fa';

/**
 * Navigation component for the dashboard
 * Includes responsive design with offcanvas for mobile
 */
const DashboardNavbar = ({ 
  studentData, 
  activeTab, 
  showOffcanvas, 
  setShowOffcanvas, 
  handleSelectTab 
}) => {
  return (
    <>
      {/* Mobile navbar */}
      <Navbar expand="lg" className="mobile-navbar d-lg-none">
        <Container fluid>
          <Button 
            variant="link" 
            onClick={() => setShowOffcanvas(true)}
            className="navbar-toggler-custom"
          >
            <FaBars size={24} />
          </Button>
          <Navbar.Brand className="ms-2">Menú</Navbar.Brand>
          
          {/* Mobile offcanvas menu */}
          <Navbar.Offcanvas
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
            placement="start"
            className="custom-offcanvas"
          >
            <Offcanvas.Header closeButton closeVariant="white">
              <Offcanvas.Title>
                <div className="user-info">
                  {studentData && (
                    <>
                      <h5>{studentData.name}</h5>
                      <p className="text-muted">{studentData.career}</p>
                    </>
                  )}
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                <Nav.Link 
                  active={activeTab === 'welcome'}
                  onClick={() => handleSelectTab('welcome')}
                  className="nav-link-custom"
                >
                  <FaHome className="me-2" /> Inicio
                </Nav.Link>
                <Nav.Link 
                  active={activeTab === 'subjects'}
                  onClick={() => handleSelectTab('subjects')}
                  className="nav-link-custom"
                >
                  <FaBook className="me-2" /> Mis Materias
                </Nav.Link>
                <Nav.Link 
                  active={activeTab === 'exams'}
                  onClick={() => handleSelectTab('exams')}
                  className="nav-link-custom"
                >
                  <FaClipboardList className="me-2" /> Exámenes
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default DashboardNavbar;