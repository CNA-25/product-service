const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authorize = require('../middleware/auth'); // Import authentication middleware

const router = express.Router();
const prisma = new PrismaClient();

// Get all products (Protected)
router.get('/', authorize, async (req, res) => {
    try {
        const products = await prisma.products.findMany();
        res.status(200).json({ msg: "Products fetched successfully", products });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching products", error: error.message });
    }
});

// Get a single product by SKU (Protected)
router.get('/:sku', authorize, async (req, res) => {
    try {
        const product = await prisma.products.findUnique({
            where: { sku: req.params.sku },
        });
        if (product) {
            res.status(200).json({ msg: "Product fetched successfully", product });
        } else {
            res.status(404).json({ msg: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error fetching product", error: error.message });
    }
});

// Create a new product (Protected)
router.post('/', authorize, async (req, res) => {
    try {
        const { sku, name, price, description, image } = req.body;
        const product = await prisma.products.create({
            data: {
                sku,
                name,
                price,
                description,
                image,
            },
        });
        res.status(201).json({ msg: "New product created!", product });
    } catch (error) {
        res.status(400).json({ msg: "Error creating product", error: error.message });
    }
});

// Update a product by ID (Protected)
router.put('/:sku', authorize, async (req, res) => {
    try {
        const { sku, name, price, description, image } = req.body;
        const product = await prisma.products.update({
            where: { sku: req.params.sku },
            data: {
                sku,
                name,
                price,
                description,
                image,
                updated_at: new Date(),
            },
        });
        res.status(200).json({ msg: "Product updated successfully", product });
    } catch (error) {
        res.status(400).json({ msg: "Error updating product", error: error.message });
    }
});

// Delete a product by SKU (Protected)
router.delete('/:sku', authorize, async (req, res) => {
    try {
        await prisma.products.delete({
            where: { sku: req.params.sku },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;