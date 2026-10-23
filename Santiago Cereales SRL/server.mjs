import express from "express";
import swaggerUi from "swagger-ui-express";
import especificacionSwagger from "./swagger.mjs";
import rutasCategorias from "./modulos/categorias/categorias.rutas.mjs";
import rutasProductos from "./modulos/productos/productos.rutas.mjs";

const app = express();
const PUERTO = 3000;

function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}

app.use(logger);
app.use(express.json());
app.use(express.static("web"));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(especificacionSwagger));
app.use(rutasCategorias);
app.use(rutasProductos);

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
    console.log(`Documentación disponible en http://localhost:${PUERTO}/api/docs`);
});
