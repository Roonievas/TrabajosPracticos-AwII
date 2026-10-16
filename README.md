# Santiago Cereales SRL

Sitio web de Santiago Cereales SRL, desarrollado para la materia **Aplicaciones Web II** (Colegio Universitario IES).

El proyecto nació en Aplicaciones Web I como un sitio estático (HTML/CSS/JS). En Aplicaciones Web II se le agregó un **back-end propio** (Node.js + Express) que sirve el sitio y expone endpoints propios, los cuales consultan los datos de categorías y productos desde una API externa (MockAPI) en lugar de un archivo JSON local.

## Equipo

- Rocío Nievas
- [completar con los demás integrantes]

## Tecnologías utilizadas

- **Node.js** — entorno de ejecución de JavaScript del lado del servidor.
- **Express.js** — framework para el servidor y la definición de rutas (endpoints).
- **ES Modules** (`.mjs`, `import`/`export`) — sistema de módulos utilizado en todo el proyecto.
- **MockAPI** — API externa donde están cargados los datos de categorías y productos.
- **pnpm** — gestor de paquetes del proyecto (no usar `npm install`, ver más abajo).

## Requisitos previos

- Tener instalado [Node.js](https://nodejs.org/) (incluye `npm`).
- Tener instalado **pnpm**. Si al correr `pnpm -v` da error de "comando no reconocido", instalarlo una única vez con:
  ```
  npm install -g pnpm
  ```

## Cómo clonar y ejecutar el proyecto

1. Clonar el repositorio:
   ```
   git clone https://github.com/Roonievas/TrabajosPracticos-AwII.git
   ```

2. Entrar a la carpeta del proyecto (dentro del repo clonado, el proyecto está en la subcarpeta `Santiago Cereales SRL`):
   ```
   cd "TrabajosPracticos-AwII/Santiago Cereales SRL"
   ```

3. Instalar las dependencias:
   ```
   pnpm install
   ```

4. Levantar el servidor:
   ```
   node server.mjs
   ```
   En la consola debería aparecer:
   ```
   Servidor corriendo en http://localhost:3000
   ```

5. Abrir el navegador en **http://localhost:3000**.

   Importante: la página tiene que abrirse siempre desde esa URL (servida por el servidor de Node), y no abriendo el archivo `index.html` directamente con doble click — de esa segunda forma el sitio no puede pedirle los datos de categorías/productos al servidor.

## Gestor de paquetes: usar siempre pnpm

Este proyecto usa **pnpm**, no `npm`. Para instalar o agregar dependencias nuevas, usar siempre:
```
pnpm install
pnpm add <paquete>
```
y no `npm install` / `npm install <paquete>`, para evitar que se generen `package-lock.json` (de npm) junto con `pnpm-lock.yaml` (de pnpm) al mismo tiempo.

## Estructura del proyecto

```
Santiago Cereales SRL/
├─ server.mjs                     # configura y levanta el servidor
├─ routes/
│  └─ productos.mjs                # define los endpoints propios
├─ css/                            # estilos del Front-End
├─ js/                             # scripts del Front-End
├─ recursos/                       # imágenes y otros recursos
├─ index.html
├─ paginas/
│  ├─ empresa.html
│  ├─ contacto.html
│  ├─ serviciosyproductos.html
│  ├─ abmProductos.html            # ABM de productos (Alta, Baja, Modificación)
│  └─ plantilla.html               # base para futuras páginas
├─ package.json
└─ pnpm-lock.yaml
```

## Endpoints disponibles

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/categorias` | Obtiene todas las categorías de productos disponibles. |
| GET | `/productos` | Obtiene todos los productos (sin filtrar). Lo usa la tabla del ABM. |
| GET | `/productos/:categoriaId` | Obtiene los productos pertenecientes a una categoría específica. |


## Middlewares utilizados

- `express.static(".")` — sirve los archivos estáticos del Front-End.
- `productosRouter` — agrupa y registra las rutas propias del proyecto.
- `express.json()` — permite leer el cuerpo (`body`) de las peticiones que llegan en formato JSON (necesario para los endpoints POST y PUT).
- `logger` (propio) — registra en consola el método y la ruta de cada petición recibida.

## ABM de productos (`paginas/abmProductos.html`)

Pantalla que permite dar de Alta un producto, Modificar uno existente (botón "Editar" en la tabla) y darlo de Baja (botón "Eliminar"). Usa los endpoints POST, PUT y DELETE de la tabla anterior.

**Limitación conocida (a propósito, por ahora):** cualquier persona que entre a esta página puede cargar, editar o borrar productos — todavía no hay un login que restrinja esto solo al administrador. Es intencional: la seguridad y el control de acceso del CRUD están planificados para el TP4, no para esta entrega.

## Roadmap del proyecto (según cronograma de la materia)

- **TP2**: back-end propio + conexión a API externa. ✅
- **TP3**: ABM de productos (Alta, Baja, Modificación). ✅
- **TP4**: login y seguridad del CRUD (pendiente — restringir el ABM al administrador).
