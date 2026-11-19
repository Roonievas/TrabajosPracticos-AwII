import pool from "../../db/conexion.mjs";

// Busca un usuario administrador por su username. Devuelve undefined si no existe.
export async function buscarUsuarioPorUsername(username) {
    const resultado = await pool.query(
        "SELECT id, username, password_hash FROM usuarios WHERE username = $1",
        [username]
    );
    return resultado.rows[0];
}
