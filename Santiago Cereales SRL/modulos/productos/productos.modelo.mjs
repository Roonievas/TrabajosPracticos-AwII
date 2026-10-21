const URL_PRODUCTOS = "https://6aa336e0e7ae868cdf7ab2c1.mockapi.io/productos";

export async function obtenerProductos() {
    const respuesta = await fetch(URL_PRODUCTOS);
    return await respuesta.json();
}

export async function obtenerProducto(id) {
    const respuesta = await fetch(`${URL_PRODUCTOS}/${id}`);
    return await respuesta.json();
}

export async function obtenerProductosPorCategoria(categoriaId) {
    const respuesta = await fetch(URL_PRODUCTOS);
    const todosLosProductos = await respuesta.json();
    return todosLosProductos.filter(
        producto => producto.categoriaId === Number(categoriaId)
    );
}

export async function crearProducto(producto) {
    const respuesta = await fetch(URL_PRODUCTOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
    });
    return await respuesta.json();
}

export async function actualizarProducto(id, producto) {
    const respuesta = await fetch(`${URL_PRODUCTOS}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
    });
    return await respuesta.json();
}

export async function eliminarProducto(id) {
    await fetch(`${URL_PRODUCTOS}/${id}`, { method: "DELETE" });
}
