module.exports = {
    Product: {
        type: "object",
        properties: {
            id: { type: "integer", example: 1 },
            sku: { type: "string", example: "BEER123" },
            name: { type: "string", example: "Craft Beer IPA" },
            price: { type: "number", format: "double", example: 5.99 },
            description: { type: "string", example: "A refreshing craft beer." },
            created_at: { type: "string", format: "date-time", example: "2024-02-24T12:00:00Z" },
            updated_at: { type: "string", format: "date-time", example: "2024-02-25T12:00:00Z" },
            image: { type: "string", example: "https://example.com/image.jpg" },
            country: { type: "string", example: "Finland" },
            category: { type: "string", example: "IPA" }
        },
        required: ["sku", "name", "price", "country", "category"]
    }
};
