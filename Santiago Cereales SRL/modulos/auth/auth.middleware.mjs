import jwt from "jsonwebtoken";

// Middleware que protege una ruta: si no hay un token válido, corta el pedido
// con 401 (nunca redirige, para cumplir con la consigna del TP4).
// Si el token es válido, guarda los datos del usuario en req.usuario y sigue.
export function verificarToken(req, res, next) {
    const token = req.signedCookies?.token;

    if (!token) {
        return res.status(401).json({ mensaje: "No autenticado. Iniciá sesión para continuar." });
    }

    try {
        req.usuario = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(401).json({ mensaje: "La sesión expiró o no es válida. Iniciá sesión nuevamente." });
    }
}
