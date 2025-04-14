const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Crear nueva reserva
router.post('/', (req, res) => {
  const { habitacion_id, fecha_inicio, fecha_fin } = req.body;
  const usuario_id = req.session.user?.id;

  if (!usuario_id) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  if (!habitacion_id || !fecha_inicio || !fecha_fin) {
    return res.status(400).json({ error: 'Datos incompletos para la reserva' });
  }

  const sql = `
    INSERT INTO reservas (usuario_id, habitacion_id, fecha_inicio, fecha_fin)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [usuario_id, habitacion_id, fecha_inicio, fecha_fin], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al registrar la reserva' });
    res.status(201).json({ message: 'Reserva creada exitosamente' });
  });
});

module.exports = router;
