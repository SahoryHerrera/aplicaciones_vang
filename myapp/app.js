const express = require('express');
const axios = require('axios'); // Importa el módulo axios

const app = express();
const port = 3000;

app.use(express.json());

// Ruta para obtener un usuario aleatorio
app.get('/random-user', async (req, res) => {
  try {
    // Realiza una solicitud a la API de Random User Generator
    const response = await axios.get('https://randomuser.me/api/');
    
    // Envía los datos del usuario aleatorio como respuesta
    res.json(response.data);
  } catch (error) {
    // Manejo de errores en caso de que falle la solicitud
    console.error('Error al obtener usuario aleatorio:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener el usuario aleatorio' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
