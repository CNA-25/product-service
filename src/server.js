const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors({
    origin: process.env.MODE === "development"
        ? "*"
        : "https://product-service-git-cna-product-service.2.rahtiapp.fi/"
}));

app.get("/", (req, res) => {
    console.log(req.myVar);
    res.send("<h1>Hello!!!</h1>");
});

app.use(express.json());