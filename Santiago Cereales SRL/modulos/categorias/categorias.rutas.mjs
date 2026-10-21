import { Router } from "express";
import * as controlador from "./categorias.controlador.mjs";

const rutasCategorias = new Router();

rutasCategorias.get("/api/v1/categorias", controlador.obtenerCategorias);

export default rutasCategorias;
