fetch("/navbar.html").then(response => response.text()).then(data => {
    document.getElementById('navbar-placeholder').innerHTML = data;
    asignarListenersNavbar();
});

//funciones de la pagina de acciones flotante
function abrirForm() {
    document.getElementById('overlay').classList.add('active');
    mostrarMenu();
}

function mostrarMenu() {
    document.getElementById('menu-acciones').style.display = 'block';
    document.getElementById('form-agregarLibro').style.display = 'none';
    document.getElementById('form-eliminarLibro').style.display = 'none';
    document.getElementById('form-agregarAutor').style.display = 'none';
    document.getElementById('form-eliminarAutor').style.display = 'none';
    document.getElementById('form-agregarGenero').style.display = 'none';
    document.getElementById('form-eliminarGenero').style.display = 'none';
}

function mostrarAgregarLibro() {
    document.getElementById('menu-acciones').style.display = 'none';
    document.getElementById('form-agregarLibro').style.display = 'block';
    document.getElementById('form-eliminarLibro').style.display = 'none';
    document.getElementById('form-agregarAutor').style.display = 'none';
    document.getElementById('form-eliminarAutor').style.display = 'none';
    document.getElementById('form-agregarGenero').style.display = 'none';
    document.getElementById('form-eliminarGenero').style.display = 'none';
}

function mostrarEliminarLibro() {
    document.getElementById('menu-acciones').style.display = 'none';
    document.getElementById('form-agregarLibro').style.display = 'none';
    document.getElementById('form-eliminarLibro').style.display = 'block';
    document.getElementById('form-agregarAutor').style.display = 'none';
    document.getElementById('form-eliminarAutor').style.display = 'none';
    document.getElementById('form-agregarGenero').style.display = 'none';
    document.getElementById('form-eliminarGenero').style.display = 'none';
}

function mostrarAgregarAutor() {
    document.getElementById('menu-acciones').style.display = 'none';
    document.getElementById('form-agregarLibro').style.display = 'none';
    document.getElementById('form-eliminarLibro').style.display = 'none';
    document.getElementById('form-agregarAutor').style.display = 'block';
    document.getElementById('form-eliminarAutor').style.display = 'none';
    document.getElementById('form-agregarGenero').style.display = 'none';
    document.getElementById('form-eliminarGenero').style.display = 'none';
}

function mostrarEliminarAutor() {
    document.getElementById('menu-acciones').style.display = 'none';
    document.getElementById('form-agregarLibro').style.display = 'none';
    document.getElementById('form-eliminarLibro').style.display = 'none';
    document.getElementById('form-agregarAutor').style.display = 'none';
    document.getElementById('form-eliminarAutor').style.display = 'block';
    document.getElementById('form-agregarGenero').style.display = 'none';
    document.getElementById('form-eliminarGenero').style.display = 'none';
}

function mostrarAgregarGenero() {
    document.getElementById('menu-acciones').style.display = 'none';
    document.getElementById('form-agregarLibro').style.display = 'none';
    document.getElementById('form-eliminarLibro').style.display = 'none';
    document.getElementById('form-agregarAutor').style.display = 'none';
    document.getElementById('form-eliminarAutor').style.display = 'none';
    document.getElementById('form-agregarGenero').style.display = 'block';
    document.getElementById('form-eliminarGenero').style.display = 'none';
}

function mostrarEliminarGenero() {
    document.getElementById('menu-acciones').style.display = 'none';
    document.getElementById('form-agregarLibro').style.display = 'none';
    document.getElementById('form-eliminarLibro').style.display = 'none';
    document.getElementById('form-agregarAutor').style.display = 'none';
    document.getElementById('form-eliminarAutor').style.display = 'none';
    document.getElementById('form-agregarGenero').style.display = 'none';
    document.getElementById('form-eliminarGenero').style.display = 'block';
}

function volverMenu() {
    mostrarMenu();
}

