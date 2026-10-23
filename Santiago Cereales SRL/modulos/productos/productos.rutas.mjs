import { Router } from "express";
import * as controlador from "./productos.controlador.mjs";

const rutasProductos = new Router();

/**
 * @swagger
 * /api/v1/productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 */
rutasProductos.get("/api/v1/productos", controlador.obtenerProductos);

/**
 * @swagger
 * /api/v1/productos/categoria/{categoriaId}:
 *   get:
 *     summary: Obtener los productos de una categoría específica
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: categoriaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id de la categoría
 *     responses:
 *       200:
 *         description: Lista de productos de esa categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 */
rutasProductos.get("/api/v1/productos/categoria/:categoriaId", controlador.obtenerProductosPorCategoria);

/**
 * @swagger
 * /api/v1/productos/{id}:
 *   get:
 *     summary: Obtener un producto por su id
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 */
rutasProductos.get("/api/v1/productos/:id", controlador.obtenerProducto);

/**
 * @swagger
 * /api/v1/productos:
 *   post:
 *     summary: Dar de alta un producto nuevo
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               categoriaId:
 *                 type: integer
 *               marca:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               imagen:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de imagen del producto
 *     responses:
 *       201:
 *         description: Producto creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 */
rutasProductos.post("/api/v1/productos", controlador.crearProducto);

/**
 * @swagger
 * /api/v1/productos/{id}:
 *   put:
 *     summary: Modificar un producto existente
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del producto a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               categoriaId:
 *                 type: integer
 *               marca:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               imagen:
 *                 type: string
 *                 format: binary
 *                 description: Opcional. Si no se envía, se mantiene la imagen actual.
 *     responses:
 *       200:
 *         description: Producto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 */
rutasProductos.put("/api/v1/productos/:id", controlador.actualizarProducto);

/**
 * @swagger
 * /api/v1/productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 */
rutasProductos.delete("/api/v1/productos/:id", controlador.eliminarProducto);

export default rutasProductos;
