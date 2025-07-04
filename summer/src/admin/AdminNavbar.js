import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../css/admin-navbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: clear session or state
    navigate('/admin-login');
  };

  return (
    <Navbar expand="lg" className="royal-navbar" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/admin" className="fw-bold">
          👑 Rivaayat Admin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/admin/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/admin/users">Users</Nav.Link>
            <Nav.Link as={Link} to="/admin/orders">Orders</Nav.Link>
            <Button
              variant="outline-light"
              className="ms-3 rounded-pill fw-bold"
              onClick={handleLogout}
              aria-label="Logout"
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
