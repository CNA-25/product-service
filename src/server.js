// Import necessary modules
const express = require("express");
require("dotenv").config();

// Initialize express app
const app = express();

// Define the port (from environment variable or default to 8080)
const PORT = process.env.PORT || 8080;

// Set up a route to respond with a message
app.get("/", (req, res) => {
    res.send("<h1>Welcome to the Product Service API!</h1>");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
