import pool from "../../db/conexion.mjs";

export async function obtenerProductos() {
    const resultado = await pool.query(
        `SELECT id, nombre, marca, descripcion, imagen, categoria_id AS "categoriaId"
         FROM productos`
    );
    return resultado.rows;
}

export async function obtenerProducto(id) {
    const resultado = await pool.query(
        `SELECT id, nombre, marca, descripcion, imagen, categoria_id AS "categoriaId"
         FROM productos
         WHERE id = $1`,
        [id]
    );
    return resultado.rows[0];
}

export async function obtenerProductosPorCategoria(categoriaId) {
    const resultado = await pool.query(
        `SELECT id, nombre, marca, descripcion, imagen, categoria_id AS "categoriaId"
         FROM productos
         WHERE categoria_id = $1`,
        [categoriaId]
    );
    return resultado.rows;
}

export async function crearProducto(producto) {
    const { nombre, marca, descripcion, imagen, categoriaId } = producto;
    const resultado = await pool.query(
        `INSERT INTO productos (nombre, marca, descripcion, imagen, categoria_id)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, nombre, marca, descripcion, imagen, categoria_id AS "categoriaId"`,
        [nombre, marca, descripcion, imagen, categoriaId]
    );
    return resultado.rows[0];
}

export async function actualizarProducto(id, producto) {
    const { nombre, marca, descripcion, imagen, categoriaId } = producto;
    // COALESCE(a, b) devuelve "a" si no es null, y si no devuelve "b".
    // Lo usamos para la imagen: si no llega una nueva (imagen = null),
    // se mantiene la que el producto ya tenía guardada en la base.
    const resultado = await pool.query(
        `UPDATE productos
         SET nombre = $1, marca = $2, descripcion = $3, imagen = COALESCE($4, imagen), categoria_id = $5
         WHERE id = $6
         RETURNING id, nombre, marca, descripcion, imagen, categoria_id AS "categoriaId"`,
        [nombre, marca, descripcion, imagen, categoriaId, id]
    );
    return resultado.rows[0];
}

export async function eliminarProducto(id) {
    await pool.query("DELETE FROM productos WHERE id = $1", [id]);
}
