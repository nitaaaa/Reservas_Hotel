// controllers/authController.js
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

exports.registrar = async (req, res) => {
  console.log("📩 Intentando registrar usuario:", req.body);
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Correo electrónico inválido' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    Usuario.registrar(nombre, email, hashedPassword, (err, result) => {
      if (err) return res.status(500).json({ error: 'Error al registrar usuario' });
      res.status(201).json({ message: 'Usuario registrado correctamente' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al encriptar contraseña' });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Debe ingresar correo y contraseña' });
  }

  Usuario.buscarPorEmail(email, async (err, user) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Credenciales inválidas' });

    req.session.user = user;
    res.json({ message: 'Inicio de sesión exitoso', user });
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Sesión cerrada' });
  });
};


