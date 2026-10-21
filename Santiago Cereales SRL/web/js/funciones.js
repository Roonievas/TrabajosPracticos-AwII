export function renderizarProductos(contenedor, listaProductos) {

    contenedor.innerHTML = "";

    if (listaProductos.length === 0) {

        contenedor.innerHTML = `
            <p>No se encontraron productos.</p>
        `;

        return;
    }

    listaProductos.forEach(producto => {

        contenedor.innerHTML += `
            <article class="producto" data-id="${producto.id}">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <button class="boton boton--verde" type="button">Ver productos</button>
            </article>
        `;

    });

}

export function renderizarDetalleProductos(contenedor, listaProductos, nombreCategoria) {

    contenedor.innerHTML = `<h2 class="detalle-productos__titulo">Productos de ${nombreCategoria}</h2>`;

    if (listaProductos.length === 0) {

        contenedor.innerHTML += `
            <p>No se encontraron productos en esta categoría.</p>
        `;

        return;
    }

    listaProductos.forEach(producto => {

        contenedor.innerHTML += `
            <article class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p class="producto__marca">${producto.marca}</p>
                <p class="producto__descripcion">${producto.descripcion}</p>
                <a class="boton boton--verde" href="https://wa.me/5493513931308" target="_blank">Consultar Disponibilidad</a>
            </article>
        `;

    });

}

export function filtrarProductos(productos, textoBuscado) {

    return productos.filter(producto =>

        producto.nombre
            .toLowerCase()
            .includes(textoBuscado.toLowerCase())

    );

}