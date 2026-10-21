import * as modelo from "./categorias.modelo.mjs";

export async function obtenerCategorias(req, res) {
    try {
        const categorias = await modelo.obtenerCategorias();
        res.json(categorias);
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        res.status(500).json({ mensaje: "Error al obtener las categorías" });
    }
}
