-- Base de datos del proyecto Santiago Cereales SRL (TP3 / TP4)
-- Reemplaza a MockAPI como fuente de datos real.

-- Borra las tablas si ya existen, para que este script se pueda correr
-- las veces que haga falta y siempre deje la base en el mismo estado
-- (lo usa el comando "pnpm run db:recrear").
DROP TABLE IF EXISTS productos, categorias, usuarios CASCADE;

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

-- Usuarios administradores (TP4): quienes pueden gestionar productos.
-- La contraseña nunca se guarda en texto plano, solo su hash (bcrypt).
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

-- Usuario administrador precargado. Usuario: admin / Contraseña: admin123
INSERT INTO usuarios (username, password_hash) VALUES
    ('admin', '$2b$10$KCG1OrmgBC0toeYw.HiSpOd3mU1GLZW/xPB2jJi3pxDnMxuccXTzW');
