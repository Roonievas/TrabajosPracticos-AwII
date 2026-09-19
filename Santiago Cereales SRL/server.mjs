import express from "express";
import productosRouter from "./routes/productos.mjs";

const app = express();
const PUERTO = 3000;

function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}

app.use(logger);
app.use(express.json());
app.use(express.static("."));
app.use(productosRouter);

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});