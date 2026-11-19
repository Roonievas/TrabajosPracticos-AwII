import express from "express";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import especificacionSwagger from "./swagger.mjs";
import rutasCategorias from "./modulos/categorias/categorias.rutas.mjs";
import rutasProductos from "./modulos/productos/productos.rutas.mjs";
import rutasAuth from "./modulos/auth/auth.rutas.mjs";

const app = express();
const PUERTO = 3000;

function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}

app.use(logger);
app.use(express.json());
// cookie-parser con COOKIE_SECRET: nos permite leer/escribir cookies firmadas
// (req.signedCookies), para que nadie pueda armarse una cookie de sesión a mano.
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static("web"));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(especificacionSwagger));
app.use(rutasCategorias);
app.use(rutasProductos);
app.use(rutasAuth);

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
    console.log(`Documentación disponible en http://localhost:${PUERTO}/api/docs`);
});
