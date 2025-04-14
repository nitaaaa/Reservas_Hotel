import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, ListGroup, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import './HotelDetailPage.css';

function HotelDetailPage() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [reserva, setReserva] = useState({ fecha_inicio: '', fecha_fin: '', habitacion_id: null });
const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/api/hoteles/${id}`)
      .then(res => setHotel(res.data))
      .catch(err => console.error('Error al obtener detalles del hotel', err));
  }, [id]);

  if (!hotel) return <p className="text-center mt-5">Cargando hotel...</p>;

  return (
    <Container className="hotel-detail">
      <Card>
        <Card.Img variant="top" src={hotel.imagen || 'https://via.placeholder.com/400x200'} />
        <Card.Body>
          <Card.Title>{hotel.nombre}</Card.Title>
          <Card.Text><strong>Ubicación:</strong> {hotel.ubicacion}</Card.Text>
          <Card.Text>{hotel.descripcion}</Card.Text>
          <Card.Text><strong>Categoría:</strong> {hotel.categoria}</Card.Text>
        </Card.Body>
        <ListGroup variant="flush">
          {hotel.habitaciones.length === 0 && (
            <ListGroup.Item>No hay habitaciones disponibles</ListGroup.Item>
          )}
          {hotel.habitaciones.map(hab => (
            <ListGroup.Item key={hab.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{hab.tipo}</strong> - ${Math.round(hab.precio_por_noche).toLocaleString('es-CL')}
                </div>
                {hab.disponible ? (
                  <Button variant="success">Reservar</Button>
                ) : (
                  <span className="text-muted">No disponible</span>
                )}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
}

export default HotelDetailPage;
