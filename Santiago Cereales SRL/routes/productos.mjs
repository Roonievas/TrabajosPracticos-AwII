import { Router } from "express";

const router = Router();

const URL_CATEGORIAS = "https://6aa336e0e7ae868cdf7ab2c1.mockapi.io/categorias";
const URL_PRODUCTOS = "https://6aa336e0e7ae868cdf7ab2c1.mockapi.io/productos";

// Endpoint 1: GET /categorias
router.get("/categorias", async (req, res) => {
    try {
        const respuesta = await fetch(URL_CATEGORIAS);
        const categorias = await respuesta.json();
        res.json(categorias);
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        res.status(500).json({ mensaje: "Error al obtener las categorías" });
    }
});

// Endpoint 2: GET /productos (todos los productos, sin filtrar)
// Se usa para el listado del ABM (tabla de Baja/Modificación).
router.get("/productos", async (req, res) => {
    try {
        const respuesta = await fetch(URL_PRODUCTOS);
        const productos = await respuesta.json();
        res.json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ mensaje: "Error al obtener los productos" });
    }
});

// Endpoint 3: GET /productos/:categoriaId (productos de una categoría puntual)
router.get("/productos/:categoriaId", async (req, res) => {
    try {
        const categoriaId = req.params.categoriaId;

        const respuesta = await fetch(URL_PRODUCTOS);
        const todosLosProductos = await respuesta.json();

        const productosFiltrados = todosLosProductos.filter(
            producto => producto.categoriaId === Number(categoriaId)
        );

        res.json(productosFiltrados);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ mensaje: "Error al obtener los productos" });
    }
});

// Endpoint 4 (ALTA): POST /productos
router.post("/productos", async (req, res) => {
    try {
        const nuevoProducto = req.body;
        const respuesta = await fetch(URL_PRODUCTOS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoProducto)
        });
        const productoCreado = await respuesta.json();
        res.status(201).json(productoCreado);
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ mensaje: "Error al crear el producto" });
    }
});

// Endpoint 5 (MODIFICACIÓN): PUT /productos/:id
router.put("/productos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const datosActualizados = req.body;
        const respuesta = await fetch(`${URL_PRODUCTOS}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosActualizados)
        });
        const productoActualizado = await respuesta.json();
        res.json(productoActualizado);
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ mensaje: "Error al actualizar el producto" });
    }
});

// Endpoint 6 (BAJA): DELETE /productos/:id
router.delete("/productos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await fetch(`${URL_PRODUCTOS}/${id}`, { method: "DELETE" });
        res.status(200).json({ mensaje: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ mensaje: "Error al eliminar el producto" });
    }
});

export default router;