function cerrarForm() {
    document.getElementById('overlay').classList.remove('active');
    mostrarMenu();
}
//cierre de funciones de la pagina de acciones flotante
// --- Asignar listeners a los formularios del navbar ---
function asignarListenersNavbar() {
    // Agregar libro
    const formLibro = document.getElementById('form-libroadd');
    if (formLibro) {
        formLibro.addEventListener('submit', async function(e) {
            e.preventDefault();
            const datos = {
                titulo: formLibro.titulo.value,
                autor: formLibro.autor.value,
                genero: formLibro.genero.value,
                estado: formLibro.estado.value
            };
            const respuesta = await fetch('/libros/enviar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            if (respuesta.ok) {
                alert('¡Libro registrado correctamente!');
                formLibro.reset();
                cerrarForm();
            } else {
                const error = await respuesta.text();
                alert('Error: ' + error);
            }
        });
    }

    // Eliminar libro
    const formBorrar = document.getElementById('form-librodelete');
    if (formBorrar) {
    formBorrar.addEventListener('submit', async function(e) {
        e.preventDefault();
        await cargarLibros(); 
        const tituloEliminar = document.getElementById('tituloEliminar').value.trim();
        const existe = libros.some(libro => libro.titulo.toLowerCase() === tituloEliminar.toLowerCase());
        if (!existe) {
            alert('No existe un libro con ese título.');
            return;
        }
        const confirmacion = confirm('¿Estás seguro de que deseas eliminar este libro? Esta acción no se puede deshacer.');
        if (!confirmacion) return;
        const respuesta = await fetch('/libros/eliminar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tituloEliminar })
        });
        if (respuesta.ok) {
            alert('Libro eliminado correctamente');
            e.target.reset();
            volverMenu();
        } else {
            const error = await respuesta.text();
            alert('Error: ' + error);
        }
    });
}

    // Agregar autor
    const formAutor = document.getElementById('form-autoradd');
    if (formAutor) {
        formAutor.addEventListener('submit', async function(e) {
            e.preventDefault();
            const datos = {
                nombre: formAutor.nombre.value,
                nacionalidad: formAutor.nacionalidad.value
            };
            const respuesta = await fetch('/autores/enviar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            if (respuesta.ok) {
                alert('Autor registrado correctamente');
                formAutor.reset();
                cerrarForm();
            } else {
                const error = await respuesta.text();
                alert('Error: ' + error);
            }
        });
    }

    // Eliminar autor
    const formAutorDelete = document.getElementById('form-autordelete');
    if (formAutorDelete) {
        formAutorDelete.addEventListener('submit', async function(e) {
            e.preventDefault();
            const nombre = formAutorDelete.nombreEliminar.value;
            const confirmacion = confirm(
                `¿Estás seguro de que deseas eliminar al autor "${nombre}"?\n\nSe eliminarán también TODOS los libros asociados a este autor.`
            );
            if (!confirmacion) return;
            const respuesta = await fetch('/autores/eliminar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombreEliminar: nombre })
            });
            if (respuesta.ok) {
                alert('Autor y sus libros asociados eliminados correctamente');
                formAutorDelete.reset();
                cerrarForm();
            } else {
                const error = await respuesta.text();
                alert('Error: ' + error);
            }
        });
    }

    // Agregar género
    const formGeneroAdd = document.getElementById('form-generoadd');
    if (formGeneroAdd) {
        formGeneroAdd.addEventListener('submit', async function(e) {
            e.preventDefault();
            const nombre = formGeneroAdd.generoadd.value;
            const respuesta = await fetch('/generos/enviar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ generoadd: nombre })
            });
            if (respuesta.ok) {
                alert('Género agregado correctamente');
                formGeneroAdd.reset();
                cerrarForm();
            } else {
                const error = await respuesta.text();
                alert('Error: ' + error);
            }
        });
    }

    // Eliminar género
    const formGeneroDelete = document.getElementById('form-generodelete');
    if (formGeneroDelete) {
        formGeneroDelete.addEventListener('submit', async function(e) {
            e.preventDefault();
            const nombre = formGeneroDelete.generoEliminar.value;
            const confirmacion = confirm(
                `¿Estás seguro de que deseas eliminar el género "${nombre}"?`
            );
            if (!confirmacion) return;
            const respuesta = await fetch('/generos/eliminar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ generoEliminar: nombre })
            });
            if (respuesta.ok) {
                alert('Género eliminado correctamente');
                formGeneroDelete.reset();
                cerrarForm();
            } else {
                const error = await respuesta.text();
                alert('Error: ' + error);
            }
        });
    }
}// Variables 
let autoresGlobal = []; //para el dropdown
let generosGlobal = []; //para el dropdown
let libros = [];
let autores = [];
let generos = [];

// Cargar autores y géneros para dropdowns
async function cargarAutoresYGeneros() {
    const [resAutores, resGeneros] = await Promise.all([
        fetch('/autores/api/autores'),
        fetch('/generos/api/generos')
    ]);
    autoresGlobal = await resAutores.json();
    generosGlobal = await resGeneros.json();
}

// Carga y render de libros
async function cargarLibros() {
    const res = await fetch('/libros/api/libros');
    libros = await res.json();
    renderizarTablaLibros(libros);
}

