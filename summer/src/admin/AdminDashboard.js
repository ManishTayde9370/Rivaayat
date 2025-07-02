// src/admin/AdminDashboard.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const features = [
    {
      title: '🧵 Manage Products',
      desc: 'Add, update, and delete products including images, prices, and descriptions.',
      link: '/admin/products'
    },
    {
      title: '👥 Manage Users',
      desc: 'View users, promote to admin, or block access.',
      link: '/admin/users'
    },
    {
      title: '📦 Manage Orders',
      desc: 'Track and update order statuses, view customer details.',
      link: '/admin/orders'
    }
  ];

  return (
    <Container fluid className="bg-light min-vh-100 py-5">
      <Row className="justify-content-center mb-5">
        <Col xs="auto">
          <h2 className="text-center fw-bold" style={{ fontFamily: 'Georgia', color: '#4b2e2e' }}>
            🛠️ Admin Dashboard - Rivaayat
          </h2>
        </Col>
      </Row>

      <Row className="justify-content-center g-4 px-3">
        {features.map((card, i) => (
          <Col key={i} md={6} lg={4}>
            <Card className="shadow-sm h-100 text-center border-0">
              <Card.Body>
                <Card.Title className="mb-3" style={{ fontWeight: 'bold', color: '#7b3f00' }}>
                  {card.title}
                </Card.Title>
                <Card.Text className="text-muted">{card.desc}</Card.Text>
                <Link to={card.link}>
                  <Button variant="dark" className="rounded-pill px-4">
                    Go
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminDashboard;
