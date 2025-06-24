import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Form, FormControl } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import logo from '../assets/brandlogo.png';
import '../css/NavbarPrivate.css';

const NavbarPrivate = ({ username, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      console.log(`Searching for: ${searchTerm}`);
      // You can navigate or filter based on searchTerm
    }
  };

  return (
    <Navbar bg="white" variant="light" expand="lg" className="shadow-sm py-2">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <img
            src={logo}
            alt="Rivaayat Logo"
            className="logo-img"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="user-navbar-nav" />
        <Navbar.Collapse id="user-navbar-nav">

         

          {/* Nav links now after the search bar */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          </Nav>
           {/* Search bar comes first now */}
          <Form className="d-flex align-items-center me-3" onSubmit={e => e.preventDefault()}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch
              style={{ cursor: 'pointer', color: '#0d6efd' }}
              size={18}
              onClick={handleSearch}
              title="Search"
            />
          </Form>

          <div className="d-flex align-items-center">
            <span className="me-3 text-dark">👋 Hello, <strong>{username}</strong></span>
            
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPrivate;
