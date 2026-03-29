const express = require('express');
const router = express.Router();
const conexion = require('../js/conexion.js');
const autoresController = require('../controladores/autoresController.js');

// Ruta para agregar autor
router.post('/enviar', autoresController.crearAutor);
// Ruta para eliminar autor
router.post('/eliminar', autoresController.eliminarAutor);
// Ruta para obtener todos los autores
router.get('/api/autores', (req, res) => {
    conexion.query('SELECT nombre, nacionalidad FROM autores', (err, resultados) => {
        if (err) return res.status(500).json({ error: 'Error al obtener autores' });
        res.json(resultados);
    });
});
router.post('/editar', autoresController.editarAutor);

module.exports = router;