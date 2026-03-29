const conexion = require('../js/conexion.js');

// Controller para crear un autor
exports.crearAutor = function(req, res) {
    const datos = req.body;
    const nombre = datos.nombre;
    const nacionalidad = datos.nacionalidad;

    // Verifica si el autor ya existe
    const buscarAutor = 'SELECT * FROM autores WHERE nombre = ?';
    conexion.query(buscarAutor, [nombre], function(err, resultado) {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al buscar autor');
        }
        if (resultado.length > 0) {
            return res.status(400).send('El autor ya existe');
        }

        // Inserta el nuevo autor
        const insertar = 'INSERT INTO autores (nombre, nacionalidad) VALUES (?, ?)';
        conexion.query(insertar, [nombre, nacionalidad], function(err, result) {
            if (err) {
                console.log(err);
                return res.status(500).send('Error al registrar autor');
            }
            res.send('Autor registrado correctamente');
        });
    });
};

// Controller para eliminar un autor por nombre
exports.eliminarAutor = function(req, res) {
    const nombreEliminar = req.body.nombreEliminar;

    // Verifica si el autor existe
    const buscarAutor = 'SELECT * FROM autores WHERE nombre = ?';
    conexion.query(buscarAutor, [nombreEliminar], function(err, resultado) {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al buscar autor');
        }
        if (resultado.length === 0) {
            return res.status(404).send('Autor no encontrado');
        }

        // Elimina el autor
        const eliminar = 'DELETE FROM autores WHERE nombre = ?';
        conexion.query(eliminar, [nombreEliminar], function(err, result) {
            if (err) {
                console.log(err);
                return res.status(500).send('Error al eliminar autor');
            }
            res.send('Autor eliminado correctamente');
        });
    });
};

//Controllers para editar un autor
exports.editarAutor = function(req, res) {
    const { nombreOriginal, nombre, nacionalidad } = req.body;

    // Verifica si el autor existe
    const buscarAutor = 'SELECT * FROM autores WHERE nombre = ?';
    conexion.query(buscarAutor, [nombreOriginal], function(err, resultado) {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al buscar autor');
        }
        if (resultado.length === 0) {
            return res.status(404).send('Autor no encontrado');
        }

        // Actualiza el autor
        const actualizar = 'UPDATE autores SET nombre = ?, nacionalidad = ? WHERE nombre = ?';
        conexion.query(actualizar, [nombre, nacionalidad, nombreOriginal], function(err, result) {
            if (err) {
                console.log(err);
                return res.status(500).send('Error al editar autor');
            }
            res.send('Autor editado correctamente');
        });
    });
};