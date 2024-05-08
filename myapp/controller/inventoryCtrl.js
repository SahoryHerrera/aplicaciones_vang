require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://sahorych:1234@pruebavanguardia.ltnregh.mongodb.net/';
const dbName = 'pruebavanguardia';

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

const getAllBooks = async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const libros = await db.collection('libros').find({}).toArray();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los libros.' });
  }
}

const getBookById = async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const libro = await db.collection('libros').findOne({ id: parseInt(req.params.id) });
    if (!libro) return res.status(404).json({ error: 'Libro no encontrado.' });
    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el libro.' });
  }
}

const createBook = async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const { id, nombre, entrada, salida, precio, descripcion, estado } = req.body;
    const newBook = {
      id: id,
      nombre: nombre,
      entrada: entrada,
      salida: salida,
      precio: precio,
      descripcion: descripcion,
      estado: estado
    };
    await db.collection('libros').insertOne(newBook);
    res.status(201).send('Libro creado correctamente.');
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el libro.' });
  }
}

const updateBook = async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const filter = { id: parseInt(req.params.id) };
    const update = req.body;
    const result = await db.collection('libros').updateOne(filter, update);
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Libro no encontrado.' });
    res.send('Libro actualizado correctamente.');
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el libro.' });
  }
}

const deleteBook = async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const result = await db.collection('libros').deleteOne({ id: parseInt(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Libro no encontrado.' });
    res.send('Libro eliminado correctamente.');
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el libro.' });
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
