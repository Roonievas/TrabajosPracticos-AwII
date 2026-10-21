import * as modelo from "./productos.modelo.mjs";

export async function obtenerProductos(req, res) {
    try {
        const productos = await modelo.obtenerProductos();
        res.json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ mensaje: "Error al obtener los productos" });
    }
}

export async function obtenerProducto(req, res) {
    try {
        const id = req.params.id;
        const producto = await modelo.obtenerProducto(id);
        res.json(producto);
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).json({ mensaje: "Error al obtener el producto" });
    }
}

export async function obtenerProductosPorCategoria(req, res) {
    try {
        const categoriaId = req.params.categoriaId;
        const productos = await modelo.obtenerProductosPorCategoria(categoriaId);
        res.json(productos);
    } catch (error) {
        console.error("Error al obtener productos de la categoría:", error);
        res.status(500).json({ mensaje: "Error al obtener los productos" });
    }
}

export async function crearProducto(req, res) {
    try {
        const nuevoProducto = req.body;
        const productoCreado = await modelo.crearProducto(nuevoProducto);
        res.status(201).json(productoCreado);
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ mensaje: "Error al crear el producto" });
    }
}

export async function actualizarProducto(req, res) {
    try {
        const id = req.params.id;
        const datosActualizados = req.body;
        const productoActualizado = await modelo.actualizarProducto(id, datosActualizados);
        res.json(productoActualizado);
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ mensaje: "Error al actualizar el producto" });
    }
}

export async function eliminarProducto(req, res) {
    try {
        const id = req.params.id;
        await modelo.eliminarProducto(id);
        res.status(200).json({ mensaje: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ mensaje: "Error al eliminar el producto" });
    }
}
