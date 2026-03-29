const express = require('express');
const router = express.Router();
const conexion = require('../js/conexion.js');
const librosController = require('../controladores/librosController.js');

router.post('/enviar', librosController.crearLibro);
//ruta de crear libro
router.post('/eliminar', librosController.eliminarLibro);
//ruta de eliminar libro
router.post('/editar', librosController.editarLibro);
//ruta de editar libro

// Ruta para obtener todos los libros con sus autores y géneros
router.get('/api/libros', async (req, res) => {
    conexion.query(
        `SELECT libros.titulo, autores.nombre AS autor, generos.nombre AS genero, libros.estado
         FROM libros
         JOIN autores ON libros.autor_id = autores.id
         JOIN generos ON libros.genero_id = generos.id`,
        (err, resultados) => {
            if (err) return res.status(500).json({ error: 'Error al obtener libros' });
            res.json(resultados);
        }
    );
});

module.exports = router;
