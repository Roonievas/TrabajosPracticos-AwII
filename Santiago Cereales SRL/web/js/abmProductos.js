// Script de la página "Gestión de Productos" (ABM: Alta, Baja y Modificación).

let categorias = [];
let modoEdicion = false;

const formulario = document.getElementById("formulario-abm");
const inputId = document.getElementById("input-id");
const inputNombre = document.getElementById("input-nombre");
const inputCategoria = document.getElementById("input-categoria");
const inputMarca = document.getElementById("input-marca");
const inputDescripcion = document.getElementById("input-descripcion");
const inputImagen = document.getElementById("input-imagen");

const etiquetaFormulario = document.getElementById("etiqueta-formulario");
const tituloFormulario = document.getElementById("titulo-formulario");
const botonGuardar = document.getElementById("boton-guardar");
const botonCancelar = document.getElementById("boton-cancelar");

const cuerpoTabla = document.getElementById("cuerpo-tabla-productos");

// ---------------------------------------------------------------------
// Cargar categorías en el <select> del formulario
// ---------------------------------------------------------------------
function cargarCategorias() {
    fetch("/api/v1/categorias")
        .then(respuesta => respuesta.json())
        .then(datos => {
            categorias = datos;

            categorias.forEach(categoria => {
                const opcion = document.createElement("option");
                opcion.value = categoria.id;
                opcion.textContent = categoria.nombre;
                inputCategoria.appendChild(opcion);
            });
        })
        .catch(error => {
            console.error("Error cargando categorías:", error);
        });
}

// Busca el nombre de una categoría a partir de su id (para mostrarlo en la tabla)
function nombreDeCategoria(categoriaId) {
    const categoria = categorias.find(c => Number(c.id) === Number(categoriaId));
    return categoria ? categoria.nombre : "(sin categoría)";
}

// ---------------------------------------------------------------------
// Cargar y dibujar la tabla de productos
// ---------------------------------------------------------------------
function cargarProductos() {
    fetch("/api/v1/productos")
        .then(respuesta => respuesta.json())
        .then(datos => {
            renderizarTabla(datos);
        })
        .catch(error => {
            console.error("Error cargando productos:", error);
        });
}

function renderizarTabla(productos) {
    cuerpoTabla.innerHTML = "";

    if (productos.length === 0) {
        cuerpoTabla.innerHTML = `<tr><td colspan="6">Todavía no hay productos cargados.</td></tr>`;
        return;
    }

    productos.forEach(producto => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td><img src="${producto.imagen}" alt="${producto.nombre}" width="60"></td>
            <td>${producto.nombre}</td>
            <td>${producto.marca}</td>
            <td>${nombreDeCategoria(producto.categoriaId)}</td>
            <td>${producto.descripcion}</td>
            <td>
                <button type="button" class="boton-editar" data-id="${producto.id}">Editar</button>
                <button type="button" class="boton-eliminar" data-id="${producto.id}">Eliminar</button>
            </td>
        `;

        cuerpoTabla.appendChild(fila);
    });

    activarBotonesDeLaTabla(productos);
}

function activarBotonesDeLaTabla(productos) {
    cuerpoTabla.querySelectorAll(".boton-editar").forEach(boton => {
        boton.addEventListener("click", () => {
            const id = boton.dataset.id;
            const producto = productos.find(p => String(p.id) === id);
            if (producto) {
                entrarEnModoEdicion(producto);
            }
        });
    });

    cuerpoTabla.querySelectorAll(".boton-eliminar").forEach(boton => {
        boton.addEventListener("click", () => {
            const id = boton.dataset.id;
            eliminarProducto(id);
        });
    });
}

// ---------------------------------------------------------------------
// Modo edición (Modificación)
// ---------------------------------------------------------------------
function entrarEnModoEdicion(producto) {
    modoEdicion = true;

    inputId.value = producto.id;
    inputNombre.value = producto.nombre;
    inputCategoria.value = producto.categoriaId;
    inputMarca.value = producto.marca;
    inputDescripcion.value = producto.descripcion;
    // Un input type="file" no se puede precargar con JavaScript por seguridad
    // del navegador. Lo dejamos vacío: si no se elige una imagen nueva, el
    // servidor mantiene la que el producto ya tenía (ver productos.modelo.mjs).
    inputImagen.value = "";

    etiquetaFormulario.textContent = "MODIFICACIÓN DE PRODUCTO";
    tituloFormulario.textContent = `Editando: ${producto.nombre}`;
    botonGuardar.textContent = "Actualizar producto";
    botonCancelar.classList.remove("oculto");

    formulario.scrollIntoView({ behavior: "smooth" });
}

function salirDeModoEdicion() {
    modoEdicion = false;

    formulario.reset();
    inputId.value = "";

    etiquetaFormulario.textContent = "ALTA DE PRODUCTO";
    tituloFormulario.textContent = "Cargar un producto nuevo";
    botonGuardar.textContent = "Guardar producto";
    botonCancelar.classList.add("oculto");
}

botonCancelar.addEventListener("click", salirDeModoEdicion);

// ---------------------------------------------------------------------
// Alta y Modificación: ambas se envían desde el mismo formulario
// ---------------------------------------------------------------------
formulario.addEventListener("submit", evento => {
    evento.preventDefault();

    const datosFormulario = new FormData();
    datosFormulario.append("nombre", inputNombre.value.trim());
    datosFormulario.append("categoriaId", inputCategoria.value);
    datosFormulario.append("marca", inputMarca.value.trim());
    datosFormulario.append("descripcion", inputDescripcion.value.trim());

    // Solo se agrega el archivo si se eligió uno (si no, el campo queda afuera
    // del FormData y el servidor interpreta que hay que mantener la imagen actual).
    if (inputImagen.files.length > 0) {
        datosFormulario.append("imagen", inputImagen.files[0]);
    }

    if (modoEdicion) {
        actualizarProducto(inputId.value, datosFormulario);
    } else {
        crearProducto(datosFormulario);
    }
});

function crearProducto(datosFormulario) {
    fetch("/api/v1/productos", {
        method: "POST",
        body: datosFormulario
    })
        .then(respuesta => respuesta.json())
        .then(() => {
            salirDeModoEdicion();
            cargarProductos();
        })
        .catch(error => {
            console.error("Error creando el producto:", error);
            alert("No se pudo guardar el producto. Probá de nuevo.");
        });
}

function actualizarProducto(id, datosFormulario) {
    fetch(`/api/v1/productos/${id}`, {
        method: "PUT",
        body: datosFormulario
    })
        .then(respuesta => respuesta.json())
        .then(() => {
            salirDeModoEdicion();
            cargarProductos();
        })
        .catch(error => {
            console.error("Error actualizando el producto:", error);
            alert("No se pudo actualizar el producto. Probá de nuevo.");
        });
}

// ---------------------------------------------------------------------
// Baja
// ---------------------------------------------------------------------
function eliminarProducto(id) {
    const confirmado = confirm("¿Seguro que querés eliminar este producto? Esta acción no se puede deshacer.");

    if (!confirmado) {
        return;
    }

    fetch(`/api/v1/productos/${id}`, { method: "DELETE" })
        .then(() => {
            cargarProductos();
        })
        .catch(error => {
            console.error("Error eliminando el producto:", error);
            alert("No se pudo eliminar el producto. Probá de nuevo.");
        });
}

// ---------------------------------------------------------------------
// Inicio
// ---------------------------------------------------------------------
cargarCategorias();
cargarProductos();
