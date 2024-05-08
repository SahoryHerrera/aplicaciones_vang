require('dotenv').config();

const express = require('express');
const axios = require('axios');
const inventoryRouter = require('./routes/inventory.js'); // Ruta al enrutador de inventario

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Ruta para obtener un usuario aleatorio
app.get('/random-user', async (req, res) => {
  try {
    const response = await axios.get(process.env.RANDOM_USER_API_URL);
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener usuario aleatorio:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener el usuario aleatorio' });
  }
});

// Ruta de inventario
app.use('/inventory', inventoryRouter);

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
