// models/Usuario.js
const db = require('../db/connection');

const Usuario = {
  registrar: (nombre, email, hashedPassword, callback) => {
    const sql = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
    db.query(sql, [nombre, email, hashedPassword], callback);
  },

  buscarPorEmail: (email, callback) => {
    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(sql, [email], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null);
      return callback(null, results[0]);
    });
  }
};

module.exports = Usuario;
