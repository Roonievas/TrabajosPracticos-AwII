import pool from "../../db/conexion.mjs";

export async function obtenerCategorias() {
    const resultado = await pool.query("SELECT * FROM categorias");
    return resultado.rows;
}
