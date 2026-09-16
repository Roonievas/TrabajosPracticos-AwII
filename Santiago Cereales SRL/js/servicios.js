const botones = document.querySelectorAll(".servicio .tarjeta__link");

botones.forEach(boton => {

    boton.addEventListener("click", () => {

        const tarjeta = boton.closest(".servicio");
        const detalle = tarjeta.querySelector(".servicio__detalle");

        detalle.classList.toggle("oculto");

        if (detalle.classList.contains("oculto")) {
            boton.textContent = "Saber más";
        } else {
            boton.textContent = "Ver menos";
        }

    });

});