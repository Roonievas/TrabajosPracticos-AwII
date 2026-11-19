// Vuelve a crear las tablas (categorias, productos, usuarios) desde cero,
// usando db/santiago_cereales.sql. Sirve para dejar la base en un estado
// conocido, por ejemplo la primera vez que alguien clona el proyecto.
//
// Requiere que el contenedor de PostgreSQL ya esté corriendo (ver README).
import fs from "node:fs";
import path from "node:path";
import pool from "./conexion.mjs";

async function recrearBaseDeDatos() {
    const rutaScript = path.resolve("db/santiago_cereales.sql");
    const script = fs.readFileSync(rutaScript, "utf-8");

    console.log("Recreando la base de datos desde db/santiago_cereales.sql...");
    await pool.query(script);
    console.log("Listo: categorias, productos y usuarios quedaron recreados.");

    await pool.end();
}

recrearBaseDeDatos().catch((error) => {
    console.error("No se pudo recrear la base de datos.");
    console.error(error);
    process.exit(1);
});
