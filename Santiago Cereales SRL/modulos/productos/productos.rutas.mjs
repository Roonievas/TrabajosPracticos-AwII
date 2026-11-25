import { Router } from "express";
import * as controlador from "./productos.controlador.mjs";
import { verificarToken } from "../auth/auth.middleware.mjs";

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
 *       500:
 *         description: Error al obtener los productos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
 *       500:
 *         description: Error al obtener los productos de la categoría
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
 *       500:
 *         description: Error al obtener el producto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
rutasProductos.get("/api/v1/productos/:id", controlador.obtenerProducto);

/**
 * @swagger
 * /api/v1/productos:
 *   post:
 *     summary: Dar de alta un producto nuevo
 *     tags: [Productos]
 *     security:
 *       - cookieAuth: []
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
 *             required: [nombre, categoriaId]
 *     responses:
 *       201:
 *         description: Producto creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       401:
 *         description: El usuario no tiene una sesión válida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: No se pudo subir la imagen o crear el producto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
rutasProductos.post("/api/v1/productos", verificarToken, controlador.crearProducto);

/**
 * @swagger
 * /api/v1/productos/{id}:
 *   put:
 *     summary: Modificar un producto existente
 *     tags: [Productos]
 *     security:
 *       - cookieAuth: []
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
 *             required: [nombre, categoriaId]
 *     responses:
 *       200:
 *         description: Producto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       401:
 *         description: El usuario no tiene una sesión válida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: No se pudo subir la imagen o actualizar el producto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
rutasProductos.put("/api/v1/productos/:id", verificarToken, controlador.actualizarProducto);

/**
 * @swagger
 * /api/v1/productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     security:
 *       - cookieAuth: []
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensaje'
 *       401:
 *         description: El usuario no tiene una sesión válida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error al eliminar el producto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
rutasProductos.delete("/api/v1/productos/:id", verificarToken, controlador.eliminarProducto);

export default rutasProductos;
