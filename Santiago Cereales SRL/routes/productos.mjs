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

// Endpoint 2: GET /productos/:categoriaId
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

export default router;