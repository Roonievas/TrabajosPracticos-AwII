import swaggerJsdoc from "swagger-jsdoc";

const opciones = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Santiago Cereales SRL",
            version: "1.0.0",
            description: "Documentación de los endpoints propios del proyecto: categorías y productos."
        },
        servers: [
            { url: "http://localhost:3000" }
        ],
        components: {
            schemas: {
                Categoria: {
                    type: "object",
                    properties: {
                        id: { type: "integer", example: 1 },
                        nombre: { type: "string", example: "Herbicidas" },
                        imagen: { type: "string", example: "/recursos/servicios-productos/herbicidas.jpg" }
                    }
                },
                Producto: {
                    type: "object",
                    properties: {
                        id: { type: "integer", example: 1 },
                        nombre: { type: "string", example: "Azoxicipro Fender Mix" },
                        marca: { type: "string", example: "Fender" },
                        descripcion: { type: "string", example: "Fungicida grupo 11-3" },
                        imagen: { type: "string", example: "/recursos/productos-subidos/1699999999999.jpg" },
                        categoriaId: { type: "integer", example: 2 }
                    }
                }
            }
        }
    },
    // Dónde busca los comentarios "@swagger": en todos los archivos de rutas de cada módulo.
    apis: ["./modulos/**/*.rutas.mjs"]
};

const especificacion = swaggerJsdoc(opciones);

export default especificacion;
