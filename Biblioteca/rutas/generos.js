const express = require('express');
const router = express.Router();
const conexion = require('../js/conexion.js');
const generosController = require('../controladores/generosController.js');

// Ruta para obtener todos los géneros
router.get('/api/generos', (req, res) => {
    conexion.query('SELECT nombre FROM generos', (err, resultados) => {
        if (err) return res.status(500).json({ error: 'Error al obtener géneros' });
        res.json(resultados);
    });
});
// Ruta para agregar género
router.post('/enviar', generosController.crearGenero);

// Ruta para eliminar género
router.post('/eliminar', generosController.eliminarGenero);
// Ruta para editar género
router.post('/editar', generosController.editarGenero);
module.exports = router;