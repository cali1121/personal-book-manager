const conexion = require('../js/conexion.js');

// Agregar género
exports.crearGenero = function(req, res) {
    const nombre = req.body.generoadd;
    if (!nombre) return res.status(400).send('El nombre del género es requerido');
    // Verifica si ya existe
    conexion.query('SELECT * FROM generos WHERE nombre = ?', [nombre], (err, resultado) => {
        if (err) return res.status(500).send('Error al buscar género');
        if (resultado.length > 0) return res.status(400).send('El género ya existe');
        // Inserta
        conexion.query('INSERT INTO generos (nombre) VALUES (?)', [nombre], (err2) => {
            if (err2) return res.status(500).send('Error al agregar género');
            res.send('Género agregado correctamente');
        });
    });
};

// Eliminar género
exports.eliminarGenero = function(req, res) {
    const nombre = req.body.generoEliminar;
    if (!nombre) return res.status(400).send('El nombre del género es requerido');
    // Verifica si existe
    conexion.query('SELECT * FROM generos WHERE nombre = ?', [nombre], (err, resultado) => {
        if (err) return res.status(500).send('Error al buscar género');
        if (resultado.length === 0) return res.status(404).send('Género no encontrado');
        // Elimina
        conexion.query('DELETE FROM generos WHERE nombre = ?', [nombre], (err2) => {
            if (err2) return res.status(500).send('Error al eliminar género');
            res.send('Género eliminado correctamente');
        });
    });
};
// Editar género
exports.editarGenero = function(req, res) {
    const { nombreOriginal, nombre } = req.body;
    if (!nombreOriginal || !nombre) return res.status(400).send('Datos incompletos');

    // Verifica si el género existe
    conexion.query('SELECT * FROM generos WHERE nombre = ?', [nombreOriginal], (err, resultado) => {
        if (err) return res.status(500).send('Error al buscar género');
        if (resultado.length === 0) return res.status(404).send('Género no encontrado');

        // Actualiza el género
        conexion.query('UPDATE generos SET nombre = ? WHERE nombre = ?', [nombre, nombreOriginal], (err2) => {
            if (err2) return res.status(500).send('Error al editar género');
            res.send('Género editado correctamente');
        });
    });
};