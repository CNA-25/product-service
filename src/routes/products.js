const express = require("express");
const { PrismaClient } = require("@prisma/client");
const axios = require("axios");
const authorize = require("../middleware/auth");
const upload = require("../middleware/upload");
const generateSKU = require("../middleware/generateSKU");

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Beer product management
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

const getAllInventory = async () => {
    try {
        const response = await fetch("https://inventory-service-inventory-service.2.rahtiapp.fi/inventory");

        if (!response.ok) {
            throw new Error(`Error med inventory! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        return {}; // Returning empty object in case of an error
    }
};

router.get("/", authorize, async (req, res) => {
    try {
        const products = await prisma.products.findMany();
        const inventoryData = await getAllInventory();

        const productsWithInventory = products.map(product => {
            const inventory = inventoryData.find(item => item.productCode === product.sku);
            return { ...product, stock: inventory ? inventory.stock : 0 };
        });

        res.status(200).json({ msg: "Produkter hämtades.", productsWithInventory });

    } catch (error) {
        res.status(500).json({ msg: "Fel vid hämtning av produkter.", error: error.message });
    }
});

/**
 * @swagger
 * /products/{sku}:
 *   get:
 *     summary: Get a specific product by SKU
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: sku
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
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

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProduct'
 *     responses:
 *       201:
 *         description: Product created
 */
router.post("/", authorize, upload.single("image"), generateSKU(prisma), async (req, res) => {
    try {
        const { name, price, description, country, category, stock } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        const data = {
            sku: req.body.sku,
            name,
            price,
            description,
            image: imagePath,
            country,
            category
        };

        if (!stock) res.status(400).json({ msg: "Ange stock", error: error.message });

        const product = await prisma.products.create({ data });

        const invData = {
            productCode: req.body.sku,
            stock: stock
        }

        await fetch("https://inventory-service-inventory-service.2.rahtiapp.fi/inventory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(invData),
        });

        res.status(201).json({ msg: "Ny produkt skapades!", product });
    } catch (error) {
        res.status(400).json({ msg: "Fel vid skapande av produkt.", error: error.message });
    }
});

/**
 * @swagger
 * /products/{sku}:
 *   put:
 *     summary: Update a product by SKU
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: sku
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProduct'
 *     responses:
 *       200:
 *         description: Product updated
 */
router.put("/:sku", authorize, upload.single("image"), async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const data = { updated_at: new Date() };

        if (name && name.trim() !== "") data.name = name;
        if (price && price.trim() !== "") data.price = price;
        if (description && description.trim() !== "") data.description = description;

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

/**
 * @swagger
 * /products/{sku}:
 *   delete:
 *     summary: Delete a product by SKU
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: sku
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted
 */
router.delete("/:sku", authorize, async (req, res) => {
    try {

        const { sku } = req.params;

        await prisma.products.delete({
            where: { sku },
        });

        const delData = {
            productCode: sku
        }

        const inventoryResponse = await fetch(`https://inventory-service-inventory-service.2.rahtiapp.fi/inventory/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(delData)
        });

        if (!inventoryResponse.ok) {
            console.error("Failed to delete from inventory:", await inventoryResponse.text());
            return res.status(500).json({ msg: "Produkten raderades, men inventory kunde inte uppdateras." });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ msg: "Fel vid borttagning av produkt.", error: error.message });
    }
});

module.exports = router;