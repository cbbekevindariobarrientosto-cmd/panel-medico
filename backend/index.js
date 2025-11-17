// index.js (versión simplificada sin bcrypt)
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'mi_super_secreto_123';

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

// Usuario de prueba (SIN HASH, contraseña en texto plano)
const users = [
  {
    id: 1,
    email: 'paciente@demo.com',
    password: '123456', // contraseña tal cual
    name: 'Paciente Demo',
    medicalData: {
      bloodType: 'O+',
      allergies: ['Penicilina'],
      chronicDiseases: ['Hipertensión'],
      lastConsultation: '2025-10-15',
      doctorName: 'Dra. María Salud',
    },
  },
];

// Generar token JWT
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );
}

// Middleware para proteger rutas
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']; // "Bearer token"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'No se ha proporcionado un token de autorización' });
  }

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }
    req.user = payload;
    next();
  });
}

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API Panel Médico funcionando correctamente' });
});

// LOGIN: POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  console.log('Intento de login:', email, password); // para ver en consola

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'El email y la contraseña son obligatorios' });
  }

  // Buscamos usuario que coincida con email Y password
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = generateToken(user);

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      medicalData: user.medicalData,
    },
  });
});

// PERFIL: GET /api/auth/profile
app.get('/api/auth/profile', authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      medicalData: user.medicalData,
    },
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
