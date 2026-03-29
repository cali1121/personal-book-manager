const express = require('express');
const router = express.Router();
const conexion = require('../js/conexion.js');

router.get('/api/estadisticas', (req, res) => {
    conexion.query('SELECT COUNT(*) AS total FROM libros', (err, libros) => {
        if (err) return res.status(500).json({ error: 'Error en libros' });
        conexion.query('SELECT COUNT(*) AS total FROM autores', (err, autores) => {
            if (err) return res.status(500).json({ error: 'Error en autores' });
            conexion.query('SELECT COUNT(*) AS total FROM generos', (err, generos) => {
                if (err) return res.status(500).json({ error: 'Error en generos' });
                res.json({
                    libros: libros[0].total,
                    autores: autores[0].total,
                    generos: generos[0].total
                });
            });
        });
    });
});

module.exports = router;