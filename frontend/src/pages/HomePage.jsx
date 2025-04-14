import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HomePage.css'

function HomePage() {
  return (
    <Container className="home-welcome">
      <h1>Bienvenido a ReservaHoteles</h1>
      <p className="lead">
        Encuentra y reserva los mejores hoteles al mejor precio.
      </p>
      <Button as={Link} to="/search" variant="primary">
        Buscar Hoteles
      </Button>
    </Container>
  );
}

export default HomePage;
