const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { Product, CreateProduct, UpdateProduct, BatchRequest } = require("./schemas/Product.js");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Beercraft product API",
            version: "1.0.0",
            description: "API för att hantera öl produkter.",
        },
        servers: [
            {
                url: "https://product-service-cna-product-service.2.rahtiapp.fi/",
                description: "Environment-based API URL",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                Product,
                CreateProduct,
                UpdateProduct,
                BatchRequest
            }
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ["src/routes/products.js"],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;