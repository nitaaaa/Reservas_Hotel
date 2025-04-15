// server.js
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const reservaRoutes = require('./routes/reservasRoutes');




app.use(cors({
  origin: 'http://localhost:3000', // donde corre React
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: 'clave_secreta',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // false en desarrollo sin HTTPS
}));

app.use('/api/auth', authRoutes);
app.use('/api/hoteles', hotelRoutes);
app.use('/api/reservas', reservaRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});