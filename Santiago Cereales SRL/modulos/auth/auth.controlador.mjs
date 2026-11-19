import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as modelo from "./auth.modelo.mjs";

// Dos horas de sesión: mismo valor para el JWT y para la cookie que lo guarda.
const DURACION_SESION_MS = 2 * 60 * 60 * 1000;

function opcionesCookie() {
    return {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        signed: true,
        maxAge: DURACION_SESION_MS
    };
}

export async function login(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ mensaje: "Faltan el usuario o la contraseña" });
        }

        const usuario = await modelo.buscarUsuarioPorUsername(username);
        if (!usuario) {
            return res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
        }

        const passwordValida = await bcrypt.compare(password, usuario.password_hash);
        if (!passwordValida) {
            return res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
        }

        const token = jwt.sign(
            { username: usuario.username },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.cookie("token", token, opcionesCookie());
        res.status(200).json({ mensaje: "Inicio de sesión exitoso", username: usuario.username });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ mensaje: "Error al iniciar sesión" });
    }
}

export function logout(req, res) {
    res.clearCookie("token", opcionesCookie());
    res.status(200).json({ mensaje: "Sesión cerrada" });
}

export function estado(req, res) {
    const token = req.signedCookies?.token;

    if (!token) {
        return res.json({ autenticado: false });
    }

    try {
        const datos = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ autenticado: true, username: datos.username });
    } catch (error) {
        res.json({ autenticado: false });
    }
}
