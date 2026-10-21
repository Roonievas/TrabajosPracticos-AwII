const URL_CATEGORIAS = "https://6aa336e0e7ae868cdf7ab2c1.mockapi.io/categorias";

export async function obtenerCategorias() {
    const respuesta = await fetch(URL_CATEGORIAS);
    return await respuesta.json();
}
