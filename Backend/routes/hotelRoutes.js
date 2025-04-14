const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Obtener todos los hoteles
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM hoteles';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener hoteles' });
    res.json(results);
  });
});

// Obtener detalle del hotel con habitaciones
router.get('/:id', (req, res) => {
  const hotelId = req.params.id;

  const hotelQuery = 'SELECT * FROM hoteles WHERE id = ?';
  const habitacionesQuery = 'SELECT * FROM habitaciones WHERE hotel_id = ?';

  db.query(hotelQuery, [hotelId], (err, hotelResults) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el hotel' });
    if (hotelResults.length === 0) return res.status(404).json({ error: 'Hotel no encontrado' });

    db.query(habitacionesQuery, [hotelId], (err, habitacionesResults) => {
      if (err) return res.status(500).json({ error: 'Error al obtener habitaciones' });

      const hotelConHabitaciones = {
        ...hotelResults[0],
        habitaciones: habitacionesResults
      };

      res.json(hotelConHabitaciones);
    });
  });
});

module.exports = router;
