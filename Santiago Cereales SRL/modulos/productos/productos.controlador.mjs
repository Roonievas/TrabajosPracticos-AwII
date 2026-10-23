import multer from "multer";
import path from "node:path";
import * as modelo from "./productos.modelo.mjs";

// Multer: guarda la imagen subida en web/recursos/productos-subidos.
// A diferencia del ejemplo básico del profe (que usa "dest" y guarda el
// archivo sin extensión), acá usamos "diskStorage" con una función de
// nombre propia para conservar la extensión original (.jpg, .png, etc.).
const subirImagen = multer({
    storage: multer.diskStorage({
        destination: path.resolve("web/recursos/productos-subidos"),
        filename: (req, archivo, callback) => {
            const extension = path.extname(archivo.originalname);
            const nombreUnico = `${Date.now()}${extension}`;
            callback(null, nombreUnico);
        }
    })
}).single("imagen");

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

export function crearProducto(req, res) {
    subirImagen(req, res, async (error) => {
        if (error) {
            console.error("Error al subir la imagen:", error);
            return res.status(500).json({ mensaje: "No se pudo subir la imagen" });
        }
        try {
            const nuevoProducto = {
                nombre: req.body.nombre,
                categoriaId: Number(req.body.categoriaId),
                marca: req.body.marca,
                descripcion: req.body.descripcion,
                imagen: req.file ? `/recursos/productos-subidos/${req.file.filename}` : null
            };
            const productoCreado = await modelo.crearProducto(nuevoProducto);
            res.status(201).json(productoCreado);
        } catch (error) {
            console.error("Error al crear el producto:", error);
            res.status(500).json({ mensaje: "Error al crear el producto" });
        }
    });
}

export function actualizarProducto(req, res) {
    subirImagen(req, res, async (error) => {
        if (error) {
            console.error("Error al subir la imagen:", error);
            return res.status(500).json({ mensaje: "No se pudo subir la imagen" });
        }
        try {
            const id = req.params.id;
            const datosActualizados = {
                nombre: req.body.nombre,
                categoriaId: Number(req.body.categoriaId),
                marca: req.body.marca,
                descripcion: req.body.descripcion,
                imagen: req.file ? `/recursos/productos-subidos/${req.file.filename}` : null
            };
            const productoActualizado = await modelo.actualizarProducto(id, datosActualizados);
            res.json(productoActualizado);
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            res.status(500).json({ mensaje: "Error al actualizar el producto" });
        }
    });
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