function renderizarTablaLibros(lista) {
    const tbody = document.getElementById('tabla-libros');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (lista.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="mensaje-vacio">No se encontraron libros.</td></tr>`;
        return;
    }
    lista.forEach(libro => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.genero}</td>
            <td>${libro.estado}</td>
            <td>
                <button type="button" class="editar-libro-btn" data-titulo="${libro.titulo}">Editar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });

    // Edición libros
    tbody.querySelectorAll('.editar-libro-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const titulo = this.getAttribute('data-titulo');
            const libro = lista.find(l => l.titulo === titulo);
            if (!libro) return;
            const fila = this.closest('tr');
            fila.innerHTML = `
                <td><input type="text" value="${libro.titulo}" id="edit-titulo"></td>
                <td>
                    <select id="edit-autor">
                        ${autoresGlobal.map(a => `<option value="${a.nombre}" ${a.nombre === libro.autor ? 'selected' : ''}>${a.nombre}</option>`).join('')}
                    </select>
                </td>
                <td>
                    <select id="edit-genero">
                        ${generosGlobal.map(g => `<option value="${g.nombre}" ${g.nombre === libro.genero ? 'selected' : ''}>${g.nombre}</option>`).join('')}
                    </select>
                </td>
                <td>
                <select id="edit-estado">
                <option value="Por leer" ${libro.estado === "Por leer" ? "selected" : ""}>Por leer</option>
                <option value="Leyendo" ${libro.estado === "Leyendo" ? "selected" : ""}>Leyendo</option>
                <option value="Terminado" ${libro.estado === "Terminado" ? "selected" : ""}>Terminado</option>
                </select>
                </td>
                    <button type="button" class="guardar-libro-btn">Guardar</button>
                    <button type="button" class="cancelar-libro-btn">Cancelar</button>
                </td>
            `;
            // Guardar cambios
            fila.querySelector('.guardar-libro-btn').onclick = async function() {
                const datos = {
                    tituloOriginal: libro.titulo,
                    titulo: fila.querySelector('#edit-titulo').value,
                    autor: fila.querySelector('#edit-autor').value,
                    genero: fila.querySelector('#edit-genero').value,
                    estado: fila.querySelector('#edit-estado').value
                };
                const respuesta = await fetch('/libros/editar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datos)
                });
                if (respuesta.ok) {
                    alert('Libro editado correctamente');
                    cargarLibros();
                } else {
                    const error = await respuesta.text();
                    alert('Error: ' + error);
                }
            };
            // Cancelar edición
            fila.querySelector('.cancelar-libro-btn').onclick = function() {
                renderizarTablaLibros(lista);
            };
        });
    });
}

// Cargar y render autores
async function cargarAutores() {
    const res = await fetch('/autores/api/autores');
    autores = await res.json();
    renderizarTablaAutores(autores);
}

function renderizarTablaAutores(lista) {
    const tablaAutores = document.getElementById('tabla-autores');
    if (!tablaAutores) return;
    const tbody = tablaAutores.querySelector('tbody');
    tbody.innerHTML = '';
    if (lista.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3">No se encontraron autores.</td></tr>`;
        return;
    }
    lista.forEach(autor => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${autor.nombre}</td>
            <td>${autor.nacionalidad}</td>
            <td>
                <button type="button" class="editar-autor-btn" data-nombre="${autor.nombre}">Editar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });

    // Edición 
    tbody.querySelectorAll('.editar-autor-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const nombre = this.getAttribute('data-nombre');
            const autor = lista.find(a => a.nombre === nombre);
            if (!autor) return;
            const fila = this.closest('tr');
            fila.innerHTML = `
                <td><input type="text" value="${autor.nombre}" id="edit-nombre"></td>
                <td><input type="text" value="${autor.nacionalidad}" id="edit-nacionalidad"></td>
                <td>
                    <button type="button" class="guardar-autor-btn">Guardar</button>
                    <button type="button" class="cancelar-autor-btn">Cancelar</button>
                </td>
            `;
            // Guardar cambios
            fila.querySelector('.guardar-autor-btn').onclick = async function() {
                const datos = {
                    nombreOriginal: autor.nombre,
                    nombre: fila.querySelector('#edit-nombre').value,
                    nacionalidad: fila.querySelector('#edit-nacionalidad').value
                };
                const respuesta = await fetch('/autores/editar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datos)
                });
                if (respuesta.ok) {
                    alert('Autor editado correctamente');
                    cargarAutores();
                } else {
                    const error = await respuesta.text();
                    alert('Error: ' + error);
                }
            };
            // Cancelar edición
            fila.querySelector('.cancelar-autor-btn').onclick = function() {
                renderizarTablaAutores(lista);
            };
        });
    });
}

