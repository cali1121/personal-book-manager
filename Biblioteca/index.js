const express = require('express');
const app = express();
const mysql = require('mysql');
const conexion = require('./js/conexion.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const librosRoutes = require('./rutas/libros.js');
app.use('/libros', librosRoutes);
const autoresRoutes = require('./rutas/autores.js');
app.use('/autores', autoresRoutes);
const generosRoutes = require('./rutas/generos.js');
app.use('/generos', generosRoutes);
const estadisticasRoutes = require('./rutas/estadisticas.js');
app.use(estadisticasRoutes);

app.listen(3000, function() {
    console.log('Servidor es http://localhost:3000');
})