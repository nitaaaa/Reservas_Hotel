// db/connection.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '101770893', // reemplaza con tu contraseña
  database: 'hotel_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conexión a MySQL establecida');
});

module.exports = connection;
