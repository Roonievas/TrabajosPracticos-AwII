import {
    renderizarProductos,
    renderizarDetalleProductos,
    filtrarProductos
} from "./funciones.js";

let categorias = [];

const contenedor =
    document.getElementById(
        "contenedor-productos"
    );

const contenedorDetalle =
    document.getElementById(
        "detalle-productos"
    );

const inputBusqueda =
    document.getElementById(
        "buscarProducto"
    );

function activarClicksCategorias() {

    const tarjetas =
        contenedor.querySelectorAll(".producto");

    tarjetas.forEach(tarjeta => {

        tarjeta.addEventListener(
            "click",
            () => {

                const categoriaId =
                    tarjeta.dataset.id;

                mostrarProductosDeCategoria(
                    categoriaId
                );

            }
        );

    });

}

function mostrarProductosDeCategoria(categoriaId) {

    const categoria = categorias.find(
        c => c.id === categoriaId
    );

    fetch(`/productos/${categoriaId}`)

        .then(respuesta => respuesta.json())

        .then(datos => {

            renderizarDetalleProductos(
                contenedorDetalle,
                datos,
                categoria.nombre
            );

            contenedorDetalle.scrollIntoView({
                behavior: "smooth"
            });

        })

        .catch(error => {

            console.error(
                "Error cargando productos de la categoría:",
                error
            );

        });

}

fetch("/categorias")

    .then(respuesta => respuesta.json())

    .then(datos => {

        categorias = datos;

        renderizarProductos(
            contenedor,
            categorias
        );

        activarClicksCategorias();

    })

    .catch(error => {

        console.error(
            "Error cargando categorías:",
            error
        );

    });

inputBusqueda.addEventListener(
    "input",
    () => {

        const categoriasFiltradas =
            filtrarProductos(
                categorias,
                inputBusqueda.value
            );

        renderizarProductos(
            contenedor,
            categoriasFiltradas
        );

        activarClicksCategorias();

    }
);