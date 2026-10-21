const formulario =
    .gedocumenttElementById(
        "formulario-contacto"
    );

formulario.addEventListener(
    "submit",
    validarFormulario
);

function validarFormulario(evento) {

    const nombre =
        document.getElementById(
            "id-nombre"
        ).value.trim();

    const empresa =
        document.getElementById(
            "id-empresa"
        ).value.trim();

    const email =
        document.getElementById(
            "id-email"
        ).value.trim();

    const mensaje =
        document.getElementById(
            "id-mensaje"
        ).value.trim();

    if (nombre.length < 3) {

        alert(
            "Ingrese un nombre válido."
        );

        evento.preventDefault();

        return;
    }

    if (empresa.length < 2) {

        alert(
            "Ingrese una empresa válida."
        );

        evento.preventDefault();

        return;
    }

    if (
        !email.includes("@") ||
        !email.includes(".")
    ) {

        alert(
            "Ingrese un correo válido."
        );

        evento.preventDefault();

        return;
    }

    if (mensaje.length < 10) {

        alert(
            "El mensaje debe contener al menos 10 caracteres."
        );

        evento.preventDefault();

        return;
    }

    alert(
        "Formulario validado correctamente."
    );

}