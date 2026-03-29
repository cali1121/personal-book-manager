
-- Crear base de datos
DROP DATABASE IF EXISTS gestor;
CREATE DATABASE gestor;
USE gestor;

-- Crear tabla de géneros
CREATE TABLE generos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

-- Crear tabla de autores
CREATE TABLE autores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  nacionalidad VARCHAR(100) NOT NULL
);

-- Crear tabla de libros
CREATE TABLE libros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  autor_id INT NOT NULL,
  genero_id INT NOT NULL,
  estado VARCHAR(50) NOT NULL,
  isbn VARCHAR(30),
  FOREIGN KEY (autor_id) REFERENCES autores(id) ON DELETE RESTRICT,
  FOREIGN KEY (genero_id) REFERENCES generos(id) ON DELETE RESTRICT
);

-- Insertar géneros
INSERT INTO generos (nombre) VALUES
('Ciencia ficción'),
('Fantasía'),
('Novela histórica'),
('Terror'),
('Ciencia clásica');

-- Insertar autores
INSERT INTO autores (nombre, nacionalidad) VALUES
('Isaac Asimov', 'Rusia'),
('J.K. Rowling', 'Reino Unido'),
('Ken Follett', 'Reino Unido'),
('Stephen King', 'Estados Unidos'),
('Brandon Sanderson', 'Estados Unidos'),
('Peter V. Brett', 'Estados Unidos'),
('Ernest Cline', 'Estados Unidos'),
('Federico Toledo', 'Uruguay'),
('Jules Verne', 'Francia');

-- Insertar libros
INSERT INTO libros (titulo, autor_id, genero_id, estado, isbn) VALUES
('Fundación', 1, 1, 'Terminado', '978-0553293357'),
('Harry Potter y la piedra filosofal', 2, 2, 'Leyendo', '978-0590353427'),
('Los pilares de la Tierra', 3, 3, 'Por leer', '978-0451166890'),
('El resplandor', 4, 4, 'Por leer', '978-0307743657'),
('Fundación e Imperio', 1, 1, 'Por leer', '978-0553293371'),
('Harry Potter y la cámara secreta', 2, 2, 'Por leer', '978-0439064873'),
('Elantris', 5, 2, 'Terminado', '978-0765311771'),
('El Imperio Final', 5, 2, 'Leyendo', '978-0765311788'),
('El Pozo de la Ascensión', 5, 2, 'Por leer', '978-0765316882'),
('El Héroe de las Eras', 5, 2, 'Por leer', '978-0765316899'),
('The Warded Man', 6, 2, 'Por leer', '9780345503800'),
('The Desert Spear', 6, 2, 'Por leer', '9780345503817'),
('The Daylight War', 6, 2, 'Por leer', '9780345503824'),
('The Skull Throne', 6, 2, 'Por leer', '9780345531483'),
('The Core', 6, 2, 'Por leer', '9780345531506'),
('Ready Player One', 7, 1, 'Por leer', '9780307887436'),
('Armada', 7, 1, 'Por leer', '9780804137256'),
('Introducción a las Pruebas de Sistemas de Información', 8, 3, 'Por leer', '9789915426341'),
('Around the World in Eighty Days', 9, 5, 'Por leer', '9780140449068'),
('Journey to the Center of the Earth', 9, 5, 'Por leer', '9780553213973'),
('From the Earth to the Moon', 9, 5, 'Por leer', '9780553214208');

ALTER TABLE libros DROP FOREIGN KEY libros_ibfk_1;

ALTER TABLE libros
ADD CONSTRAINT libros_ibfk_1
FOREIGN KEY (autor_id) REFERENCES autores(id)
ON DELETE CASCADE;

SELECT * FROM LIBROS;