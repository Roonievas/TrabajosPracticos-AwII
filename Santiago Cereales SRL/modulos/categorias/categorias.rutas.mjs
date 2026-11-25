import { Router } from "express";
import * as controlador from "./categorias.controlador.mjs";

const rutasCategorias = new Router();

/**
 * @swagger
 * /api/v1/categorias:
 *   get:
 *     summary: Obtener todas las categorías de productos
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 *       500:
 *         description: Error al obtener las categorías
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
rutasCategorias.get("/api/v1/categorias", controlador.obtenerCategorias);

export default rutasCategorias;
