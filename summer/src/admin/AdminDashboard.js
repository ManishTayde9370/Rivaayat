import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  return (
    <Container fluid className="bg-light min-vh-100 py-5">
      <Row className="justify-content-center mb-5">
        <Col xs="auto">
          <h2 className="text-center" style={{ fontFamily: 'Georgia', fontWeight: 'bold', color: '#4b2e2e' }}>
            🛠️ Admin Dashboard - Rivaayat
          </h2>
        </Col>
      </Row>

      <Row className="justify-content-center g-4">
        <Col md={4}>
          <Card className="shadow-sm h-100 text-center border-0">
            <Card.Body>
              <Card.Title className="mb-3" style={{ fontWeight: 'bold', color: '#7b3f00' }}>
                🧵 Manage Products
              </Card.Title>
              <Card.Text className="text-muted">
                Add, update, and delete products including images, prices, and descriptions.
              </Card.Text>
              <Link to="/admin/products">
                <Button variant="dark" className="rounded-pill px-4">Go</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm h-100 text-center border-0">
            <Card.Body>
              <Card.Title className="mb-3" style={{ fontWeight: 'bold', color: '#7b3f00' }}>
                👥 Manage Users
              </Card.Title>
              <Card.Text className="text-muted">
                View users, promote to admin, or block access.
              </Card.Text>
              <Link to="/admin/users">
                <Button variant="dark" className="rounded-pill px-4">Go</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm h-100 text-center border-0">
            <Card.Body>
              <Card.Title className="mb-3" style={{ fontWeight: 'bold', color: '#7b3f00' }}>
                📦 Manage Orders
              </Card.Title>
              <Card.Text className="text-muted">
                Track and update order statuses, view customer details.
              </Card.Text>
              <Link to="/admin/orders">
                <Button variant="dark" className="rounded-pill px-4">Go</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
