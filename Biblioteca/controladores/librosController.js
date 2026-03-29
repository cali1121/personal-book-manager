const conexion = require('../js/conexion.js');
//controller para crear un libro a la base de datos.
exports.crearLibro = function(req, res) {
    const datos = req.body;

    let title = datos.titulo;
    let authorName = datos.autor;
    let genreName = datos.genero;
    let status = datos.estado;

    // Buscar el ID del autor por nombre
    let buscarAutor = 'SELECT id FROM autores WHERE nombre = ?';
    conexion.query(buscarAutor, [authorName], function(err, resultadoAutor) {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al buscar autor. Verifica el nombre del autor y que este ingresado a la base de datos.');
        }
        if (resultadoAutor.length === 0) {
            return res.status(404).send('Autor no encontrado. Verifica el nombre del autor y que este ingresado a la base de datos.');
        }
        let authorId = resultadoAutor[0].id;

        // Buscar el ID del género por nombre
        let buscarGenero = 'SELECT id FROM generos WHERE nombre = ?';
        conexion.query(buscarGenero, [genreName], function(err, resultadoGenero) {
            if (err) {
                console.log(err);
                return res.status(500).send('Error al buscar género. Verifica el nombre del genero y que este ingresado a la base de datos.');
            }
            if (resultadoGenero.length === 0) {
                return res.status(404).send('Género no encontrado. Verifica el nombre del genero y que este ingresado a la base de datos.');
            }
            let genreId = resultadoGenero[0].id;

            // Insertar el libro usando los IDs encontrados
            let registrar = 'INSERT INTO libros (titulo, autor_id, genero_id, estado) VALUES (?, ?, ?, ?)';
            conexion.query(registrar, [title, authorId, genreId, status], function(err, result) {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error al registrar libro');
                }
                res.send('Libro registrado correctamente');
            });
        });
    });
};
//cierre de controller para agregar un libro a la base de datos.

//controller para eliminar un libro de la base de datos.
exports.eliminarLibro = function(req, res) {
    const titulo = req.body.tituloEliminar;

    // Verificar si el libro existe
    let verificarLibro = 'SELECT * FROM libros WHERE titulo = ?';
    conexion.query(verificarLibro, [titulo], function(err, resultado) {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al verificar libro');
        }
        if (resultado.length === 0) {
            return res.status(404).send('Libro no encontrado');
        }

        // Eliminar el libro
        let eliminar = 'DELETE FROM libros WHERE titulo = ?';
        conexion.query(eliminar, [titulo], function(err, result) {
            if (err) {
                console.log(err);
                return res.status(500).send('Error al eliminar libro');
            }
            res.send('Libro eliminado correctamente');
        });
    });
};
//Cierre de controller para eliminar un libro de la base de datos.

exports.editarLibro = function(req, res) {
    const { tituloOriginal, titulo, autor, genero, estado } = req.body;

    // Buscar el ID del autor por nombre
    let buscarAutor = 'SELECT id FROM autores WHERE nombre = ?';
    conexion.query(buscarAutor, [autor], function(err, resultadoAutor) {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al buscar autor');
        }
        if (resultadoAutor.length === 0) {
            return res.status(404).send('Autor no encontrado');
        }
        let authorId = resultadoAutor[0].id;

        // Buscar el ID del género por nombre
        let buscarGenero = 'SELECT id FROM generos WHERE nombre = ?';
        conexion.query(buscarGenero, [genero], function(err, resultadoGenero) {
            if (err) {
                console.log(err);
                return res.status(500).send('Error al buscar género');
            }
            if (resultadoGenero.length === 0) {
                return res.status(404).send('Género no encontrado');
            }
            let genreId = resultadoGenero[0].id;

            // Actualizar el libro usando los IDs encontrados
            let actualizar = 'UPDATE libros SET titulo=?, autor_id=?, genero_id=?, estado=? WHERE titulo=?';
            conexion.query(actualizar, [titulo, authorId, genreId, estado, tituloOriginal], function(err, result) {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error al editar libro');
                }
                res.send('Libro editado correctamente');
            });
        });
    });
};