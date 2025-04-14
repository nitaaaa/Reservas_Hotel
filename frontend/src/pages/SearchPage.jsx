import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SearchPage.css';

function SearchPage() {
  const [hoteles, setHoteles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/hoteles')
      .then(res => setHoteles(res.data))
      .catch(err => console.error('Error al cargar hoteles', err));
  }, []);

  return (
    <Container>
      <h2 className="search-title">Hoteles disponibles</h2>
      <Row className="search-grid">
        {hoteles.length === 0 && <p className="empty-message">No se encontraron hoteles.</p>}
        {hoteles.map(hotel => (
          <Col key={hotel.id} md={6} lg={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src={hotel.imagen || 'https://via.placeholder.com/400x200'} />
              <Card.Body>
                <Card.Title>{hotel.nombre}</Card.Title>
                <Card.Text>{hotel.ubicacion}</Card.Text>
                <Card.Text>{hotel.descripcion}</Card.Text>
                <Link to={`/hoteles/${hotel.id}`}>
                  <Button variant="primary">Ver detalles</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SearchPage;

