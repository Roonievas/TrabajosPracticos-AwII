import { Router } from "express";
import * as controlador from "./auth.controlador.mjs";

const rutasAuth = new Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Iniciar sesión como administrador
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Sesión iniciada. Guarda el token en una cookie httpOnly firmada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [mensaje, username]
 *               properties:
 *                 mensaje: { type: string, example: Inicio de sesión exitoso }
 *                 username: { type: string, example: admin }
 *       400:
 *         description: Falta el usuario o la contraseña
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Usuario o contraseña incorrectos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno al iniciar sesión
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
rutasAuth.post("/api/v1/auth/login", controlador.login);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Cerrar sesión
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Sesión cerrada, se borra la cookie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensaje'
 */
rutasAuth.post("/api/v1/auth/logout", controlador.logout);

/**
 * @swagger
 * /api/v1/auth/estado:
 *   get:
 *     summary: Consultar si hay una sesión de administrador activa
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Indica si el usuario está autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EstadoSesion'
 */
rutasAuth.get("/api/v1/auth/estado", controlador.estado);

export default rutasAuth;
