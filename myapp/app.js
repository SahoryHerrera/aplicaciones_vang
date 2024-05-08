const express = require('express');
const app = express();
const port = 3000;

// Definir una clase para representar un libro
class Libro {
  constructor(id, nombre, entrada, salida, precio, descripcion, estado) {
    this.id = id;
    this.nombre = nombre;
    this.entrada = entrada;
    this.salida = salida;
    this.precio = precio;
    this.descripcion = descripcion;
    this.estado = estado;
  }
}

// Array para almacenar los libros (simulación de una base de datos)
let inventario = [];

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Rutas CRUD para el inventario de libros

// Obtener todos los libros
app.get('/libros', (req, res) => {
  res.json(inventario);
});

// Obtener un libro por su identificador
app.get('/libros/:id', (req, res) => {
  const libro = inventario.find(libro => libro.id === parseInt(req.params.id));
  if (!libro) return res.status(404).send('Libro no encontrado.');
  res.json(libro);
});

// Crear un nuevo libro
app.post('/libros', (req, res) => {
  const libro = new Libro(
    req.body.id,
    req.body.nombre,
    req.body.entrada,
    req.body.salida,
    req.body.precio,
    req.body.descripcion,
    req.body.estado
  );
  inventario.push(libro);
  res.status(201).send('Libro creado correctamente.');
});

// Actualizar la información de un libro
app.put('/libros/:id', (req, res) => {
  const libro = inventario.find(libro => libro.id === parseInt(req.params.id));
  if (!libro) return res.status(404).send('Libro no encontrado.');

  libro.nombre = req.body.nombre;
  libro.entrada = req.body.entrada;
  libro.salida = req.body.salida;
  libro.precio = req.body.precio;
  libro.descripcion = req.body.descripcion;
  libro.estado = req.body.estado;

  res.send('Libro actualizado correctamente.');
});

// Eliminar un libro por su identificador
app.delete('/libros/:id', (req, res) => {
  const index = inventario.findIndex(libro => libro.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Libro no encontrado.');
  inventario.splice(index, 1);
  res.send('Libro eliminado correctamente.');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
