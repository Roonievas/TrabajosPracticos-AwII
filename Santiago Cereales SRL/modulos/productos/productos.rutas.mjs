import { Router } from "express";
import * as controlador from "./productos.controlador.mjs";

const rutasProductos = new Router();

rutasProductos.get("/api/v1/productos", controlador.obtenerProductos);
rutasProductos.get("/api/v1/productos/categoria/:categoriaId", controlador.obtenerProductosPorCategoria);
rutasProductos.get("/api/v1/productos/:id", controlador.obtenerProducto);
rutasProductos.post("/api/v1/productos", controlador.crearProducto);
rutasProductos.put("/api/v1/productos/:id", controlador.actualizarProducto);
rutasProductos.delete("/api/v1/productos/:id", controlador.eliminarProducto);

export default rutasProductos;
