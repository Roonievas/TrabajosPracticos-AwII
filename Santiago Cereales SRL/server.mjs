import express from "express";
import productosRouter from "./routes/productos.mjs";

const app = express();
const PUERTO = 3000;

app.use(express.static("."));
app.use(productosRouter);

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});