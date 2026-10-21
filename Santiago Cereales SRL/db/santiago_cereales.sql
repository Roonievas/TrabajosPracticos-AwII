-- Base de datos del proyecto Santiago Cereales SRL (TP3)
-- Reemplaza a MockAPI como fuente de datos real.

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    imagen VARCHAR(255)
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    marca VARCHAR(100),
    descripcion TEXT,
    imagen VARCHAR(255),
    categoria_id INTEGER REFERENCES categorias(id)
);

-- Categorías reales de la empresa (las mismas que ya teníamos en MockAPI)
INSERT INTO categorias (nombre, imagen) VALUES
    ('Herbicidas', '/recursos/servicios-productos/herbicidas.jpg'),
    ('Fungicidas', '/recursos/servicios-productos/fungicidas.jpg'),
    ('Fertilizantes', '/recursos/servicios-productos/fertilizantes.jpg'),
    ('Semillas', '/recursos/servicios-productos/semillas.jpg'),
    ('Insecticidas', '/recursos/servicios-productos/insecticidas.jpg');

-- La tabla "productos" arranca vacía: los vamos a cargar de verdad
-- usando la pantalla de Alta del ABM, una vez conectada a esta base.
