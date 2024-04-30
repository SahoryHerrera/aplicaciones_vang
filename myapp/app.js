const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// URL de conexión a MongoDB
const uri = 'mongodb+srv://sahorych:1234@pruebavanguardia.ltnregh.mongodb.net/';
const dbName = 'pruebavanguardia'; // Reemplaza 'mi_base_de_datos' con el nombre de tu base de datos

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Conectar a MongoDB
async function connectToMongoDB() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Conexión a MongoDB establecida.");
    return client.db(dbName);
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    throw error;
  }
}

// Rutas CRUD para la colección de libros

// Obtener todos los libros
app.get('/libros', async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const libros = await db.collection('libros').find({}).toArray();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los libros.' });
  }
});

// Obtener un libro por su identificador
app.get('/libros/:id', async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const libro = await db.collection('libros').findOne({ id: parseInt(req.params.id) });
    if (!libro) return res.status(404).json({ error: 'Libro no encontrado.' });
    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el libro.' });
  }
});

// Crear un nuevo libro
app.post('/libros', async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const libro = req.body;
    await db.collection('libros').insertOne(libro);
    res.status(201).send('Libro creado correctamente.');
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el libro.' });
  }
});

// Actualizar la información de un libro
app.put('/libros/:id', async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const filter = { id: parseInt(req.params.id) };
    const update = { $set: req.body };
    const result = await db.collection('libros').updateOne(filter, update);
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Libro no encontrado.' });
    res.send('Libro actualizado correctamente.');
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el libro.' });
  }
});

// Eliminar un libro por su identificador
app.delete('/libros/:id', async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const result = await db.collection('libros').deleteOne({ id: parseInt(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Libro no encontrado.' });
    res.send('Libro eliminado correctamente.');
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el libro.' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
