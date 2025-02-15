const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authorize = require("../middleware/auth");
const upload = require("../middleware/upload");
const generateSKU = require("../middleware/generateSKU");

const router = express.Router();
const prisma = new PrismaClient();

// Hämta alla produkter
router.get("/", authorize, async (req, res) => {
    try {
        const products = await prisma.products.findMany();
        res.status(200).json({ msg: "Produkter hämtades.", products });
    } catch (error) {
        res.status(500).json({ msg: "Fel vid hämtning av produkter.", error: error.message });
    }
});

// Hämta en produkt med hjälp av SKU
router.get("/:sku", authorize, async (req, res) => {
    try {
        const product = await prisma.products.findUnique({
            where: { sku: req.params.sku },
        });
        if (product) {
            res.status(200).json({ msg: "Produkt hämtades.", product });
        } else {
            res.status(404).json({ msg: "Produkten hittades inte." });
        }
    } catch (error) {
        res.status(500).json({ msg: "Fel vid hämtning av produkt.", error: error.message });
    }
});

/// Skapa en ny produkt
router.post("/", authorize, upload.single("image"), generateSKU(prisma), async (req, res) => {
    try {
        const { name, price, description, country, category } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Sätt bildsökväg om uppladdad

        const data = {
            sku: req.body.sku,
            name,
            price,
            description,
            image: imagePath,
            country,
            category
        };

        const product = await prisma.products.create({
            data,
        });

        res.status(201).json({ msg: "Ny produkt skapades!", product });
    } catch (error) {
        res.status(400).json({ msg: "Fel vid skapande av produkt.", error: error.message });
    }
});

// Uppdatera en produkt med hjälp av SKU
router.put("/:sku", authorize, upload.single("image"), async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const data = { updated_at: new Date() };

        // Uppdatera endast värden som finns och inte är ""
        if (name && name.trim() !== "") data.name = name;
        if (price && price.trim() !== "") data.price = price;
        if (description && description.trim() !== "") data.description = description;

        // Uppdatera bild om ny fil är uppladdad
        if (req.file) {
            data.image = `/uploads/${req.file.filename}`;
        }

        const product = await prisma.products.update({
            where: { sku: req.params.sku },
            data,
        });

        res.status(200).json({ msg: "Produkten uppdaterades.", product });
    } catch (error) {
        res.status(400).json({ msg: "Fel vid uppdatering av produkt.", error: error.message });
    }
});

// Ta bort en produkt med hjälp av SKU
router.delete("/:sku", authorize, async (req, res) => {
    try {
        await prisma.products.delete({
            where: { sku: req.params.sku },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ msg: "Fel vid borttagning av produkt.", error: error.message });
    }
});

module.exports = router;