// Cargar y render géneros
async function cargarGeneros() {
    const res = await fetch('/generos/api/generos');
    generos = await res.json();
    renderizarTablaGeneros(generos);
}

function renderizarTablaGeneros(lista) {
    const tablaGeneros = document.getElementById('tabla-generos');
    if (!tablaGeneros) return;
    const tbody = tablaGeneros.querySelector('tbody');
    tbody.innerHTML = '';
    if (lista.length === 0) {
        tbody.innerHTML = `<tr><td class="mensaje-vacio">No se encontraron géneros.</td></tr>`;
        return;
    }
    lista.forEach(genero => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${genero.nombre}</td>
            <td>
                <button type="button" class="editar-genero-btn" data-nombre="${genero.nombre}">Editar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });

    // Edición 
    tbody.querySelectorAll('.editar-genero-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const nombre = this.getAttribute('data-nombre');
            const genero = lista.find(g => g.nombre === nombre);
            if (!genero) return;
            const fila = this.closest('tr');
            fila.innerHTML = `
                <td><input type="text" value="${genero.nombre}" id="edit-nombre-genero"></td>
                <td>
                    <button type="button" class="guardar-genero-btn">Guardar</button>
                    <button type="button" class="cancelar-genero-btn">Cancelar</button>
                </td>
            `;
            // Guardar cambios
            fila.querySelector('.guardar-genero-btn').onclick = async function() {
                const datos = {
                    nombreOriginal: genero.nombre,
                    nombre: fila.querySelector('#edit-nombre-genero').value
                };
                const respuesta = await fetch('/generos/editar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datos)
                });
                if (respuesta.ok) {
                    alert('Género editado correctamente');
                    cargarGeneros();
                } else {
                    const error = await respuesta.text();
                    alert('Error: ' + error);
                }
            };
            // Cancelar edición
            fila.querySelector('.cancelar-genero-btn').onclick = function() {
                renderizarTablaGeneros(lista);
            };
        });
    });
}

// BÚSQUEDA EN TIEMPO REAL
document.addEventListener('DOMContentLoaded', async () => {
    await cargarAutoresYGeneros();

    // Libros
    const tablaLibros = document.getElementById('tabla-libros');
    const buscadorLibros = document.getElementById('buscador-libros');
    if (tablaLibros) {
        cargarLibros();
        if (buscadorLibros) {
            buscadorLibros.addEventListener('input', function() {
                const texto = this.value.toLowerCase();
                const filtrados = libros.filter(libro =>
                    libro.titulo.toLowerCase().includes(texto) ||
                    libro.estado.toLowerCase().includes(texto) ||
                    libro.genero.toLowerCase().includes(texto) ||
                    libro.autor.toLowerCase().includes(texto)
                );
                renderizarTablaLibros(filtrados);
            });
        }
    }

    // Autores
    const tablaAutores = document.getElementById('tabla-autores');
    const buscadorAutor = document.getElementById('buscarAutor');
    if (tablaAutores) {
        cargarAutores();
        if (buscadorAutor) {
            buscadorAutor.addEventListener('input', function() {
                const texto = this.value.toLowerCase();
                const filtrados = autores.filter(autor =>
                    autor.nombre.toLowerCase().includes(texto) ||
                    autor.nacionalidad.toLowerCase().includes(texto)
                );
                renderizarTablaAutores(filtrados);
            });
        }
    }

    // Géneros
    const tablaGeneros = document.getElementById('tabla-generos');
    const buscarGenero = document.getElementById('buscarGenero');
    if (tablaGeneros) {
        cargarGeneros();
        if (buscarGenero) {
            buscarGenero.addEventListener('input', function() {
                const texto = this.value.toLowerCase();
                const filtrados = generos.filter(genero =>
                    genero.nombre.toLowerCase().includes(texto)
                );
                renderizarTablaGeneros(filtrados);
            });
        }
    }
});
//funcion de las estadisticas de la pagina principal
function actualizarEstadisticas() {
    fetch('/api/estadisticas')
        .then(res => res.json())
        .then(data => {
            document.getElementById('stat-libros').textContent = data.libros;
            document.getElementById('stat-autores').textContent = data.autores;
            document.getElementById('stat-generos').textContent = data.generos;
        })
        .catch(() => {
            document.getElementById('stat-libros').textContent = '?';
            document.getElementById('stat-autores').textContent = '?';
            document.getElementById('stat-generos').textContent = '?';
        });
}
document.addEventListener('DOMContentLoaded', actualizarEstadisticas);