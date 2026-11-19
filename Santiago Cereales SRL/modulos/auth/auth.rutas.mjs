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
 *             type: object
 *             properties:
 *               username: { type: string, example: admin }
 *               password: { type: string, example: admin123 }
 *     responses:
 *       200:
 *         description: Sesión iniciada. Guarda el token en una cookie httpOnly firmada.
 *       400:
 *         description: Falta el usuario o la contraseña
 *       401:
 *         description: Usuario o contraseña incorrectos
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
 *               type: object
 *               properties:
 *                 autenticado: { type: boolean }
 *                 username: { type: string, example: admin }
 */
rutasAuth.get("/api/v1/auth/estado", controlador.estado);

export default rutasAuth;
