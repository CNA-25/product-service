const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: [
        "http://127.0.0.1:5500",
        /\.rahtiapp\.fi$/
    ]
}));

app.use(express.json());

// Visa något på sidan
app.get("/", (req, res) => {
    console.log(req.myVar);
    res.send("<h1>Hello!!!</h1>");
});

// Servera bilder
app.use("/uploads", express.static("/app/uploads"));

// Importera products rutten
const productsRouter = require("./routes/products");
app.use("/products", productsRouter);

app.listen(PORT, () => {
    try {
        console.log(`Running on http://localhost:${PORT}`);
    } catch (error) {
        console.error(error);
    }
});
