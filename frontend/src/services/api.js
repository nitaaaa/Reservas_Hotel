// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const getHoteles = async () => {
  const response = await axios.get(`${API_URL}/hoteles`);
  return response.data;
};

export const getHotelById = async (id) => {
  const response = await axios.get(`${API_URL}/hoteles/${id}`);
  return response.data;
};

// Ejemplo para crear una reserva
export const crearReserva = async (reservaData, token) => {
  // token => "Bearer <jwt>" (si usas JWT)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(`${API_URL}/reservas`, reservaData, config);
  return response.data;
};

// Etc. para usuarios, login, registro, etc.
