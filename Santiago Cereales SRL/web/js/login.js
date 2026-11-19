// Script de la página "Iniciar sesión".
// Usa fetch en vez de un <form action> normal: así el servidor responde con
// JSON (mensaje de éxito o de error) y nunca hace una redirección propia,
// como pide la consigna del TP4. Si el login sale bien, recién ahí el propio
// JavaScript de la página decide navegar a la gestión de productos.

const formulario = document.getElementById("formulario-login");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const mensajeLogin = document.getElementById("mensaje-login");
const botonIngresar = document.getElementById("boton-ingresar");

formulario.addEventListener("submit", evento => {
    evento.preventDefault();

    mensajeLogin.textContent = "";
    botonIngresar.disabled = true;

    fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
            username: inputUsername.value.trim(),
            password: inputPassword.value
        })
    })
        .then(async respuesta => {
            const datos = await respuesta.json();

            if (!respuesta.ok) {
                mensajeLogin.textContent = datos.mensaje || "No se pudo iniciar sesión.";
                botonIngresar.disabled = false;
                return;
            }

            mensajeLogin.textContent = "¡Sesión iniciada! Redirigiendo...";
            // Navegación dentro de la misma interfaz, decidida por el navegador
            // a partir de la respuesta JSON, no una redirección del servidor.
            window.location.href = "abmProductos.html";
        })
        .catch(error => {
            console.error("Error al iniciar sesión:", error);
            mensajeLogin.textContent = "Error de conexión. Probá de nuevo.";
            botonIngresar.disabled = false;
        });
});
